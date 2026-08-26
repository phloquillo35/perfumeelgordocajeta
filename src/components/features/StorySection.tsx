"use client";

import { motion } from "framer-motion";

const stories = [
  {
    label: "Perfumes Árabes",
    title: "Tradición Milenaria",
    subtitle: "La Alquimia de Oriente",
    quote:
      "El perfume árabe no se lleva puesto, se habita en él. Es una experiencia sensorial que trasciende el olfato.",
    body: "La perfumería árabe es una de las más antiguas y sofisticadas del mundo. Nacida en la Península Arábiga hace más de mil años, esta tradición se fundamenta en ingredientes nobles como el oud, el ámbar, el azafrán y la rosa damascena. A diferencia de la perfumería occidental, las fragancias árabes buscan la intensidad y la longevidad, creando estelas olfativas que perduran por días. Cada nota cuenta una historia de caravanas, especias y oasis.",
    image: "/images/fotoarabelinda.webp",
    align: "left" as const,
  },
  {
    label: "Perfumes de Diseñador",
    title: "Alta Costura Olfativa",
    subtitle: "El Arte de la Perfumería Moderna",
    quote:
      "Una fragancia es más que un aroma. Es una declaración de identidad, un recuerdo encapsulado.",
    body: "La perfumería de diseñador representa la convergencia entre la moda y la olfacción. Casas como Dior, Chanel y Creed han elevado la creación de fragancias a una forma de arte, colaborando con los mejores perfumistas del mundo (los 'narices') para componer sinfonías aromáticas. Cada lanzamiento es el resultado de años de investigación, ingredientes seleccionados globalmente y una narrativa cuidadosamente construida que define la identidad de quien la usa.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    align: "right" as const,
  },
];

function StoryCard({ story }: { story: (typeof stories)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
    >
      <div className={`${story.align === "right" ? "lg:order-2" : ""}`}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light"
        >
          {story.label}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="font-serif text-3xl md:text-4xl text-white mt-4 mb-2 leading-[1.1] tracking-tight"
        >
          {story.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-white/40 text-sm font-light tracking-wide mb-6"
        >
          {story.subtitle}
        </motion.p>
        <div className="w-12 h-[1px] bg-white/20 mb-6" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-white/25 text-sm leading-relaxed font-light tracking-wide italic mb-6"
        >
          &ldquo;{story.quote}&rdquo;
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-white/20 text-sm leading-relaxed font-light tracking-wide"
        >
          {story.body}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`${story.align === "right" ? "lg:order-1" : ""}`}
      >
        <div className="bg-black">
          <img
            src={story.image}
            alt={story.title}
            className="w-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StorySection() {
  return (
    <section className="py-32 relative bg-surface">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light">
            Dos Mundos, Una Pasión
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-6 leading-[1.1] tracking-tight">
            El Arte de la Perfumería
          </h2>
        </motion.div>

        <div className="space-y-32">
          {stories.map((story) => (
            <StoryCard key={story.title} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
