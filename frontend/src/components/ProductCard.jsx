import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../data/store';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, hidePrice = false, isNew = false }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const outOfStock = product.stock === 0;
  const showNewBadge = (isNew || product.isNew) && !outOfStock;
  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link to={`/products/${product.id}`} className={`product-card ${outOfStock ? 'is-out' : ''}`}>
      <div className="product-image-wrap">
        <div className="product-image">
          <img src={product.image} alt={product.name} loading="lazy" />
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
        {!hidePrice && (
          <div className="product-price">
            <span className="price">{formatINR(product.price)}</span>
            {product.mrp > product.price && <span className="mrp">{formatINR(product.mrp)}</span>}
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
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        .is-out .product-image img {
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
          z-index: 2;
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
            font-size: 13.5px;
          }
          .price {
            font-size: 13.5px;
          }
        }
      `}</style>
    </Link>
  );
}
