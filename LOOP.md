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

## 🧩 Iteración 2 (alcance exacto — limpieza arquitectónica + coherencia de tokens)

**Título:** Borrar legacy muerto, migrar near-negros residuales a tokens y unificar Badge.

**Por qué este alcance:** comparte el mismo riesgo ~0 que Iter 1 (cambios mecánicos,
verificables) y cierra de una los 3 pendientes medios del backlog (legacy, residuales,
Badge). El botón único queda fuera (bajo impacto, Iter 3) para no inflar el alcance.

### Veredicto de seguridad de borrado (evidencia de grep)
| Archivo | ¿Referenciado por build/deploy? | Veredicto |
|---------|-------------------------------|----------|
| index.html (root) | No. No está en public/ → App Router no lo sirve. Única ref: su propio link a style.css (linea 14) y AGENTS.md/LOOP.md (docs). | SEGURO borrar |
| style.css (root) | No. Única ref: index.html:14 (auto) + su propio header + docs. No en globals.css/postcss. | SEGURO borrar |
| script.js (root) | No. Única ref: index.html:570 (auto) + su propio header + docs. | SEGURO borrar |
| tailwind.config.js | No. No en postcss.config.mjs (usa @tailwindcss/postcss CSS-first). No en package.json. Sin require('./tailwind. Solo en docs. | SEGURO borrar |
| .vercel/ | NO tocar (link de deploy). project.json solo IDs. | FUERA DE ALCANCE |

> Notas: no existe vercel.json. next.config.ts solo declara images.remotePatterns.
> Borrar los 3 legacy juntos (se auto-referencian). Post-borrado: grep funcional = 0.

### Subtareas atómicas

**I2.S1 — Borrar sitio estático legacy.**
- Entrada: index.html, style.css, script.js (root).
- Salida: git rm de los 3. Sin otros cambios.
- Verificación: grep funcional de index.html|style.css|script.js en src/ .vercel/ next.config.ts postcss.config.mjs = 0.
- Dueño: implementación. Estado: done.

**I2.S2 — Borrar tailwind.config.js v3 legacy.**
- Entrada: tailwind.config.js.
- Salida: git rm tailwind.config.js. Confirmar postcss.config.mjs sigue solo con @tailwindcss/postcss.
- Verificación: grep tailwind.config en src/ postcss.config.mjs package.json = 0; npm run build OK.
- Dueño: implementación. Estado: done.

**I2.S3 — Migrar near-negros residuales a tokens.**
- Entrada: DecantSection.tsx (bg-[#050507]), StorySection.tsx (bg-[#0a0a0a]),
  TestimonialsSection.tsx (bg-[#080808]), nosotros/AboutContent.tsx (bg-[#080808]),
  catalogo/[slug]/page.tsx (bg-[#050507]).
- Salida (mapeo semántico, tokens en globals.css:32-34):
  - #050507 → bg-base (≡ #05070a)
  - #0a0a0a → bg-surface (≡ #0b0e14)
  - #080808 → bg-surface
- Verificación: grep -rInE "#050507|#07070a|#080808|#0a0a0a" src/ = 0.
- Dueño: implementación. Estado: done.

**I2.S4 — Unificar ui/Badge.tsx a paleta oro/midnight.**
- Entrada: src/components/ui/Badge.tsx (variantes arabe amber, disenador blue,
  decant purple rompen identidad; bottle ya es gold).
- Salida (paleta propuesta, justificada abajo): todas las variantes usan el acento
  gold sobre superficie midnight, diferenciando por intensidad, no por matiz:
  - default:  text-white/40           bg-white/[0.03]
  - arabe:    text-gold-300  bg-gold-500/10  border-gold-500/20
  - disenador:text-gold-400  bg-gold-500/10  border-gold-500/20
  - bottle:   text-gold-400  bg-gold-500/10  border-gold-500/20   (ya)
  - decant:   text-gold-200  bg-gold-500/10  border-gold-500/20
  - Justificación: la marca es oro sobre midnight con UN solo acento. amber/blue/
    purple introducen 3 matices ajenos que manchan la coherencia (igual defecto que
    los negros fragmentados de Iter 1). Al unificar en gold, el color deja de codificar
    categoría (eso lo hace el texto/icono) y el sitio respira una sola identidad. El
    escalón gold-200/300/400 da sutil jerarquía sin romper la paleta.
- Verificación: grep -rInE "amber-|blue-|purple-" src/components/ui/Badge.tsx = 0;
  inspección visual: badges dorados coherentes en home/ProductCard/catalogo.
- Dueño: implementación. Estado: done.

**I2.S5 — Verificación global + sync docs.**
- Verificación: npm run build OK · npm run typecheck OK · npm run lint OK ·
  grep residuales = 0 · sin referencias a archivos borrados · deploy intacto.
- Salida: actualizar AGENTS.md (marcar Iter 2 done) y este LOOP.md.
- Dueño: planner+reviewer. Estado: todo.

## 🧩 Iteración 3 (alcance exacto — cerrar el gate "0 magic hex / 0 colores policromáticos")

**Título:** Tokenizar residuales near-negros, champagne hardcodeado y chips poli-cromáticos.

**Por qué este alcance:** el gate de consistencia oro/midnight seguía abierto por residuales
que escapaban a los tokens. Cambios mecánicos y verificables (mismo riesgo ~0 que I1/I2).

### Subtareas atómicas

**I3.S1 — Gradientes near-negros residuales → tokens.**
- Entrada: catalogo/[slug]/page.tsx:91 y DecantSection.tsx:62 usan
  `from-[#090c14] to-[#040406]`.
- Salida: `from-surface to-surface-sunken` (tokens globals.css:33-34).
- Verificación: grep `#090c14|#040406` en src/ = 0 (salvo @theme).
- Dueño: implementación. Estado: done.

**I3.S2 — Gradientes "champagne" hardcodeados → tokens.**
- Entrada: AboutContent.tsx:154 y WhatsAppButton.tsx:33 usan
  `from-[#c9a96c] via-[#f7e7ce] to-[#c9a96c]`.
- Salida: `from-champagne-dark via-champagne to-champagne-dark`
  (tokens `--color-champagne`/`--color-champagne-dark` ya definidos en globals.css:28-29).
- Verificación: grep `#c9a96c|#f7e7ce` en src/ = 0 (salvo @theme).
- Dueño: implementación. Estado: done.

**I3.S3 — Chips/filtros poli-cromáticos → acento dorado.**
- Entrada: catalogo/page.tsx:108/118/138 (amber/blue/purple en estado activo) y
  contacto/page.tsx:65/71 (blue en método Email).
- Salida: estado activo de chips → `bg-gold-500/20 text-gold-400 border-gold-500/30`;
  icono/card Email → `text-gold-400` / `bg-gold-500/10 border-gold-500/20`.
  Inactivo ya usa paleta midnight (sin cambios). Funcionalidad de resaltado activo intacta.
- Verificación: grep `amber-|blue-|purple-` en catalogo/page.tsx y contacto/page.tsx = 0.
- Dueño: implementación. Estado: done.

**I3.S4 — Verificación global + sync docs.**
- Verificación: npm run build OK · npm run typecheck OK · npm run lint OK ·
  grep hex residuales = 0 (fuera de @theme) · grep amber/blue/purple en los 2 archivos = 0.
- Salida: actualizar AGENTS.md (marcar Iter 3 done) y este LOOP.md.
- Dueño: planner+reviewer. Estado: done.

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

- **Iteración 4 — Sistema de botón único:** decidir si `ui/Button.tsx` se extiende con
  variante dorada para usarlo en público y eliminar clases CSS duplicadas. (Badges coherentes
  ya resueltos en Iter 2; limpieza arquitectónica ya resuelta en Iter 2.)

## 📌 Estado
| Iter | Alcance | Estado |
|------|---------|--------|
| 1 | Tokens superficie + botón dorado (público) | done |
| 2 | Borrar legacy + tailwind.config + residuales a tokens + Badge | done |
| 3 | Gate color: hex near-negros + champagne + chips amber/blue/purple → tokens | done |
| 4 | Botón único (Button.tsx admin vs .btn-gold público) | todo |
