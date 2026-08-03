"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

const categories = [
  {
    title: "Perfumes Árabes",
    description: "Fragancias orientales intensas y duraderas",
    href: "/catalogo?tipo=ARABE",
    image: PLACEHOLDER_IMAGES.category.arabe,
  },
  {
    title: "Perfumes de Diseñador",
    description: "Las firmas más prestigiosas del mundo",
    href: "/catalogo?tipo=DISENADOR",
    image: PLACEHOLDER_IMAGES.category.disenador,
  },
];

export function CategorySection() {
  return (
    <section className="py-32 relative bg-[#080808]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light">
            Categorías
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-6 leading-[1.1] tracking-tight">
            Dos Mundos, Una Esencia
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Link
                href={cat.href}
                className="group relative block h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-midnight-900 via-black to-midnight-950"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-[1]" />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={cat.image}
                  alt={cat.title}
                  className="relative z-[1] w-full h-full object-contain p-12"
                />
                <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                  <div className="border-l border-white/[0.08] pl-6 max-w-md">
                    <h3 className="font-serif text-3xl text-white mb-2 tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-white/30 text-sm mb-6 font-light tracking-wide">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-light group-hover:text-white/70 transition-colors duration-500">
                      Explorar colección
                      <motion.svg
                        whileHover={{ x: 4 }}
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
