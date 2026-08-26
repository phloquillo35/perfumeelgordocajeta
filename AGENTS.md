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
- SITIO ESTÁTICO LEGACY MUERTO en root: `index.html` ("AURA Parfums"), `style.css`, `script.js` — sin referencias en `src/` ni `next.config`. Código muerto de otra marca → borrar en Iter 2.
- `tailwind.config.js` (v3 legacy, `content` apunta a `./app` inexistente) ignorado en v4 pero confuso → borrar en Iter 2.
- `design-system/perfumes-exclusivos/` existe pero vacío/incipiente.

## 📋 Backlog Iter 2 (no bloqueante, fuera de scope Iter 1)
  [pending/medium] Migrar residuales a tokens: DecantSection (#050507), StorySection (#0a0a0a), TestimonialsSection (#080808), nosotros/AboutContent (#080808), catalogo/[slug] (#050507).
  [pending/medium] Borrar sitio estático legacy (index.html/style.css/script.js) + tailwind.config.js v3.
  [pending/medium] Unificar Badges (Badge.tsx usa amber/blue/purple que rompen identidad oro/midnight).
  [pending/low]    Botón único: `ui/Button.tsx` (admin) vs `.btn-gold` (público) → un sistema.

## 🧭 Próximo paso
Retomar Iter 2: (a) borrar legacy estático + tailwind.config.js, (b) migrar secciones residuales a tokens. Re-ejecutar loop (planner→joaco→tester→reviewer).

## 🔐 Variables de entorno requeridas
  DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_WHATSAPP_PHONE

## 📦 Comandos útiles
  dev: next dev -p 3003 · build: next build · lint: eslint src/ · typecheck: tsc --noEmit
  db:push / db:migrate / db:seed / db:studio

## 🧠 Decisiones
  - Identidad: oro sobre midnight. Un solo near-negro (`--color-base`).
  - Tailwind v4 (CSS-first `@theme`); no usar tailwind.config.js legacy.
  - Loop MAESTRO: plan primero, verificación objetiva (GREEN/RED), sin `!important` ni `any`.
