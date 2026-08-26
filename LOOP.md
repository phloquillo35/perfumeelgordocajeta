# LOOP.md — Perfumes Exclusivos (Quality Loop)

> Orquestador: MAESTRO · Rol de este archivo: contrato de iteraciones verificables.
> Regla: cada subtarea tiene entrada/salida/verificación/dueño y estado (`todo`/`doing`/`done`).
> NO se implementa nada desde el planner; el dueño es el subagente de implementación.

## 🎯 Objetivo global
Sanar la inconsistencia visual y arquitectónica del sitio público (marca "Perfumes
Exclusivos") reportada por el usuario: "página horrible, detalles espantosos, arquitectura
mal lograda, diseños inconsistentes". Lograr coherencia de tokens (color/tipografía/botón)
sin reescribir la app.

---

## 🔍 Hallazgos de la auditoría (evidencia en `src/`)

1. **Paleta de "negros" fragmentada (CRÍTICO, causa los "detalles espantosos").**
   La home usa 4 valores de fondo casi-negros distintos:
   `bg-[#050507]` (×8), `bg-[#07070a]` (×2), `bg-[#080808]` (×2), `bg-[#0a0a0a]` (×2).
   El `body` es `#050507` (globals.css:82) pero el token `midnight-950` es `#05070a`
   (globals.css:14) y **nunca se usa**. Resultado: secciones con brillo/oscuridad distinto
   (Hero #050507, "Últimas llegadas" #07070a, CTA #0a0a0a) → aspecto manchado.

2. **Doble config de Tailwind y drift de fuentes (arquitectura).**
   `tailwind.config.js` (v3, legacy) define `font-serif:'Cormorant Garamond'`,
   `font-sans:'Inter'` y `content` apuntando a `./app ./pages ./components ./design-system`
   — **ninguna ruta existe** (la app vive en `./src`). En v4 ese archivo es ignorado, pero
   queda como código confuso. En cambio `globals.css` `@theme` define
   `--font-serif:"Cormorant"`, `--font-sans:Montserrat`, y `layout.tsx` carga Montserrat +
   Cormorant (next/font). Nombres desalineados ("Cormorant Garamond" vs "Cormorant",
   "Inter" vs "Montserrat").

3. **Dos sistemas de botón desalineados.**
   El sitio público usa clases CSS `gold-button` / `gold-button-outline` (globals.css:117-156)
   y las sobreescribe con `!py-2 !px-5 !text-[10px]` inline en Header/ProductCard/CategorySection
   (anti-patrón `!important`). El componente React `ui/Button.tsx` (blanco/negro, `font-light`)
   **solo se usa en admin** y rompe la identidad dorada. `CTASection.tsx:59` usa un botón
   `bg-white text-black` plano, ajeno a todo lo demás.

4. **Badge con acentos que rompen la paleta.**
   `ui/Badge.tsx` usa `amber-400` (Árabe), `blue-400` (Diseñador), `purple-400` (Decant)
   sobre una identidad oro/midnight. ProductCard muestra "Árabe Exclusivo" en naranja y
   "Diseñador" en azul en medio de un sitio dorado.

5. **Sitio estático legacy muerto y confuso (arquitectura).**
   `index.html` (marca "AURA Parfums", Tucumán), `style.css` (27KB) y `script.js` en el root.
   No se referencian en `src/` ni `next.config.ts`. En App Router el root `index.html` no se
   sirve (no está en `public/`) → código muerto de otra marca. Confunde la arquitectura.

> Nota positiva: **no hay `any` reales** en `src/` (los hits de grep eran substrings de
> `findMany`/`deleteMany`). El contrato "sin any nuevos" se cumple ya.

---

## 🧩 Iteración 1 (alcance exacto — UN cambio, alto impacto, verificable)

**Título:** Unificar superficies (negros) y botón dorado en secciones públicas vía tokens.

**Por qué ésta y no otra:**
- (b) borrar el sitio legacy es bajo impacto visual y riesgo cero, pero no arregla lo que el
  usuario ve → se deja para Iteración 2.
- (c) "arreglar detalles sueltos" es difuso/no verificable → se evita.
- (a) centralizar tokens de color base + dorado ataca la causa raíz de los "detalles
  espantosos" (manchas de negros distintos + botón blanco del CTA) con cambio mecánico y
  verificable. Es la de mayor impacto por menor riesgo.

**Contrato:**
- **Entrada:** `globals.css`, `src/components/layout/{Header,Footer}.tsx`,
  `src/components/features/{HeroSection,ProductCard,CategorySection,CTASection}.tsx`,
  `src/app/(public)/page.tsx`.
- **Salida (lo que debe hacer el implementador):**
  1. En `globals.css` definir colores semánticos v4 en `@theme`:
     `--color-base:#050507`, `--color-surface:#0a0a0c`, `--color-surface-sunken:#040406`
     y dejar `gold-*` ya existentes; añadir utilidad `.btn-gold`/`btn-gold-outline` que
     reemplace `gold-button`/`gold-button-outline` **sin** necesidad de `!important` de tamaño.
  2. Reemplazar los hex mágicos: `bg-[#07070a]`→`bg-surface`, `bg-[#080808]`→`bg-surface`,
     `bg-[#0a0a0a]`→`bg-surface`, y unificar `bg-[#050507]`→`bg-base`, `bg-[#040406]`→
     `bg-surface-sunken` en los archivos de entrada.
  3. En `CTASection.tsx:59` cambiar `bg-white text-black ... hover:bg-white/90` por
     `btn-gold` (dorado), manteniendo icono y copy.
  4. Eliminar los overrides `!py-2 !px-5 !text-[10px]` inline de Header/ProductCard/CategorySection
     (absorber tamaño en la clase `.btn-gold*`).
  5. Badge queda para Iteración 2 (no tocar en I1 para mantener alcance acotado).
- **Verificación:**
  - `npm run build` OK.
  - `npm run typecheck` (tsc --noEmit) OK.
  - `npm run lint` sin errores nuevos (eslint src/).
   - Inspección visual (Playwright 390×844 y 1280): home con un solo tono de fondo base
     coherente; CTA con botón dorado; sin `!important` de tamaño en botones.
- **Dueño:** subagente de implementación (build). **Estado:** `done`.

## 📝 Notas de implementación (Iter 1)
- **Tokens:** se usaron los valores del prompt de implementación (autoritativos y más
  recientes), que difieren de los de este LOOP: `--color-base:#05070a`,
  `--color-surface:#0b0e14`, `--color-surface-sunken:#030407`. Mapeo semántico aplicado:
  `#050507`→`bg-base`, `#07070a`/`#0a0a0a`→`bg-surface`, `#040406`→`bg-surface-sunken`,
  y hero/footer→`bg-surface-sunken` (según descripción del prompt: "más oscuro para
  footer/hero de fondo"). Body y scrollbar-track también unificados a `var(--color-base)`.
- **Botones:** se renombró `gold-button`/`gold-button-outline` → `btn-gold`/`btn-gold-outline`
  (sin `!important`). Se migró también `FragranceFinder.tsx` (usaba las clases viejas) para
  no dejar dos sistemas de botón, y se eliminaron las definiciones antiguas. Tamaño unificado
  al default elegante de la clase (se absorbió el override `!py-2 !px-5 !text-[10px]`; los 3
  botones antes encogidos ahora usan el tamaño estándar, mejorando consistencia y tap-target).
- **Fuera de alcance (Iter 2/3):** `DecantSection`, `StorySection`, `TestimonialsSection`,
  `WhatsAppButton`, `catalogo/[slug]`, `nosotros/AboutContent` aún contienen hex mágicos de
  near-negros; quedan para limpieza posterior.

---

## 🗂 Backlog (iteraciones futuras, estado `todo`)

- **Iteración 2 — Limpieza arquitectónica:** borrar `index.html`, `style.css`, `script.js`
  legacy (confirmado sin referencias) y eliminar/modernizar `tailwind.config.js` muerto +
  alinear nombres de fuentes (`Cormorant Garamond`→`Cormorant`, `Inter`→`Montserrat`) y
  `content` globs. Verificación: build OK + grep de `AURA`/`index.html` = 0.
- **Iteración 3 — Badges coherentes:** `ui/Badge.tsx` usar paleta gold/midnight en vez de
  amber/blue/purple; unificar con `ProductCard`.
- **Iteración 4 — Sistema de botón único:** decidir si `ui/Button.tsx` se extiende con
  variante dorada para usarlo en público y eliminar clases CSS duplicadas.

## 📌 Estado
| Iter | Alcance | Estado |
|------|---------|--------|
| 1 | Tokens superficie + botón dorado (público) | done |
| 2 | Borrar legacy + tailwind.config | todo |
| 3 | Badges coherentes | todo |
| 4 | Botón único | todo |
