"use client";

import { motion } from "framer-motion";

export function DecantSection() {
  return (
    <section className="py-32 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light">
              El Formato Inteligente
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-6 mb-6 leading-[1.1] tracking-tight">
              ¿Qué es un <span className="text-white/60 italic">Decant</span>?
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mb-6" />
            <p className="text-white/30 text-sm leading-relaxed font-light tracking-wide mb-4">
              Un decant es una pequeña cantidad de perfume extraída de una botella original y
              transferida a un atomizador de vidrio de menor capacidad. Es la forma más inteligente
              y elegante de disfrutar fragancias de alta gama sin adquirir el frasco completo.
            </p>
            <p className="text-white/25 text-sm leading-relaxed font-light tracking-wide">
              Ideales para quienes desean explorar nuevas esencias, construir una colección
              versátil o simplemente acceder a fragancias exclusivas a un precio más accesible.
              Todos nuestros decants se preparan bajo pedido con la misma pieza de vidrio que
              utilizan las casas de perfume más prestigiosas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-midnight-900 via-black to-midnight-950 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                src="/images/decant.webp"
                alt="Frascos decant de perfume"
                className="relative z-[1] w-full h-full object-contain p-12"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
