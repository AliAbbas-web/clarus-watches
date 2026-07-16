/* ==========================================================================
   PRODUCT DETAIL PAGE — fully generated from CLARUS_PRODUCTS + the
   product code in the URL. Adding a new product object to
   products-data.js is the ONLY thing needed for it to get its own page
   here: gallery, price, description, specs, features,
   WhatsApp ordering, breadcrumbs, meta title/description, SEO
   (JSON-LD) structured data, related products, and the responsive /
   themed / animated layout are all built by this one script.

   URL formats supported:
     product.html?id=CW001   (primary — works on any static host)
     /product/CW001          (pretty URL — works if the host rewrites
                              that path to product.html; falls back
                              gracefully to reading it from the path)

   Depends on: utils.js (formatPKR, buildWhatsAppLink, buildProductInquiryMessage,
               productCardHTML, attachProductCardNavigation, placeholderWatchSVG)
               products-data.js (CLARUS_PRODUCTS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('productDetail');
  if (!root) return; // not on the product page

  const product = findProduct(getRequestedProductId());

  if (!product) {
    renderNotFound();
    return;
  }

  setSEO(product);
  renderBreadcrumbs(product);
  renderDetail(product);
  renderRelated(product);
});

/** Reads the product code from ?id=CODE, or from a /product/CODE style path as a fallback. */
function getRequestedProductId() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('id')) return params.get('id').trim().toUpperCase();

  const pathMatch = window.location.pathname.match(/\/product\/([^/]+)\/?$/i);
  if (pathMatch) return decodeURIComponent(pathMatch[1]).trim().toUpperCase();

  return '';
}

/** Looks up a product by code (case-insensitive) in the shared catalog. */
function findProduct(code) {
  if (!code) return null;
  return CLARUS_PRODUCTS.find((p) => p.code.toUpperCase() === code) || null;
}

