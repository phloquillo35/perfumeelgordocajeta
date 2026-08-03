# AGENTS.md (Workflow Context) — Perfumes
> Generado: 2026-08-03 18:59:27 · Herramienta: opencode · Proyecto: /Users/pablohernandezcanelo/Documents/Perfumes

## 🎯 Objetivo actual
Finalicé UI, integré TrustBadge y despliegue a Vercel

## 📍 Estado actual
  Branch: main · Working tree: SUCIO (1 archivos)

  Cambios sin commit:
   AGENTS.md | 39 +++++----------------------------------
   1 file changed, 5 insertions(+), 34 deletions(-)
   M AGENTS.md

  Últimos commits:
  bbe1000 feat: complete UI work and cleanup
  33df0bc Add TrustBadge component, clean UI exports, and update ProductCard
  b8a676c docs: update AGENTS.md with completed session tasks
  93325c4 feat(perfumes): schema Order/Review, SEO JSON-LD, trust badges and whatsapp cart integration
  180eec5 feat: initial commit for Perfumes Exclusivos e-commerce

## ✅ Tareas activas
  [done/high] Auditar home móvil (Playwright 390×844): botones/CTAs que no se ven — audit complete, mobile CTAs visible; added mobile WhatsApp CTA and viewport metadata
  [pending/high] Auditar admin móvil: botones ocultos (necesita login o análisis de código responsive)
  [pending/medium] Detallar plan de implementación: Más vendidos + KPIs pedidos + SEO + Trust badges + Export CSV
  [pending/medium] Detallar plan Testimonios: modelo Prisma + API + admin + sección home
  [pending/medium] Entregar reporte consolidado y esperar aprobación para pasar a MODO BUILD
  [in_progress/high] Produce complete diagnosis and fix plan
  [pending/high] Fix schema.prisma: Add subtotalARS and profitARS to Product model, then run prisma generate
  [pending/high] Auditar/arreglar CartContext.tsx para evitar setState dentro de useEffect (React 19 anti-pattern)
  [pending/medium] Corregir errores de ESLint y TypeScript (eliminar `any` types y otros errores comunes)
  [pending/medium] Revisar y actualizar dependencias con vulnerabilidades, verificar build final

## 🧭 Próximo paso
_(continuar donde quedó opencode. Si hay tareas in_progress arriba, retomar la primera.)_

## 🧱 Archivos clave / arquitectura
  .
.env
.env.example
.vercel
.vercel/README.txt
.vercel/project.json
AGENTS.md
README.md
design-system
design-system/perfumes-exclusivos
eslint.config.mjs
index.html
next-env.d.ts
next.config.ts
package-lock.json
package.json
postcss.config.mjs
prisma
prisma/schema.prisma
prisma/seed.ts
public
public/images
public/video
script.js
src
src/app
src/components
src/lib
src/proxy.ts
src/styles
src/types
style.css
tailwind.config.js
tsconfig.json
tsconfig.tsbuildinfo

## 🔐 Variables de entorno requeridas
  Nombres de variables (sin valores):
    DATABASE_URL
    NEXTAUTH_SECRET
    NEXTAUTH_URL
    NEXT_PUBLIC_WHATSAPP_PHONE

## 📦 Comandos útiles
  Scripts disponibles:
    dev: next dev -p 3003
    build: next build
    start: next start
    lint: eslint src/ --max-warnings=100
    typecheck: tsc --noEmit
    postinstall: prisma generate
    db:push: prisma db push
    db:migrate: prisma migrate dev
    db:seed: prisma db seed
    db:studio: prisma studio
    typecheck: npx tsc --noEmit

## 🧠 Decisiones tomadas
  - Modelo Order y OrderItem estructurado para soportar ventas registradas.
  - Schema.org JSON-LD integrado directo para SEO sin dependencias extra.
