"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] bg-surface-sunken flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient Radial Glowing Orbs */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold-500/10 via-gold-400/15 to-transparent rounded-full blur-[140px] pointer-events-none"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.05)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col items-center justify-between min-h-[85vh]">
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
          {/* Subtitle Crest Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 mb-8 rounded-full border border-gold-500/30 bg-black/60 backdrop-blur-2xl shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-200 text-xs uppercase tracking-[0.3em] font-medium">
              Haute Parfumerie & Decants de Nicho
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.08] tracking-tight max-w-5xl"
          >
            La Esencia del <br />
            <span className="gold-text-bright drop-shadow-2xl">Lujo Exclusivo</span>
          </motion.h1>

          {/* Description Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide font-light"
          >
            Sumérgete en la más sofisticada selección de fragancias árabes y de diseñador.
            Fraccionados en salas estériles con frascos atomizadores de vidrio y garantía de autenticidad directa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
          >
            <Link href="/catalogo" className="btn-gold w-full sm:w-auto text-center">
              Explorar Catálogo de Lujo
            </Link>
            <Link
              href="/catalogo?tipo=ARABE"
              className="btn-gold-outline w-full sm:w-auto text-center"
            >
              Perfumes Árabes Exclusivos
            </Link>
          </motion.div>
        </div>

        {/* Live Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gold-500/20"
        >
          {[
            { value: "100%", label: "Perfumes Originales" },
            { value: "50+", label: "Casas de Nicho" },
            { value: "5ml / 10ml", label: "Decants de Vidrio" },
            { value: "Envío Seguro", label: "Protección Total" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3">
              <div className="font-serif text-2xl md:text-3xl font-semibold gold-text-bright mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-slate-400 text-[11px] uppercase tracking-[0.2em] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
