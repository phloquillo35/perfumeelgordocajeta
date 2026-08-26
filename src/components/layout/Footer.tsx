"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type FooterLink = { label: string; href: string };

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  navegacion: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  categorias: [
    { label: "Perfumes Árabes", href: "/catalogo?tipo=ARABE" },
    { label: "Perfumes de Diseñador", href: "/catalogo?tipo=DISENADOR" },
    { label: "Decants (5ml / 10ml)", href: "/catalogo?presentacion=DECANT" },
    { label: "Botellas Completas", href: "/catalogo?presentacion=BOTTLE" },
  ],
  contacto: [
    { label: "contacto@perfumesexclusivos.com", href: "mailto:contacto@perfumesexclusivos.com" },
    { label: "+52 55 1234 5678", href: "tel:+525512345678" },
  ],
};

const HEADINGS: Record<string, string> = {
  navegacion: "Navegación",
  categorias: "Colecciones",
  contacto: "Atención al Cliente",
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a
        href={link.href}
        className="text-slate-400 hover:text-gold-300 text-sm transition-colors duration-300 font-light"
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className="text-slate-400 hover:text-gold-300 text-sm transition-colors duration-300 font-light"
    >
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-surface-sunken border-t border-gold-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,168,67,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/20">
                <span className="font-serif text-black font-bold text-base">P</span>
              </div>
              <span className="font-serif text-xl gold-text-bright tracking-wide">
                Perfumes <span className="text-white/60 font-light">Exclusivos</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xs mb-6">
              Haute Parfumerie & Decants de Nicho. Colección curada de los más cotizados elixires árabes y de diseñador.
            </p>
          </motion.div>

          {Object.entries(FOOTER_LINKS).map(([key, links], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-6">
                {HEADINGS[key]}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()} Perfumes Exclusivos. Todos los derechos reservados.
          </p>
          <span className="text-gold-400/60 text-[11px] uppercase tracking-[0.2em] font-medium">
            100% Fragancias Auténticas & Decants de Vidrio
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
