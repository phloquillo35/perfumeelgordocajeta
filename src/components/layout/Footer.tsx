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
    { label: "Decants", href: "/catalogo?presentacion=DECANT" },
    { label: "Botellas", href: "/catalogo?presentacion=BOTTLE" },
  ],
  contacto: [
    { label: "contacto@perfumesexclusivos.com", href: "mailto:contacto@perfumesexclusivos.com" },
    { label: "+52 55 1234 5678", href: "tel:+525512345678" },
  ],
};

const HEADINGS: Record<string, string> = {
  navegacion: "Navegación",
  categorias: "Categorías",
  contacto: "Contacto",
};

function FooterLink({ link }: { link: FooterLink }) {
  if (link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a
        href={link.href}
        className="text-white/35 hover:text-champagne text-sm transition-colors duration-300 font-light"
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className="text-white/35 hover:text-champagne text-sm transition-colors duration-300 font-light"
    >
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,108,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-champagne to-gold-600 flex items-center justify-center">
                <span className="text-black text-sm font-bold">P</span>
              </div>
              <span className="font-serif text-xl text-white/90 tracking-wide">
                Perfumes <span className="text-champagne">Exclusivos</span>
              </span>
            </Link>
            <p className="text-white/25 text-sm leading-relaxed font-light tracking-wide max-w-xs">
              Descubre la más exclusiva colección de perfumes árabes y de diseñador.
              La esencia del lujo en cada fragancia.
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
              <h3 className="font-sans text-[11px] uppercase tracking-[0.25em] text-white/40 mb-6">
                {HEADINGS[key]}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <FooterLink link={link} />
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
          className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/20 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()} Perfumes Exclusivos. Todos los derechos reservados.
          </p>
          <span className="text-white/15 text-[10px] uppercase tracking-[0.15em] font-light">
            Hecho con dedicación para los amantes de las fragancias
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
