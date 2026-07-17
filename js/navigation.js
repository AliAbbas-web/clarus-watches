/* ==========================================================================
   NAVIGATION — sticky navbar shadow, mobile menu, active-page highlight,
   back-to-top. This is a multi-page site (each nav item is its own
   .html file), so "active" is based on the current page, not scroll
   position — in-page smooth scrolling (e.g. Home's CTA buttons) still
   works via native CSS `scroll-behavior: smooth` in base.css.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const navClose = document.getElementById('navClose');
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const backToTop = document.getElementById('backToTop');

  // ---- Highlight the nav link matching the current page ----
  // product.html (a single product's detail page) still counts as "All
  // Products". category.html (Men's/Women's/Couple Watches) highlights
  // the "Watches" dropdown trigger instead, since that's the menu it
  // belongs under.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isCategoryPage = currentPage === 'category.html';
  const activePage = currentPage === 'product.html' ? 'products.html' : currentPage;

  links.forEach((link) => {
    const linkPage = link.getAttribute('href').split('#')[0].split('?')[0] || 'index.html';
    link.classList.toggle('active', !isCategoryPage && linkPage === activePage);
  });

  const watchesTrigger = document.querySelector('#watchesDropdown .nav-dropdown-trigger');
  if (watchesTrigger) watchesTrigger.classList.toggle('active', isCategoryPage);

  // ---- Navbar shadow + back-to-top visibility on scroll ----
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('is-scrolled', scrolled);
    if (backToTop) backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
  };
  window.addEventListener('scroll', debounce(onScroll, 20));
  onScroll();

  // ---- Mobile menu (left-side off-canvas panel + dark overlay) ----
  if (navToggle) {
    const openMenu = () => {
      navLinks.classList.add('is-open');
      navToggle.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      if (navOverlay) navOverlay.classList.add('is-open');
      document.body.classList.add('nav-open');
    };

    const closeMenu = () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (navOverlay) navOverlay.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    // Tapping the dark overlay outside the panel closes the menu.
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    // Close (×) button at the top-right of the panel.
    if (navClose) navClose.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    links.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ---- Back to top ----
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
