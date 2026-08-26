"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

export type VariantType = "BOTTLE" | "DECANT";

export interface CartItem {
  slug: string;
  name: string;
  variantType: VariantType;
  ml: number;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export function cartItemKey(item: Pick<CartItem, "slug" | "variantType" | "ml">): string {
  return `${item.slug}-${item.variantType}-${item.ml}`;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** True only after client mount — use to gate UI that depends on persisted state (avoids SSR mismatch). */
  mounted: boolean;
}

const STORAGE_KEY = "sebi-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage only after mount (no SSR mismatch).
  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Ignore malformed / unavailable storage.
    }
  }, []);

  // Persist on change (only after mount).
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota / private-mode errors.
    }
  }, [items, mounted]);

  const addItem = useCallback((item: CartItem) => {
    const key = cartItemKey(item);
    setItems((prev) => {
      const existing = prev.find((it) => cartItemKey(it) === key);
      if (existing) {
        return prev.map((it) =>
          cartItemKey(it) === key ? { ...it, quantity: it.quantity + item.quantity } : it
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((it) => cartItemKey(it) !== key));
  }, []);

  const updateQuantity = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((it) =>
          cartItemKey(it) === key ? { ...it, quantity: Math.max(0, qty) } : it
        )
        .filter((it) => it.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );
  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      total,
      count,
      isOpen,
      openCart,
      closeCart,
      mounted,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      total,
      count,
      isOpen,
      openCart,
      closeCart,
      mounted,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
