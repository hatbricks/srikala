import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCart, saveCart } from '../data/store';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  function addItem(product, qty = 1, variant = null) {
    const itemKey = variant?.id ? `${product.id}_${variant.id}` : String(product.id);
    setItems((prev) => {
      const existing = prev.find((i) => (i.key ? i.key === itemKey : i.id === product.id && i.variantId === (variant?.id || null)));
      const next = existing
        ? prev.map((i) => {
            const matches = i.key ? i.key === itemKey : i.id === product.id && i.variantId === (variant?.id || null);
            return matches ? { ...i, qty: i.qty + qty } : i;
          })
        : [
            ...prev,
            {
              key: itemKey,
              id: product.id,
              variantId: variant?.id || null,
              variantName: variant?.color_name || variant?.colorName || null,
              variantColor: variant?.color_code || variant?.colorCode || null,
              sku: variant?.sku || product.sku || null,
              name: product.name,
              price: Number(variant?.price || product.price),
              mrp: Number(variant?.mrp || product.mrp || product.price),
              image: (variant?.images && variant.images[0]) || product.image,
              weightGrams: Number(variant?.weight_grams || product.weight_grams || product.weightGrams || 500),
              returnAvailable: Boolean(product.return_available ?? product.returnAvailable ?? true),
              returnWindowHours: Number(product.return_window_hours ?? product.returnWindowHours ?? 24),
              cancellationAvailable: Boolean(product.cancellation_available ?? product.cancellationAvailable ?? true),
              qty,
            },
          ];
      saveCart(next);
      return next;
    });
  }

  function updateQty(keyOrId, qty) {
    setItems((prev) => {
      const next = qty <= 0
        ? prev.filter((i) => (i.key || i.id) !== keyOrId && i.id !== keyOrId)
        : prev.map((i) => ((i.key || i.id) === keyOrId || i.id === keyOrId ? { ...i, qty } : i));
      saveCart(next);
      return next;
    });
  }

  function removeItem(keyOrId) {
    setItems((prev) => {
      const next = prev.filter((i) => (i.key || i.id) !== keyOrId && i.id !== keyOrId);
      saveCart(next);
      return next;
    });
  }

  function clearCart() {
    setItems([]);
    saveCart([]);
  }

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
