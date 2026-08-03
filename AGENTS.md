# AGENTS.md (Workflow Context) — perfumes
> Generado: 2026-08-03 13:34:56 · Herramienta: opencode · Proyecto: /Users/pablohernandezcanelo/Documents/Perfumes

## 🎯 Objetivo actual
Buscar y proponer ideas profesionales para llevar Perfumes Exclusivos a nivel superior (UX, conversión, SEO, producto, monetización). El próximo agente debe analizar el proyecto y proponer un plan de mejoras priorizadas.

## 📍 Estado actual
- Sin repo git (⚠️ riesgo alto de pérdida)
- Sin README, sin tests
- Deploy: Vercel
- Stack: Next.js 16 + React 19 + TypeScript 6 + Prisma 5 + NextAuth v5 + Tailwind v4 + framer-motion + zod

## ✅ Tareas activas
(iniciar foco en mejoras profesionales del e-commerce)

## 🧭 Próximo paso
Proponer plan de mejoras priorizadas (UX, conversión, SEO, producto, monetización) tras revisar el proyecto.

## 🧱 Archivos clave / arquitectura
- prisma/schema.prisma — modelos Category, Product, ProductVariant (BOTTLE/DECANT), ContactMessage, AdminUser
- src/app/(public)/ — home, catalogo, nosotros, contacto
- src/app/(admin)/ — login, productos, categorias, pedidos
- src/app/api/ — auth, categorias, productos, contacto
- design-system/perfumes-exclusivos/MASTER.md — guía de diseño (premium, Cormorant/Montserrat, oscuro+dorado)

## 🔐 Variables de entorno requeridas
DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_WHATSAPP_PHONE (nombres, sin valores)

## 📦 Comandos útiles
dev: next dev · build: next build · lint: eslint src/ · db:push: prisma db push · seed: prisma db seed

## 🧠 Decisiones tomadas
- Hoy: iniciar foco en mejoras profesionales del proyecto.
