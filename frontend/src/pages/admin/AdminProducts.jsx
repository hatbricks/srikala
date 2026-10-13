import { useEffect, useRef, useState } from 'react';
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

  const [variantImgBusy, setVariantImgBusy] = useState(null);
  const [variantHoverBusy, setVariantHoverBusy] = useState(null);

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

  function normalizeVariantsForForm(variants = []) {
    return variants.map((v) => ({
      ...v,
      colorName: v.colorName ?? v.color_name ?? '',
      colorCode: v.colorCode ?? v.color_code ?? '#8B0000',
      sku: v.sku ?? '',
      stock: v.stock ?? 0,
      price: v.price ?? '',
      mrp: v.mrp ?? '',
      weightGrams: v.weightGrams ?? v.weight_grams ?? 500,
      images: Array.isArray(v.images) ? v.images : [],
      hoverImage: v.hoverImage ?? v.hover_image ?? '',
      active: v.active !== false,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.category) return;
    setError('');

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
      variants: (form.variants || []).map((v) => ({
        ...v,
        colorName: v.colorName ?? v.color_name ?? '',
        colorCode: v.colorCode ?? v.color_code ?? '#8B0000',
        images: Array.isArray(v.images) ? v.images : [],
        hoverImage: v.hoverImage ?? v.hover_image ?? '',
      })),
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
      variants: normalizeVariantsForForm(product.variants || []),
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const { product: full } = await api.getProduct(product.id);
      setForm((f) => ({
        ...f,
        hoverImage: full.hoverImage || full.hover_image || f.hoverImage,
        images: full.images || f.images,
        variants: full.variants ? normalizeVariantsForForm(full.variants) : f.variants,
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
                <p className="field-hint">Add selectable color options with their own inventory, SKU, color swatch, and color-specific saree photos.</p>
              </div>
              <button type="button" className="btn btn-outline btn-sm add-variant-btn" onClick={addVariant}>
                + Add Color
              </button>
            </div>

            {(!form.variants || form.variants.length === 0) ? (
              <p className="empty-hint">No color variants added yet. Customers will buy this as a single product.</p>
            ) : (
              <div className="variants-list">
                {form.variants.map((v, i) => {
                  const vImgs = Array.isArray(v.images) ? v.images : [];
                  return (
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
                          placeholder="Color Name (e.g. Royal Red)"
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

                      <div className="variant-photos-box">
                        <div className="variant-photos-head">
                          <span className="variant-photos-label">
                            <span
                              className="variant-dot-inline"
                              style={{ backgroundColor: v.colorCode || '#8B0000' }}
                            />
                            Photos for {v.colorName || `Color #${i + 1}`}
                          </span>
                        </div>

                        <div className="variant-dual-photos">
                          {/* Slot 1: Main Saree Photo for this color */}
                          <div className="variant-photo-slot">
                            <div className="variant-slot-top">
                              <span className="variant-slot-title">Main Saree Photo</span>
                              <label className="variant-upload-btn">
                                {variantImgBusy === i ? 'Uploading…' : vImgs[0] ? 'Change' : '+ Upload'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  disabled={variantImgBusy === i}
                                  onChange={(e) => handleVariantMainImage(i, e)}
                                />
                              </label>
                            </div>
                            {vImgs[0] ? (
                              <div className="variant-slot-preview">
                                <img src={vImgs[0]} alt={`${v.colorName || 'Color'} Main`} />
                                <span className="variant-slot-badge badge-main">Main View</span>
                                <button
                                  type="button"
                                  className="variant-thumb-remove"
                                  onClick={() => removeVariantImage(i, 0)}
                                  title="Remove main photo"
                                >
                                  <CloseIcon width={10} height={10} />
                                </button>
                              </div>
                            ) : (
                              <div className="variant-slot-empty">
                                No main photo yet
                              </div>
                            )}
                          </div>

                          {/* Slot 2: Separate Hover Photo (Model Wearing) for this color */}
                          <div className="variant-photo-slot">
                            <div className="variant-slot-top">
                              <span className="variant-slot-title">Hover Photo (Model)</span>
                              <label className="variant-upload-btn">
                                {variantHoverBusy === i ? 'Uploading…' : (v.hoverImage || v.hover_image) ? 'Change' : '+ Upload'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  disabled={variantHoverBusy === i}
                                  onChange={(e) => handleVariantHoverImage(i, e)}
                                />
                              </label>
                            </div>
                            {(v.hoverImage || v.hover_image) ? (
                              <div className="variant-slot-preview">
                                <img src={v.hoverImage || v.hover_image} alt={`${v.colorName || 'Color'} Hover`} />
                                <span className="variant-slot-badge badge-hover">Hover / Model</span>
                                <button
                                  type="button"
                                  className="variant-thumb-remove"
                                  onClick={() => removeVariantHoverImage(i)}
                                  title="Remove hover photo"
                                >
                                  <CloseIcon width={10} height={10} />
                                </button>
                              </div>
                            ) : (
                              <div className="variant-slot-empty">
                                Optional hover model photo
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Optional extra gallery angles for this specific color */}
                        <div className="variant-extra-gallery">
                          <div className="variant-photos-head">
                            <span className="field-hint" style={{ fontSize: 11 }}>
                              Extra gallery angles for {v.colorName || `Color #${i + 1}`} (optional)
                            </span>
                            <label className="variant-upload-btn">
                              {variantImgBusy === i ? 'Uploading…' : '+ Extra Photos'}
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                disabled={variantImgBusy === i}
                                onChange={(e) => handleVariantImages(i, e)}
                              />
                            </label>
                          </div>

                          {vImgs.length > 1 && (
                            <div className="variant-thumbs-row">
                              {vImgs.slice(1).map((src, extraIdx) => {
                                const actualIdx = extraIdx + 1;
                                return (
                                  <div
                                    key={actualIdx}
                                    className="variant-thumb-item"
                                    title="Click to make main photo for this color"
                                    onClick={() => setVariantPrimaryImage(i, actualIdx)}
                                  >
                                    <img src={src} alt={`${v.colorName || 'Variant'} extra ${actualIdx}`} />
                                    <button
                                      type="button"
                                      className="variant-thumb-remove"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeVariantImage(i, actualIdx);
                                      }}
                                      aria-label="Remove color photo"
                                    >
                                      <CloseIcon width={10} height={10} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="form-section">
            <p className="section-label">
              {form.variants?.length > 0 ? 'Default Fallback Photo & Shared Gallery' : 'Photos & Hover Preview'}
            </p>
            {form.variants?.length > 0 ? (
              <>
                <p className="field-hint" style={{ marginTop: -6 }}>
                  Each color variant above has its own <strong>Main Saree Photo</strong> and <strong>Hover Photo (Model Wearing)</strong>. The first color&apos;s photos are used automatically as the default product card preview unless you override the fallback cover photo below.
                </p>
                <div className="photo-input-card">
                  <label>
                    <span className="photo-field-title">Fallback Cover Photo (Optional when using Color Variants)</span>
                    <span className="field-hint">Automatically uses your first color variant&apos;s Main Photo if left empty.</span>
                    <input type="file" accept="image/*" ref={fileInput} onChange={handleImage} />
                  </label>
                  {form.image ? (
                    <div className="preview-thumb-card">
                      <img src={form.image} alt="Main Saree Preview" />
                      <span className="preview-chip chip-primary">Default Saree View</span>
                    </div>
                  ) : (
                    <div className="preview-empty-slot">
                      <span>Uses 1st color variant&apos;s main photo automatically</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
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
            )}

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
          {products.length === 0 && <p className="empty">No products yet.</p>}
          {products.map((p) => {
            const hasDiscount = p.mrp > p.price;
            const discountPct = hasDiscount ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
            const hasHover = Boolean(p.hoverImage || p.hover_image);
            return (
              <div className={`cms-row ${p.active === false ? 'is-hidden' : ''}`} key={p.id}>
                {/* Main info section */}
                <div className="cms-row-main">
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
                    <div className="row-title-line">
                      <strong className="row-product-name">{p.name}</strong>
                      {hasHover && (
                        <span className="row-hover-badge" title="Model wearing photo configured for hover effect">
                          Model Hover
                        </span>
                      )}
                      {p.variants?.length > 0 && (
                        <span className="row-variants-badge" title={p.variants.map((v) => v.colorName || v.color_name).join(', ')}>
                          {p.variants.slice(0, 4).map((v, idx) => (
                            <span
                              key={idx}
                              className="row-variant-dot"
                              style={{ backgroundColor: v.colorCode || v.color_code || '#8B0000' }}
                            />
                          ))}
                          {p.variants.length} {p.variants.length === 1 ? 'Color' : 'Colors'}
                        </span>
                      )}
                    </div>

                    <div className="row-meta-line">
                      <span className="row-category">{categoryName(p.category)}</span>
                      <span className="row-meta-sep">•</span>
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
                  </div>

                  <div className="row-status-badges">
                    {p.active === false && <span className="hidden-badge">Hidden</span>}
                    <span className={`stock-badge ${stockTone(p.stock)}`}>{stockLabel(p.stock)}</span>
                  </div>
                </div>

                {/* Bottom actions bar */}
                <div className="row-actions-bar">
                  <div className="row-move-wrap">
                    <span className="row-move-label">Category:</span>
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
                  </div>

                  <div className="row-action-btns">
                    <button type="button" className="btn-row-action edit-btn" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-row-action toggle-btn"
                      onClick={() => handleToggleActive(p)}
                      disabled={movingId === p.id}
                    >
                      {p.active === false ? 'Show' : 'Hide'}
                    </button>
                    <button
                      type="button"
                      className="btn-row-action delete-btn"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout {
          display: grid;
          grid-template-columns: minmax(420px, 490px) minmax(0, 1fr);
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
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }

        .form-section { display: flex; flex-direction: column; gap: 14px; padding-top: 18px; border-top: 1px solid var(--stone-100); min-width: 0; }
        .form-section:first-of-type { padding-top: 0; border-top: none; }
        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--maroon-700, var(--maroon-900));
          margin: 0;
        }

        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); min-width: 0; }
        .required-mark { color: #a13a3a; }
        .cms-form input:not([type="checkbox"]):not([type="color"]),
        .cms-form select,
        .cms-form textarea {
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          background: var(--paper);
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        .form-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; min-width: 0; }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.5; }
        .pricing-hint { margin: -4px 0 12px; }

        .category-picker { display: flex; gap: 14px; align-items: flex-start; min-width: 0; }
        .category-picker > label { flex: 1; min-width: 0; }
        .category-preview {
          flex: 0 0 165px;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px;
          max-height: 168px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
          box-sizing: border-box;
        }
        .category-preview-title { font-size: 11px; font-weight: 600; color: var(--ink-600); margin: 0; }
        .category-preview-empty { font-size: 11.5px; color: var(--ink-400); margin: 0; line-height: 1.5; }
        .category-preview-list { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; }
        .category-preview-item { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--ink-600); min-width: 0; }
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
        .checkbox-row { display: flex; flex-direction: row !important; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-700); cursor: pointer; }
        .checkbox-row input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--maroon-900); flex: 0 0 auto; }
        .return-window-select { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--ink-600); margin-left: 24px; }
        .return-window-select select { font-size: 12.5px; padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }

        .section-head-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 4px; }
        .add-variant-btn { padding: 5px 12px; font-size: 12px; white-space: nowrap; flex-shrink: 0; }
        .empty-hint { font-size: 12px; color: var(--ink-400); margin: 0; }
        .variants-list { display: flex; flex-direction: column; gap: 12px; margin-top: 4px; min-width: 0; }
        .variant-item-card {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
          box-sizing: border-box;
        }
        .variant-top-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .color-swatch-picker {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 3px 8px;
          flex-shrink: 0;
        }
        .color-swatch-picker input[type="color"] {
          width: 22px;
          height: 22px;
          border: none;
          padding: 0;
          background: none;
          cursor: pointer;
          flex-shrink: 0;
        }
        .swatch-code { font-size: 11px; font-family: monospace; color: var(--ink-600); }
        .variant-name-input {
          flex: 1;
          min-width: 0 !important;
          font-size: 13px !important;
          padding: 7px 10px !important;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .variant-remove-btn {
          background: none;
          border: none;
          color: #a13a3a;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 4px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .variant-remove-btn:hover { background: #f6e3e3; }
        .variant-fields-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          min-width: 0;
        }
        .variant-fields-grid label {
          font-size: 11px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--ink-600);
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .variant-fields-grid input {
          font-size: 12.5px !important;
          padding: 6px 8px !important;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .opt-tag { font-size: 9.5px; color: var(--ink-400); font-weight: normal; }

        .variant-photos-box {
          background: #ffffff;
          border: 1px dashed var(--stone-300);
          border-radius: var(--radius-sm);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }
        .variant-photos-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .variant-photos-label {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink-800);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .variant-dot-inline {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }
        .variant-dual-photos {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 8px;
          min-width: 0;
        }
        .variant-photo-slot {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: 6px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .variant-slot-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }
        .variant-slot-title {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink-700);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .variant-slot-preview {
          position: relative;
          width: 100%;
          height: 100px;
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid var(--stone-200);
          background: #fbf7f2;
        }
        .variant-slot-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .variant-slot-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 2px 5px;
          border-radius: 3px;
        }
        .badge-main {
          background: rgba(32, 8, 11, 0.8);
          color: #ffffff;
        }
        .badge-hover {
          background: rgba(88, 30, 21, 0.9);
          color: #fbdba2;
          border: 1px solid rgba(251, 219, 162, 0.35);
        }
        .variant-slot-empty {
          height: 60px;
          border: 1px dashed var(--stone-300);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 10px;
          color: var(--ink-400);
          padding: 6px;
          background: rgba(255, 255, 255, 0.65);
        }
        .variant-extra-gallery {
          padding-top: 6px;
          border-top: 1px solid var(--stone-100);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .variant-upload-btn {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center;
          gap: 4px;
          font-size: 10.5px !important;
          font-weight: 600;
          color: var(--maroon-900) !important;
          background: #fdf6f5;
          border: 1px solid rgba(88, 30, 21, 0.25);
          padding: 3px 8px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .variant-upload-btn:hover {
          background: var(--maroon-900);
          color: #ffffff !important;
        }
        .variant-thumbs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .variant-thumb-item {
          position: relative;
          width: 52px;
          height: 64px;
          border-radius: 6px;
          overflow: hidden;
          border: 1.5px solid var(--stone-200);
          background: var(--stone-100);
          cursor: pointer;
          flex-shrink: 0;
        }
        .variant-thumb-item.is-primary {
          border-color: var(--maroon-900);
          box-shadow: 0 0 0 1px var(--maroon-900);
        }
        .variant-thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .variant-primary-tag {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(88, 30, 21, 0.88);
          color: #ffffff;
          font-size: 8.5px;
          font-weight: 600;
          text-transform: uppercase;
          text-align: center;
          padding: 1.5px 0;
          letter-spacing: 0.04em;
        }
        .variant-thumb-remove {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }
        .variant-thumb-remove:hover {
          background: #a13a3a;
        }
        .variant-photos-empty {
          font-size: 11px;
          color: var(--ink-400);
          margin: 0;
          line-height: 1.45;
        }

        .photo-inputs-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 10px;
          min-width: 0;
        }
        .photo-input-card {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
          box-sizing: border-box;
          overflow: hidden;
        }
        .photo-input-card input[type="file"] {
          font-size: 11px !important;
          padding: 6px 8px !important;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .photo-field-title {
          font-weight: 600;
          color: var(--ink-800);
          font-size: 12px;
          display: block;
          line-height: 1.3;
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
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 3px 7px;
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

        .cms-list { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
          border: 1px solid var(--stone-200);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .cms-row:hover {
          border-color: var(--stone-300);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
        }

        .cms-row-main {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          min-width: 0;
          width: 100%;
        }

        .admin-row-thumb-container {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex: 0 0 56px;
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

        .row-info {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .row-title-line {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .row-product-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink-900);
          word-break: break-word;
          line-height: 1.35;
        }

        .row-hover-badge {
          font-size: 9.5px;
          font-weight: 600;
          color: #581e15;
          background: #fdf2ea;
          border: 1px solid rgba(88, 30, 21, 0.22);
          padding: 1px 6px;
          border-radius: 4px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .row-variants-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink-700);
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          padding: 1px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .row-variant-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          display: inline-block;
          flex-shrink: 0;
        }

        .row-meta-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          flex-wrap: wrap;
        }
        .row-category {
          color: var(--ink-500);
          font-weight: 500;
        }
        .row-meta-sep {
          color: var(--stone-400);
          font-size: 10px;
        }
        .row-price-line {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
        }
        .row-price {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--maroon-900);
        }
        .row-mrp {
          font-size: 11.5px;
          color: var(--ink-400);
          text-decoration: line-through;
        }
        .row-discount {
          font-size: 10.5px;
          color: #2e7d32;
          font-weight: 600;
          background: #e8f5e9;
          padding: 1px 5px;
          border-radius: 4px;
        }

        .row-status-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          flex: 0 0 auto;
          margin-left: auto;
        }
        .stock-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          white-space: nowrap;
          display: inline-block;
        }
        .stock-ok { background: #e8f2e6; color: #2e7d32; }
        .stock-low { background: #fef3d6; color: #8a5a10; }
        .stock-out { background: #fee2e2; color: #b91c1c; }

        .hidden-badge {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-500);
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          border-radius: 999px;
          padding: 2px 7px;
          white-space: nowrap;
        }

        /* Actions row */
        .row-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 10px;
          border-top: 1px solid var(--stone-100);
          width: 100%;
          box-sizing: border-box;
          flex-wrap: wrap;
        }

        .row-move-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .row-move-label {
          font-size: 11px;
          color: var(--ink-400);
          font-weight: 500;
        }
        .row-move-select {
          font-size: 11.5px;
          padding: 5px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          background: var(--paper);
          color: var(--ink-700);
          max-width: 160px;
          cursor: pointer;
        }
        .row-move-select:hover {
          border-color: var(--stone-400);
        }

        .row-action-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-row-action {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          color: var(--maroon-900);
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-row-action:hover {
          background: var(--stone-100);
          color: var(--ink-900);
        }
        .btn-row-action.edit-btn:hover {
          background: #fbf1e8;
          border-color: rgba(184, 125, 43, 0.35);
          color: #8c5d1e;
        }
        .btn-row-action.delete-btn {
          color: #b91c1c;
          border-color: #fee2e2;
          background: #fef2f2;
        }
        .btn-row-action.delete-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #991b1b;
        }

        .cms-row.is-hidden { opacity: 0.65; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 1080px) {
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

          .photo-inputs-grid { grid-template-columns: 1fr; }

          .cms-row {
            padding: 12px 14px;
            gap: 10px;
          }
          .row-actions-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          .row-move-wrap {
            justify-content: space-between;
          }
          .row-move-select {
            flex: 1;
            max-width: none;
          }
          .row-action-btns {
            width: 100%;
            display: flex;
            gap: 6px;
          }
          .btn-row-action {
            flex: 1;
            padding: 7px 10px;
            font-size: 12px;
          }
        }

        @media (max-width: 440px) {
          .variant-fields-grid {
            grid-template-columns: 1fr;
          }
          .variant-fields-grid label:last-child {
            grid-column: span 1;
          }

          .cms-row-main {
            gap: 10px;
          }
          .admin-row-thumb-container {
            width: 46px;
            height: 46px;
            flex: 0 0 46px;
          }
          .row-status-badges {
            align-self: flex-start;
          }
          .stock-badge {
            font-size: 10px;
            padding: 3px 7px;
          }
        }
      `}</style>
    </div>
  );
}
