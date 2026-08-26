"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "María Fernanda",
    location: "Tafi Viejo, Tucumán, Argentina",
    text: "Descubrí perfumes que ni siquiera sabía que existían. Los decants me permiten probar antes de comprar el frasco completo. Ahora tengo una colección de 15 fragancias que rotó según mi estado de ánimo.",
  },
  {
    name: "Carlos Andrés",
    location: "Bogotá",
    text: "La calidad de los decants es impecable. Atomizadores de vidrio que no alteran la fragancia, exactamente el mismo jugo que en la botella original. El envío llegó en 3 días y perfectamente sellado.",
  },
  {
    name: "Valentina L.",
    location: "Buenos Aires",
    text: "Siempre había querido explorar perfumes árabes pero me intimidaban. Me guiaron paso a paso y ahora el Oud es mi firma personal. La asesoría por WhatsApp fue clave para encontrar mi estilo.",
  },
  {
    name: "Diego Martínez",
    location: "Santiago",
    text: "Para mí que viajo constante, los decants de 10ml son perfectos. Caben en cualquier equipaje de mano y no tengo que preocuparme por el límite de líquidos. Ya hice tres pedidos y todos perfectos.",
  },
];

function TestimonialCard({ text, name, location, index }: { text: string; name: string; location: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="border border-white/[0.06] p-8 lg:p-10 hover:border-white/[0.12] transition-all duration-500"
    >
      <p className="text-white/25 text-sm leading-relaxed font-light tracking-wide mb-8">
        &ldquo;{text}&rdquo;
      </p>
      <div className="w-8 h-[1px] bg-white/10 mb-4" />
      <p className="text-white/50 text-sm font-light tracking-wide">{name}</p>
      <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-light mt-1">
        {location}
      </p>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-32 relative bg-surface">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,169,108,0.015)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light">
            Clientes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-6 leading-[1.1] tracking-tight">
            Lo Que Dicen de Nosotros
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
