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

## 📋 Backlog Iter 3 (no bloqueante, fuera de scope Iter 2)
  [pending/low]    Botón único: `ui/Button.tsx` (admin) vs `.btn-gold` (público) → un sistema.

## 🧭 Próximo paso
Retomar Iter 3: decidir si `ui/Button.tsx` se extiende con variante dorada para usarlo en público y eliminar clases CSS duplicadas. Re-ejecutar loop (planner→joaco→tester→reviewer).

## 🔐 Variables de entorno requeridas
  DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_WHATSAPP_PHONE

## 📦 Comandos útiles
  dev: next dev -p 3003 · build: next build · lint: eslint src/ · typecheck: tsc --noEmit
  db:push / db:migrate / db:seed / db:studio

## 🧠 Decisiones
  - Identidad: oro sobre midnight. Un solo near-negro (`--color-base`).
  - Tailwind v4 (CSS-first `@theme`); no usar tailwind.config.js legacy.
  - Loop MAESTRO: plan primero, verificación objetiva (GREEN/RED), sin `!important` ni `any`.
