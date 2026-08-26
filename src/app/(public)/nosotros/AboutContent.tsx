"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Autenticidad Garantizada",
    desc: "Todos nuestros productos son 100% originales. Trabajamos con distribuidores autorizados.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Envíos a Todo México",
    desc: "Entregamos a cualquier parte del país con empaque seguro y discreto.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    title: "Atención Personalizada",
    desc: "Te ayudamos a encontrar la fragancia perfecta para ti o para regalar.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Mejor Precio Garantizado",
    desc: "Ofrecemos precios competitivos en todas nuestras fragancias sin sacrificar calidad.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const sections = [
  {
    title: "¿Quiénes somos?",
    text: "Somos una empresa apasionada por el mundo de las fragancias. Nacimos con la misión de acercar los perfumes más exclusivos y difíciles de encontrar a todo México. Trabajamos directamente con importadores y distribuidores autorizados para garantizar la autenticidad de cada uno de nuestros productos.",
  },
  {
    title: "Nuestra Pasión",
    text: "Cada fragancia en nuestro catálogo es seleccionada cuidadosamente por nuestro equipo de expertos. Nos apasiona descubrir nuevas esencias, desde las tradicionales notas amaderadas árabes hasta las creaciones más vanguardistas de los diseñadores internacionales.",
  },
  {
    title: "Compromiso con la Calidad",
    text: "La calidad es el pilar fundamental de nuestro negocio. Todos nuestros productos son originales y cuentan con garantía de autenticidad. Ofrecemos presentaciones en botella y decant para que puedas disfrutar de las mejores fragancias sin comprometer tu presupuesto.",
  },
];

export function AboutContent() {
  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="text-champagne/60 text-[11px] uppercase tracking-[0.25em] font-medium">
            Sobre Nosotros
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-4 mb-6 tracking-tight">
            Nuestra Historia
          </h1>
          <p className="text-white/30 text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            Desde nuestros inicios, nos hemos dedicado a ofrecer las fragancias más exclusivas
            del mundo, combinando la tradición perfumista árabe con las grandes casas de diseño.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-28">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-white/[0.06] bg-black/40 backdrop-blur-sm p-8"
            >
              <h2 className="font-serif text-2xl text-white/90 mb-4">{section.title}</h2>
              <p className="text-white/30 text-sm font-light leading-relaxed tracking-wide">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-champagne/60 text-[11px] uppercase tracking-[0.25em] font-medium">
              ¿Por qué elegirnos?
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-4 tracking-tight">
              Nuestros Pilares
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-white/[0.06] bg-black/40 backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-black/60"
              >
                <div className="text-champagne/60 mb-5">{feature.icon}</div>
                <h3 className="font-serif text-lg text-white/90 mb-3">{feature.title}</h3>
                <p className="text-white/30 text-sm font-light leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] p-12 lg:p-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 tracking-tight">
              ¿Listo para encontrar tu fragancia?
            </h2>
            <p className="text-white/30 text-sm font-light mb-8 max-w-lg mx-auto">
              Contáctanos por WhatsApp y descubre el perfume perfecto para ti.
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || ""}?text=${encodeURIComponent("Hola, me gustaría recibir información sobre sus perfumes.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-champagne-dark via-champagne to-champagne-dark text-black text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,169,108,0.3)]"
            >
              Contactar por WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
