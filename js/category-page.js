/* ==========================================================================
   CATEGORY PAGE — one reusable template (category.html) generates a
   full page for ANY category value found in products-data.js. Nothing
   here is hard-coded to "Men's Watches" / "Women's Watches" / "Couple
   Watches" — those three just happen to be the categories currently in
   use. Add a new category to a product object and this same script
   builds it a hero banner, breadcrumbs, SEO tags, and a filtered grid
   with zero other code changes.

   URL format: category.html?cat=mens-watches  (slug of the category name)

   Depends on: utils.js (slugify, getCategoryList, buildCategoryPageURL,
               productCardHTML, attachProductCardNavigation, formatPKR)
               products-data.js (CLARUS_PRODUCTS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroEl = document.getElementById('categoryHero');
  if (!heroEl) return; // not on the category page

  const category = findCategory(getRequestedSlug());

  if (!category) {
    renderCategoryNotFound();
    return;
  }

  const products = CLARUS_PRODUCTS.filter((p) => p.category === category.name);
  let currentSort = 'default';

  setCategorySEO(category, products);
  renderBreadcrumbs(category);
  renderHero(category, products);
  window.addEventListener('resize', debounce(() => {
    const titleEl = document.querySelector('.category-hero-title');
    if (titleEl) { titleEl.style.fontSize = ''; fitTextToOneLine(titleEl); }
  }, 150));
  renderGrid();

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderGrid();
    });
  }

  function renderGrid() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    const list = products.slice();
    if (currentSort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);

    grid.innerHTML = list.length
      ? list.map((p, i) => productCardHTML(p, i)).join('')
      : `<p class="category-empty">No watches in this collection yet — check back soon or ask us on WhatsApp.</p>`;
    attachProductCardNavigation(grid);
  }
});

/** Reads the category slug from ?cat=SLUG. */
function getRequestedSlug() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('cat') || '').trim().toLowerCase();
}

/** Matches the requested slug against every category currently present in the catalog. */
function findCategory(slug) {
  if (!slug) return null;
  return getCategoryList().find((c) => c.slug === slug) || null;
}

/* ==========================================================================
   HERO BANNER
   ========================================================================== */
function renderHero(category, products) {
  const inner = document.querySelector('#categoryHero .category-hero-inner');
  if (!inner) return;
  const count = products.length;
  inner.innerHTML = `
    <span class="category-hero-eyebrow">Collection</span>
    <h1 class="category-hero-title">${category.name}</h1>
    <span class="category-hero-count">${count} ${count === 1 ? 'Watch' : 'Watches'}</span>`;

  fitTextToOneLine(inner.querySelector('.category-hero-title'));
}

/**
 * Guarantees the category title stays on a single line no matter the
 * name's length or the viewport width — shrinks font-size step by step
 * until it fits, on top of the CSS clamp() baseline. Keeps future
 * categories with longer names ("Limited Edition Chronographs") safe
 * without any manual tuning.
 */
function fitTextToOneLine(el) {
  if (!el) return;
  const parent = el.parentElement;
  if (!parent) return;

  const maxWidth = parent.clientWidth;
  let fontSize = parseFloat(window.getComputedStyle(el).fontSize);
  let guard = 0;

  while (el.scrollWidth > maxWidth && fontSize > 18 && guard < 40) {
    fontSize -= 1;
    el.style.fontSize = `${fontSize}px`;
    guard += 1;
  }
}

/* ==========================================================================
   BREADCRUMBS
   ========================================================================== */
function renderBreadcrumbs(category) {
  const list = document.getElementById('breadcrumbList');
  if (!list) return;
  list.innerHTML = `
    <li><a href="index.html">Home</a></li>
    <li><a href="products.html">Products</a></li>
    <li aria-current="page">${category.name}</li>`;
}

/* ==========================================================================
   SEO — title, meta description, canonical, Open Graph, JSON-LD
   ========================================================================== */
function setCategorySEO(category, products) {
  const title = `${category.name} — Shop the Collection | Clarus Watches`;
  const description = `Explore ${products.length} ${category.name.toLowerCase()} at Clarus Watches — premium quality, affordable prices, and free delivery all over Pakistan. Order instantly on WhatsApp.`;
  const canonicalURL = `${window.location.origin}${window.location.pathname}?cat=${encodeURIComponent(category.slug)}`;

  document.title = title;
  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalURL);
  if (products[0]) setMetaTag('property', 'og:image', products[0].image);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalURL);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonicalURL,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${window.location.origin}/product.html?id=${p.code}`,
        name: p.name
      }))
    }
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/index.html` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${window.location.origin}/products.html` },
      { '@type': 'ListItem', position: 3, name: category.name, item: canonicalURL }
    ]
  };

  injectJSONLD('categorySchema', collectionSchema);
  injectJSONLD('categoryBreadcrumbSchema', breadcrumbSchema);
}

function setMetaTag(attr, key, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function injectJSONLD(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/* ==========================================================================
   NOT FOUND — unknown/mistyped category slug
   ========================================================================== */
function renderCategoryNotFound() {
  document.title = 'Collection Not Found | Clarus Watches';
  setMetaTag('name', 'description', 'This collection could not be found. Browse the full Clarus Watches catalog instead.');

  const inner = document.querySelector('#categoryHero .category-hero-inner');
  if (inner) {
    inner.innerHTML = `
      <span class="category-hero-eyebrow">Not Found</span>
      <h1 class="category-hero-title" style="font-size: var(--fs-2xl);">We couldn't find that collection</h1>`;
  }

  const breadcrumbBar = document.getElementById('breadcrumbBar');
  if (breadcrumbBar) breadcrumbBar.style.display = 'none';

  const gridSection = document.querySelector('.category-section .container');
  if (gridSection) {
    gridSection.innerHTML = `
      <div class="category-not-found">
        <p>It may have been renamed, or the link might be incorrect.</p>
        <a class="btn btn--primary" href="products.html">Browse All Watches</a>
      </div>`;
  }
}
