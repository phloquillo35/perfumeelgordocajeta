# AGENTS.md (Workflow Context) — Perfumes
> Generado: 2026-08-25 · Herramienta: opencode (loop MAESTRO) · Proyecto: /Users/pablohernandezcanelo/Documents/Perfumes

## 🎯 Objetivo actual
Mejorar calidad/arquitectura/diseño (usuario: "página horrible, detalles espantosos, arquitectura mal lograda, diseños inconsistentes"). Ejecutado vía loop MAESTRO (planner → joaco → tester → reviewer/designer → handoff).

## 📍 Estado actual
  Branch: main · Tracking: origin/main · Working tree: limpio tras Iter 1.
  Últimos commits:
   a2fd843 fix: unify FragranceFinder background to surface token (closes Iter 1 scope)
   3d2ce9c feat: Iter 1 — semantic color tokens + gold button system
   bbe1000 feat: complete UI work and cleanup

## ✅ Iteración 1 (DONE · 2026-08-25)
Unificar near-negros en tokens + botón dorado.
- `globals.css`: tokens `--color-base:#05070a`, `--color-surface:#0b0e14`, `--color-surface-sunken:#030407`; clases `.btn-gold`/`.btn-gold-outline` sin `!important`.
- Migrados a tokens: Header, Footer, HeroSection, ProductCard, CategorySection, CTASection, FragranceFinder, page.tsx.
- CTA blanco plano → dorado. `gold-button` (legacy) eliminado.
- VERIFY: typecheck/lint/build en verde. REFLECT: APPROVED.
- Commits: 3d2ce9c + a2fd843 (pusheados a origin/main).

## 🧱 Arquitectura / hallazgos
- App real: Next.js 16 (App Router) en `src/` (`(public)` + `(admin)`), Prisma, next-auth.
- SITIO ESTÁTICO LEGACY MUERTO en root (`index.html` "AURA Parfums", `style.css`, `script.js`) — BORRADO en Iter 2 (sin referencias funcionales).
- `tailwind.config.js` (v3 legacy) — BORRADO en Iter 2. PostCSS sigue CSS-first (`@tailwindcss/postcss`).
- `design-system/perfumes-exclusivos/` existe pero vacío/incipiente.

## ✅ Iteración 2 (DONE · 2026-08-25)
Limpieza arquitectónica + coherencia de tokens.
- Borrados (git rm): `index.html`, `style.css`, `script.js`, `tailwind.config.js`.
- Residuales near-negros migrados a tokens: DecantSection→`bg-base`, StorySection→`bg-surface`, TestimonialsSection→`bg-surface`, AboutContent→`bg-surface`, catalogo/[slug]→`bg-base`.
- `ui/Badge.tsx`: variantes `arabe`/`disenador`/`decant` unificadas a acento gold (gold-200/300/400 sobre midnight); `default` neutra. Eliminados amber/blue/purple. API intacta.
- VERIFY: typecheck/lint/build en verde · grep hex residuales = 0 · grep refs a borrados = 0.

## ✅ Iteración 3 (DONE · 2026-08-25)
Cerrar gate de consistencia de color (0 magic hex / 0 colores poli-cromáticos).
- Residuales near-negros migrados a tokens: catalogo/[slug] y DecantSection → `from-surface to-surface-sunken`.
- Gradientes "champagne" hardcodeados tokenizados: AboutContent y WhatsAppButton → `from-champagne-dark via-champagne to-champagne-dark` (tokens ya en globals.css:28-29).
- Chips/filtros poli-cromáticos → acento dorado: catalogo (amber/blue/purple activos → `bg-gold-500/20 text-gold-400 border-gold-500/30`) y contacto (Email blue → `text-gold-400` / `bg-gold-500/10 border-gold-500/20`). Inactivo ya midnight. Funcionalidad intacta.
- VERIFY: typecheck/lint/build en verde · grep hex residuales = 0 (fuera de @theme) · grep `amber-|blue-|purple-` en catalogo/page.tsx y contacto/page.tsx = 0.

## ✅ Iteración 4 (DONE · 2026-08-25)
Sistema de botón único — `Button.tsx` consume `.btn-gold` (Opción B).
- `ui/Button.tsx`: añadidas variantes `"gold" | "gold-outline"` que aplican las clases
  `.btn-gold` / `.btn-gold-outline` de `globals.css` (único punto de definición). Para esas
  variantes NO se aplica el bloque de `size`/`padding` genérico (la clase CSS ya lo controla).
  Variantes `primary`/`outline`/`ghost`/`danger` (admin) intactas.
- Migrado el único `<button>` real con estilo dorado: `FragranceFinder.tsx:244`
  (`<button className="btn-gold-outline">` → `<Button variant="gold-outline">`), conservando
  `w-full sm:w-auto cursor-pointer`.
- NOTA de alcance: `CTASection.tsx:59` (`<motion.a>` a WhatsApp) y `FragranceFinder.tsx:238`
  (`<Link>`) son ANCLAS, no `<button>`; se dejaron en `className="btn-gold*"` (clase compartida,
  no sistema paralelo) para no romper semántica de navegación. Coincide con verificación I4.S3.
- VERIFY: typecheck/lint/build en verde · grep `linear-gradient` dorado duplicado fuera de
  `globals.css` = 0 · `Button.tsx` referencia `btn-gold`, no lo redefine · admin compila.

## 📋 Backlog (vacío — Iter 4 cerrada)
  _Sin pendientes de arquitectura/calidad conocidos. Loop MAESTRO completó I1–I4._

## 🧭 Próximo paso
Loop MAESTRO I1–I4 COMPLETO. Opcionales futuros (fuera de scope): pulido de microinteracciones,
tests E2E con Playwright, o nuevas features de negocio.

## 🔐 Variables de entorno requeridas
  DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_WHATSAPP_PHONE

## 📦 Comandos útiles
  dev: next dev -p 3003 · build: next build · lint: eslint src/ · typecheck: tsc --noEmit
  db:push / db:migrate / db:seed / db:studio

## 🧠 Decisiones
  - Identidad: oro sobre midnight. Un solo near-negro (`--color-base`).
  - Tailwind v4 (CSS-first `@theme`); no usar tailwind.config.js legacy.
  - Loop MAESTRO: plan primero, verificación objetiva (GREEN/RED), sin `!important` ni `any`.
