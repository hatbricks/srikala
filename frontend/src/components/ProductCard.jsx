import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../data/store';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, hidePrice = false, isNew = false }) {
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const activeVariant = selectedVariant || (variants.length > 0 ? variants[0] : null);
  const displayPrice = activeVariant?.price != null && activeVariant.price !== ''
    ? Number(activeVariant.price)
    : Number(product.price);
  const displayMrp = activeVariant?.mrp != null && activeVariant.mrp !== ''
    ? Number(activeVariant.mrp)
    : Number(product.mrp || product.price);
  const outOfStock = activeVariant ? Number(activeVariant.stock) <= 0 : product.stock === 0;
  const showNewBadge = (isNew || product.isNew) && !outOfStock;
  const discount = displayMrp > displayPrice
    ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100)
    : 0;

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(product, 1, activeVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleSelectVariant(e, v) {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariant(v);
  }

  const variantPrimaryImg = activeVariant?.images?.[0] || null;
  const variantHoverImg = activeVariant?.hoverImage || activeVariant?.hover_image || activeVariant?.images?.[1] || null;
  const displayImage = variantPrimaryImg || product.image;
  const hoverImg = activeVariant
    ? (variantHoverImg || (!selectedVariant ? (product.hoverImage || product.hover_image) : null))
    : (product.hoverImage || product.hover_image);
  const detailUrl = activeVariant?.id
    ? `/products/${product.id}?variant=${encodeURIComponent(activeVariant.id)}`
    : `/products/${product.id}`;

  return (
    <Link to={detailUrl} className={`product-card ${outOfStock ? 'is-out' : ''}`}>
      <div className="product-image-wrap">
        <div className={`product-image ${hoverImg ? 'has-hover-image' : ''}`}>
          <img
            src={displayImage}
            alt={product.name}
            className="product-img product-img-primary"
            loading="lazy"
          />
          {hoverImg && (
            <img
              src={hoverImg}
              alt={`${product.name} drape`}
              className="product-img product-img-hover"
              loading="lazy"
              aria-hidden="true"
            />
          )}
          {outOfStock && <span className="badge badge-out">Sold Out</span>}
          {!hidePrice && !outOfStock && discount > 0 && (
            <span className="badge badge-sale">{discount}% OFF</span>
          )}
          {showNewBadge && <span className="badge badge-new">New</span>}
          {!outOfStock && (
            <button
              type="button"
              className={`quick-add-btn ${added ? 'added' : ''}`}
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? 'Added to Bag ✓' : '+ Add to Bag'}
            </button>
          )}
        </div>
      </div>

      <div className="product-info">
        {product.category && (
          <span className="product-category">{product.category.replace(/-/g, ' ')}</span>
        )}
        <h3 className="product-name">{product.name}</h3>
        {variants.length > 0 && (
          <div className="card-swatches" role="group" aria-label="Available colors">
            {variants.map((v, idx) => {
              const vName = v.colorName || v.color_name || `Color ${idx + 1}`;
              const vCode = v.colorCode || v.color_code || '#8B0000';
              const isSelected = activeVariant ? (activeVariant.id ? activeVariant.id === v.id : activeVariant === v) : idx === 0;
              return (
                <button
                  key={v.id || idx}
                  type="button"
                  className={`card-swatch-dot ${isSelected ? 'active' : ''}`}
                  style={{ backgroundColor: vCode }}
                  title={vName}
                  aria-label={`Preview ${vName}`}
                  onClick={(e) => handleSelectVariant(e, v)}
                />
              );
            })}
            {activeVariant && (
              <span className="card-swatch-name">
                {activeVariant.colorName || activeVariant.color_name}
              </span>
            )}
          </div>
        )}
        {!hidePrice && (
          <div className="product-price">
            <span className="price">{formatINR(displayPrice)}</span>
            {displayMrp > displayPrice && <span className="mrp">{formatINR(displayMrp)}</span>}
          </div>
        )}
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
        }
        .product-image-wrap {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #fbf7f2;
          box-shadow: 0 4px 16px rgba(32, 8, 11, 0.05);
          transition: box-shadow 0.35s ease;
        }
        .product-card:hover .product-image-wrap {
          box-shadow: 0 14px 30px rgba(32, 8, 11, 0.12);
        }
        .product-image {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #fbf7f2;
        }
        .product-image .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.65s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.45s ease-in-out;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .product-image .product-img-primary {
          position: relative;
          z-index: 1;
          display: block;
        }
        .product-image .product-img-hover {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0;
          display: block;
        }
        @media (hover: hover) {
          .product-card:hover .product-img-primary {
            transform: scale(1.06);
          }
          .product-card:hover .product-img-hover {
            opacity: 1;
            transform: scale(1.06);
          }
        }
        .product-card:active .product-img-hover {
          opacity: 1;
        }
        .is-out .product-image .product-img {
          opacity: 0.55;
          filter: grayscale(40%);
        }
        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 999px;
          z-index: 4;
        }
        .badge-sale {
          background: var(--brand-primary);
          color: #ffffff;
          border: 1px solid rgba(251, 223, 162, 0.4);
        }
        .badge-out {
          background: rgba(34, 13, 10, 0.85);
          color: #ffffff;
        }
        .badge-new {
          right: 12px;
          left: auto;
          background: linear-gradient(135deg, #c58b38 0%, #a66a1a 100%);
          color: #ffffff;
          border: 1px solid rgba(251, 223, 162, 0.45);
          box-shadow: 0 2px 8px rgba(32, 8, 11, 0.15);
        }

        .quick-add-btn {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          padding: 10px 14px;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.03em;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          color: var(--brand-primary);
          border: 1px solid rgba(197, 139, 56, 0.3);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease, color 0.2s ease;
          z-index: 3;
        }
        .quick-add-btn:hover {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-gold-light);
        }
        .quick-add-btn.added {
          background: var(--brand-secondary);
          color: #ffffff;
          border-color: var(--brand-gold-light);
          opacity: 1;
          transform: translateY(0);
        }
        .product-card:hover .quick-add-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .product-info {
          padding: 14px 4px 6px;
        }
        .product-category {
          display: block;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-secondary);
          margin-bottom: 4px;
        }
        .product-name {
          font-family: var(--font-display);
          font-size: 15px;
          line-height: 1.35;
          color: var(--brand-primary);
          margin: 0 0 6px;
          font-weight: 400;
          transition: color 0.2s ease;
        }
        .product-card:hover .product-name {
          color: var(--brand-secondary);
        }
        .card-swatches {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          margin: 2px 0 7px;
        }
        .card-swatch-dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 0, 0, 0.2);
          padding: 0;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .card-swatch-dot:hover {
          transform: scale(1.15);
        }
        .card-swatch-dot.active {
          box-shadow: 0 0 0 1.5px #fff, 0 0 0 3px var(--brand-primary);
        }
        .card-swatch-name {
          font-size: 11px;
          color: var(--brand-muted);
          margin-left: 2px;
        }
        .product-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .price {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--brand-primary);
        }
        .mrp {
          font-size: 12px;
          color: var(--brand-muted);
          text-decoration: line-through;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .quick-add-btn {
            display: none;
          }
          .product-name {
            font-size: 13px;
            line-height: 1.3;
            margin-bottom: 4px;
          }
          .price {
            font-size: 13px;
          }
          .mrp {
            font-size: 11px;
          }
          .badge {
            font-size: 9.5px;
            padding: 3px 7px;
          }
          .product-info {
            padding: 8px 2px 4px;
          }
        }

        @media (max-width: 360px) {
          .product-name {
            font-size: 12px;
          }
          .price {
            font-size: 12px;
          }
        }
      `}</style>
    </Link>
  );
}
