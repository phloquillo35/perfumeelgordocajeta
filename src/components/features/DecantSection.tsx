"use client";

import { motion } from "framer-motion";

export function DecantSection() {
  return (
    <section className="py-28 relative bg-[#050507] overflow-hidden border-t border-gold-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,168,67,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-medium inline-block mb-4">
              El Arte de Probar
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-6 leading-tight">
              ¿Qué es un <span className="gold-text-bright">Decant de Lujo</span>?
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold-400 to-transparent mb-6" />

            <p className="text-slate-300 text-base leading-relaxed font-light mb-6">
              Un decant es una fracción exacta de un perfume original extraída bajo ambiente higiénico controlado y envasada en un vial atomizador de vidrio de alta precisión (**5ml o 10ml**).
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-gold-400 font-semibold text-sm mb-1">🧪 100% Original Puro</div>
                <div className="text-slate-400 text-xs font-light">Sin adulterar ni diluir. Fraccionado del frasco original.</div>
              </div>

              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-gold-400 font-semibold text-sm mb-1">💨 +150 Atomizaciones</div>
                <div className="text-slate-400 text-xs font-light">Un decant de 10ml rinde para más de 30 días de uso diario.</div>
              </div>

              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-gold-400 font-semibold text-sm mb-1">✈️ Formato Portátil</div>
                <div className="text-slate-400 text-xs font-light">Llévalo en tu bolsillo, bolso o viajes sin cargar la botella.</div>
              </div>

              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-gold-400 font-semibold text-sm mb-1">💰 Compra Inteligente</div>
                <div className="text-slate-400 text-xs font-light">Prueba fragancias de $350 USD por una fracción de su costo.</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-6 overflow-hidden relative">
              <div className="aspect-[4/5] bg-gradient-to-b from-[#090c14] to-[#040406] rounded-2xl flex items-center justify-center overflow-hidden relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src="/images/decant.webp"
                  alt="Frascos decant de perfume"
                  className="relative z-[1] w-full h-full object-contain p-8 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
