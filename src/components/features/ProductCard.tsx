"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";
import { TrustBadge } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import type { ProductData } from "@/types";

interface ProductCardProps {
  product: ProductData;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const imageUrl = product.images[0] || PLACEHOLDER_IMAGES.product(product.type);

  const bottleVariant = product.variants.find((v) => v.type === "BOTTLE");
  const decantVariant = product.variants.find((v) => v.type === "DECANT");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/catalogo/${product.slug}`} className="group block h-full">
        <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative group-hover:border-gold-500/40 transition-all duration-500">
          {/* Image Container with Ambient Glow */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-surface to-surface-sunken flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={imageUrl}
              alt={product.name}
              className="relative z-[1] w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
              loading="lazy"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              <Badge variant={product.type === "ARABE" ? "arabe" : "disenador"}>
                {product.type === "ARABE" ? "Árabe Exclusivo" : "Diseñador"}
              </Badge>
              {product.featured && (
  <Badge variant="bottle">Destacado</Badge>
)}
<TrustBadge />
            </div>

            {/* Hover Action Overlay Button */}
            <div className="absolute bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="btn-gold shadow-lg">
                Ver Detalles Olfativos →
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 flex-1 flex flex-col justify-between bg-black/40">
            <div>
              {product.brand && (
                <p className="text-[10px] text-gold-400/90 uppercase tracking-[0.25em] font-semibold mb-1.5">
                  {product.brand}
                </p>
              )}
              <h3 className="font-serif text-xl text-white mb-3 group-hover:text-gold-200 transition-colors duration-300 line-clamp-1">
                {product.name}
              </h3>
            </div>

            {/* Pricing Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              {bottleVariant && (
                <div className="bg-black/60 border border-gold-500/30 rounded-lg px-3 py-1.5 flex items-center justify-between gap-2 flex-1 min-w-[120px]">
                  <span className="text-[10px] uppercase text-slate-400 font-medium">Botella</span>
                  <span className="text-xs font-semibold text-gold-300">
                    {formatPrice(Number(bottleVariant.price))}
                  </span>
                </div>
              )}
              {decantVariant && (
                <div className="bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 flex items-center justify-between gap-2 flex-1 min-w-[120px]">
                  <span className="text-[10px] uppercase text-slate-400 font-medium">Decant {decantVariant.ml}ml</span>
                  <span className="text-xs font-semibold text-white">
                    {formatPrice(Number(decantVariant.price))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
