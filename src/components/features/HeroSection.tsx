"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1410]"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,169,108,0.08)_0%,transparent_60%)]"
      />

      <motion.div
        animate={{ opacity: [0.02, 0.06, 0.02], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02], rotate: [0, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-champagne/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center min-h-screen w-full px-8 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-5 py-2.5 mb-12 border border-white/[0.06] bg-black/40 backdrop-blur-2xl"
            >
              <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-light">
                Colección 2025 — Nuevos Lanzamientos
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-5 leading-[1.05] tracking-tight"
            >
              La Esencia del
              <br />
              <span className="text-[#c9a96c]">Lujo Exclusivo</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white/35 text-sm md:text-base max-w-lg mx-auto mb-14 leading-relaxed tracking-wide font-light"
            >
              Descubre una selección curada de los perfumes árabes y de diseñador más
              codiciados del mundo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-row items-center justify-center gap-6"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center px-10 py-4 bg-black border border-[rgba(201,169,108,0.5)] text-white text-[11px] uppercase tracking-[0.2em] font-light transition-all duration-500 hover:bg-black/80 hover:border-[rgba(201,169,108,0.8)] active:scale-[0.97]"
              >
                Explorar Colección
              </Link>
              <Link
                href="/catalogo?tipo=ARABE"
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent border border-white/15 text-white/50 text-[11px] uppercase tracking-[0.2em] font-light transition-all duration-500 hover:border-white/40 hover:text-white/80 active:scale-[0.97]"
              >
                Perfumes Árabes
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-14 pb-16"
        >
          {[
            { value: "200+", label: "Fragancias" },
            { value: "50+", label: "Marcas" },
            { value: "98%", label: "Satisfacción" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-serif text-2xl md:text-3xl text-white/80 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
