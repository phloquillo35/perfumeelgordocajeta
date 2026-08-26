"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";

type FooterLink = { label: string; href: string; icon?: React.ReactNode };

const INSTAGRAM_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

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
    { label: "+54 9 381 384-4876", href: `tel:+${WHATSAPP_PHONE}` },
    { label: "@decantstucuman", href: "https://instagram.com/decantstucuman", icon: INSTAGRAM_ICON },
  ],
};

const HEADINGS: Record<string, string> = {
  navegacion: "Navegación",
  categorias: "Colecciones",
  contacto: "Atención al Cliente",
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  const content = (
    <>
      {link.icon && <span className="text-gold-400">{link.icon}</span>}
      {link.label}
    </>
  );
  const className =
    "flex items-center gap-2 text-slate-400 hover:text-gold-300 text-sm transition-colors duration-300 font-light";
  if (link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a href={link.href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {content}
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
              <img
                src="/images/logo.jpg"
                alt="Sebi Fragrance Decants"
                className="h-9 w-9 rounded-full object-cover shadow-lg shadow-gold-500/20"
              />
              <span className="font-serif text-xl gold-text-bright tracking-wide">
                Sebi Fragrance <span className="text-white/60 font-light">Decants</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xs mb-6">
              Decants de perfumes originales en Tafi Viejo, Tucumán. Colección curada de los más cotizados elixires árabes y de diseñador, con envíos a todo el país.
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
            &copy; {new Date().getFullYear()} Sebi Fragrance Decants. Todos los derechos reservados.
          </p>
          <span className="text-gold-400/60 text-[11px] uppercase tracking-[0.2em] font-medium">
            100% Fragancias Auténticas & Decants de Vidrio
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
