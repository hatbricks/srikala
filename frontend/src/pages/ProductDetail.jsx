import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RecommendedProducts from '../components/RecommendedProducts';
import CancellationPolicyCard from '../components/CancellationPolicyCard';
import Seo, { SITE_URL } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { api } from '../data/api';
import { formatINR, getProducts } from '../data/store';
import BRAND from '../config/brand';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [recommended, setRecommended] = useState({ heading: 'Recommended For You', productIds: [] });
  const { addItem } = useCart();
  const navigate = useNavigate();

  // The full product list (for "Recommended") and the admin's curated
  // "Recommended Sarees" picks are site-wide, not per-product — fetched
  // once here rather than on every product navigation.
  useEffect(() => {
    let active = true;
    api.getProducts().then(({ products }) => active && setAllProducts(products)).catch(() => active && setAllProducts([]));
    // Only the recommended-products section is needed here — getHomeSections()
    // returns every enabled section's full content in one payload, which
    // includes the hero section (currently ~15MB with its video). This page
    // renders on every product view, so pulling that was adding ~15MB to
    // the single most-visited page type on the site for no reason.
    api.getHomeSection('recommended').then(({ section }) => {
      if (!active) return;
      if (section?.content) setRecommended((prev) => ({ ...prev, ...section.content }));
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    let active = true;
    setAdded(false);
    setQty(1);
    setProduct(null);
    setNotFound(false);
    setActiveImage(null);
    setSelectedVariant(null);

    api
      .getProduct(id)
      .then(({ product }) => {
        if (!active) return;
        setProduct(product);
        if (product.variants?.length > 0) {
          const firstInStock = product.variants.find((v) => v.stock > 0) || product.variants[0];
          setSelectedVariant(firstInStock);
          if (firstInStock.images?.length > 0) {
            setActiveImage(firstInStock.images[0]);
          }
        }
      })
      .catch(() => {
        // Backend not reachable — fall back to the local seed so the page
        // still works while the server isn't running.
        const found = getProducts().find((p) => p.id === id);
        if (!active) return;
        if (found) setProduct(found);
        else setNotFound(true);
      });

    return () => { active = false; };
  }, [id]);

  if (notFound) {
    return (
      <div className="container" style={{ padding: '80px 32px' }}>
        <p>We couldn&apos;t find that saree.</p>
        <Link to="/products" className="btn btn-outline" style={{ marginTop: 16 }}>Back to products</Link>
      </div>
    );
  }

  if (!product || allProducts === null) {
    return <div className="detail-page" style={{ minHeight: '100vh' }} />;
  }

  const currentPrice = selectedVariant?.price != null ? Number(selectedVariant.price) : Number(product.price);
  const currentMrp = selectedVariant?.mrp != null ? Number(selectedVariant.mrp) : Number(product.mrp || product.price);
  const currentStock = selectedVariant ? Number(selectedVariant.stock) : Number(product.stock);
  const outOfStock = currentStock <= 0;

  // Cover image plus any gallery photos, plus selected variant images if available
  const variantImgs = selectedVariant?.images || [];
  const baseGallery = [product.image, product.hoverImage || product.hover_image, ...(product.images || [])].filter(Boolean);
  const gallery = [...variantImgs, ...baseGallery].filter((src, i, arr) => src && arr.indexOf(src) === i);
  const mainImage = activeImage || gallery[0];
  const ogImage = mainImage?.startsWith('http') ? mainImage : undefined;

  function handleAdd() {
    addItem(product, qty, selectedVariant);
    setAdded(true);
  }

  return (
    <div className="detail-page">
      <Seo
        title={`${product.name} | ${BRAND.name}`}
        path={`/products/${product.id}`}
        description={(product.description || `${product.name} — handcrafted traditional silk saree from ${BRAND.name}, Dharmavaram.`).slice(0, 160)}
        image={ogImage}
        type="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description || undefined,
          image: gallery.filter((src) => src?.startsWith('http')),
          sku: product.id,
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/products/${product.id}`,
            priceCurrency: 'INR',
            price: product.price,
            availability: outOfStock
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          },
        }}
      />
      <div className="sparkle-bg sparkle-bg-detail" aria-hidden="true">
        <img src="/images/sparkle-bg.svg" alt="" />
      </div>
      <div className="container detail-grid">
        <div className="detail-gallery">
          <div className="detail-image">
            <img src={mainImage} alt={product.name} />
          </div>
          {gallery.length > 1 && (
            <div className="detail-thumbs">
              {gallery.map((src, i) => (
                <button
                  type="button"
                  key={i}
                  className={`detail-thumb ${src === mainImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(src)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-info">
          <Link to="/products" className="back-link">← All products</Link>
          <h1>{product.name}</h1>
          <div className="detail-price">
            <span className="price">{formatINR(currentPrice)}</span>
            {currentMrp > currentPrice && <span className="mrp">{formatINR(currentMrp)}</span>}
            {currentMrp > currentPrice && (
              <span className="discount-tag">
                {Math.round(((currentMrp - currentPrice) / currentMrp) * 100)}% off
              </span>
            )}
          </div>

          {product.variants?.length > 0 && (
            <div className="variants-section">
              <p className="variant-label">
                Color: <strong>{selectedVariant?.color_name || 'Select a color'}</strong>
              </p>
              <div className="color-swatches-row">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  const vOutOfStock = v.stock === 0;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`color-swatch-btn ${isSelected ? 'selected' : ''} ${vOutOfStock ? 'is-out' : ''}`}
                      onClick={() => {
                        setSelectedVariant(v);
                        if (v.images?.length > 0) setActiveImage(v.images[0]);
                        setQty(1);
                      }}
                      title={`${v.color_name}${vOutOfStock ? ' (Out of stock)' : ''}`}
                    >
                      <span className="swatch-circle" style={{ backgroundColor: v.color_code || '#8B0000' }} />
                      <span className="swatch-name">{v.color_name}</span>
                      {vOutOfStock && <span className="out-tag">Sold Out</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p className="desc">{product.description}</p>
          <p className={`stock ${outOfStock ? 'out' : ''}`}>
            {outOfStock ? 'Currently out of stock' : `${currentStock} in stock`}
          </p>

          {!outOfStock && (
            <div className="qty-row">
              <span>Quantity</span>
              <div className="qty-control">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(currentStock, q + 1))} aria-label="Increase quantity">+</button>
              </div>
            </div>
          )}

          <div className="detail-actions">
            <button className="btn btn-primary" disabled={outOfStock} onClick={handleAdd}>
              {outOfStock ? 'Notify Me' : added ? 'Added ✓' : 'Add to Cart'}
            </button>
            {!outOfStock && (
              <button
                className="btn btn-outline"
                onClick={() => { addItem(product, qty, selectedVariant); navigate('/checkout'); }}
              >
                Buy Now
              </button>
            )}
          </div>
          {added && <Link to="/cart" className="view-cart-link">View cart →</Link>}

          <div className="product-spec-badges">
            <div className="spec-badge">
              <span className="badge-icon">{product.return_available !== false ? '✓' : 'ℹ'}</span>
              <div>
                <strong>{product.return_available !== false ? `${product.return_window_hours || 24}-Hour Return Window` : 'Non-Returnable'}</strong>
                <p>{product.return_available !== false ? 'Eligible for return request after delivery via My Orders' : 'Handloom piece — final sale'}</p>
              </div>
            </div>
            {product.weight_grams && (
              <div className="spec-badge">
                <span className="badge-icon">📦</span>
                <div>
                  <strong>{product.weight_grams}g Package Weight</strong>
                  <p>Dimensions: {product.length_cm || 30} × {product.width_cm || 20} × {product.height_cm || 5} cm</p>
                </div>
              </div>
            )}
          </div>

          <CancellationPolicyCard />
        </div>
      </div>

      <RecommendedProducts
        products={allProducts}
        curatedIds={recommended.productIds}
        title={recommended.heading}
        excludeId={product.id}
      />

      <style>{`
        .detail-page { padding: 56px 0 0; position: relative; overflow: hidden; }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg-detail {
          top: 100px;
          left: -110px;
          width: 360px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          transform: rotate(15deg);
        }
        .detail-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          margin-bottom: 70px;
        }
        .detail-gallery { display: flex; flex-direction: column; gap: 12px; }
        .detail-image {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 3 / 4;
        }
        .detail-image img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .detail-thumbs { display: flex; gap: 10px; flex-wrap: wrap; }
        .detail-thumb {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          padding: 0;
          border: 2px solid transparent;
          background: none;
          cursor: pointer;
          opacity: 0.7;
        }
        .detail-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .detail-thumb:hover { opacity: 1; }
        .detail-thumb.active { border-color: var(--maroon-900); opacity: 1; }
        .back-link { font-size: 13px; color: var(--ink-400); margin-bottom: 18px; display: inline-block; }
        .detail-info h1 { font-size: 30px; margin-bottom: 16px; }
        .detail-price { display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px; }
        .detail-price .price { font-size: 24px; font-weight: 600; color: var(--maroon-900); }
        .detail-price .mrp { font-size: 15px; color: var(--ink-400); text-decoration: line-through; }
        .discount-tag { font-size: 12px; font-weight: 600; color: #3c7a3c; background: #e8f2e6; padding: 2px 8px; border-radius: 999px; }

        .variants-section { margin-bottom: 20px; }
        .variant-label { font-size: 13px; color: var(--ink-600); margin-bottom: 8px; }
        .variant-label strong { color: var(--ink-900); }
        .color-swatches-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .color-swatch-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--stone-300);
          background: var(--paper);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .color-swatch-btn:hover { border-color: var(--maroon-900); }
        .color-swatch-btn.selected {
          border-color: var(--maroon-900);
          background: #fdf6f5;
          box-shadow: 0 0 0 1px var(--maroon-900);
        }
        .color-swatch-btn.is-out { opacity: 0.55; }
        .swatch-circle { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.2); }
        .swatch-name { font-size: 12.5px; color: var(--ink-800); }
        .out-tag { font-size: 10px; color: #a13a3a; font-weight: 600; }

        .desc { font-size: 14.5px; line-height: 1.8; color: var(--ink-600); max-width: 480px; margin-bottom: 20px; }
        .stock { font-size: 13px; color: var(--ink-600); margin-bottom: 22px; }
        .stock.out { color: #a13a3a; }
        .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 26px; font-size: 13px; color: var(--ink-600); }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid var(--stone-200);
          border-radius: 999px;
          padding: 7px 16px;
        }
        .qty-control button {
          background: none;
          border: none;
          font-size: 16px;
          color: var(--maroon-900);
          width: 18px;
        }
        .detail-actions { display: flex; gap: 12px; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .view-cart-link { display: inline-block; margin-top: 14px; font-size: 13px; color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }

        .product-spec-badges { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
        .spec-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
        }
        .badge-icon { font-size: 14px; color: var(--maroon-900); flex: 0 0 auto; margin-top: 1px; }
        .spec-badge strong { font-size: 12.5px; color: var(--ink-900); display: block; }
        .spec-badge p { font-size: 11.5px; color: var(--ink-500); margin: 2px 0 0; }
        @media (max-width: 860px) {
          .detail-grid { grid-template-columns: 1fr; gap: 28px; margin-bottom: 40px; }
        }
      `}</style>
    </div>
  );
}
