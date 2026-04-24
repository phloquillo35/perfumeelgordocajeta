/* ============================================================
   AURA PARFUMS — script.js
   Funcionalidades: Header scroll, Nav mobile, Filtros catálogo,
   Scroll reveal animations
============================================================ */

(function () {
  'use strict';

  // ── DOM helpers ──────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── 1. Header: añade clase al hacer scroll ────────────────
  const header = $('#header');

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // estado inicial

  // ── 2. Navegación mobile (hamburger) ─────────────────────
  const navToggle = $('#navToggle');
  const nav = $('#nav');
  const navLinks = $$('.nav__link');

  function openNav() {
    nav.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden'; // bloquea scroll al abrir
  }

  function closeNav() {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  // Cierra al hacer click en cualquier link del nav
  navLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // Cierra al hacer click fuera del menú
  nav.addEventListener('click', (e) => {
    if (e.target === nav) closeNav();
  });

  // ── 3. Filtros de catálogo ───────────────────────────────
  const filterBtns = $$('.filter-btn');
  const productCards = $$('.product-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Actualiza botón activo
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.style.display = '';
          // Mini animación de entrada
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── 4. Scroll Reveal (Intersection Observer) ─────────────
  // Agrega clase .reveal a secciones y tarjetas para animarlas
  const revealTargets = [
    ...$$('.product-card'),
    ...$$('.step'),
    ...$$('.shipping-card'),
    ...$$('.decants__benefits li'),
  ];

  revealTargets.forEach((el) => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Delay escalonado según posición en su fila
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // una sola vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  // ── 5. Smooth scroll para links internos ─────────────────
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = $(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const headerH = header.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 10;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  // ── 6. Botón flotante WhatsApp: ocultar en footer ────────
  const waFloat = $('#whatsappFloat');
  const footer = $('.footer');

  if (footer && waFloat) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            waFloat.style.opacity = '0';
            waFloat.style.pointerEvents = 'none';
          } else {
            waFloat.style.opacity = '1';
            waFloat.style.pointerEvents = '';
          }
        });
      },
      { threshold: 0.2 }
    );
    footerObserver.observe(footer);
  }

  // ── 7. Año dinámico en el footer ─────────────────────────
  // (el HTML ya tiene 2025 hardcoded, pero si querés dinámico descomentá:)
  // const yearEl = $('.footer__bottom p');
  // if (yearEl) yearEl.innerHTML = yearEl.innerHTML.replace('2025', new Date().getFullYear());

})();
