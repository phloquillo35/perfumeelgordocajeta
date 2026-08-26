"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, openCart, mounted } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const whatsappUrl = getWhatsAppLink({ isGeneric: true });

  const cartButton = (
    <button
      onClick={openCart}
      aria-label="Abrir carrito"
      className="relative text-gold-400 hover:text-gold-300 transition-colors"
    >
      <ShoppingBag className="h-5 w-5" />
      {mounted && count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-base">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-2xl border-b border-gold-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Crest & Logo */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <img
              src="/images/logo.jpg"
              alt="Sebi Fragrance Decants"
              className="h-9 w-9 rounded-full object-cover shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest uppercase font-semibold gold-text-bright group-hover:opacity-90 transition-opacity">
                Sebi Fragrance <span className="text-white/60 font-light">Decants</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-400/70 font-light -mt-1">
                Decants de Nicho
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-black/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-xl">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-gold-500/20 to-gold-400/10 text-gold-200 border border-gold-500/30 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Advisory Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://instagram.com/decantstucuman"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {cartButton}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Asesoría Olfativa</span>
            </a>
          </div>

          {/* Mobile Cart + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {cartButton}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gold-400 hover:text-gold-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-base/95 border-b border-gold-500/20 px-6 py-6 space-y-4 backdrop-blur-2xl animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-widest transition-all",
                  isActive(item.href)
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="https://instagram.com/decantstucuman"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline w-full text-center block"
            >
              Síguenos en Instagram
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full text-center block"
            >
              Asesoría Personalizada por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
