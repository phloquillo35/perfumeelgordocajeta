"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";
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
      <Link href={`/catalogo/${product.slug}`} className="group block">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative border border-white/[0.06] overflow-hidden bg-black/40 backdrop-blur-sm transition-colors duration-700 hover:border-white/[0.12] hover:bg-black/60"
        >
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-midnight-900 via-black to-midnight-950">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
              src={imageUrl}
              alt={product.name}
              className="relative z-[1] w-full h-full object-contain p-8"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <Badge variant={product.type === "ARABE" ? "arabe" : "disenador"}>
                {product.type === "ARABE" ? "Árabe" : "Diseñador"}
              </Badge>
              {product.featured && (
                <Badge variant="bottle">Destacado</Badge>
              )}
            </div>
          </div>

          <div className="p-5">
            {product.brand && (
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mb-1.5">
                {product.brand}
              </p>
            )}
            <h3 className="font-serif text-lg text-white/90 mb-3 group-hover:text-champagne transition-colors duration-500">
              {product.name}
            </h3>

            <div className="flex items-center gap-4">
              {bottleVariant && (
                <span className="text-sm text-white/40 font-light">
                  Botella{" "}
                  <span className="text-champagne/80 font-medium">
                    {formatPrice(Number(bottleVariant.price))}
                  </span>
                </span>
              )}
              {decantVariant && (
                <span className="text-sm text-white/40 font-light">
                  Decant {decantVariant.ml}ml{" "}
                  <span className="text-champagne/80 font-medium">
                    {formatPrice(Number(decantVariant.price))}
                  </span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
