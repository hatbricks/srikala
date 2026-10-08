import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../../data/api';
import { formatINR } from '../../data/store';
import { compressImageFile } from '../../utils/compressImage';
import { CloseIcon, CheckIcon } from '../../components/admin/AdminIcons';

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

// Keeps MRP / discount % / price in sync with each other, whichever one the
// admin actually typed into. Rounds to whole rupees since that's what the
// rest of the site displays.
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
  const [error, setError] = useState('');
  const fileInput = useRef(null);
  const hoverFileInput = useRef(null);
  const galleryInput = useRef(null);
  const [galleryBusy, setGalleryBusy] = useState(false);
  const [movingId, setMovingId] = useState(null);

  // Search, filter & pagination state for high-performance product management
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterStatus]);

  const defaultHero = {
    badge: 'HERITAGE HANDLOOMS',
    title: 'Our Collection',
    description: "Rooted in Andhra Pradesh's weaving heritage, our sarees are crafted slowly, thoughtfully, and meant to be treasured for a lifetime.",
    image: '/images/collection-hero-artisan.jpg',
  };
  const [heroDraft, setHeroDraft] = useState(defaultHero);
  const [heroSaved, setHeroSaved] = useState(false);
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
      setHeroSaved(true);
      setTimeout(() => setHeroSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  function refresh() {
    // The admin list needs to see hidden products too (to unhide them),
    // unlike the public storefront endpoint used everywhere else.
    api.getAllProductsAdmin().then(({ products }) => setProducts(products)).catch((err) => setError(err.message));
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

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    pricingEditRef.current = null;
    if (fileInput.current) fileInput.current.value = '';
    if (hoverFileInput.current) hoverFileInput.current.value = '';
  }

  const pricingEditRef = useRef(null);

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

  function handleMrpChange(value) {
    handlePricingFieldChange('mrp', value);
  }

  function handleDiscountChange(value) {
    handlePricingFieldChange('discountPercent', value);
  }

  function handlePriceChange(value) {
    handlePricingFieldChange('price', value);
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
          price: f.price || '',
          mrp: f.mrp || '',
          weightGrams: f.weightGrams || 500,
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

  function removeVariant(index) {
    setForm((f) => ({
      ...f,
      variants: (f.variants || []).filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.category) return;
    setError('');

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
      image: form.image || 'https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=800&q=80',
      hoverImage: form.hoverImage || '',
      images: form.images || [],
      active: form.active !== false,
      variants: form.variants || [],
    };

    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        await api.createProduct(payload);
      }
      resetForm();
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEdit(product) {
    pricingEditRef.current = null;
    setForm({
      name: product.name,
      category: product.category,
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
      active: product.active,
      variants: product.variants || [],
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const { product: full } = await api.getProduct(product.id);
      setForm((f) => ({
        ...f,
        hoverImage: full.hoverImage || full.hover_image || f.hoverImage,
        images: full.images || f.images,
        variants: full.variants || f.variants,
      }));
    } catch {
      /* list data already populated form */
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Remove this product?')) return;
    try {
      await api.deleteProduct(id);
      if (editingId === id) resetForm();
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  // Quick recategorize straight from the list, for when a product was
  // uploaded under the wrong category — no need to open the full edit
  // form just to fix that one field.
  async function handleMoveCategory(product, newCategoryId) {
    if (!newCategoryId || newCategoryId === product.category) return;
    setMovingId(product.id);
    try {
      await api.updateProduct(product.id, { category: newCategoryId });
      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setMovingId(null);
    }
  }

  // Hide/show — an alternative to deleting when a product just shouldn't
  // be on the live site right now (out of season, temporarily unavailable,
  // etc). Hidden products disappear from the storefront (listing, search,
  // category pages, and direct links) but stay fully visible and editable
  // here, and keep their order/review history intact.
  async function handleToggleActive(product) {
    setMovingId(product.id);
    try {
      await api.updateProduct(product.id, { active: !product.active });
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

  const stockNum = form.stock === '' ? null : Number(form.stock) || 0;
  const productsInCategory = form.category
    ? products.filter((p) => p.category === form.category && p.id !== editingId)
    : [];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filterCategory !== 'all' && p.category !== filterCategory) return false;
      if (filterStatus === 'active' && p.active === false) return false;
      if (filterStatus === 'hidden' && p.active !== false) return false;
      if (filterStatus === 'low' && (p.stock === 0 || p.stock > 5)) return false;
      if (filterStatus === 'out' && p.stock > 0) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        const cat = categoryName(p.category)?.toLowerCase();
        const matchesCat = cat?.includes(q);
        if (!matchesName && !matchesSku && !matchesCat) return false;
      }
      return true;
    });
  }, [products, filterCategory, filterStatus, searchQuery, categories]);

  const statusCounts = useMemo(() => {
    return {
      all: products.length,
      active: products.filter((p) => p.active !== false).length,
      hidden: products.filter((p) => p.active === false).length,
      low: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
      out: products.filter((p) => p.stock === 0).length,
    };
  }, [products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <div>
      <div className="admin-page-head">
        <h1>Products</h1>
        <p>Add sarees to a category, set price, MRP and stock. Set stock to 0 to intentionally mark a product out of stock.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {/* --- Products Page Curved Hero Banner CMS Card --- */}
      <div className="section-card" style={{
        background: 'var(--paper)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        marginBottom: '28px',
        border: '1px solid rgba(197, 139, 56, 0.22)',
        boxShadow: '0 8px 24px rgba(44, 24, 16, 0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--brand-primary)' }}>
              Products Page Hero Banner
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--ink-600)' }}>
              Customize the curved editorial hero banner displayed at the top of the All Sarees / Products catalog page.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px 24px' }}>
          <label className="field-label" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand-primary)' }}>
            Badge Text
            <input
              type="text"
              value={heroDraft.badge || ''}
              placeholder="e.g. HERITAGE HANDLOOMS"
              style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--brand-border)', fontFamily: 'var(--font-body)', fontSize: 14 }}
              onChange={(e) => setHeroDraft((h) => ({ ...h, badge: e.target.value }))}
            />
          </label>

          <label className="field-label" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand-primary)' }}>
            Header Title
            <input
              type="text"
              value={heroDraft.title || ''}
              placeholder="e.g. Our Collection"
              style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--brand-border)', fontFamily: 'var(--font-body)', fontSize: 14 }}
              onChange={(e) => setHeroDraft((h) => ({ ...h, title: e.target.value }))}
            />
          </label>
        </div>

        <label className="field-label" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand-primary)', marginTop: 14 }}>
          Subtitle Description
          <textarea
            rows={2}
            value={heroDraft.description || ''}
            placeholder="Rooted in Andhra Pradesh's weaving heritage, our sarees are crafted slowly, thoughtfully..."
            style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--brand-border)', fontFamily: 'var(--font-body)', fontSize: 14, resize: 'vertical' }}
            onChange={(e) => setHeroDraft((h) => ({ ...h, description: e.target.value }))}
          />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 14, alignItems: 'center' }}>
          <label className="field-label" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand-primary)' }}>
            Banner Image
            <input type="file" accept="image/*" ref={heroFileInput} onChange={handleHeroImageUpload} />
            <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--ink-600)' }}>
              Upload any photo (master artisans, silk models) — auto-compressed and scaled into the curved banner.
            </span>
          </label>

          {(heroDraft.image || '/images/collection-hero-artisan.jpg') && (
            <div style={{ position: 'relative', width: '100%', maxWidth: 280, height: 110, borderRadius: '8px 45px 45px 8px', overflow: 'hidden', border: '1px solid rgba(197, 139, 56, 0.3)' }}>
              <img
                src={heroDraft.image || '/images/collection-hero-artisan.jpg'}
                alt="Products Hero Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: 4, left: 6, fontSize: 10, background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>
                Curved Header Preview
              </span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--brand-border)' }}>
          <button type="button" className="btn btn-primary" onClick={handleSaveHeroBanner}>
            Save Hero Banner
          </button>
          {heroSaved && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#2e7d32', fontWeight: 600, fontSize: 13 }}>
              <CheckIcon width={14} height={14} /> Banner Saved
            </span>
          )}
        </div>
      </div>

      <div className="cms-layout">
        <form className="cms-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit product' : 'Add a product'}</h3>

          <div className="form-section">
            <p className="section-label">Basic details</p>
            <label>
              Product name
              <input
                type="text"
                value={form.name}
                placeholder="e.g. Purple Kanjivaram with Gold Zari"
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </label>

            <div className="category-picker">
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  required
                >
                  <option value="" disabled>Choose a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>

              {form.category && (
                <div className="category-preview">
                  <p className="category-preview-title">
                    Already in {categoryName(form.category)} ({productsInCategory.length})
                  </p>
                  {productsInCategory.length === 0 ? (
                    <p className="category-preview-empty">Nothing here yet — this'll be the first.</p>
                  ) : (
                    <div className="category-preview-list">
                      {productsInCategory.map((p) => (
                        <div className="category-preview-item" key={p.id}>
                          <img src={p.image} alt="" />
                          <span>{p.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="form-row">
              <label>
                SKU
                <input
                  type="text"
                  value={form.sku}
                  placeholder="e.g. SK-KANJI-001"
                  onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                />
              </label>
              <label>
                Short description
                <input
                  type="text"
                  value={form.shortDescription}
                  placeholder="One-line summary for cards"
                  onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                />
              </label>
            </div>

            <label>
              Full Description
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Weave, colour, occasion, blouse details, care instructions..."
              />
            </label>
          </div>

          <div className="form-section">
            <p className="section-label">Pricing &amp; inventory</p>
            <p className="field-hint pricing-hint">Fill in any two of MRP, Discount %, and Price — the third fills itself in.</p>
            <div className="form-row">
              <label>
                MRP (₹)
                <input type="number" min="0" value={form.mrp} placeholder="Original price" onChange={(e) => handleMrpChange(e.target.value)} />
              </label>
              <label>
                Discount %
                <input type="number" min="0" max="99" value={form.discountPercent} placeholder="e.g. 20" onChange={(e) => handleDiscountChange(e.target.value)} />
              </label>
            </div>

            <div className="form-row">
              <label>
                Price (₹) <span className="required-mark">*</span>
                <input type="number" min="0" value={form.price} onChange={(e) => handlePriceChange(e.target.value)} required />
              </label>
              <label>
                Total Stock <span className="required-mark">*</span>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  placeholder="e.g. 25"
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  required
                />
              </label>
            </div>
            {stockNum === 0 && (
              <p className="stock-warning">
                Stock is set to 0 — this product will show as <strong>Out of Stock</strong> on the site the moment you save it.
              </p>
            )}
          </div>

          <div className="form-section">
            <p className="section-label">Shipping &amp; dimensions</p>
            <p className="field-hint">Used by Shiprocket to determine courier availability and dynamic shipping rates.</p>
            <div className="form-row">
              <label>
                Weight (grams) *
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={form.weightGrams}
                  placeholder="e.g. 600"
                  onChange={(e) => setForm((f) => ({ ...f, weightGrams: e.target.value }))}
                  required
                />
              </label>
              <label>
                Length (cm)
                <input
                  type="number"
                  min="1"
                  value={form.lengthCm}
                  placeholder="e.g. 30"
                  onChange={(e) => setForm((f) => ({ ...f, lengthCm: e.target.value }))}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Width (cm)
                <input
                  type="number"
                  min="1"
                  value={form.widthCm}
                  placeholder="e.g. 20"
                  onChange={(e) => setForm((f) => ({ ...f, widthCm: e.target.value }))}
                />
              </label>
              <label>
                Height (cm)
                <input
                  type="number"
                  min="1"
                  value={form.heightCm}
                  placeholder="e.g. 5"
                  onChange={(e) => setForm((f) => ({ ...f, heightCm: e.target.value }))}
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <p className="section-label">Return &amp; cancellation policies</p>
            <div className="policy-checkboxes">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={Boolean(form.returnAvailable)}
                  onChange={(e) => setForm((f) => ({ ...f, returnAvailable: e.target.checked }))}
                />
                <span>Return Available for this product</span>
              </label>

              {form.returnAvailable && (
                <label className="return-window-select">
                  Return Window
                  <select
                    value={form.returnWindowHours}
                    onChange={(e) => setForm((f) => ({ ...f, returnWindowHours: Number(e.target.value) }))}
                  >
                    <option value={8}>8 hours after delivery</option>
                    <option value={24}>24 hours after delivery (standard)</option>
                    <option value={48}>48 hours after delivery</option>
                    <option value={72}>72 hours after delivery</option>
                    <option value={168}>7 days after delivery</option>
                  </select>
                </label>
              )}

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={Boolean(form.cancellationAvailable)}
                  onChange={(e) => setForm((f) => ({ ...f, cancellationAvailable: e.target.checked }))}
                />
                <span>Cancellation Allowed before dispatch</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <div className="section-head-row">
              <div>
                <p className="section-label">Product color variants</p>
                <p className="field-hint">Add selectable color options with their own inventory, SKU, and color swatch.</p>
              </div>
              <button type="button" className="btn btn-outline btn-sm add-variant-btn" onClick={addVariant}>
                + Add Color
              </button>
            </div>

            {(!form.variants || form.variants.length === 0) ? (
              <p className="empty-hint">No color variants added yet. Customers will buy this as a single product.</p>
            ) : (
              <div className="variants-list">
                {form.variants.map((v, i) => (
                  <div className="variant-item-card" key={i}>
                    <div className="variant-top-row">
                      <div className="color-swatch-picker">
                        <input
                          type="color"
                          value={v.colorCode || '#8B0000'}
                          onChange={(e) => updateVariantField(i, 'colorCode', e.target.value)}
                          title="Pick swatch color"
                        />
                        <span className="swatch-code">{v.colorCode || '#8B0000'}</span>
                      </div>
                      <input
                        type="text"
                        className="variant-name-input"
                        placeholder="Color Name (e.g. Royal Maroon)"
                        value={v.colorName || ''}
                        onChange={(e) => updateVariantField(i, 'colorName', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="variant-remove-btn"
                        onClick={() => removeVariant(i)}
                        title="Remove color"
                      >
                        <CloseIcon width={12} height={12} />
                      </button>
                    </div>
                    <div className="variant-fields-grid">
                      <label>
                        SKU
                        <input
                          type="text"
                          placeholder="e.g. SK-P1-RED"
                          value={v.sku || ''}
                          onChange={(e) => updateVariantField(i, 'sku', e.target.value)}
                        />
                      </label>
                      <label>
                        Stock
                        <input
                          type="number"
                          min="0"
                          value={v.stock ?? ''}
                          onChange={(e) => updateVariantField(i, 'stock', Number(e.target.value))}
                        />
                      </label>
                      <label>
                        Price (₹) <span className="opt-tag">optional</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="Inherit"
                          value={v.price ?? ''}
                          onChange={(e) => updateVariantField(i, 'price', e.target.value ? Number(e.target.value) : '')}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <p className="section-label">Photos &amp; Hover Preview</p>
            
            <div className="photo-inputs-grid">
              <div className="photo-input-card">
                <label>
                  <span className="photo-field-title">Main Saree Photo</span>
                  <span className="field-hint">Initial storefront photo (saree flat lay / folded).</span>
                  <input type="file" accept="image/*" ref={fileInput} onChange={handleImage} />
                </label>
                {form.image ? (
                  <div className="preview-thumb-card">
                    <img src={form.image} alt="Main Saree Preview" />
                    <span className="preview-chip chip-primary">Default Saree View</span>
                  </div>
                ) : (
                  <div className="preview-empty-slot">
                    <span>No main photo selected</span>
                  </div>
                )}
              </div>

              <div className="photo-input-card">
                <label>
                  <span className="photo-field-title">Hover Photo (Model Wearing Saree)</span>
                  <span className="field-hint">Revealed when shopper hovers over the product card.</span>
                  <input type="file" accept="image/*" ref={hoverFileInput} onChange={handleHoverImage} />
                </label>
                {form.hoverImage ? (
                  <div className="preview-thumb-card">
                    <img src={form.hoverImage} alt="Hover Model Preview" />
                    <span className="preview-chip chip-model">Hover / Wearing View</span>
                    <button
                      type="button"
                      className="photo-clear-btn"
                      onClick={removeHoverImage}
                      title="Remove hover model photo"
                    >
                      <CloseIcon width={12} height={12} /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="preview-empty-slot">
                    <span>Optional · Fallbacks to main photo on hover</span>
                  </div>
                )}
              </div>
            </div>

            <label style={{ marginTop: 10 }}>
              Gallery photos
              <span className="field-hint">Extra angles or close-ups shown as thumbnails on the product page. Any size works — they're cropped to fit.</span>
            </label>

            {form.images?.length > 0 && (
              <div className="gallery-grid">
                {form.images.map((src, i) => (
                  <div className="gallery-thumb" key={i}>
                    <img src={src} alt="" />
                    <button type="button" className="gallery-remove" onClick={() => removeGalleryImage(i)} aria-label="Remove image">
                      <CloseIcon width={12} height={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button type="button" className="btn btn-outline" disabled={galleryBusy} onClick={() => galleryInput.current?.click()}>
              {galleryBusy ? 'Uploading…' : '+ Add gallery photo'}
            </button>
            <input ref={galleryInput} type="file" accept="image/*" multiple hidden onChange={handleGalleryFiles} />
          </div>

          <div className="form-section">
            <p className="section-label">SEO &amp; discovery</p>
            <label>
              Tags (comma separated)
              <input
                type="text"
                placeholder="e.g. bridal, festive, gold zari, pure silk"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              />
            </label>
            <div className="form-row">
              <label>
                SEO Title
                <input
                  type="text"
                  placeholder="Custom title tag for search engines"
                  value={form.seoTitle}
                  onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
                />
              </label>
              <label>
                URL Slug
                <input
                  type="text"
                  placeholder="e.g. purple-kanjivaram-gold-zari"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                />
              </label>
            </div>
            <label>
              SEO Meta Description
              <textarea
                rows="2"
                placeholder="Brief summary for Google search results"
                value={form.seoDescription}
                onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))}
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>

        <div className="cms-list">
          {/* --- Product List Filter & Search Toolbar --- */}
          <div className="admin-product-toolbar">
            <div className="admin-toolbar-top">
              <div className="admin-search-wrapper">
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="🔍 Search sarees by title, SKU, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <select
                className="admin-cat-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="all">All Categories ({products.length})</option>
                {categories.map((c) => {
                  const count = products.filter((p) => p.category === c.id).length;
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="admin-status-pills">
              <button
                type="button"
                className={`status-pill ${filterStatus === 'all' ? 'is-active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All <span>{statusCounts.all}</span>
              </button>
              <button
                type="button"
                className={`status-pill ${filterStatus === 'active' ? 'is-active' : ''}`}
                onClick={() => setFilterStatus('active')}
              >
                Active <span>{statusCounts.active}</span>
              </button>
              <button
                type="button"
                className={`status-pill ${filterStatus === 'hidden' ? 'is-active' : ''}`}
                onClick={() => setFilterStatus('hidden')}
              >
                Hidden <span>{statusCounts.hidden}</span>
              </button>
              <button
                type="button"
                className={`status-pill status-pill-warn ${filterStatus === 'low' ? 'is-active' : ''}`}
                onClick={() => setFilterStatus('low')}
              >
                Low Stock <span>{statusCounts.low}</span>
              </button>
              <button
                type="button"
                className={`status-pill status-pill-danger ${filterStatus === 'out' ? 'is-active' : ''}`}
                onClick={() => setFilterStatus('out')}
              >
                Out of Stock <span>{statusCounts.out}</span>
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="admin-empty-state">
              <p className="empty">
                {products.length === 0
                  ? 'No products added yet. Use the form on the left to add your first saree.'
                  : 'No sarees match your current search or filter criteria.'}
              </p>
              {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ alignSelf: 'center', marginTop: 10 }}
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('all');
                    setFilterStatus('all');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          ) : (
            paginatedProducts.map((p) => {
              const hasDiscount = p.mrp > p.price;
              const discountPct = hasDiscount ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
              const hasHover = Boolean(p.hoverImage || p.hover_image);
              return (
                <div className={`cms-row ${p.active === false ? 'is-hidden' : ''}`} key={p.id}>
                  <div
                    className="admin-row-thumb-container"
                    title={hasHover ? "Hover to see model wearing saree" : "Main saree photo"}
                  >
                    <img src={p.image} alt="" className="row-thumb-sq" />
                    {hasHover && (
                      <img src={p.hoverImage || p.hover_image} alt="" className="row-thumb-sq row-thumb-hover" />
                    )}
                  </div>
                  <div className="row-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <strong>{p.name}</strong>
                      {hasHover && (
                        <span className="row-hover-badge" title="Model wearing photo configured for hover effect">
                          Model Hover
                        </span>
                      )}
                    </div>
                    <span className="row-category">{categoryName(p.category)}</span>
                    <span className="row-price-line">
                      <span className="row-price">{formatINR(p.price)}</span>
                      {hasDiscount && (
                        <>
                          <span className="row-mrp">{formatINR(p.mrp)}</span>
                          <span className="row-discount">{discountPct}% off</span>
                        </>
                      )}
                    </span>
                  </div>
                  {p.active === false && <span className="hidden-badge">Hidden</span>}
                  <span className={`stock-badge ${stockTone(p.stock)}`}>{stockLabel(p.stock)}</span>
                  <div className="row-actions">
                    <select
                      className="row-move-select"
                      value={p.category}
                      disabled={movingId === p.id}
                      onChange={(e) => handleMoveCategory(p, e.target.value)}
                      aria-label={`Move ${p.name} to a different category`}
                      title="Move to a different category"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleToggleActive(p)} disabled={movingId === p.id}>
                      {p.active === false ? 'Show' : 'Hide'}
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="danger">Delete</button>
                  </div>
                </div>
              );
            })
          )}

          {/* --- Pagination Controls --- */}
          {totalPages > 1 && (
            <div className="admin-pagination-bar">
              <span className="pagination-count-label">
                Showing <strong>{((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
              </span>
              <div className="pagination-nav-actions">
                <button
                  type="button"
                  className="page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((cp) => Math.max(1, cp - 1))}
                >
                  « Prev
                </button>
                <span className="page-indicator">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="page-nav-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((cp) => Math.min(totalPages, cp + 1))}
                >
                  Next »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 28px;
          align-items: flex-start;
        }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }

        .form-section { display: flex; flex-direction: column; gap: 14px; padding-top: 18px; border-top: 1px solid var(--stone-100); }
        .form-section:first-of-type { padding-top: 0; border-top: none; }
        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--maroon-700, var(--maroon-900));
          margin: 0;
        }

        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .required-mark { color: #a13a3a; }
        .cms-form input, .cms-form select, .cms-form textarea {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          background: var(--paper);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; }
        .pricing-hint { margin: -4px 0 12px; }

        .category-picker { display: flex; gap: 14px; align-items: flex-start; }
        .category-picker > label { flex: 1; min-width: 0; }
        .category-preview {
          flex: 0 0 170px;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px;
          max-height: 168px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .category-preview-title { font-size: 11px; font-weight: 600; color: var(--ink-600); margin: 0; }
        .category-preview-empty { font-size: 11.5px; color: var(--ink-400); margin: 0; line-height: 1.5; }
        .category-preview-list { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; }
        .category-preview-item { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--ink-600); }
        .category-preview-item img { width: 26px; height: 26px; border-radius: 6px; object-fit: cover; flex: 0 0 auto; }
        .category-preview-item span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .stock-warning {
          font-size: 11.5px;
          color: #8a5a10;
          background: #fbeacb;
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          line-height: 1.6;
          margin: 0;
        }

        .policy-checkboxes { display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-700); cursor: pointer; }
        .checkbox-row input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--maroon-900); }
        .return-window-select { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--ink-600); margin-left: 24px; }
        .return-window-select select { font-size: 12.5px; padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }

        .section-head-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .add-variant-btn { padding: 4px 12px; font-size: 12px; }
        .variants-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
        .variant-item-card {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .variant-top-row { display: flex; align-items: center; gap: 10px; }
        .color-swatch-picker {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 3px 8px;
        }
        .color-swatch-picker input[type="color"] {
          width: 24px;
          height: 24px;
          border: none;
          padding: 0;
          background: none;
          cursor: pointer;
        }
        .swatch-code { font-size: 11px; font-family: monospace; color: var(--ink-600); }
        .variant-name-input { flex: 1; font-size: 13px; padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }
        .variant-remove-btn {
          background: none;
          border: none;
          color: #a13a3a;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .variant-remove-btn:hover { background: #f6e3e3; }
        .variant-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        .variant-fields-grid label { font-size: 11.5px; display: flex; flex-direction: column; gap: 4px; color: var(--ink-600); }
        .variant-fields-grid input { font-size: 12.5px; padding: 6px 8px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }
        .opt-tag { font-size: 10px; color: var(--ink-400); font-weight: normal; }

        .photo-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .photo-input-card {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .photo-field-title {
          font-weight: 600;
          color: var(--ink-800);
          font-size: 12.5px;
          display: block;
        }
        .preview-thumb-card {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #fbf7f2;
          border: 1px solid var(--stone-200);
        }
        .preview-thumb-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .preview-chip {
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .chip-primary {
          background: rgba(32, 8, 11, 0.78);
          color: #ffffff;
        }
        .chip-model {
          background: rgba(88, 30, 21, 0.88);
          color: #fbdba2;
          border: 1px solid rgba(251, 219, 162, 0.35);
        }
        .photo-clear-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          font-size: 11px;
          padding: 3px 7px;
          color: #a13a3a;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: background 0.2s ease;
        }
        .photo-clear-btn:hover {
          background: #f6e3e3;
        }
        .preview-empty-slot {
          height: 70px;
          border: 1px dashed var(--stone-300);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px;
          font-size: 11px;
          color: var(--ink-400);
          background: rgba(255, 255, 255, 0.6);
        }

        .preview-thumb { width: 72px; height: 72px; border-radius: var(--radius-sm); overflow: hidden; }
        .preview-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .gallery-thumb {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--stone-200);
          background: var(--stone-100);
        }
        .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-remove {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          font-size: 11px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .gallery-remove:hover {
          background: #a13a3a;
        }
        .form-actions { display: flex; gap: 10px; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }
        /* Admin Product Filter & Search Toolbar */
        .admin-product-toolbar {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid var(--stone-200);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          margin-bottom: 6px;
        }
        .admin-toolbar-top {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .admin-search-wrapper {
          position: relative;
          flex: 1;
        }
        .admin-search-input {
          width: 100%;
          padding: 9px 32px 9px 12px;
          border: 1px solid var(--stone-300);
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-family: var(--font-body);
          background: #fff;
          box-sizing: border-box;
        }
        .admin-search-input:focus {
          outline: none;
          border-color: var(--maroon-700, #581e15);
        }
        .clear-search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 16px;
          color: var(--ink-400);
          cursor: pointer;
          padding: 2px 6px;
        }
        .admin-cat-filter {
          min-width: 170px;
          padding: 9px 12px;
          border: 1px solid var(--stone-300);
          border-radius: var(--radius-sm);
          font-size: 13px;
          background: #fff;
          font-family: var(--font-body);
          cursor: pointer;
        }
        .admin-status-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .status-pill {
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 12px;
          color: var(--ink-600);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .status-pill span {
          background: rgba(0, 0, 0, 0.06);
          padding: 1px 6px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }
        .status-pill:hover {
          background: var(--stone-200);
        }
        .status-pill.is-active {
          background: var(--maroon-900, #42120b);
          color: #fff;
          border-color: var(--maroon-900, #42120b);
        }
        .status-pill.is-active span {
          background: rgba(255, 255, 255, 0.25);
          color: #fff;
        }
        .status-pill-warn.is-active {
          background: #8a5a10;
          border-color: #8a5a10;
        }
        .status-pill-danger.is-active {
          background: #a13a3a;
          border-color: #a13a3a;
        }
        .admin-empty-state {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 32px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        /* Pagination Bar */
        .admin-pagination-bar {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid var(--stone-200);
          margin-top: 6px;
        }
        .pagination-count-label {
          font-size: 12.5px;
          color: var(--ink-600);
        }
        .pagination-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .page-nav-btn {
          background: var(--stone-100);
          border: 1px solid var(--stone-300);
          border-radius: var(--radius-sm);
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-700);
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .page-nav-btn:hover:not(:disabled) {
          background: var(--stone-200);
        }
        .page-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-indicator {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-700);
        }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .admin-row-thumb-container {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex: 0 0 52px;
          background: var(--stone-100);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
          cursor: pointer;
        }
        .admin-row-thumb-container .row-thumb-sq {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
          display: block;
        }
        .admin-row-thumb-container .row-thumb-hover {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .admin-row-thumb-container:hover .row-thumb-hover {
          opacity: 1;
        }
        .row-hover-badge {
          font-size: 9.5px;
          font-weight: 600;
          color: #581e15;
          background: #fdf2ea;
          border: 1px solid rgba(88, 30, 21, 0.22);
          padding: 1px 5px;
          border-radius: 4px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .row-thumb-sq { width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover; flex: 0 0 auto; }
        .row-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .row-info strong { font-size: 13.5px; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .row-category { font-size: 11.5px; color: var(--ink-400); }
        .row-price-line { display: flex; align-items: baseline; gap: 8px; }
        .row-price { font-size: 13px; font-weight: 600; color: var(--maroon-900); }
        .row-mrp { font-size: 11.5px; color: var(--ink-400); text-decoration: line-through; }
        .row-discount { font-size: 11px; color: #3c7a3c; font-weight: 600; }

        .stock-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 999px;
          white-space: nowrap;
          flex: 0 0 auto;
        }
        .stock-ok { background: #e8f2e6; color: #3c7a3c; }
        .stock-low { background: #fbeacb; color: #8a5a10; }
        .stock-out { background: #f6e3e3; color: #a13a3a; }

        .row-actions { display: flex; align-items: center; gap: 10px; flex: 0 0 auto; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }
        .cms-row.is-hidden { opacity: 0.55; }
        .hidden-badge {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-400);
          background: var(--stone-100);
          border-radius: 999px;
          padding: 3px 9px;
          flex: 0 0 auto;
        }
        .row-move-select {
          font-size: 11.5px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          background: var(--paper);
          color: var(--ink-600);
          max-width: 130px;
        }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 980px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 680px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; gap: 18px; }
          .form-row { grid-template-columns: 1fr; }
          .category-picker { flex-direction: column; }
          .category-preview { flex-basis: auto; width: 100%; max-height: 140px; box-sizing: border-box; }
          
          .variant-top-row { gap: 8px; }
          .color-swatch-picker { padding: 2px 6px; }
          .variant-fields-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .variant-fields-grid label:last-child {
            grid-column: span 2;
          }

          .form-actions {
            flex-direction: column;
            gap: 8px;
          }
          .form-actions .btn {
            width: 100%;
            text-align: center;
            justify-content: center;
          }

          .cms-row {
            display: grid;
            grid-template-columns: 52px 1fr auto;
            grid-template-areas:
              "thumb info badge"
              "actions actions actions";
            gap: 10px 12px;
            align-items: center;
            padding: 14px;
            box-sizing: border-box;
          }
          .photo-inputs-grid { grid-template-columns: 1fr; }
          .admin-row-thumb-container,
          .row-thumb-sq {
            grid-area: thumb;
          }
          .row-info {
            grid-area: info;
            min-width: 0;
          }
          .stock-badge {
            grid-area: badge;
            align-self: flex-start;
          }
          .hidden-badge {
            margin-right: 4px;
          }
          .row-actions {
            grid-area: actions;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            padding-top: 10px;
            border-top: 1px solid var(--stone-100);
            width: 100%;
            box-sizing: border-box;
          }
          .row-move-select {
            flex: 1;
            max-width: none;
            font-size: 12px;
            padding: 6px 8px;
          }
          .row-actions button {
            padding: 7px 11px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
          }
          .row-actions .danger {
            background: #fdf2f2;
          }
        }

        @media (max-width: 440px) {
          .variant-fields-grid {
            grid-template-columns: 1fr;
          }
          .variant-fields-grid label:last-child {
            grid-column: span 1;
          }
          .cms-row {
            grid-template-columns: 46px 1fr;
            grid-template-areas:
              "thumb info"
              "badge badge"
              "actions actions";
          }
          .stock-badge {
            justify-self: flex-start;
          }
          .row-actions {
            flex-wrap: wrap;
          }
          .row-move-select {
            width: 100%;
            margin-bottom: 4px;
          }
          .row-actions button {
            flex: 1;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
