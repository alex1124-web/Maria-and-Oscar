/* ============================================
   MARIA & OSCAR ROOFING LLC — LANDING PAGE SCRIPTS
   Premium interactions, animations, and conversions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Header Scroll Effect ----
  initHeaderScroll();

  // ---- Mobile Menu Toggle ----
  initMobileMenu();

  // ---- 3D Container Scroll Animation ----
  initContainerScroll();

  // ---- Auto-tag untagged elements for scroll animation ----
  initAutoReveal();

  // ---- Scroll Reveal Animations ----
  initScrollReveal();

  // ---- Counter Animations ----
  initCounterAnimations();

  // ---- Smooth Scroll for Anchor Links ----
  initSmoothScroll();

  // ---- Form Handling ----
  initFormHandling();

  // ---- Parallax on Hero ----
  initHeroParallax();
});

/* ==========================================
   Header Scroll Effect
   ========================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      header.classList.add('header--transparent');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================
   Mobile Menu Toggle
   ========================================== */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================
   3D Container Scroll Animation (gallery showcase)
   ========================================== */
function initContainerScroll() {
  if (window.innerWidth <= 768) return;
  const section = document.getElementById('gallery');
  const card = document.getElementById('gallery-scroll-card');
  if (!section || !card) return;

  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight;

    // progress: 0 when section enters viewport, 1 when section top reaches viewport top
    const progress = Math.max(0, Math.min(1, (viewH - rect.top) / viewH));

    const rotate = 22 * (1 - progress);
    const scale = 1.06 - 0.06 * progress;

    card.style.transform = `rotateX(${rotate}deg) scale(${scale})`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ==========================================
   Auto-tag Elements for Scroll Animation
   ========================================== */
function initAutoReveal() {
  const revealClasses = new Set(['reveal', 'reveal-left', 'reveal-right', 'reveal-scale']);
  const skipSections = new Set(['hero']);

  // Selectors for elements that should animate in on scroll
  const targets = document.querySelectorAll(
    'section, footer, .service-card, .why-us__feature, .process-step, ' +
    '.gallery__stat, .testimonial-card, .footer__brand, .footer__heading, ' +
    '.footer__list, .footer__contact-item, .social-proof__item, .social-proof__badge'
  );

  targets.forEach(el => {
    // Skip hero section and anything already tagged
    if (skipSections.has(el.id)) return;
    if ([...el.classList].some(c => revealClasses.has(c))) return;

    el.classList.add('reveal');

    // Stagger siblings of the same parent automatically
    const siblings = [...el.parentElement.children].filter(
      child => child.classList.contains('reveal') && !child.classList.contains('visible')
    );
    const siblingIndex = siblings.indexOf(el);
    if (siblingIndex > 0) {
      el.style.transitionDelay = `${Math.min(siblingIndex * 80, 400)}ms`;
    }
  });
}

/* ==========================================
   Scroll Reveal Animations (Intersection Observer)
   ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!reveals.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================
   Counter Animations
   ========================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;

  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  function updateCount() {
    current += increment;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(updateCount);
}

/* ==========================================
   Smooth Scroll
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ==========================================
   Form Handling — Web3Forms
   Get your free access key at https://web3forms.com
  Enter arthegoat1134@gmail.com → click "Create Access Key" → check email → paste below
   ========================================== */
const WEB3FORMS_KEY = 'aa619df6-05af-4aaf-8c3c-908c7588458d';

function initFormHandling() {
  const form = document.getElementById('hero-quote-form');
  if (!form) return;

  // Add inline CSS for spin animation
  if (!document.getElementById('spin-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spin-keyframes';
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.hero__card-btn');
    const card = form.closest('.hero__card');
    const originalContent = submitBtn.innerHTML;

    const SPINNER = `
      <span style="display:inline-flex;align-items:center;gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
        </svg>
        Sending...
      </span>`;

    submitBtn.innerHTML = SPINNER;
    submitBtn.disabled = true;

    const data = {
      access_key: WEB3FORMS_KEY,
      subject: 'New Roofing Estimate Request — Maria & Oscar Roofing',
      from_name: 'Maria & Oscar Roofing Website',
      name: form.querySelector('[name="name"]').value,
      phone: form.querySelector('[name="phone"]').value,
      email: form.querySelector('[name="email"]').value,
      service: form.querySelector('[name="service"]').value,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        submitBtn.innerHTML = `
          <span style="display:inline-flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Quote Requested!
          </span>`;
        submitBtn.style.background = 'linear-gradient(135deg, #2e7d32, #1b5e20)';
        submitBtn.style.color = '#fff';
        if (card) {
          card.style.borderColor = 'rgba(46, 125, 50, 0.5)';
          card.style.boxShadow = '0 8px 40px rgba(46, 125, 50, 0.2)';
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          form.reset();
          if (card) { card.style.borderColor = ''; card.style.boxShadow = ''; }
        }, 3500);
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch {
      submitBtn.innerHTML = `<span>Error — please call us directly</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #c62828, #b71c1c)';
      submitBtn.style.color = '#fff';
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3500);
    }
  });
}

/* ==========================================
   Hero Parallax Effect
   ========================================== */
function initHeroParallax() {
  const heroImage = document.querySelector('.hero__bg-image');
  if (!heroImage) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 800;

        if (scrollY < heroHeight) {
          const parallaxOffset = scrollY * 0.3;
          heroImage.style.transform = `scale(1.05) translateY(${parallaxOffset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
