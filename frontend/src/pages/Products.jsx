import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import RecommendedProducts from '../components/RecommendedProducts';
import Seo from '../components/Seo';
import { api } from '../data/api';
import { getCategories, getProducts, formatINR } from '../data/store';
import BRAND from '../config/brand';

const sortOptions = [
  { id: 'popular', label: 'Popularity' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A to Z' },
];

const PRESET_PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-5000', label: 'Under ₹5,000', max: 5000 },
  { id: '5000-10000', label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { id: '10000-20000', label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
  { id: 'above-20000', label: 'Above ₹20,000', min: 20000 },
];

const COLOR_MAP = [
  { name: 'Red', hex: '#b91c1c', keywords: ['red', 'crimson', 'scarlet', 'ruby'] },
  { name: 'Maroon', hex: '#581e15', keywords: ['maroon', 'burgundy', 'wine', 'plum'] },
  { name: 'Pink', hex: '#db2777', keywords: ['pink', 'rose', 'blush', 'magenta', 'fuchsia'] },
  { name: 'Gold & Yellow', hex: '#d97706', keywords: ['gold', 'yellow', 'mustard', 'amber', 'zari'] },
  { name: 'Green', hex: '#059669', keywords: ['green', 'emerald', 'olive', 'mint', 'sage', 'pista'] },
  { name: 'Blue', hex: '#2563eb', keywords: ['blue', 'peacock', 'navy', 'royal', 'sky', 'indigo', 'teal'] },
  { name: 'Purple', hex: '#7c3aed', keywords: ['purple', 'violet', 'lavender', 'lilac'] },
  { name: 'Orange', hex: '#ea580c', keywords: ['orange', 'rust', 'copper', 'peach', 'coral'] },
  { name: 'Ivory & White', hex: '#fdfbf7', border: '#d1c7b7', keywords: ['ivory', 'white', 'cream', 'off-white', 'silver'] },
  { name: 'Black', hex: '#1c1917', keywords: ['black', 'charcoal', 'dark'] },
];

// Module-scoped cache to render catalog immediately on back navigation without layout jump
const productsPageCache = {
  categories: null,
  products: null,
};

export default function Products() {
  const location = useLocation();
  const [categories, setCategories] = useState(() => productsPageCache.categories || getCategories());
  const [products, setProducts] = useState(() => productsPageCache.products || getProducts());
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort');
  const [sort, setSort] = useState(sortParam || 'popular');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [maxCustomPrice, setMaxCustomPrice] = useState(50000);

  const [filtersOpen, setFiltersOpen] = useState(!!location.state?.openFilters);

  // Lock body scroll on mobile when filter drawer is open to prevent freezing/sticking
  useEffect(() => {
    if (filtersOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [filtersOpen]);

  useEffect(() => {
    if (sortParam) {
      setSort(sortParam);
    }
  }, [sortParam]);

  const defaultHero = {
    badge: 'Heritage Handlooms',
    title: 'Our Collection',
    description: "Rooted in Andhra Pradesh's weaving heritage, our sarees are crafted slowly, thoughtfully, and meant to be treasured for a lifetime.",
    image: '/images/collection-hero-artisan.jpg',
  };
  const [hero, setHero] = useState(() => productsPageCache.hero || defaultHero);

  useEffect(() => {
    api.getCategories()
      .then(({ categories }) => {
        productsPageCache.categories = categories;
        setCategories(categories);
      })
      .catch(() => {
        const fallback = getCategories();
        productsPageCache.categories = fallback;
        setCategories(fallback);
      });

    api.getProducts()
      .then(({ products }) => {
        productsPageCache.products = products;
        setProducts(products);
      })
      .catch(() => {
        const fallback = getProducts();
        productsPageCache.products = fallback;
        setProducts(fallback);
      });

    api.getHomeSection('products_hero')
      .then((res) => {
        if (res?.section?.content) {
          const merged = { ...defaultHero, ...res.section.content };
          productsPageCache.hero = merged;
          setHero(merged);
        }
      })
      .catch(() => {});
  }, []);

  // Compute dynamic max price from product catalog
  const highestPriceInCatalog = useMemo(() => {
    if (!products.length) return 50000;
    const max = Math.max(...products.map((p) => Number(p.price) || 0));
    return Math.ceil(max / 5000) * 5000;
  }, [products]);

  // Product helper to extract matchable colors
  function productMatchesColor(product, targetColorObj) {
    if (!targetColorObj) return true;
    const textToScan = `${product.name} ${product.description || ''} ${product.category || ''} ${(product.tags || []).join(' ')}`.toLowerCase();
    
    // Check main text match
    const matchesKeyword = targetColorObj.keywords.some((kw) => textToScan.includes(kw));
    if (matchesKeyword) return true;

    // Check color variants if any
    if (Array.isArray(product.variants)) {
      return product.variants.some((v) => {
        const vName = (v.color_name || v.colorName || '').toLowerCase();
        return targetColorObj.keywords.some((kw) => vName.includes(kw));
      });
    }
    return false;
  }

  // Active filters count
  const activeFiltersCount = (activeCategory !== 'all' ? 1 : 0) + (selectedColor ? 1 : 0) + (priceRange !== 'all' ? 1 : 0);

  const filtered = useMemo(() => {
    let list = products;

    // 1. Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory || p.categoryId === activeCategory);
    }

    // 2. Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
    }

    // 3. Color filter
    if (selectedColor) {
      const colorObj = COLOR_MAP.find((c) => c.name === selectedColor);
      if (colorObj) {
        list = list.filter((p) => productMatchesColor(p, colorObj));
      }
    }

    // 4. Price range filter
    if (priceRange !== 'all') {
      const rangeObj = PRESET_PRICE_RANGES.find((r) => r.id === priceRange);
      if (rangeObj) {
        list = list.filter((p) => {
          const pr = Number(p.price) || 0;
          if (rangeObj.min != null && pr < rangeObj.min) return false;
          if (rangeObj.max != null && pr > rangeObj.max) return false;
          return true;
        });
      }
    }

    // 5. Sorting
    const sorted = [...list];
    if (sort === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (sort === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [products, activeCategory, searchTerm, selectedColor, priceRange, sort]);

  function setCategory(id) {
    const next = new URLSearchParams(searchParams);
    if (id === 'all') next.delete('category');
    else next.set('category', id);
    setSearchParams(next);
  }

  function clearSearch() {
    const next = new URLSearchParams(searchParams);
    next.delete('search');
    setSearchParams(next);
  }

  function resetAllFilters() {
    setCategory('all');
    setSelectedColor('');
    setPriceRange('all');
    setSort('popular');
  }

  const activeCategoryName = activeCategory !== 'all'
    ? categories.find((c) => c.id === activeCategory)?.name
    : null;

  const seoTitle = activeCategoryName
    ? `${activeCategoryName} Sarees | Best Traditional Sarees in Dharmavaram`
    : `Best Traditional Sarees in Dharmavaram | ${BRAND.name}`;

  return (
    <div className="products-page">
      <Seo
        title={seoTitle}
        path={activeCategory !== 'all' ? `/products?category=${activeCategory}` : '/products'}
        description={
          activeCategoryName
            ? `Shop authentic handwoven ${activeCategoryName} sarees at ${BRAND.name} — celebrated as the best traditional sarees in Dharmavaram, woven with pure silk and genuine zari.`
            : `Explore the complete collection of the best traditional sarees in Dharmavaram at ${BRAND.name} — Dharmavaram silk, Kanchivaram, Banarasi, bridal pattu, and festive handlooms.`
        }
        keywords="best traditional sarees in dharmavaram, dharmavaram silk sarees online, pure pattu sarees dharmavaram, bridal sarees dharmavaram, ravichandra textiles"
      />

      <div className="sparkle-bg" aria-hidden="true">
        <img src="/images/temple-bg.svg" alt="" />
      </div>

      {/* --- Collection Hero Banner (Curved Header Editorial Layout) --- */}
      <section className="products-hero-banner" aria-label="Our Collection">
        <div className="container products-hero-container">
          {/* Breadcrumb placed above the banner card */}
          <nav className="hero-breadcrumb-top" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">›</span>
            <span className="crumb-current">All Collection</span>
          </nav>

          <div className="hero-curved-banner-card">
            {/* Left Photographic Artisan Visual */}
            <div className="hero-curved-photo-wrap">
              <img
                src={hero.image || '/images/collection-hero-artisan.jpg'}
                alt="Ravichandra Textiles Pure Silk Dharmavaram Sarees Heritage"
                className="hero-curved-img"
              />
              <div className="hero-curved-img-overlay" aria-hidden="true" />
            </div>

            {/* Right Arched Content Area */}
            <div className="hero-curved-content">
              <span className="hero-curved-badge">{hero.badge || 'Heritage Handlooms'}</span>
              <h1 className="hero-curved-title">{hero.title || 'Our Collection'}</h1>
              <p className="hero-curved-description">
                {hero.description || defaultHero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container products-layout">
        {filtersOpen && (
          <div className="sidebar-overlay" onClick={() => setFiltersOpen(false)} aria-hidden="true" />
        )}

        {/* Sidebar Filter Panel */}
        <aside className={`sidebar ${filtersOpen ? 'open' : ''}`} data-lenis-prevent>
          <div className="sidebar-head mobile-only-flex">
            <div className="sidebar-title-wrap">
              <h4>Filter &amp; Refine</h4>
              {activeFiltersCount > 0 && <span className="filter-count-badge">{activeFiltersCount}</span>}
            </div>
            <div className="sidebar-head-actions">
              {activeFiltersCount > 0 && (
                <button type="button" className="reset-filters-btn" onClick={resetAllFilters}>
                  Reset
                </button>
              )}
              <button
                type="button"
                className="sidebar-close"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="sidebar-content-scroll" data-lenis-prevent>
            {/* Categories */}
            <div className="sidebar-block">
              <div className="block-head">
                <h4>Categories</h4>
                {activeCategory !== 'all' && (
                  <button type="button" className="clear-filter-sub" onClick={() => setCategory('all')}>Clear</button>
                )}
              </div>
              <ul className="category-list">
                <li>
                  <button
                    type="button"
                    className={activeCategory === 'all' ? 'active' : ''}
                    onClick={() => { setCategory('all'); setFiltersOpen(false); }}
                  >
                    All Sarees
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={activeCategory === c.id ? 'active' : ''}
                      onClick={() => { setCategory(c.id); setFiltersOpen(false); }}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Palette Filter */}
            <div className="sidebar-block">
              <div className="block-head">
                <h4>Color Palette</h4>
                {selectedColor && (
                  <button type="button" className="clear-filter-sub" onClick={() => setSelectedColor('')}>Clear</button>
                )}
              </div>
              <div className="color-filter-grid">
                {COLOR_MAP.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      className={`color-chip ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(isSelected ? '' : c.name)}
                      title={c.name}
                    >
                      <span
                        className="color-dot"
                        style={{
                          backgroundColor: c.hex,
                          border: c.border ? `1px solid ${c.border}` : '1px solid rgba(0,0,0,0.12)',
                        }}
                      />
                      <span className="color-name-text">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="sidebar-block">
              <div className="block-head">
                <h4>Price Range</h4>
                {priceRange !== 'all' && (
                  <button type="button" className="clear-filter-sub" onClick={() => setPriceRange('all')}>Clear</button>
                )}
              </div>
              <div className="price-radios-list">
                {PRESET_PRICE_RANGES.map((r) => (
                  <label key={r.id} className={`price-radio-label ${priceRange === r.id ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === r.id}
                      onChange={() => setPriceRange(r.id)}
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="sidebar-block">
              <h4>Sort By</h4>
              <div className="sort-options">
                {sortOptions.map((s) => (
                  <label key={s.id} className={`sort-option ${sort === s.id ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      name="sort"
                      checked={sort === s.id}
                      onChange={() => setSort(s.id)}
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Bottom Apply Bar */}
          <div className="sidebar-apply-mobile">
            <button type="button" className="btn btn-primary apply-btn" onClick={() => setFiltersOpen(false)}>
              Show {filtered.length} Sarees
            </button>
          </div>
        </aside>

        {/* Products Main View */}
        <div className="products-main">
          <div className="page-head">
            <div>
              <p className="eyebrow">The Collection</p>
              <h1>Products</h1>
            </div>

            {/* Top Toolbar Controls */}
            <div className="toolbar-controls">
              <button
                type="button"
                className={`filter-toggle-btn ${activeFiltersCount > 0 ? 'has-active' : ''}`}
                onClick={() => setFiltersOpen(true)}
              >
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
                  <path d="M3 5h14M6 10h8M8.5 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>Filter &amp; Sort</span>
                {activeFiltersCount > 0 && <span className="badge-count">{activeFiltersCount}</span>}
              </button>

              {/* Desktop quick sort dropdown */}
              <div className="desktop-sort-wrap">
                <span className="sort-label">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="desktop-sort-select"
                  aria-label="Sort products"
                >
                  {sortOptions.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(activeCategory !== 'all' || selectedColor || priceRange !== 'all' || searchTerm) && (
            <div className="active-chips-bar">
              {activeCategory !== 'all' && (
                <span className="filter-chip">
                  Category: {activeCategoryName || activeCategory}
                  <button type="button" onClick={() => setCategory('all')}>×</button>
                </span>
              )}

              {selectedColor && (
                <span className="filter-chip">
                  Color: {selectedColor}
                  <button type="button" onClick={() => setSelectedColor('')}>×</button>
                </span>
              )}

              {priceRange !== 'all' && (
                <span className="filter-chip">
                  Price: {PRESET_PRICE_RANGES.find((r) => r.id === priceRange)?.label}
                  <button type="button" onClick={() => setPriceRange('all')}>×</button>
                </span>
              )}

              {searchTerm && (
                <span className="filter-chip search-chip">
                  &ldquo;{searchTerm}&rdquo;
                  <button type="button" onClick={clearSearch}>×</button>
                </span>
              )}

              <button type="button" className="clear-all-text-btn" onClick={resetAllFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Products Count Info */}
          <div className="results-count-bar">
            <span>Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'saree' : 'sarees'}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-results-box">
              <svg viewBox="0 0 24 24" fill="none" width="40" height="40" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>No matching sarees found</h3>
              <p>Try resetting some filters or searching with different keywords.</p>
              <button type="button" className="btn btn-outline" onClick={resetAllFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <RecommendedProducts />

      <style>{`
        .products-page {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
        }

        .sparkle-bg {
          position: absolute;
          top: -40px;
          right: -80px;
          width: 360px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
        }

        /* --- Products Hero Banner Styling (Curved Header Editorial) --- */
        .products-hero-banner {
          position: relative;
          z-index: 2;
          padding: 10px 32px 0;
          width: 100%;
          box-sizing: border-box;
        }

        .products-hero-container {
          max-width: var(--container, 1240px);
          margin: 0 auto;
          padding: 0;
        }

        .hero-breadcrumb-top {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--brand-muted, #735e59);
          margin-bottom: 10px;
        }

        .hero-breadcrumb-top a {
          color: var(--brand-muted, #735e59);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .hero-breadcrumb-top a:hover {
          color: var(--brand-primary, #581e15);
          text-decoration: underline;
        }

        .crumb-sep {
          opacity: 0.6;
          font-size: 13px;
          line-height: 1;
        }

        .crumb-current {
          font-weight: 600;
          color: var(--brand-primary, #581e15);
        }

        /* Curved Banner Card: Left photo, right curved arch container */
        .hero-curved-banner-card {
          position: relative;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: stretch;
          min-height: 380px;
          background: #d8cec4; /* Warm tactile earthen stone tone */
          border-radius: 20px 190px 190px 20px; /* Signature curved arch on the right */
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(44, 24, 16, 0.08);
          border: 1px solid rgba(197, 139, 56, 0.28);
        }

        .hero-curved-photo-wrap {
          position: relative;
          height: 100%;
          min-height: 380px;
          overflow: hidden;
        }

        .hero-curved-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
        }

        .hero-curved-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.05) 0%,
            rgba(216, 206, 196, 0.2) 65%,
            rgba(216, 206, 196, 0.95) 100%
          );
          pointer-events: none;
        }

        .hero-curved-content {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 44px 56px 44px 20px;
          z-index: 2;
        }

        .hero-curved-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--brand-primary, #581e15);
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(4px);
          padding: 4px 14px;
          border-radius: 999px;
          margin-bottom: 14px;
          border: 1px solid rgba(197, 139, 56, 0.25);
        }

        .hero-curved-title {
          font-family: var(--font-display);
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 500;
          line-height: 1.1;
          color: #2b1812;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }

        .hero-curved-description {
          font-family: var(--font-body);
          font-size: clamp(13.5px, 1.15vw, 15px);
          line-height: 1.65;
          color: #4b362c;
          margin: 0;
          max-width: 440px;
          font-weight: 400;
        }

        .products-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 36px;
          padding: 30px 32px 30px;
          align-items: flex-start;
          box-sizing: border-box;
        }

        /* --- Sidebar Styling --- */
        .sidebar {
          position: sticky;
          top: 96px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.28);
          border-radius: 20px;
          padding: 22px 18px;
          box-shadow: 0 8px 24px rgba(45, 12, 17, 0.04);
          box-sizing: border-box;
          width: 100%;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(197, 139, 56, 0.4) transparent;
        }

        .sidebar::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar::-webkit-scrollbar-thumb {
          background-color: rgba(197, 139, 56, 0.35);
          border-radius: 999px;
        }
        .sidebar::-webkit-scrollbar-thumb:hover {
          background-color: var(--brand-primary, #581e15);
        }

        .sidebar-content-scroll {
          display: flex;
          flex-direction: column;
          gap: 22px;
          width: 100%;
        }

        .sidebar-head.mobile-only-flex {
          display: none;
        }

        .sidebar-overlay {
          display: none;
        }

        .sidebar-apply-mobile {
          display: none;
        }

        .sidebar-block {
          border-bottom: 1px solid var(--stone-200, #e6dcce);
          padding-bottom: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .sidebar-block:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }

        .block-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .sidebar-block h4 {
          font-family: var(--font-body);
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-secondary, #b0732e);
          font-weight: 600;
          margin: 0;
        }

        .clear-filter-sub {
          background: none;
          border: none;
          font-size: 11.5px;
          color: #a13a3a;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        /* Category List */
        .category-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .category-list button {
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .category-list button:hover {
          background: #faf5ee;
          color: var(--maroon-900, #581e15);
        }

        .category-list button.active {
          background: #faf0e0;
          color: var(--maroon-900, #581e15);
          font-weight: 600;
        }

        /* Color Filter Chips */
        .color-filter-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
          width: 100%;
          box-sizing: border-box;
        }

        .color-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          border-radius: 8px;
          border: 1px solid var(--stone-200, #e6dcce);
          background: #ffffff;
          cursor: pointer;
          font-family: var(--font-body);
          transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
          text-align: left;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .color-chip:hover {
          border-color: var(--gold-500, #c58b38);
          background: #faf6f0;
        }

        .color-chip.selected {
          border-color: var(--maroon-900, #581e15);
          background: #fdf5f3;
          font-weight: 600;
          box-shadow: 0 0 0 1px var(--maroon-900, #581e15);
        }

        .color-dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .color-name-text {
          font-size: 11.5px;
          color: var(--ink-900, #220d0a);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          flex: 1;
        }

        /* Price Range Options */
        .price-radios-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .price-radio-label {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: var(--ink-600, #735e59);
          cursor: pointer;
        }

        .price-radio-label input {
          accent-color: var(--brand-primary, #581e15);
          cursor: pointer;
        }

        .price-radio-label.checked {
          color: var(--maroon-900, #581e15);
          font-weight: 500;
        }

        /* Sort Options */
        .sort-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .sort-option {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: var(--ink-600, #735e59);
          cursor: pointer;
        }

        .sort-option input {
          accent-color: var(--brand-primary, #581e15);
          cursor: pointer;
        }

        .sort-option.checked {
          color: var(--maroon-900, #581e15);
          font-weight: 500;
        }

        /* --- Main Products Grid & Header --- */
        .products-main {
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .page-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
        }

        .page-head h1 {
          font-size: 34px;
          margin-top: 6px;
        }

        .toolbar-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .filter-toggle-btn {
          display: none; /* Desktop default: sidebar is sticky */
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.4);
          border-radius: 999px;
          padding: 9px 18px;
          font-size: 13px;
          font-weight: 500;
          color: var(--maroon-900, #581e15);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(88, 30, 21, 0.08);
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .filter-toggle-btn.has-active {
          background: #faf0e0;
          border-color: var(--gold-600, #b0732e);
        }

        .badge-count {
          background: var(--brand-primary, #581e15);
          color: #ffffff;
          font-size: 10.5px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .desktop-sort-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--ink-600, #735e59);
        }

        .desktop-sort-select {
          border: 1px solid var(--stone-200, #e6dcce);
          border-radius: 999px;
          padding: 8px 14px;
          background: #ffffff;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--ink-900, #220d0a);
          cursor: pointer;
          outline: none;
        }

        .desktop-sort-select:focus {
          border-color: var(--gold-500, #c58b38);
        }

        /* Active Filter Chips Bar */
        .active-chips-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
          padding: 12px 14px;
          background: #faf6f0;
          border-radius: 12px;
          border: 1px solid var(--stone-200, #e6dcce);
        }

        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.35);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 12.5px;
          color: var(--ink-900, #220d0a);
        }

        .filter-chip button {
          background: none;
          border: none;
          font-size: 15px;
          color: var(--ink-400, #9c8983);
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .filter-chip button:hover {
          color: #a13a3a;
        }

        .clear-all-text-btn {
          background: none;
          border: none;
          font-size: 12px;
          color: #a13a3a;
          cursor: pointer;
          text-decoration: underline;
          margin-left: 6px;
        }

        .results-count-bar {
          font-size: 13px;
          color: var(--ink-400, #9c8983);
          margin-bottom: 22px;
        }

        /* Product Grid */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
          padding-bottom: 30px;
          width: 100%;
          box-sizing: border-box;
        }

        .empty-results-box {
          text-align: center;
          padding: 60px 20px;
          background: #faf6f0;
          border-radius: 20px;
          border: 1px dashed var(--stone-200, #e6dcce);
          color: var(--ink-600, #735e59);
        }

        .empty-results-box svg {
          color: var(--gold-600, #b0732e);
          margin-bottom: 12px;
        }

        .empty-results-box h3 {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--maroon-900);
          margin: 0 0 6px;
        }

        .empty-results-box p {
          font-size: 14px;
          margin: 0 0 20px;
        }

        /* --- Tablet & Mobile Responsive Viewports (Fits Any Mobile Perfectly) --- */
        @media (max-width: 980px) {
          .products-hero-banner {
            padding: 16px 18px 0;
          }

          .hero-curved-banner-card {
            grid-template-columns: 1fr;
            border-radius: 20px 20px 90px 20px;
            min-height: auto;
          }

          .hero-curved-photo-wrap {
            height: 280px;
            min-height: 280px;
          }

          .hero-curved-img-overlay {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.05) 0%,
              rgba(216, 206, 196, 0.4) 65%,
              rgba(216, 206, 196, 1) 100%
            );
          }

          .hero-curved-content {
            padding: 30px 28px 36px;
          }

          .hero-curved-title {
            font-size: 32px;
            margin-bottom: 12px;
          }

          .hero-breadcrumb-top {
            margin-bottom: 10px;
            font-size: 12px;
          }

          .products-layout {
            grid-template-columns: 1fr;
            padding: 20px 18px 20px;
            gap: 20px;
            position: static;
          }

          .filter-toggle-btn {
            display: inline-flex;
          }

          .desktop-sort-wrap {
            display: none;
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(32, 8, 11, 0.62);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 1000;
            touch-action: none;
          }

          /* Drawer Mode on Mobile */
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: min(88vw, 360px);
            max-width: 360px;
            height: 100vh;
            height: 100dvh;
            background: #ffffff;
            z-index: 1001;
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 0;
            border-radius: 0 20px 20px 0;
            border: none;
            box-shadow: 16px 0 40px rgba(0, 0, 0, 0.32);
            transform: translateX(-105%);
            transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
            overflow: hidden;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .sidebar-head.mobile-only-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--stone-200, #e6dcce);
            padding: 16px 20px;
            background: #ffffff;
            flex-shrink: 0;
          }

          .sidebar-title-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .sidebar-title-wrap h4 {
            font-size: 15.5px;
            letter-spacing: 0.04em;
            color: var(--maroon-900, #581e15);
            margin: 0;
            font-weight: 600;
          }

          .filter-count-badge {
            background: var(--brand-secondary, #b0732e);
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 999px;
          }

          .sidebar-head-actions {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .reset-filters-btn {
            background: none;
            border: none;
            font-size: 13px;
            color: #a13a3a;
            cursor: pointer;
            padding: 4px;
            font-weight: 500;
          }

          .sidebar-close {
            background: #faf6f0;
            border: 1px solid var(--stone-200, #e6dcce);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--ink-900);
            cursor: pointer;
            padding: 0;
            transition: background 0.15s ease;
          }

          .sidebar-close:hover {
            background: #f2eae0;
          }

          /* Scrollable Content Body inside Drawer */
          .sidebar-content-scroll {
            flex: 1 1 auto;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y;
            overscroll-behavior: contain;
            padding: 18px 20px 24px;
            display: flex;
            flex-direction: column;
            gap: 22px;
          }

          .sidebar-apply-mobile {
            display: block;
            position: relative;
            flex-shrink: 0;
            margin: 0;
            padding: 14px 20px calc(14px + env(safe-area-inset-bottom, 0px));
            background: #ffffff;
            border-top: 1px solid var(--stone-200, #e6dcce);
            box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.08);
            z-index: 10;
          }

          .apply-btn {
            width: 100%;
            padding: 13px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 12px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
        }

        /* Small Phones (iPhone SE, Galaxy S, 320px – 480px) */
        @media (max-width: 480px) {
          .products-hero-banner {
            padding: 12px 12px 0;
          }

          .hero-curved-banner-card {
            border-radius: 16px 16px 60px 16px;
          }

          .hero-curved-photo-wrap {
            height: 220px;
            min-height: 220px;
          }

          .hero-curved-content {
            padding: 22px 18px 26px;
          }

          .hero-curved-title {
            font-size: 26px;
            margin-bottom: 8px;
          }

          .hero-curved-description {
            font-size: 13px;
            line-height: 1.55;
          }

          .hero-breadcrumb-top {
            font-size: 11px;
            gap: 6px;
            margin-bottom: 8px;
          }

          .products-layout {
            padding: 16px 12px 20px;
          }

          .page-head h1 {
            font-size: 26px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .filter-toggle-btn {
            padding: 8px 14px;
            font-size: 12.5px;
          }

          .color-filter-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
          }

          .color-chip {
            padding: 6px 7px;
          }

          .color-name-text {
            font-size: 11px;
          }
        }

        /* Ultra-compact screens <= 340px */
        @media (max-width: 340px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
