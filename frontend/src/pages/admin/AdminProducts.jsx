import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../../data/api';
import { formatINR, saveProducts } from '../../data/store';
import { compressImageFile } from '../../utils/compressImage';
import { clearHomeCache } from '../Home';
import { clearProductsCache } from '../Products';
import {
  CloseIcon,
  CheckIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  EyeIcon,
  CategoriesIcon,
} from '../../components/admin/AdminIcons';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  mrp: '',
  discountPercent: '',
  stock: '',
  sku: '',
  shortDescription: '',
  description: '',
  weightGrams: 500,
  lengthCm: 30,
  widthCm: 20,
  heightCm: 5,
  returnAvailable: true,
  returnWindowHours: 24,
  cancellationAvailable: true,
  tags: '',
  seoTitle: '',
  seoDescription: '',
  slug: '',
  image: '',
  hoverImage: '',
  images: [],
  active: true,
  variants: [],
};

function discountFromPrices(mrp, price) {
  const m = Number(mrp);
  const p = Number(price);
  if (!m || !p || p >= m) return '';
  return Math.round(((m - p) / m) * 100);
}

function priceFromDiscount(mrp, discountPercent) {
  const m = Number(mrp);
  if (!m || discountPercent === '' || discountPercent === null || discountPercent === undefined) return '';
  const pct = Number(discountPercent);
  if (Number.isNaN(pct)) return '';
  return Math.max(0, Math.round(m * (1 - pct / 100)));
}

function mrpFromDiscount(price, discountPercent) {
  const p = Number(price);
  if (!p || discountPercent === '' || discountPercent === null || discountPercent === undefined) return '';
  const pct = Number(discountPercent);
  if (Number.isNaN(pct) || pct >= 100) return '';
  return Math.round(p / (1 - pct / 100));
}

function stockTone(stock) {
  if (stock === 0) return 'stock-out';
  if (stock <= 5) return 'stock-low';
  return 'stock-ok';
}

