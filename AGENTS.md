# AGENTS.md (Workflow Context) — Perfumes
> Generado: 2026-08-25 22:51:03 · Herramienta: opencode · Proyecto: /Users/pablohernandezcanelo/Documents/Perfumes

## 🎯 Objetivo actual
Rebrand completo a Sebi Fragrance Decants: nombre, ubicacion Tafi Viejo Tucuman, Instagram @decantstucuman, logo (public/images/logo.jpg), telefono vendedor 5493813844876 (Vercel production + .env), URL de Vercel renombrada a sebi-fragrance-decants.vercel.app. Carrito persistente (localStorage) + drawer + checkout (nombre/direccion/telefono) que genera pedido por WhatsApp con link por perfume (ORIGIN/catalogo/{slug}). Loop MAESTRO Iter 1-3: commits 83278c3, 08e1b58, 06a3808 (mas handoff 06a3808). build/typecheck/lint verdes, REFLECT APPROVED. Backlog: focus-trap en CartDrawer, quick-add desde ProductCard.

## 📍 Estado actual
  Branch: main · Working tree: SUCIO (1 archivos)

  Cambios sin commit:
   AGENTS.md | 53 +++++------------------------------------------------
   1 file changed, 5 insertions(+), 48 deletions(-)
   M AGENTS.md

  Últimos commits:
  06a3808 docs: handoff rebrand Sebi Fragrance Decants + carrito WhatsApp + rename URL
  08e1b58 feat: Iter 2+3 — carrito + checkout con pedido por WhatsApp
  83278c3 feat: Iter 1 — rebrand Sebi Fragrance Decants, logo, Instagram y teléfono
  cdc7b42 feat: Iter 4 — Button.tsx consume .btn-gold (sistema de botón único, Opción B)
  94756ce fix: Iter 3 — tokenize residual hex/champagne + gold chips (close color gate)

## ✅ Tareas activas
  (sin tareas activas)

## 🧭 Próximo paso
_(continuar donde quedó opencode. Si hay tareas in_progress arriba, retomar la primera.)_

## 🧱 Archivos clave / arquitectura
  .
.env
.env.example
.vercel
.vercel/project.json
.vercel/README.txt
AGENTS.md
design-system
design-system/perfumes-exclusivos
eslint.config.mjs
LOOP.md
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
README.md
src
src/app
src/components
src/lib
src/proxy.ts
src/styles
src/types
tsconfig.json
tsconfig.tsbuildinfo

## 🔐 Variables de entorno requeridas
  Nombres de variables (sin valores):
    DATABASE_URL
    NEXT_PUBLIC_WHATSAPP_PHONE
    NEXTAUTH_SECRET
    NEXTAUTH_URL

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
  _(decisiones de diseño/acuerdo a registrar aquí)_
