"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const whatsappUrl = getWhatsAppLink({ isGeneric: true });

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
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <span className="font-serif text-black font-bold text-lg">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest uppercase font-semibold gold-text-bright group-hover:opacity-90 transition-opacity">
                Perfumes <span className="text-white/60 font-light">Exclusivos</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-400/70 font-light -mt-1">
                Haute Parfumerie
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
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Asesoría Olfativa</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gold-400 hover:text-gold-300 focus:outline-none"
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

          <div className="pt-4 border-t border-white/10">
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
