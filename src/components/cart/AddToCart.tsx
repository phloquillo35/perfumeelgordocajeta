"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface VariantOption {
  id: string;
  type: "BOTTLE" | "DECANT";
  ml: number;
  price: number;
  stock: number;
}

interface AddToCartProps {
  slug: string;
  name: string;
  imageUrl: string;
  variants: VariantOption[];
}

export function AddToCart({ slug, name, imageUrl, variants }: AddToCartProps) {
  const { addItem, openCart } = useCart();
  const [selectedId, setSelectedId] = useState<string>(variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];

  if (!selected) return null;

  const handleAdd = () => {
    addItem({
      slug,
      name,
      variantType: selected.type,
      ml: selected.ml,
      price: selected.price,
      quantity: qty,
      imageUrl,
    });
    openCart();
  };

  const format = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <div>
        <p className="mb-3 text-xs uppercase tracking-widest text-gold-400">Presentación</p>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => {
            const active = v.id === selected.id;
            const tipo = v.type === "BOTTLE" ? "Botella" : "Decant";
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setSelectedId(v.id);
                  setQty(1);
                }}
                className={cn(
                  "rounded-xl border px-4 py-2 text-left text-sm transition-all",
                  active
                    ? "border-gold-500/50 bg-gold-500/15 text-gold-200"
                    : "border-white/10 text-white/70 hover:border-gold-500/30"
                )}
              >
                <span className="block font-medium">
                  {tipo} · {v.ml}ml
                </span>
                <span className="block text-xs text-gold-300/80">{format(v.price)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs uppercase tracking-widest text-gold-400">Cantidad</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Disminuir cantidad"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 hover:border-gold-500/40 hover:text-gold-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-white">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar cantidad"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 hover:border-gold-500/40 hover:text-gold-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={selected.stock <= 0}
        className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selected.stock > 0 ? "Agregar al carrito" : "Agotado"}
      </button>
    </div>
  );
}