/** Trims a string to a max length on a word boundary, adding an ellipsis if cut. */
function truncateText(str, max) {
  if (!str || str.length <= max) return str || '';
  const cut = str.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/* ==========================================================================
   SEO — title, meta description, canonical, Open Graph, JSON-LD.
   Every field here has a sensible auto-generated default so new products
   never need manual SEO work — an optional metaTitle/metaDescription on
   the product object will override the generated one when set.
   ========================================================================== */
function setSEO(product) {
  const title = product.metaTitle || `${product.name} — ${formatPKR(product.price)} | Clarus Watches`;
  const description = product.metaDescription
    || truncateText(`${product.shortDesc} ${product.description || ''}`.trim(), 155);
  const canonicalURL = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(product.code)}`;
  const images = product.images && product.images.length ? product.images : [product.image];

  document.title = title;
  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:type', 'product');
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:image', images[0]);
  setMetaTag('property', 'og:url', canonicalURL);
  setMetaTag('name', 'twitter:card', 'summary_large_image');

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalURL);

  // ---- Structured data: Product + BreadcrumbList, for rich search results ----
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.code,
    image: images,
    description: product.description || product.shortDesc,
    brand: { '@type': 'Brand', name: 'Clarus Watches' },
    offers: {
      '@type': 'Offer',
      url: canonicalURL,
      priceCurrency: 'PKR',
      price: product.price,
      availability: 'https://schema.org/InStock'
    }
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/index.html` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${window.location.origin}/products.html` },
      { '@type': 'ListItem', position: 3, name: product.category, item: `${window.location.origin}/products.html` },
      { '@type': 'ListItem', position: 4, name: product.name, item: canonicalURL }
    ]
  };

  injectJSONLD('productSchema', productSchema);
  injectJSONLD('breadcrumbSchema', breadcrumbSchema);
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
   BREADCRUMBS
   ========================================================================== */
function renderBreadcrumbs(product) {
  const list = document.getElementById('breadcrumbList');
  if (!list) return;
  list.innerHTML = `
    <li><a href="index.html">Home</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="${buildCategoryPageURL(product.category)}">${product.category}</a></li>
    <li aria-current="page">${product.name}</li>`;
}

/* ==========================================================================
   MAIN DETAIL — gallery + info panel
   ========================================================================== */
let galleryState = { images: [], index: 0, code: '', busy: false };

function renderDetail(product) {
  const root = document.getElementById('productDetailContainer');
  const images = product.images && product.images.length ? product.images : [product.image];
  galleryState = { images, index: 0, code: product.code, busy: false };

  root.innerHTML = `
    <div class="pd-grid">
      <div class="pd-gallery">
        ${galleryHTML(product)}
      </div>
      <div class="pd-info">
        <span class="product-code pd-code">${product.code}</span>
        <span class="pd-category">${product.category}</span>
        <h1 class="pd-title">${product.name}</h1>
        <div class="product-price pd-price">${formatPKR(product.price)}</div>
        ${starRatingHTML(product, 'detail')}
        <p class="pd-desc">${product.description || product.shortDesc}</p>

        ${featuresHTML(product)}

        <h3 class="pd-subhead">Specifications</h3>
        <ul class="spec-list pd-specs">
          ${Object.entries(product.specs).map(([label, value]) => `<li><span>${label}</span><span>${value}</span></li>`).join('')}
        </ul>

        <div class="pd-actions">
          <a class="btn btn--primary" target="_blank" rel="noopener"
             href="${buildWhatsAppLink(product.whatsappMessage || buildProductInquiryMessage(product))}">
            Order on WhatsApp
          </a>
          <a class="btn btn--ghost" href="products.html">Back to All Watches</a>
        </div>
      </div>
    </div>`;

  wireGalleryEvents();
}

function featuresHTML(product) {
  if (!product.features || !product.features.length) return '';
  return `
    <div class="pd-features">
      <span class="pd-block-label">Key Features</span>
      <ul class="pd-feature-list">
        ${product.features.map((f) => `<li>${f}</li>`).join('')}
      </ul>
    </div>`;
}

/* ---------------- Gallery ---------------- */
function galleryHTML(product) {
  const { images } = galleryState;
  const fallback = placeholderWatchSVG(product.code, images.length);
  const arrows = images.length > 1 ? `
      <button type="button" class="pd-gallery-nav prev" data-gallery="prev" aria-label="Previous photo">&lsaquo;</button>
      <button type="button" class="pd-gallery-nav next" data-gallery="next" aria-label="Next photo">&rsaquo;</button>
      <div class="pd-gallery-count">1 / ${images.length}</div>` : '';

  return `
    <div class="pd-gallery-frame">
      <img src="${images[0]}" alt="${product.name}" onerror="this.onerror=null;this.src='${fallback}'">
      ${arrows}
    </div>
    ${images.length > 1 ? `<div class="pd-thumbs">${images.map((src, i) => `
      <button type="button" class="pd-thumb ${i === 0 ? 'is-active' : ''}" data-thumb="${i}" aria-label="Photo ${i + 1}">
        <img src="${src}" alt="" onerror="this.onerror=null;this.src='${fallback}'">
      </button>`).join('')}</div>` : ''}`;
}

function wireGalleryEvents() {
  const gallery = document.querySelector('.pd-gallery');
  if (!gallery) return;

  gallery.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-gallery]');
    if (navBtn) {
      const dir = navBtn.dataset.gallery === 'next' ? 1 : -1;
      goToSlide((galleryState.index + dir + galleryState.images.length) % galleryState.images.length, navBtn.dataset.gallery);
      return;
    }
    const thumbBtn = e.target.closest('[data-thumb]');
    if (thumbBtn) {
      const target = parseInt(thumbBtn.dataset.thumb, 10);
      goToSlide(target, target > galleryState.index ? 'next' : 'prev');
    }
  });

  document.addEventListener('keydown', handleGalleryKeydown);
}

function handleGalleryKeydown(e) {
  if (!galleryState.images.length || galleryState.images.length < 2) return;
  if (!document.querySelector('.pd-gallery')) return;
  if (e.key === 'ArrowRight') goToSlide((galleryState.index + 1) % galleryState.images.length, 'next');
  if (e.key === 'ArrowLeft') goToSlide((galleryState.index - 1 + galleryState.images.length) % galleryState.images.length, 'prev');
}

function goToSlide(index, direction) {
  if (galleryState.busy || index === galleryState.index) return;
  galleryState.busy = true;
  galleryState.index = index;

  const frame = document.querySelector('.pd-gallery-frame');
  const img = frame?.querySelector('img');
  const countEl = document.querySelector('.pd-gallery-count');
  const fallback = placeholderWatchSVG(galleryState.code, galleryState.images.length);

  if (img) {
    const animClass = direction === 'next' ? 'gallery-anim-next' : 'gallery-anim-prev';
    img.classList.remove('gallery-anim-next', 'gallery-anim-prev');
    void img.offsetWidth;
    img.src = galleryState.images[index];
    img.onerror = function () { this.onerror = null; this.src = fallback; };
    img.classList.add(animClass);
  }
  if (countEl) countEl.textContent = `${index + 1} / ${galleryState.images.length}`;

  document.querySelectorAll('.pd-thumb').forEach((t, i) => t.classList.toggle('is-active', i === index));

  window.setTimeout(() => { galleryState.busy = false; }, 300);
}

/* ==========================================================================
   RELATED PRODUCTS — same category, excluding the current product.
   Backfilled with other catalog items if the category has too few, so
   the section never looks sparse even for a brand-new category.
   ========================================================================== */
function renderRelated(product) {
  const section = document.getElementById('relatedSection');
  const grid = document.getElementById('relatedGrid');
  if (!section || !grid) return;

  const sameCategory = CLARUS_PRODUCTS.filter((p) => p.category === product.category && p.code !== product.code);
  const others = CLARUS_PRODUCTS.filter((p) => p.category !== product.category && p.code !== product.code);
  const related = sameCategory.concat(others).slice(0, 4);

  if (!related.length) { section.style.display = 'none'; return; }

  grid.innerHTML = related.map((p, i) => productCardHTML(p, i)).join('');
  attachProductCardNavigation(grid);
  section.style.display = '';
}

/* ==========================================================================
   NOT FOUND — invalid or missing product code
   ========================================================================== */
function renderNotFound() {
  document.title = 'Watch Not Found | Clarus Watches';
  setMetaTag('name', 'description', 'This watch could not be found. Browse the full Clarus Watches catalog instead.');

  const breadcrumbBar = document.getElementById('breadcrumbBar');
  if (breadcrumbBar) breadcrumbBar.style.display = 'none';

  const root = document.getElementById('productDetailContainer');
  if (root) {
    root.innerHTML = `
      <div class="pd-not-found">
        <span class="eyebrow">Not Found</span>
        <h1>We couldn't find that watch</h1>
        <p>It may have been removed from the catalog, or the link might be incorrect.</p>
        <a class="btn btn--primary" href="products.html">Browse All Watches</a>
      </div>`;
  }

  const relatedSection = document.getElementById('relatedSection');
  if (relatedSection) relatedSection.style.display = 'none';
}
