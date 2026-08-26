# AGENTS.md (Workflow Context) — Perfumes (Sebi Fragrance Decants)
> Generado: 2026-08-25 · Herramienta: opencode (loop MAESTRO) · Proyecto: /Users/pablohernandezcanelo/Documents/Perfumes

## 🎯 Objetivo actual
Rebrand del e-commerce de perfumes + carrito de compras con pedido por WhatsApp.
Nombre: **Sebi Fragrance Decants** · Ubicación: **Tafi Viejo, Tucumán, Argentina** ·
Instagram **@decantstucuman** · WhatsApp vendedor: **5493813844876**.
El cliente elige perfumes en el catálogo → los agrega a un carrito → completa
nombre/dirección/teléfono → la página genera un mensaje de WhatsApp al vendedor
con el link de cada perfume elegido.

## 📍 Estado actual
  Branch: main · Tracking: origin/main · Working tree: limpio tras este handoff.
  Últimos commits (pendientes de push):
   08e1b58 feat: Iter 2+3 — carrito + checkout con pedido por WhatsApp
   83278c3 feat: Iter 1 — rebrand Sebi Fragrance Decants, logo, Instagram y teléfono

## ✅ Loop MAESTRO — Iteraciones (todas GREEN + APPROVED)
- **Iter 1 (rebrand):** metadata/layout → "Sebi Fragrance Decants"; Header/Footer/contacto
  con nuevo nombre, logo (`public/images/logo.jpg`), Instagram (Header/Footer/contacto),
  ubicación Tafi Viejo, teléfono centralizado en `WHATSAPP_PHONE` (src/lib/whatsapp.ts, con `.trim()`).
- **Iter 2+3 (carrito + checkout):** `src/lib/cart.tsx` (CartProvider/useCart, localStorage),
  `CartDrawer.tsx` (drawer + formulario checkout), `AddToCart.tsx` (selector variante + cantidad),
  `whatsapp.ts` → `buildCheckoutWhatsAppMessage`/`getCheckoutWhatsAppLink` (link `/catalogo/{slug}` por item).
  Header con botón de carrito + badge; `(public)/layout.tsx` envuelve en CartProvider.
- VERIFY: build/typecheck/lint verdes, 0 `any`, 0 "Perfumes Exclusivos"/"Ciudad de México".
- REFLECT: APPROVED (flujo completo cumple el objetivo; falta focus-trap en drawer, no bloqueante).

## 🧱 Arquitectura / decisiones
- Next.js 16 App Router + React 19 + Tailwind v4 + Prisma (PostgreSQL). Scripts: `dev -p 3003`, `build`, `lint`, `typecheck`.
- **Vercel:** proyecto renombrado `perfumes-exclusivos` → `sebi-fragrance-decants`.
  URL de producción: **https://sebi-fragrance-decants.vercel.app**.
- **Env:** `NEXT_PUBLIC_WHATSAPP_PHONE=5493813844876` seteado en Vercel (production, no-sensitive)
  y en `.env`/`.env.example`. `WHATSAPP_PHONE` lo centraliza y hace `.trim()`.
- **Carrito:** estado en `localStorage` (key `sebi-cart`), hidratado post-mount (sin mismatch SSR).
- **WhatsApp pedido:** mensaje incluye nombre, dirección, teléfono y `ORIGIN/catalogo/{slug}` por item
  (ORIGIN = window.location.origin en cliente → en prod apunta a la URL real).

## 📋 Backlog (no bloqueante)
  [low] Focus-trap en CartDrawer (mejora a11y).
  [low] Quick-add a carrito directo desde ProductCard (hoy se agrega desde la página de detalle).
  [opt] Persistir pedido en BD (modelo Order ya existe) si algún día se quiere historial.

## 🧭 Próximo paso
Desplegar (push a main dispara redeploy en Vercel) y verificar en producción:
https://sebi-fragrance-decants.vercel.app — flujo catálogo → carrito → checkout → WhatsApp.

## 🔐 Variables de entorno requeridas
  DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_WHATSAPP_PHONE (=5493813844876)

## 📦 Comandos útiles
  dev: next dev -p 3003 · build: next build · lint: eslint src/ · typecheck: tsc --noEmit
  db:push / db:migrate / db:seed / db:studio
