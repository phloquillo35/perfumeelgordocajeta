"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

const categories = [
  {
    title: "Perfumes Árabes",
    subtitle: "Mística Oriental & Oud de Alta Fijación",
    description: "Fragancias opulentas compuestas por maderas exóticas, resinas preciosas, azafrán y ámbar místico con estela dominante.",
    href: "/catalogo?tipo=ARABE",
    image: PLACEHOLDER_IMAGES.category.arabe,
    badge: "Colección Mística",
  },
  {
    title: "Perfumes de Diseñador",
    subtitle: "Alta Costura & Elixires Internacionales",
    description: "Las creaciones icónicas de las casas francesas e italianas de alta costura más codiciadas del mundo.",
    href: "/catalogo?tipo=DISENADOR",
    image: PLACEHOLDER_IMAGES.category.disenador,
    badge: "Alta Costura",
  },
];

export function CategorySection() {
  return (
    <section className="py-28 relative bg-[#050507]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,168,67,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-medium inline-block mb-3">
            Grandes Familias
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 leading-[1.1] tracking-tight">
            Dos Mundos, Una <span className="gold-text-bright">Firma Olfativa</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
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
                className="group relative block rounded-3xl overflow-hidden glass-card h-[500px] lg:h-[580px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent z-10" />

                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                  src={cat.image}
                  alt={cat.title}
                  className="relative z-[1] w-full h-full object-contain p-12 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />

                <div className="absolute top-6 left-6 z-20">
                  <span className="px-3.5 py-1.5 rounded-full border border-gold-500/40 bg-black/60 backdrop-blur-xl text-gold-300 text-[10px] uppercase tracking-[0.2em] font-semibold">
                    {cat.badge}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-20">
                  <div className="border-l-2 border-gold-400 pl-6">
                    <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold block mb-1">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 font-light leading-relaxed max-w-md">
                      {cat.description}
                    </p>
                    <span className="gold-button-outline !py-2 !px-5 text-[10px] inline-flex items-center gap-2 group-hover:bg-gold-500 group-hover:text-black transition-all">
                      Explorar Colección →
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