function stockLabel(stock) {
  if (stock === 0) return 'Out of stock';
  if (stock <= 5) return `Low stock · ${stock} left`;
  return `${stock} in stock`;
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState('');
  const [error, setError] = useState('');

  // Category & Filter Controls
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Input refs for modal
  const fileInput = useRef(null);
  const hoverFileInput = useRef(null);
  const galleryInput = useRef(null);
  const pricingEditRef = useRef(null);
  const modalBodyRef = useRef(null);

  const [galleryBusy, setGalleryBusy] = useState(false);
  const [movingId, setMovingId] = useState(null);
  const [variantImgBusy, setVariantImgBusy] = useState(null);
  const [variantHoverBusy, setVariantHoverBusy] = useState(null);

  // Hero Banner CMS State
  const defaultHero = {
    badge: 'HERITAGE HANDLOOMS',
    title: 'Our Collection',
    description: "Rooted in Andhra Pradesh's weaving heritage, our sarees are crafted slowly, thoughtfully, and meant to be treasured for a lifetime.",
    image: '/images/collection-hero-artisan.jpg',
  };
  const [heroDraft, setHeroDraft] = useState(defaultHero);
  const [heroSaved, setHeroSaved] = useState(false);
  const [showHeroBannerCMS, setShowHeroBannerCMS] = useState(false);
  const heroFileInput = useRef(null);

  useEffect(() => {
    refresh();
    api.getCategories().then(({ categories }) => setCategories(categories)).catch((err) => setError(err.message));
    api.getHomeSection('products_hero')
      .then((res) => {
        if (res?.section?.content) setHeroDraft((h) => ({ ...h, ...res.section.content }));
      })
      .catch(() => {});
  }, []);

  function refresh() {
    api.getAllProductsAdmin().then(({ products }) => {
      setProducts(products);
      try { saveProducts(products); } catch {}
    }).catch((err) => setError(err.message));
  }

  // Handle escape key to close modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  async function handleHeroImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await compressImageFile(file);
    setHeroDraft((h) => ({ ...h, image: dataUrl }));
  }

  async function handleSaveHeroBanner() {
    setError('');
    try {
      await api.updateHomeSection('products_hero', {
        title: 'Products Page — Curved Hero Header',
        enabled: true,
        content: heroDraft,
        sortOrder: 15,
      });
      clearProductsCache();
      clearHomeCache();
      setHeroSaved(true);
      setTimeout(() => setHeroSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImageFile(file).then((dataUrl) => setForm((f) => ({ ...f, image: dataUrl })));
  }

  function handleHoverImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImageFile(file).then((dataUrl) => setForm((f) => ({ ...f, hoverImage: dataUrl })));
  }

  function removeHoverImage() {
    setForm((f) => ({ ...f, hoverImage: '' }));
    if (hoverFileInput.current) hoverFileInput.current.value = '';
  }

  async function handleGalleryFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryBusy(true);
    try {
      const added = await Promise.all(files.map((f) => compressImageFile(f)));
      setForm((f) => ({ ...f, images: [...(f.images || []), ...added] }));
    } finally {
      setGalleryBusy(false);
      e.target.value = '';
    }
  }

  function removeGalleryImage(i) {
    setForm((f) => ({ ...f, images: (f.images || []).filter((_, idx) => idx !== i) }));
  }

  function computeField(target, f) {
    if (target === 'price') return priceFromDiscount(f.mrp, f.discountPercent);
    if (target === 'mrp') return mrpFromDiscount(f.price, f.discountPercent);
    if (target === 'discountPercent') return discountFromPrices(f.mrp, f.price);
    return '';
  }

  function handlePricingFieldChange(editing, value) {
    setForm((f) => {
      const next = { ...f, [editing]: value };
      let target;
      if (pricingEditRef.current?.editing === editing) {
        target = pricingEditRef.current.target;
      } else {
        if (editing === 'mrp') target = next.discountPercent !== '' ? 'price' : (next.price !== '' ? 'discountPercent' : null);
        else if (editing === 'discountPercent') target = next.mrp !== '' ? 'price' : (next.price !== '' ? 'mrp' : null);
        else target = next.mrp !== '' ? 'discountPercent' : (next.discountPercent !== '' ? 'mrp' : null);
        pricingEditRef.current = { editing, target };
      }
      if (target) {
        const computed = computeField(target, next);
        if (computed !== '') next[target] = computed;
      }
      return next;
    });
  }

  function addVariant() {
    setForm((f) => ({
      ...f,
      variants: [
        ...(f.variants || []),
        {
          colorName: '',
          colorCode: '#8B0000',
          sku: '',
          stock: Number(f.stock) || 5,
          price: '',
          mrp: '',
          weightGrams: f.weightGrams || 500,
          images: [],
          hoverImage: '',
          active: true,
        },
      ],
    }));
  }

  function updateVariantField(index, field, value) {
    setForm((f) => {
      const next = [...(f.variants || [])];
      next[index] = { ...next[index], [field]: value };
      return { ...f, variants: next };
    });
  }

  async function handleVariantMainImage(index, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVariantImgBusy(index);
    try {
      const dataUrl = await compressImageFile(file);
      setForm((f) => {
        const next = [...(f.variants || [])];
        const currentImgs = Array.isArray(next[index]?.images) ? [...next[index].images] : [];
        if (currentImgs.length > 0) {
          currentImgs[0] = dataUrl;
        } else {
          currentImgs.push(dataUrl);
        }
        next[index] = { ...next[index], images: currentImgs };
        return {
          ...f,
          image: f.image || dataUrl,
          variants: next,
        };
      });
    } catch {
      setError('Could not read the color main image file.');
    } finally {
      setVariantImgBusy(null);
      e.target.value = '';
    }
  }

  async function handleVariantHoverImage(index, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVariantHoverBusy(index);
    try {
      const dataUrl = await compressImageFile(file);
      setForm((f) => {
        const next = [...(f.variants || [])];
        next[index] = { ...next[index], hoverImage: dataUrl };
        return {
          ...f,
          hoverImage: f.hoverImage || dataUrl,
          variants: next,
        };
      });
    } catch {
      setError('Could not read the color hover image file.');
    } finally {
      setVariantHoverBusy(null);
      e.target.value = '';
    }
  }

  function removeVariantHoverImage(index) {
    setForm((f) => {
      const next = [...(f.variants || [])];
      next[index] = { ...next[index], hoverImage: '' };
      return { ...f, variants: next };
    });
  }

  async function handleVariantImages(index, e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setVariantImgBusy(index);
    try {
      const uploaded = await Promise.all(files.map((file) => compressImageFile(file)));
      setForm((f) => {
        const next = [...(f.variants || [])];
        const currentImgs = Array.isArray(next[index]?.images) ? next[index].images : [];
        next[index] = { ...next[index], images: [...currentImgs, ...uploaded] };
        return {
          ...f,
          image: f.image || uploaded[0] || '',
          variants: next,
        };
      });
    } catch {
      setError('Could not read one or more variant image files.');
    } finally {
      setVariantImgBusy(null);
      e.target.value = '';
    }
  }

  function removeVariantImage(variantIndex, imgIndex) {
    setForm((f) => {
      const next = [...(f.variants || [])];
      const currentImgs = Array.isArray(next[variantIndex]?.images) ? next[variantIndex].images : [];
      next[variantIndex] = {
        ...next[variantIndex],
        images: currentImgs.filter((_, idx) => idx !== imgIndex),
      };
      return { ...f, variants: next };
    });
  }

  function setVariantPrimaryImage(variantIndex, imgIndex) {
    if (imgIndex === 0) return;
    setForm((f) => {
      const next = [...(f.variants || [])];
      const currentImgs = [...(Array.isArray(next[variantIndex]?.images) ? next[variantIndex].images : [])];
      const [picked] = currentImgs.splice(imgIndex, 1);
      if (picked) currentImgs.unshift(picked);
      next[variantIndex] = { ...next[variantIndex], images: currentImgs };
      return { ...f, variants: next };
    });
  }

  function removeVariant(index) {
    setForm((f) => ({
      ...f,
      variants: (f.variants || []).filter((_, i) => i !== index),
    }));
  }

  function normalizeVariantsForForm(variants = [], basePrice = null, baseMrp = null) {
    return variants.map((v) => {
      const hasCustomPrice = (v.price != null && v.price !== '' && basePrice != null && Number(v.price) !== Number(basePrice));
      const hasCustomMrp = (v.mrp != null && v.mrp !== '' && baseMrp != null && Number(v.mrp) !== Number(baseMrp));
      return {
        ...v,
        colorName: v.colorName ?? v.color_name ?? '',
        colorCode: v.colorCode ?? v.color_code ?? '#8B0000',
        sku: v.sku ?? '',
        stock: v.stock ?? 0,
        price: hasCustomPrice ? v.price : '',
        mrp: hasCustomMrp ? v.mrp : '',
        weightGrams: v.weightGrams ?? v.weight_grams ?? 500,
        images: Array.isArray(v.images) ? v.images : [],
        hoverImage: v.hoverImage ?? v.hover_image ?? '',
        active: v.active !== false,
      };
    });
  }

  // Filtered & Sorted Products List
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory || p.categoryId === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (typeof p.tags === 'string' && p.tags.toLowerCase().includes(q))
      );
    }

    // Stock filter
    if (stockFilter === 'out') {
      result = result.filter((p) => p.stock === 0);
    } else if (stockFilter === 'low') {
      result = result.filter((p) => p.stock > 0 && p.stock <= 5);
    } else if (stockFilter === 'in') {
      result = result.filter((p) => p.stock > 5);
    }

    // Active / Status filter
    if (statusFilter === 'active') {
      result = result.filter((p) => p.active !== false);
    } else if (statusFilter === 'hidden') {
      result = result.filter((p) => p.active === false);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'stock-asc') {
      result.sort((a, b) => Number(a.stock) - Number(b.stock));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: newest
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, stockFilter, statusFilter, sortBy]);

  // Index of product currently in modal (for Previous/Next saree navigation)
  const currentModalIndex = useMemo(() => {
    if (!editingId) return -1;
    return filteredProducts.findIndex((p) => p.id === editingId);
  }, [editingId, filteredProducts]);

  const hasPrev = currentModalIndex > 0;
  const hasNext = currentModalIndex >= 0 && currentModalIndex < filteredProducts.length - 1;

  // Open modal in edit mode
  async function handleOpenEdit(product) {
    pricingEditRef.current = null;
    setError('');
    setForm({
      name: product.name,
      category: product.category || product.categoryId || categories[0]?.id || '',
      price: product.price,
      mrp: product.mrp,
      discountPercent: discountFromPrices(product.mrp, product.price),
      stock: product.stock,
      sku: product.sku || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      weightGrams: product.weightGrams ?? 500,
      lengthCm: product.lengthCm ?? 30,
      widthCm: product.widthCm ?? 20,
      heightCm: product.heightCm ?? 5,
      returnAvailable: product.returnAvailable ?? true,
      returnWindowHours: product.returnWindowHours ?? 24,
      cancellationAvailable: product.cancellationAvailable ?? true,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      seoTitle: product.seoTitle || '',
      seoDescription: product.seoDescription || '',
      slug: product.slug || '',
      image: product.image,
      hoverImage: product.hoverImage || product.hover_image || '',
      images: product.images || [],
      active: product.active !== false,
      variants: normalizeVariantsForForm(product.variants || [], product.price, product.mrp),
    });
    setEditingId(product.id);
    setIsModalOpen(true);

    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }

    try {
      const { product: full } = await api.getProduct(product.id);
      if (full) {
        setForm((f) => ({
          ...f,
          name: full.name || f.name,
          category: full.category || full.categoryId || f.category,
          price: full.price ?? f.price,
          mrp: full.mrp ?? f.mrp,
          discountPercent: discountFromPrices(full.mrp ?? f.mrp, full.price ?? f.price),
          stock: full.stock ?? f.stock,
          sku: full.sku || f.sku,
          shortDescription: full.shortDescription || full.short_description || f.shortDescription,
          description: full.description || f.description,
          tags: Array.isArray(full.tags) ? full.tags.join(', ') : (full.tags || f.tags),
          seoTitle: full.seoTitle || full.seo_title || f.seoTitle,
          seoDescription: full.seoDescription || full.seo_description || f.seoDescription,
          slug: full.slug || f.slug,
          image: full.image || f.image,
          hoverImage: full.hoverImage || full.hover_image || f.hoverImage,
          images: Array.isArray(full.images) ? full.images : (typeof full.images === 'string' ? (() => { try { return JSON.parse(full.images); } catch { return f.images; } })() : f.images),
          variants: full.variants ? normalizeVariantsForForm(full.variants, full.price ?? f.price, full.mrp ?? f.mrp) : f.variants,
          returnAvailable: full.returnAvailable ?? full.return_available ?? f.returnAvailable,
          returnWindowHours: full.returnWindowHours ?? full.return_window_hours ?? f.returnWindowHours,
          cancellationAvailable: full.cancellationAvailable ?? full.cancellation_available ?? f.cancellationAvailable,
        }));
      }
    } catch {
      /* fallback to row data */
    }
  }

  // Open modal in create mode
  function handleOpenCreate() {
    pricingEditRef.current = null;
    setError('');
    setForm({
      ...emptyForm,
      category: selectedCategory !== 'all' ? selectedCategory : (categories[0]?.id || ''),
    });
    setEditingId(null);
    setIsModalOpen(true);
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    pricingEditRef.current = null;
  }

  function handleNavigateModal(targetIndex) {
    if (targetIndex >= 0 && targetIndex < filteredProducts.length) {
      handleOpenEdit(filteredProducts[targetIndex]);
    }
  }

  async function handleSaveForm(e, andNext = false) {
    if (e) e.preventDefault();
    if (!form.name.trim() || !form.category) {
      setError('Product Name and Category are required.');
      return;
    }
    setError('');
    setIsSaving(true);

    const firstVariantImg = (form.variants || []).find((v) => Array.isArray(v.images) && v.images.length > 0)?.images?.[0];
    const firstVariantHover = (form.variants || []).find((v) => v.hoverImage || v.hover_image)?.hoverImage
      || (form.variants || []).find((v) => v.hoverImage || v.hover_image)?.hover_image
      || '';

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price) || 0,
      mrp: Number(form.mrp) || Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      sku: form.sku,
      shortDescription: form.shortDescription,
      description: form.description,
      weightGrams: Number(form.weightGrams) || 500,
      lengthCm: Number(form.lengthCm) || 30,
      widthCm: Number(form.widthCm) || 20,
      heightCm: Number(form.heightCm) || 5,
      returnAvailable: Boolean(form.returnAvailable),
      returnWindowHours: Number(form.returnWindowHours) || 24,
      cancellationAvailable: Boolean(form.cancellationAvailable),
      tags: form.tags ? (Array.isArray(form.tags) ? form.tags : form.tags.split(',').map((t) => t.trim()).filter(Boolean)) : [],
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      slug: form.slug,
      image: form.image || firstVariantImg || 'https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=800&q=80',
      hoverImage: form.hoverImage || firstVariantHover || '',
      images: form.images || [],
      active: form.active !== false,
      variants: (form.variants || []).map((v) => {
        const hasCustomPrice = v.price != null && v.price !== '' && Number(v.price) > 0 && Number(v.price) !== (Number(form.price) || 0);
        const finalPrice = hasCustomPrice ? Number(v.price) : (Number(form.price) || 0);
        const hasCustomMrp = v.mrp != null && v.mrp !== '' && Number(v.mrp) > 0 && Number(v.mrp) !== (Number(form.mrp) || finalPrice);
        const finalMrp = hasCustomMrp ? Number(v.mrp) : (Number(form.mrp) || finalPrice);
        return {
          ...v,
          price: finalPrice,
          mrp: finalMrp,
          colorName: v.colorName ?? v.color_name ?? '',
          colorCode: v.colorCode ?? v.color_code ?? '#8B0000',
          images: Array.isArray(v.images) ? v.images : [],
          hoverImage: v.hoverImage ?? v.hover_image ?? '',
        };
      }),
    };

    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
        setSaveToast(`✓ Saved "${form.name}"`);
      } else {
        await api.createProduct(payload);
        setSaveToast(`✓ Added "${form.name}"`);
      }
      clearHomeCache();
      clearProductsCache();
      setTimeout(() => setSaveToast(''), 3000);
      refresh();

      if (andNext && hasNext) {
        // Move directly to next saree in list
        handleNavigateModal(currentModalIndex + 1);
      } else {
        closeModal();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name || 'this saree'}"?`)) return;
    try {
      await api.deleteProduct(id);
      if (editingId === id) closeModal();
      clearHomeCache();
      clearProductsCache();
      refresh();
      setSaveToast('✓ Product deleted.');
      setTimeout(() => setSaveToast(''), 2500);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleMoveCategory(product, newCategoryId) {
    if (!newCategoryId || newCategoryId === product.category) return;
    setMovingId(product.id);
    try {
      await api.updateProduct(product.id, { category: newCategoryId });
      clearHomeCache();
      clearProductsCache();
      refresh();
      setSaveToast(`✓ Moved to ${categoryName(newCategoryId)}`);
      setTimeout(() => setSaveToast(''), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setMovingId(null);
    }
  }

  async function handleToggleActive(product) {
    setMovingId(product.id);
    try {
      await api.updateProduct(product.id, { active: !product.active });
      clearHomeCache();
      clearProductsCache();
      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setMovingId(null);
    }
  }

  function categoryName(id) {
    return categories.find((c) => c.id === id)?.name || id;
  }

  // Count products by category for tabs
  const categoryCounts = useMemo(() => {
    const map = {};
    for (const p of products) {
      const cId = p.category || p.categoryId;
      map[cId] = (map[cId] || 0) + 1;
    }
    return map;
  }, [products]);

  return (
    <div className="admin-products-page">
      {/* Toast Notification */}
      {saveToast && (
        <div className="admin-save-toast">
          <CheckIcon width={16} height={16} />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-head-row">
        <div>
          <h1 className="admin-page-title">Saree Catalog &amp; Products</h1>
          <p className="admin-page-desc">
            Manage your store inventory ({products.length} sarees). Click <strong>Edit</strong> on any saree to update details in the pop-up modal.
          </p>
        </div>
        <div className="admin-head-actions">
          <button
            type="button"
            className="btn btn-outline btn-hero-toggle"
            onClick={() => setShowHeroBannerCMS(!showHeroBannerCMS)}
          >
            {showHeroBannerCMS ? 'Hide Hero Banner' : 'Edit Hero Banner'}
          </button>
          <button type="button" className="btn btn-primary btn-add-product" onClick={handleOpenCreate}>
            <PlusIcon width={16} height={16} />
            <span>+ Add New Saree</span>
          </button>
        </div>
      </div>

      {error && <div className="admin-error-banner">{error}</div>}

      {/* --- Collapsible Products Page Curved Hero Banner CMS Card --- */}
      {showHeroBannerCMS && (
        <div className="hero-cms-card">
          <div className="hero-cms-header">
            <div>
              <h3 className="hero-cms-title">Products Page Curved Hero Banner</h3>
              <p className="hero-cms-sub">Customize the editorial hero banner at the top of the customer-facing sarees catalog.</p>
            </div>
            <button
              type="button"
              className="btn-close-cms"
              onClick={() => setShowHeroBannerCMS(false)}
              aria-label="Close hero settings"
            >
              <CloseIcon width={14} height={14} />
            </button>
          </div>

          <div className="hero-fields-grid">
            <label className="field-label">
              Badge Text
              <input
                type="text"
                value={heroDraft.badge || ''}
                placeholder="e.g. HERITAGE HANDLOOMS"
                onChange={(e) => setHeroDraft((h) => ({ ...h, badge: e.target.value }))}
              />
            </label>
            <label className="field-label">
              Header Title
              <input
                type="text"
                value={heroDraft.title || ''}
                placeholder="e.g. Our Collection"
                onChange={(e) => setHeroDraft((h) => ({ ...h, title: e.target.value }))}
              />
            </label>
          </div>

          <label className="field-label" style={{ marginTop: 12 }}>
            Subtitle Description
            <textarea
              rows={2}
              value={heroDraft.description || ''}
              placeholder="Rooted in Andhra Pradesh's weaving heritage..."
              onChange={(e) => setHeroDraft((h) => ({ ...h, description: e.target.value }))}
            />
          </label>

          <div className="hero-photo-row">
            <label className="field-label" style={{ flex: 1 }}>
              Banner Image
              <input type="file" accept="image/*" ref={heroFileInput} onChange={handleHeroImageUpload} />
              <span className="field-hint">Upload high-res weaver or model photo — auto-scaled into the curved banner.</span>
            </label>

            {(heroDraft.image || '/images/collection-hero-artisan.jpg') && (
              <div className="hero-preview-curved">
                <img src={heroDraft.image || '/images/collection-hero-artisan.jpg'} alt="Curved Preview" />
                <span className="hero-preview-tag">Storefront Preview</span>
              </div>
            )}
          </div>

          <div className="hero-cms-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveHeroBanner}>
              Save Hero Banner
            </button>
            {heroSaved && (
              <span className="hero-saved-status">
                <CheckIcon width={14} height={14} /> Banner Saved
              </span>
            )}
          </div>
        </div>
      )}

      {/* --- Category Tabs Navigation --- */}
      <div className="category-tabs-container">
        <div className="category-tabs-scroll">
          <button
            type="button"
            className={`category-tab-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <CategoriesIcon width={14} height={14} />
            <span>All Sarees</span>
            <span className="tab-count-badge">{products.length}</span>
          </button>
          {categories.map((c) => {
            const count = categoryCounts[c.id] || 0;
            const isActive = selectedCategory === c.id;
            return (
              <button
                type="button"
                key={c.id}
                className={`category-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                <span>{c.name}</span>
                <span className="tab-count-badge">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Search, Filter & View Controls Bar --- */}
      <div className="catalog-toolbar">
        <div className="toolbar-search-box">
          <SearchIcon width={16} height={16} className="search-icon-svg" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search sarees by name, SKU, price, tags..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <CloseIcon width={14} height={14} />
            </button>
          )}
        </div>

        <div className="toolbar-filters">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="filter-select"
            aria-label="Filter by Stock Status"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock (&gt;5)</option>
            <option value="low">Low Stock (≤5)</option>
            <option value="out">Out of Stock (0)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
            aria-label="Filter by Visibility"
          >
            <option value="all">All Status</option>
            <option value="active">Active on Store</option>
            <option value="hidden">Hidden from Store</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            aria-label="Sort products"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock-asc">Stock: Low to High</option>
            <option value="name-asc">Name: A to Z</option>
          </select>

          <div className="view-toggle-btns">
            <button
              type="button"
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Side-by-side Grid View"
            >
              ⊞ Grid
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Compact Table View"
            >
              ☰ Table
            </button>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="catalog-status-bar">
        <span>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'saree' : 'sarees'}
          {selectedCategory !== 'all' && (
            <>
              {' in '}
              <strong className="active-cat-name">{categoryName(selectedCategory)}</strong>
              <button
                type="button"
                className="btn-clear-category"
                onClick={() => setSelectedCategory('all')}
              >
                (Show All)
              </button>
            </>
          )}
          {searchQuery && <> matching &quot;{searchQuery}&quot;</>}
        </span>
      </div>

      {/* --- Side-by-Side Products Grid Layout --- */}
      {filteredProducts.length === 0 ? (
        <div className="catalog-empty-state">
          <p className="empty-title">No sarees found</p>
          <p className="empty-sub">
            {searchQuery || stockFilter !== 'all' || statusFilter !== 'all' || selectedCategory !== 'all'
              ? 'Try clearing your filters or search terms.'
              : 'Start adding sarees to your catalog!'}
          </p>
          <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
            + Add First Saree
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="products-side-by-side-grid">
          {filteredProducts.map((p) => {
            const hasDiscount = p.mrp > p.price;
            const discountPct = hasDiscount ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
            const hasHover = Boolean(p.hoverImage || p.hover_image);

            return (
              <div
                key={p.id}
                className={`product-card ${p.active === false ? 'is-hidden-card' : ''}`}
              >
                {/* Product Thumbnail with Model Hover */}
                <div
                  className="product-card-media"
                  onClick={() => handleOpenEdit(p)}
                  title="Click to edit saree"
                >
                  <img src={p.image} alt={p.name} className="product-media-img" loading="lazy" />
                  {hasHover && (
                    <img
                      src={p.hoverImage || p.hover_image}
                      alt="Hover View"
                      className="product-media-img product-media-hover"
                      loading="lazy"
                    />
                  )}

                  {/* Badges on image */}
                  <div className="card-top-badges">
                    <span className="card-cat-badge">{categoryName(p.category)}</span>
                    {p.active === false && <span className="card-hidden-badge">Hidden</span>}
                  </div>

                  <div className="card-bottom-badges">
                    <span className={`stock-badge ${stockTone(p.stock)}`}>
                      {stockLabel(p.stock)}
                    </span>
                    {hasHover && <span className="card-hover-tag">Model Hover</span>}
                  </div>
                </div>

                {/* Card Information */}
                <div className="product-card-body" onClick={() => handleOpenEdit(p)}>
                  <h4 className="product-card-title" title={p.name}>
                    {p.name}
                  </h4>
                  {p.sku && <span className="product-card-sku">SKU: {p.sku}</span>}

                  {/* Color Swatch Dots */}
                  {p.variants?.length > 0 && (
                    <div className="card-swatches-row" title={`${p.variants.length} color variants`}>
                      {p.variants.slice(0, 5).map((v, idx) => (
                        <span
                          key={idx}
                          className="card-swatch-dot"
                          style={{ backgroundColor: v.colorCode || v.color_code || '#8B0000' }}
                          title={v.colorName || v.color_name || 'Color'}
                        />
                      ))}
                      <span className="card-swatches-count">
                        {p.variants.length} {p.variants.length === 1 ? 'Color' : 'Colors'}
                      </span>
                    </div>
                  )}

                  {/* Pricing line */}
                  <div className="card-price-row">
                    <span className="card-price">{formatINR(p.price)}</span>
                    {hasDiscount && (
                      <>
                        <span className="card-mrp">{formatINR(p.mrp)}</span>
                        <span className="card-discount">{discountPct}% OFF</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Quick Actions Bar */}
                <div className="product-card-actions">
                  <button
                    type="button"
                    className="btn-card-edit"
                    onClick={() => handleOpenEdit(p)}
                    title="Open edit popup"
                  >
                    <EditIcon width={13} height={13} />
                    <span>Edit</span>
                  </button>

                  <select
                    className="card-cat-select"
                    value={p.category}
                    disabled={movingId === p.id}
                    onChange={(e) => handleMoveCategory(p, e.target.value)}
                    title="Quick move category"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn-card-icon"
                    onClick={() => handleToggleActive(p)}
                    disabled={movingId === p.id}
                    title={p.active === false ? 'Show saree in store' : 'Hide saree from store'}
                  >
                    <EyeIcon width={14} height={14} />
                  </button>

                  <button
                    type="button"
                    className="btn-card-icon btn-card-delete"
                    onClick={() => handleDelete(p.id, p.name)}
                    title="Delete saree"
                  >
                    <TrashIcon width={14} height={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* --- Compact Table View Alternative --- */
        <div className="catalog-table-wrapper">
          <table className="catalog-table">
            <thead>
              <tr>
                <th style={{ width: 64 }}>Photo</th>
                <th>Saree Name</th>
                <th>Category</th>
                <th>SKU</th>
                <th>Price &amp; MRP</th>
                <th>Stock</th>
                <th>Colors</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const hasDiscount = p.mrp > p.price;
                const discountPct = hasDiscount ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
                return (
                  <tr key={p.id} className={p.active === false ? 'is-hidden-row' : ''}>
                    <td>
                      <div className="table-thumb" onClick={() => handleOpenEdit(p)}>
                        <img src={p.image} alt="" />
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="table-name-btn"
                        onClick={() => handleOpenEdit(p)}
                      >
                        {p.name}
                      </button>
                    </td>
                    <td>
                      <span className="table-cat-chip">{categoryName(p.category)}</span>
                    </td>
                    <td className="table-sku-cell">{p.sku || '—'}</td>
                    <td>
                      <span className="table-price-bold">{formatINR(p.price)}</span>
                      {hasDiscount && (
                        <div className="table-mrp-sub">
                          <span className="table-mrp-del">{formatINR(p.mrp)}</span>
                          <span className="table-disc-badge">{discountPct}% off</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`stock-badge ${stockTone(p.stock)}`}>
                        {stockLabel(p.stock)}
                      </span>
                    </td>
                    <td>
                      {p.variants?.length > 0 ? (
                        <span className="table-color-count">{p.variants.length} colors</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>
                      {p.active === false ? (
                        <span className="table-badge-hidden">Hidden</span>
                      ) : (
                        <span className="table-badge-active">Active</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-action-group">
                        <button
                          type="button"
                          className="btn-table-edit"
                          onClick={() => handleOpenEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-table-toggle"
                          onClick={() => handleToggleActive(p)}
                          disabled={movingId === p.id}
                        >
                          {p.active === false ? 'Show' : 'Hide'}
                        </button>
                        <button
                          type="button"
                          className="btn-table-delete"
                          onClick={() => handleDelete(p.id, p.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =========================================================================
          POP-UP EDITING MODAL (The requested "pop up editing screen")
         ========================================================================= */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={closeModal}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="admin-modal-header">
              <div className="modal-title-group">
                <span className="modal-tag">
                  {editingId ? 'EDITING SAREE' : 'ADD NEW SAREE'}
                </span>
                <h2 className="modal-title">
                  {editingId ? form.name || 'Edit Product' : 'Add a New Saree to Catalog'}
                </h2>
                {editingId && (
                  <span className="modal-cat-sub">
                    In {categoryName(form.category)}
                    {currentModalIndex >= 0 && (
                      <span className="modal-index-counter">
                        {' '}&bull; Saree {currentModalIndex + 1} of {filteredProducts.length}
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Navigation & Close */}
              <div className="modal-header-nav">
                {editingId && (
                  <div className="modal-prev-next-btns">
                    <button
                      type="button"
                      className="btn-modal-nav"
                      disabled={!hasPrev}
                      onClick={() => handleNavigateModal(currentModalIndex - 1)}
                      title="Previous saree in list"
                    >
                      &larr; Prev
                    </button>
                    <button
                      type="button"
                      className="btn-modal-nav"
                      disabled={!hasNext}
                      onClick={() => handleNavigateModal(currentModalIndex + 1)}
                      title="Next saree in list"
                    >
                      Next &rarr;
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  className="btn-modal-close"
                  onClick={closeModal}
                  aria-label="Close editing modal"
                >
                  <CloseIcon width={18} height={18} />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="admin-modal-body" ref={modalBodyRef}>
              <form id="productModalForm" onSubmit={(e) => handleSaveForm(e, false)}>
                {/* 1. Basic Details */}
                <div className="modal-form-section">
                  <h4 className="modal-section-title">1. Basic Details</h4>
                  <div className="modal-form-grid">
                    <label className="modal-field full-width">
                      <span>Saree Name <span className="req">*</span></span>
                      <input
                        type="text"
                        value={form.name}
                        placeholder="e.g. Pure Dharmavaram Silk Saree with Gold Zari"
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        autoFocus
                      />
                    </label>

                    <label className="modal-field">
                      <span>Category <span className="req">*</span></span>
                      <select
                        value={form.category}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        required
                      >
                        <option value="" disabled>Select category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="modal-field">
                      <span>SKU (Stock Keeping Unit)</span>
                      <input
                        type="text"
                        value={form.sku}
                        placeholder="e.g. SK-DHR-001"
                        onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                      />
                    </label>

                    <label className="modal-field full-width">
                      <span>Short Description (Highlights)</span>
                      <input
                        type="text"
                        value={form.shortDescription}
                        placeholder="e.g. Handwoven pure mulberry silk with rich contrast pallu"
                        onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>

                {/* 2. Pricing & Stock */}
                <div className="modal-form-section">
                  <h4 className="modal-section-title">2. Pricing &amp; Inventory</h4>
                  <p className="modal-section-sub">
                    Enter MRP and Selling Price, or type a Discount % — other fields calculate automatically.
                  </p>
                  <div className="modal-pricing-grid">
                    <label className="modal-field">
                      <span>Selling Price (₹) <span className="req">*</span></span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.price}
                        placeholder="e.g. 12500"
                        onChange={(e) => handlePricingFieldChange('price', e.target.value)}
                        required
                      />
                    </label>

                    <label className="modal-field">
                      <span>Original MRP (₹)</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.mrp}
                        placeholder="e.g. 16000"
                        onChange={(e) => handlePricingFieldChange('mrp', e.target.value)}
                      />
                    </label>

                    <label className="modal-field">
                      <span>Discount (%)</span>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        step="1"
                        value={form.discountPercent}
                        placeholder="e.g. 22"
                        onChange={(e) => handlePricingFieldChange('discountPercent', e.target.value)}
                      />
                    </label>

                    <label className="modal-field">
                      <span>Available Stock <span className="req">*</span></span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.stock}
                        placeholder="e.g. 10 (0 = out of stock)"
                        onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* 3. Color Variants with Images & Hover */}
                <div className="modal-form-section">
                  <div className="section-header-flex">
                    <div>
                      <h4 className="modal-section-title">3. Color Variants &amp; Swatches</h4>
                      <p className="modal-section-sub">
                        Add individual colors (e.g., Maroon, Peacock Blue). Each variant can have its own main photo &amp; model hover photo.
                      </p>
                    </div>
                    <button type="button" className="btn btn-outline btn-sm" onClick={addVariant}>
                      + Add Color Variant
                    </button>
                  </div>

                  {(!form.variants || form.variants.length === 0) ? (
                    <div className="empty-variants-box">
                      <p>No color variants added yet. Click &quot;+ Add Color Variant&quot; if this saree is available in multiple colors.</p>
                    </div>
                  ) : (
                    <div className="modal-variants-list">
                      {form.variants.map((v, vIdx) => (
                        <div key={vIdx} className="variant-card-item">
                          <div className="variant-card-head">
                            <div className="variant-color-input-wrap">
                              <input
                                type="color"
                                value={v.colorCode || '#8B0000'}
                                onChange={(e) => updateVariantField(vIdx, 'colorCode', e.target.value)}
                                title="Pick color swatch"
                              />
                              <input
                                type="text"
                                className="variant-name-input"
                                value={v.colorName || ''}
                                placeholder="Color name (e.g. Royal Maroon)"
                                onChange={(e) => updateVariantField(vIdx, 'colorName', e.target.value)}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn-remove-variant"
                              onClick={() => removeVariant(vIdx)}
                              title="Remove color variant"
                            >
                              <CloseIcon width={12} height={12} /> Remove
                            </button>
                          </div>

                          <div className="variant-card-fields">
                            <label className="modal-field">
                              <span>Stock for this Color</span>
                              <input
                                type="number"
                                min="0"
                                value={v.stock}
                                onChange={(e) => updateVariantField(vIdx, 'stock', Number(e.target.value))}
                              />
                            </label>
                            <label className="modal-field">
                              <span>Color SKU</span>
                              <input
                                type="text"
                                value={v.sku}
                                placeholder="e.g. SK-DHR-001-MRN"
                                onChange={(e) => updateVariantField(vIdx, 'sku', e.target.value)}
                              />
                            </label>
                            <label className="modal-field">
                              <span>Color Price (₹, optional override)</span>
                              <input
                                type="number"
                                min="0"
                                placeholder={`Base: ₹${form.price || 0}`}
                                value={v.price ?? ''}
                                onChange={(e) => updateVariantField(vIdx, 'price', e.target.value)}
                              />
                            </label>
                            <label className="modal-field">
                              <span>Color MRP (₹, optional override)</span>
                              <input
                                type="number"
                                min="0"
                                placeholder={`Base: ₹${form.mrp || form.price || 0}`}
                                value={v.mrp ?? ''}
                                onChange={(e) => updateVariantField(vIdx, 'mrp', e.target.value)}
                              />
                            </label>
                          </div>

                          {/* Photos for this color */}
                          <div className="variant-card-photos">
                            <div className="variant-photo-col">
                              <span className="variant-photo-heading">Main Photo ({v.colorName || `Color ${vIdx + 1}`})</span>
                              <div className="variant-photo-preview">
                                {v.images?.[0] ? (
                                  <img src={v.images[0]} alt="" />
                                ) : (
                                  <div className="no-photo-slot">No photo</div>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleVariantMainImage(vIdx, e)}
                                disabled={variantImgBusy === vIdx}
                              />
                            </div>

                            <div className="variant-photo-col">
                              <span className="variant-photo-heading">Model Hover Photo (Wearing Saree)</span>
                              <div className="variant-photo-preview">
                                {v.hoverImage ? (
                                  <>
                                    <img src={v.hoverImage} alt="" />
                                    <button
                                      type="button"
                                      className="btn-remove-hover"
                                      onClick={() => removeVariantHoverImage(vIdx)}
                                    >
                                      Remove
                                    </button>
                                  </>
                                ) : (
                                  <div className="no-photo-slot">No hover photo</div>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleVariantHoverImage(vIdx, e)}
                                disabled={variantHoverBusy === vIdx}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Photos & Hover Preview (Fallback & Gallery) */}
                <div className="modal-form-section">
                  <h4 className="modal-section-title">4. Main Saree Photos &amp; Gallery</h4>
                  <p className="modal-section-sub">
                    Default fallback photo, model hover photo (shown on product card hover), and multi-angle thumbnails.
                  </p>

                  <div className="modal-dual-photos">
                    <div className="photo-box">
                      <span className="photo-box-title">Main Saree Photo</span>
                      <span className="field-hint">Initial storefront view (saree flat lay / folded).</span>
                      <input type="file" accept="image/*" ref={fileInput} onChange={handleImage} />
                      {form.image ? (
                        <div className="modal-thumb-preview">
                          <img src={form.image} alt="Main Preview" />
                          <span className="badge-overlay">Main Saree Photo</span>
                        </div>
                      ) : (
                        <div className="empty-photo-slot">
                          <span>{form.variants?.length ? 'Uses 1st variant photo automatically' : 'No photo uploaded'}</span>
                        </div>
                      )}
                    </div>

                    <div className="photo-box">
                      <span className="photo-box-title">Hover Photo (Model Wearing Saree)</span>
                      <span className="field-hint">Revealed when shopper hovers mouse over card.</span>
                      <input type="file" accept="image/*" ref={hoverFileInput} onChange={handleHoverImage} />
                      {form.hoverImage ? (
                        <div className="modal-thumb-preview">
                          <img src={form.hoverImage} alt="Hover Preview" />
                          <span className="badge-overlay badge-hover">Model Wearing Photo</span>
                          <button type="button" className="photo-remove-btn" onClick={removeHoverImage}>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="empty-photo-slot">
                          <span>Optional (fallback to main)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Gallery Photos */}
                  <div className="modal-gallery-area">
                    <div className="gallery-header-row">
                      <span className="photo-box-title">Additional Gallery Photos ({form.images?.length || 0})</span>
                      <button
                        type="button"
                        className="btn btn-outline btn-xs"
                        disabled={galleryBusy}
                        onClick={() => galleryInput.current?.click()}
                      >
                        {galleryBusy ? 'Uploading…' : '+ Add Gallery Photos'}
                      </button>
                      <input ref={galleryInput} type="file" accept="image/*" multiple hidden onChange={handleGalleryFiles} />
                    </div>

                    {form.images?.length > 0 && (
                      <div className="modal-gallery-thumbs">
                        {form.images.map((src, i) => (
                          <div className="gallery-thumb-item" key={i}>
                            <img src={src} alt="" />
                            <button
                              type="button"
                              className="thumb-delete-btn"
                              onClick={() => removeGalleryImage(i)}
                              title="Delete photo"
                            >
                              <CloseIcon width={10} height={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Return & Cancellation Policy */}
                <div className="modal-form-section">
                  <h4 className="modal-section-title">5. Returns &amp; Cancellation Policy</h4>
                  <div className="policy-checkbox-grid">
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={form.returnAvailable}
                        onChange={(e) => setForm((f) => ({ ...f, returnAvailable: e.target.checked }))}
                      />
                      <span>Allow Customer Returns for this Saree</span>
                    </label>

                    {form.returnAvailable && (
                      <label className="modal-field" style={{ marginLeft: 28, maxWidth: 220 }}>
                        <span>Return Window</span>
                        <select
                          value={form.returnWindowHours}
                          onChange={(e) => setForm((f) => ({ ...f, returnWindowHours: Number(e.target.value) }))}
                        >
                          <option value={24}>24 Hours after delivery</option>
                          <option value={48}>48 Hours after delivery</option>
                          <option value={72}>72 Hours (3 Days)</option>
                          <option value={168}>7 Days</option>
                        </select>
                      </label>
                    )}

                    <label className="checkbox-item" style={{ marginTop: 8 }}>
                      <input
                        type="checkbox"
                        checked={form.cancellationAvailable}
                        onChange={(e) => setForm((f) => ({ ...f, cancellationAvailable: e.target.checked }))}
                      />
                      <span>Allow Cancellation before Dispatch</span>
                    </label>
                  </div>
                </div>

                {/* 6. Full Description */}
                <div className="modal-form-section">
                  <h4 className="modal-section-title">6. Full Product Description</h4>
                  <label className="modal-field full-width">
                    <textarea
                      rows={5}
                      value={form.description}
                      placeholder="Detailed craftsmanship story, fabric purity, border details, zari work, blouse piece..."
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </label>
                </div>

                {/* 7. SEO & Discovery */}
                <div className="modal-form-section">
                  <h4 className="modal-section-title">7. SEO &amp; Search Tags</h4>
                  <div className="modal-form-grid">
                    <label className="modal-field full-width">
                      <span>Search Tags (comma separated)</span>
                      <input
                        type="text"
                        value={form.tags}
                        placeholder="e.g. bridal, wedding silk, gold zari, dharmavaram, pure pattu"
                        onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                      />
                    </label>

                    <label className="modal-field">
                      <span>SEO Page Title</span>
                      <input
                        type="text"
                        value={form.seoTitle}
                        placeholder="Custom title tag for Google"
                        onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
                      />
                    </label>

                    <label className="modal-field">
                      <span>URL Slug</span>
                      <input
                        type="text"
                        value={form.slug}
                        placeholder="e.g. pure-dharmavaram-silk-saree"
                        onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Sticky Footer Actions */}
            <div className="admin-modal-footer">
              <button type="button" className="btn btn-outline" onClick={closeModal} disabled={isSaving}>
                Cancel
              </button>

              <div className="footer-right-actions">
                <button
                  type="submit"
                  form="productModalForm"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving…' : editingId ? 'Save Changes' : 'Add Saree to Catalog'}
                </button>

                {editingId && hasNext && (
                  <button
                    type="button"
                    className="btn btn-save-next"
                    disabled={isSaving}
                    onClick={(e) => handleSaveForm(e, true)}
                    title="Save current saree and open the next saree immediately"
                  >
                    <span>Save &amp; Next Saree</span>
                    <span className="arrow-next">&rarr;</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STYLES (Responsive Side-by-Side Grid, Category Tabs, Modal Dialog)
         ========================================================================= */}
      <style>{`
        .admin-products-page {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding-bottom: 60px;
        }

        .admin-save-toast {
          position: fixed;
          top: 24px;
          right: 28px;
          background: #20080b;
          color: #fbdba2;
          border: 1px solid rgba(251, 219, 162, 0.35);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 600;
          z-index: 9999;
          animation: slideInToast 0.25s ease-out;
        }
        @keyframes slideInToast {
          from { transform: translateY(-16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .admin-page-head-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .admin-page-title {
          font-size: 26px;
          font-family: var(--font-display, serif);
          color: var(--brand-primary, #20080b);
          margin: 0 0 6px;
        }
        .admin-page-desc {
          font-size: 13.5px;
          color: var(--ink-500, #666);
          margin: 0;
          max-width: 600px;
          line-height: 1.5;
        }
        .admin-head-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .btn-add-product {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(128, 0, 32, 0.25);
        }
        .btn-hero-toggle {
          font-size: 13px;
          padding: 9px 14px;
          border-radius: 8px;
        }

        .admin-error-banner {
          background: #fdf2f2;
          border: 1px solid #f8b4b4;
          color: #9b1c1c;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        /* Hero CMS Card */
        .hero-cms-card {
          background: var(--paper, #fff);
          border-radius: 12px;
          padding: 22px 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(197, 139, 56, 0.25);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
        }
        .hero-cms-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .hero-cms-title {
          font-family: var(--font-display, serif);
          font-size: 18px;
          color: var(--brand-primary, #20080b);
          margin: 0 0 4px;
        }
        .hero-cms-sub {
          font-size: 12.5px;
          color: var(--ink-500, #666);
          margin: 0;
        }
        .btn-close-cms {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink-400);
          padding: 4px;
          border-radius: 4px;
        }
        .btn-close-cms:hover { background: var(--stone-100); color: var(--ink-900); }
        .hero-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .hero-photo-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 14px;
        }
        .hero-preview-curved {
          position: relative;
          width: 240px;
          height: 90px;
          border-radius: 8px 36px 36px 8px;
          overflow: hidden;
          border: 1px solid rgba(197, 139, 56, 0.4);
          flex-shrink: 0;
        }
        .hero-preview-curved img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-preview-tag {
          position: absolute;
          bottom: 4px;
          left: 6px;
          font-size: 9.5px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .hero-cms-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--stone-200);
        }
        .hero-saved-status {
          color: #2e7d32;
          font-weight: 600;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Category Tabs Navigation Bar */
        .category-tabs-container {
          margin-bottom: 18px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
        }
        .category-tabs-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: max-content;
        }
        .category-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: var(--paper, #fff);
          border: 1px solid var(--stone-200, #e2e8f0);
          color: var(--ink-700, #475569);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .category-tab-pill:hover {
          border-color: var(--maroon-700, #800020);
          color: var(--maroon-900, #20080b);
          background: #fdfaf9;
        }
        .category-tab-pill.active {
          background: var(--maroon-900, #20080b);
          color: #ffffff;
          border-color: var(--maroon-900, #20080b);
          box-shadow: 0 2px 8px rgba(32, 8, 11, 0.2);
        }
        .tab-count-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 1px 7px;
          border-radius: 999px;
          background: var(--stone-100, #f1f5f9);
          color: var(--ink-600, #64748b);
        }
        .category-tab-pill.active .tab-count-badge {
          background: rgba(255, 255, 255, 0.22);
          color: #ffffff;
        }

        /* Toolbar (Search & Filters) */
        .catalog-toolbar {
          background: var(--paper, #fff);
          border: 1px solid var(--stone-200, #e2e8f0);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .toolbar-search-box {
          position: relative;
          flex: 1 1 280px;
          max-width: 440px;
        }
        .search-icon-svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--ink-400);
          pointer-events: none;
        }
        .toolbar-search-box input {
          width: 100%;
          padding: 9px 34px 9px 36px;
          border-radius: 8px;
          border: 1px solid var(--stone-300, #cbd5e1);
          font-size: 13.5px;
          background: #fff;
          box-sizing: border-box;
          outline: none;
        }
        .toolbar-search-box input:focus {
          border-color: var(--maroon-700);
          box-shadow: 0 0 0 2px rgba(128, 0, 32, 0.12);
        }
        .clear-search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--ink-400);
          cursor: pointer;
          padding: 4px;
        }
        .toolbar-filters {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .filter-select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--stone-300, #cbd5e1);
          background: #fff;
          font-size: 12.5px;
          color: var(--ink-700);
          cursor: pointer;
        }
        .view-toggle-btns {
          display: inline-flex;
          border: 1px solid var(--stone-300);
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }
        .view-btn {
          background: none;
          border: none;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-600);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .view-btn.active {
          background: var(--maroon-900, #20080b);
          color: #fff;
        }

        .catalog-status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: var(--ink-500);
          margin-bottom: 18px;
          padding: 0 2px;
        }
        .active-cat-name { color: var(--maroon-900); }
        .btn-clear-category {
          background: none;
          border: none;
          color: var(--maroon-700);
          cursor: pointer;
          margin-left: 6px;
          font-size: 12px;
          text-decoration: underline;
        }

        /* --- SIDE-BY-SIDE PRODUCTS GRID --- */
        .products-side-by-side-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 22px;
        }
        .product-card {
          background: var(--paper, #fff);
          border: 1px solid var(--stone-200, #e2e8f0);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
          border-color: rgba(128, 0, 32, 0.3);
        }
        .product-card.is-hidden-card {
          opacity: 0.72;
          background: #fafafa;
        }

        /* Saree Image Container */
        .product-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #fbf7f2;
          cursor: pointer;
        }
        .product-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: opacity 0.3s ease;
        }
        .product-media-hover {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .product-card-media:hover .product-media-hover {
          opacity: 1;
        }

        .card-top-badges {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          pointer-events: none;
        }
        .card-cat-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(32, 8, 11, 0.82);
          color: #fbdba2;
          padding: 3px 8px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        .card-hidden-badge {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: #475569;
          color: #fff;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .card-bottom-badges {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          pointer-events: none;
        }
        .stock-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }
        .stock-ok { background: #e8f5e9; color: #1e7e34; }
        .stock-low { background: #fef3c7; color: #b45309; }
        .stock-out { background: #fee2e2; color: #b91c1c; }

        .card-hover-tag {
          font-size: 9.5px;
          font-weight: 600;
          background: rgba(0, 0, 0, 0.65);
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Card Body */
        .product-card-body {
          padding: 14px 14px 10px;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
        }
        .product-card-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink-900, #1e293b);
          margin: 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-card-body:hover .product-card-title {
          color: var(--maroon-800, #800020);
        }
        .product-card-sku {
          font-size: 11px;
          color: var(--ink-400, #94a3b8);
          font-family: monospace;
        }

        .card-swatches-row {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 2px;
        }
        .card-swatch-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.2);
          display: inline-block;
        }
        .card-swatches-count {
          font-size: 11px;
          color: var(--ink-500);
          margin-left: 3px;
        }

        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: 4px;
        }
        .card-price {
          font-size: 15px;
          font-weight: 700;
          color: var(--maroon-900, #20080b);
        }
        .card-mrp {
          font-size: 12px;
          color: var(--ink-400);
          text-decoration: line-through;
        }
        .card-discount {
          font-size: 10px;
          font-weight: 700;
          color: #1e7e34;
          background: #e8f5e9;
          padding: 1px 5px;
          border-radius: 4px;
        }

        /* Card Action Footer */
        .product-card-actions {
          padding: 10px 14px 12px;
          border-top: 1px solid var(--stone-100, #f1f5f9);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-card-edit {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #fbf1e8;
          border: 1px solid rgba(184, 125, 43, 0.3);
          color: #8c5d1e;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-card-edit:hover {
          background: var(--maroon-900, #20080b);
          color: #fff;
          border-color: var(--maroon-900);
        }
        .card-cat-select {
          font-size: 11px;
          padding: 5px 6px;
          border-radius: 6px;
          border: 1px solid var(--stone-200);
          background: #fff;
          color: var(--ink-700);
          max-width: 90px;
          cursor: pointer;
        }
        .btn-card-icon {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          color: var(--ink-600);
          border-radius: 6px;
          padding: 5px 7px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-card-icon:hover { background: var(--stone-100); color: var(--ink-900); }
        .btn-card-delete { color: #b91c1c; border-color: #fee2e2; background: #fef2f2; }
        .btn-card-delete:hover { background: #fee2e2; color: #991b1b; }

        /* Table View */
        .catalog-table-wrapper {
          background: var(--paper, #fff);
          border: 1px solid var(--stone-200);
          border-radius: 10px;
          overflow-x: auto;
        }
        .catalog-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .catalog-table th {
          background: var(--stone-50);
          padding: 12px 14px;
          text-align: left;
          font-weight: 600;
          color: var(--ink-700);
          border-bottom: 1px solid var(--stone-200);
        }
        .catalog-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--stone-100);
          vertical-align: middle;
        }
        .table-thumb {
          width: 48px;
          height: 56px;
          border-radius: 6px;
          overflow: hidden;
          background: var(--stone-100);
          cursor: pointer;
        }
        .table-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .table-name-btn {
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink-900);
          cursor: pointer;
        }
        .table-name-btn:hover { color: var(--maroon-800); text-decoration: underline; }
        .table-cat-chip {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-700);
          background: var(--stone-100);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .table-sku-cell { font-family: monospace; font-size: 11.5px; color: var(--ink-500); }
        .table-price-bold { font-weight: 700; color: var(--maroon-900); }
        .table-mrp-sub { display: flex; gap: 6px; font-size: 10.5px; align-items: center; margin-top: 2px; }
        .table-mrp-del { color: var(--ink-400); text-decoration: line-through; }
        .table-disc-badge { color: #1e7e34; font-weight: 600; }
        .table-color-count { font-size: 11.5px; color: var(--ink-600); }
        .table-badge-active { color: #1e7e34; font-weight: 600; font-size: 11px; }
        .table-badge-hidden { color: #64748b; font-weight: 600; font-size: 11px; }
        .table-action-group { display: flex; gap: 6px; justify-content: flex-end; }
        .btn-table-edit {
          background: #fbf1e8;
          border: 1px solid rgba(184, 125, 43, 0.3);
          color: #8c5d1e;
          font-size: 11.5px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-table-toggle {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          font-size: 11.5px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-table-delete {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #b91c1c;
          font-size: 11.5px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Empty state */
        .catalog-empty-state {
          text-align: center;
          padding: 60px 20px;
          background: var(--paper, #fff);
          border: 1px dashed var(--stone-300);
          border-radius: 12px;
          margin-top: 20px;
        }
        .empty-title { font-size: 18px; font-weight: 600; color: var(--ink-800); margin: 0 0 6px; }
        .empty-sub { font-size: 13.5px; color: var(--ink-500); margin: 0 0 18px; }

        /* =========================================================================
           POP-UP EDITING MODAL WINDOW STYLES
           ========================================================================= */
        .admin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(18, 6, 8, 0.65);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          animation: modalFadeIn 0.2s ease-out;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .admin-modal-card {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalSlideUp {
          from { transform: translateY(24px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* Modal Header */
        .admin-modal-header {
          padding: 18px 24px;
          border-bottom: 1px solid var(--stone-200, #e2e8f0);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fdfbf9;
          flex-shrink: 0;
        }
        .modal-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .modal-tag {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--maroon-700, #800020);
          text-transform: uppercase;
        }
        .modal-title {
          font-family: var(--font-display, serif);
          font-size: 18px;
          color: var(--brand-primary, #20080b);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 500px;
        }
        .modal-cat-sub {
          font-size: 12px;
          color: var(--ink-500);
        }
        .modal-index-counter {
          color: var(--ink-400);
          font-weight: 500;
        }
        .modal-header-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .modal-prev-next-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-modal-nav {
          padding: 5px 11px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid var(--stone-300);
          background: #fff;
          color: var(--ink-700);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-modal-nav:hover:not(:disabled) {
          background: var(--maroon-900);
          color: #fff;
          border-color: var(--maroon-900);
        }
        .btn-modal-nav:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-modal-close {
          background: none;
          border: none;
          padding: 6px;
          border-radius: 6px;
          color: var(--ink-400);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-modal-close:hover {
          background: var(--stone-100);
          color: var(--ink-900);
        }

        /* Modal Body */
        .admin-modal-body {
          padding: 24px 28px;
          overflow-y: auto;
          flex: 1 1 auto;
          box-sizing: border-box;
          background: #fff;
        }
        .modal-form-section {
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--stone-200);
        }
        .modal-form-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .modal-section-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--maroon-900, #20080b);
          margin: 0 0 4px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .modal-section-sub {
          font-size: 12px;
          color: var(--ink-400);
          margin: 0 0 14px;
          line-height: 1.45;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .modal-pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink-700);
        }
        .modal-field.full-width { grid-column: 1 / -1; }
        .req { color: #dc2626; }
        .modal-field input:not([type="checkbox"]):not([type="color"]),
        .modal-field select,
        .modal-field textarea {
          padding: 9px 12px;
          border: 1px solid var(--stone-300, #cbd5e1);
          border-radius: 8px;
          font-size: 13.5px;
          font-family: inherit;
          box-sizing: border-box;
          width: 100%;
        }
        .modal-field input:focus,
        .modal-field select:focus,
        .modal-field textarea:focus {
          border-color: var(--maroon-700);
          outline: none;
          box-shadow: 0 0 0 2px rgba(128, 0, 32, 0.12);
        }

        /* Color Variants Manager */
        .section-header-flex {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .empty-variants-box {
          background: #fbf7f2;
          border: 1px dashed var(--stone-300);
          border-radius: 8px;
          padding: 18px;
          text-align: center;
          font-size: 12.5px;
          color: var(--ink-500);
        }
        .modal-variants-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .variant-card-item {
          background: #faf8f6;
          border: 1px solid var(--stone-200);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .variant-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .variant-color-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .variant-color-input-wrap input[type="color"] {
          width: 28px;
          height: 28px;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 0;
          cursor: pointer;
        }
        .variant-name-input {
          flex: 1;
          max-width: 280px;
          padding: 6px 10px !important;
          font-size: 13px !important;
        }
        .btn-remove-variant {
          background: none;
          border: none;
          color: #dc2626;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .variant-card-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .variant-card-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding-top: 10px;
          border-top: 1px dashed var(--stone-200);
        }
        .variant-photo-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .variant-photo-heading {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink-700);
        }
        .variant-photo-preview {
          position: relative;
          width: 100%;
          height: 110px;
          border-radius: 8px;
          overflow: hidden;
          background: #f1ede8;
          border: 1px solid var(--stone-200);
        }
        .variant-photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .no-photo-slot {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: var(--ink-400);
        }
        .btn-remove-hover {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          font-size: 10px;
          padding: 2px 6px;
          color: #b91c1c;
          cursor: pointer;
        }

        /* Dual Photos */
        .modal-dual-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .photo-box {
          background: #faf8f6;
          border: 1px solid var(--stone-200);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .photo-box-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink-800);
        }
        .field-hint { font-size: 11px; color: var(--ink-400); }
        .modal-thumb-preview {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--stone-300);
        }
        .modal-thumb-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .badge-overlay {
          position: absolute;
          bottom: 6px;
          left: 6px;
          font-size: 9.5px;
          font-weight: 700;
          background: rgba(32, 8, 11, 0.85);
          color: #fbdba2;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .badge-overlay.badge-hover {
          background: rgba(88, 30, 21, 0.9);
        }
        .photo-remove-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          font-size: 10.5px;
          color: #dc2626;
          padding: 2px 6px;
          cursor: pointer;
        }
        .empty-photo-slot {
          height: 70px;
          border: 1px dashed var(--stone-300);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 11.5px;
          color: var(--ink-400);
        }

        /* Gallery */
        .modal-gallery-area {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid var(--stone-200);
        }
        .gallery-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .btn-xs { font-size: 11.5px; padding: 4px 10px; border-radius: 6px; }
        .modal-gallery-thumbs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .gallery-thumb-item {
          position: relative;
          width: 64px;
          height: 76px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--stone-300);
        }
        .gallery-thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb-delete-btn {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        /* Policy & Dimensions */
        .policy-checkbox-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .checkbox-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-800);
          cursor: pointer;
        }
        .checkbox-item input[type="checkbox"] {
          width: 17px;
          height: 17px;
          accent-color: var(--maroon-900);
        }

        /* Modal Footer */
        .admin-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--stone-200, #e2e8f0);
          background: #fdfbf9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .footer-right-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn-save-next {
          background: #fbf1e8;
          border: 1px solid rgba(184, 125, 43, 0.4);
          color: #8c5d1e;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .btn-save-next:hover:not(:disabled) {
          background: var(--maroon-900);
          color: #fff;
          border-color: var(--maroon-900);
        }
        .btn-save-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .arrow-next {
          font-size: 15px;
          line-height: 1;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .modal-pricing-grid { grid-template-columns: 1fr 1fr; }
          .products-side-by-side-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 16px;
          }
        }
        @media (max-width: 640px) {
          .admin-page-head-row { flex-direction: column; align-items: stretch; }
          .admin-head-actions { width: 100%; justify-content: space-between; }
          .toolbar-search-box { max-width: none; width: 100%; }
          .modal-form-grid,
          .hero-fields-grid,
          .modal-dual-photos,
          .variant-card-fields,
          .variant-card-photos { grid-template-columns: 1fr; }
          .admin-modal-card { max-height: 96vh; }
          .admin-modal-header { padding: 14px 18px; }
          .admin-modal-body { padding: 18px 16px; }
          .admin-modal-footer {
            flex-direction: column-reverse;
            gap: 10px;
            padding: 12px 16px;
          }
          .admin-modal-footer .btn,
          .footer-right-actions {
            width: 100%;
          }
          .btn-save-next {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
