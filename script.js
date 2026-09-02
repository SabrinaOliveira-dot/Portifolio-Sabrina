document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Typewriter (runs once on load) ---------- */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const fullText = typewriterEl.textContent.trim();

    if (prefersReducedMotion) {
      typewriterEl.textContent = fullText;
    } else {
      typewriterEl.textContent = '';
      let i = 0;
      const type = () => {
        if (i <= fullText.length) {
          typewriterEl.textContent = fullText.slice(0, i);
          i++;
          setTimeout(type, 55);
        }
      };
      setTimeout(type, 400);
    }
  }

  /* ---------- Skill bars fill on scroll into view ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');

  if ('IntersectionObserver' in window && skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level') || '0';
          const fill = bar.querySelector('.skill-bar__fill');
          if (fill) fill.style.width = level + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.4 });

    skillBars.forEach((bar) => observer.observe(bar));
  } else {
    skillBars.forEach((bar) => {
      const level = bar.getAttribute('data-level') || '0';
      const fill = bar.querySelector('.skill-bar__fill');
      if (fill) fill.style.width = level + '%';
    });
  }

  /* ---------- Ambient floating petals ---------- */
  const petalsContainer = document.getElementById('petals');

  if (petalsContainer && !prefersReducedMotion) {
    const PETAL_COUNT = 14;

    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';

      const left = Math.random() * 100;
      const duration = 10 + Math.random() * 12;
      const delay = Math.random() * 14;
      const size = 6 + Math.random() * 8;
      const drift = (Math.random() - 0.5) * 40;

      petal.style.left = left + 'vw';
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.animationDuration = duration + 's';
      petal.style.animationDelay = delay + 's';
      petal.style.setProperty('--drift', drift + 'px');

      petalsContainer.appendChild(petal);
    }
  }
});