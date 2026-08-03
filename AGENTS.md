# AGENTS.md (Workflow Context) — perfumes
> Generado: 2026-08-03 14:33:00 · Herramienta: Antigravity · Proyecto: /Users/pablohernandezcanelo/Documents/Perfumes

## 🎯 Objetivo actual
Mejoras profesionales de e-commerce (UX, conversión, SEO, modelo de datos y validaciones).

## 📍 Estado actual
- Repositorio Git: Inicializado con commit base `95bad04` y commit de mejoras `641debd` ✅
- Linter & Typecheck: `npm run lint` (0 warnings) y `npm run typecheck` (0 errors) ✅
- Deploy: Vercel
- Stack: Next.js 16 + React 19 + TypeScript 6 + Prisma 5 + NextAuth v5 + Tailwind v4 + framer-motion + zod

## ✅ Tareas completadas
- [x] Initial Commit git (`95bad04`)
- [x] Script `typecheck` en `package.json`
- [x] Prisma Schema: Modelos `Order`, `OrderItem` y `Review` con relaciones
- [x] SEO: Datos estructurados JSON-LD Schema.org (`Product`, `Offer`) en detalle de producto
- [x] UX/Conversión: Trust badges ("100% Originales", "Decants Puros", "Envío Seguro")
- [x] WhatsApp: Formateador de pedidos multi-producto para carrito

## 🧭 Próximo paso
Implementar frontend/UI de reseñas en la página de producto y módulo de gestión de órdenes en panel de administración.

## 🧱 Archivos clave / arquitectura
- prisma/schema.prisma — modelos Category, Product, ProductVariant, Order, OrderItem, Review, ContactMessage, AdminUser
- src/app/(public)/ — home, catalogo, nosotros, contacto
- src/app/(admin)/ — login, productos, categorias, pedidos
- src/lib/whatsapp.ts — generador de enlaces e impresiones de carrito para WhatsApp
- design-system/perfumes-exclusivos/MASTER.md — guía de diseño (premium, Cormorant/Montserrat, oscuro+dorado)

## 🔐 Variables de entorno requeridas
DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_WHATSAPP_PHONE (nombres, sin valores)

## 📦 Comandos útiles
dev: next dev · build: next build · lint: npm run lint · typecheck: npm run typecheck · db:push: npx prisma db push · generate: npx prisma generate

## 🧠 Decisiones tomadas
- Modelo Order y OrderItem estructurado para soportar ventas registradas.
- Schema.org JSON-LD integrado directo para SEO sin dependencias extra.
