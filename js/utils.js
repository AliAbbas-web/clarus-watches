/* ==========================================================================
   UTILS — shared helper functions used by multiple modules
   ========================================================================== */

/**
 * Clarus Watches business WhatsApp number, in international format
 * with no leading zero/plus (WhatsApp's click-to-chat format).
 * Change this ONE value to update every WhatsApp link on the site.
 */
const CLARUS_WHATSAPP_NUMBER = '923343407848'; // 0334 3407848 -> +92 334 3407848

/**
 * Builds a wa.me click-to-chat link with a pre-filled message.
 * @param {string} message - the plain-text message to pre-fill
 * @returns {string} full wa.me URL
 */
function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CLARUS_WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Builds the standard product inquiry message for a given product.
 * Produces a structured, multi-line message (product name, code, comma-
 * formatted price) that buildWhatsAppLink() then URL-encodes so spaces
 * and line breaks show up correctly inside WhatsApp.
 * @param {{code: string, name: string, price: number}} product
 */
function buildProductInquiryMessage(product) {
  return `Hi Clarus Watches, I'm interested in this watch.\n\n`
    + `Product: ${product.name}\n`
    + `Code: ${product.code}\n`
    + `Price: ${formatPKR(product.price)}\n\n`
    + `Is it available?`;
}

/** Formats a number as PKR currency, e.g. 12500 -> "Rs. 12,500" */
function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Generates a placeholder watch image as an inline SVG data URI.
 * Used as the default product/collection image until real photography
 * is dropped into /images/products. Each placeholder is tinted using a
 * seed so the grid doesn't look like 50 identical boxes, and it always
 * carries the brand's bezel-tick motif + product code for easy scanning.
 *
 * @param {string} code - product code, e.g. "CW014" (shown on the face)
 * @param {number} seed - any integer, used to vary the tint
 */
function placeholderWatchSVG(code, seed = 0) {
  const hueShift = (seed * 37) % 360;
  const tick = (i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const rOuter = 92, rInner = i % 3 === 0 ? 76 : 84;
    const x1 = 100 + rOuter * Math.sin(angle);
    const y1 = 100 - rOuter * Math.cos(angle);
    const x2 = 100 + rInner * Math.sin(angle);
    const y2 = 100 - rInner * Math.cos(angle);
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#34e600" stroke-width="${i % 3 === 0 ? 3 : 1.5}" stroke-linecap="round" opacity="0.85"/>`;
  };
  const ticks = Array.from({ length: 12 }, (_, i) => tick(i)).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="bg${seed}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hueShift}, 8%, 12%)"/>
          <stop offset="100%" stop-color="hsl(${hueShift}, 10%, 7%)"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bg${seed})"/>
      <circle cx="100" cy="100" r="92" fill="none" stroke="#2a2a26" stroke-width="1"/>
      ${ticks}
      <circle cx="100" cy="100" r="60" fill="none" stroke="#2a2a26" stroke-width="1"/>
      <line x1="100" y1="100" x2="100" y2="58" stroke="#f4f4ef" stroke-width="3" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="130" y2="100" stroke="#34e600" stroke-width="2" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="4" fill="#34e600"/>
      <text x="100" y="150" text-anchor="middle" font-family="monospace" font-size="13" fill="#79796f" letter-spacing="1">${code}</text>
    </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Attaches an error fallback to an <img> so that once real product
 * photography is added to /images/products/, it's used automatically —
 * and until then, the generated placeholder above fills in silently.
 */
function withImageFallback(imgEl, fallbackSrc) {
  imgEl.addEventListener('error', () => {
    imgEl.src = fallbackSrc;
    imgEl.dataset.placeholder = 'true';
  }, { once: true });
}

/**
 * Shrinks an element's font-size step by step until its text content
 * fits on a single line inside its parent badge, without ever
 * overflowing. Used for the Free Delivery badge so the exact same
 * markup/CSS works at any badge size/viewport, instead of relying
 * purely on CSS clamp() guesswork.
 * @param {HTMLElement} el - the text element (direct child of the badge)
 */
function fitTextToCircle(el) {
  if (!el) return;
  const badge = el.parentElement;
  if (!badge) return;

  const maxWidth = badge.clientWidth * 0.86; // usable width inside the badge's padding
  let fontSize = parseFloat(window.getComputedStyle(el).fontSize);
  let guard = 0;

  while (el.scrollWidth > maxWidth && fontSize > 8 && guard < 40) {
    fontSize -= 0.5;
    el.style.fontSize = `${fontSize}px`;
    guard += 1;
  }
}

/**
 * Turns a category name into a URL-safe slug, e.g. "Men's Watches" -> "mens-watches".
 * Used both to build links to category.html and to match the ?cat= param
 * back to a real category name — one function, so the two always agree.
 */
function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Builds the URL to a category's dedicated page.
 * @param {string} categoryName - e.g. "Men's Watches"
 */
function buildCategoryPageURL(categoryName) {
  return `category.html?cat=${slugify(categoryName)}`;
}

/**
 * Returns every distinct category currently present in CLARUS_PRODUCTS,
 * in first-seen order, each paired with its slug. This is what makes
 * category pages fully automatic — a brand-new category value on a
 * product object shows up here (and therefore gets a working page)
 * with no other code changes.
 */
function getCategoryList() {
  if (typeof CLARUS_PRODUCTS === 'undefined') return [];
  const seen = new Map();
  CLARUS_PRODUCTS.forEach((p) => {
    if (!seen.has(p.category)) seen.set(p.category, slugify(p.category));
  });
  return Array.from(seen, ([name, slug]) => ({ name, slug }));
}

/** Simple debounce for scroll/input handlers */
function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Builds the URL to a product's dedicated detail page for a given code.
 * Centralised here so every link into product.html is generated the
 * same way, however many products get added to the catalog.
 * @param {string} code - product code, e.g. "CW014"
 */
function buildProductPageURL(code) {
  return `product.html?id=${encodeURIComponent(code)}`;
}

/**
 * Renders a 5-star customer rating (partial stars filled yellow based on
 * the average rating) plus the review count, e.g. "4.7 (8)". Looks the
 * rating up from CLARUS_REVIEWS by product code; renders nothing if no
 * review data exists for that code, so it degrades gracefully.
 * @param {object} product - a CLARUS_PRODUCTS entry
 * @param {string} scope - unique-ish prefix so gradient IDs never collide
 *                          when the same product renders more than once
 *                          on a page (e.g. card + related-products)
 */
function starRatingHTML(product, scope = 'card') {
  const review = (typeof CLARUS_REVIEWS !== 'undefined') ? CLARUS_REVIEWS[product.code] : null;
  if (!review) return '';
  const { rating, count } = review;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const fillPct = Math.round(Math.max(0, Math.min(1, rating - i)) * 100);
    const gradId = `starGrad-${scope}-${product.code}-${i}`;
    return `
      <svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="${gradId}">
            <stop offset="${fillPct}%" stop-color="#FFC53D"/>
            <stop offset="${fillPct}%" stop-color="#D9D7CC"/>
          </linearGradient>
        </defs>
        <path fill="url(#${gradId})" d="M12 2.5l2.95 6.28 6.75.86-4.98 4.7 1.32 6.86L12 17.9l-5.04 3.3 1.32-6.86-4.98-4.7 6.75-.86L12 2.5z"/>
      </svg>`;
  }).join('');
  return `
    <div class="product-rating" aria-label="Rated ${rating} out of 5 from ${count} reviews">
      <span class="stars">${stars}</span>
      <span class="rating-value">${rating.toFixed(1)}</span>
      <span class="rating-count">(${count})</span>
    </div>`;
}

/**
 * Renders a single product card. Shared by the Products grid, the Home
 * page "Featured Collection" grid, and the "Related Products" section
 * on the product detail page — one implementation, used everywhere, so
 * every new product automatically looks/behaves the same across the site.
 * @param {object} product - a CLARUS_PRODUCTS entry
 * @param {number} index - position in the rendered list (stagger delay + placeholder tint)
 */
function productCardHTML(product, index = 0) {
  const fallback = placeholderWatchSVG(product.code, index);
  const oldPrice = Math.round(product.price * 1.35 / 50) * 50;
  return `
    <article class="product-card card-enter" data-category="${product.category}" data-code="${product.code}"
             style="animation-delay:${Math.min(index * 40, 320)}ms">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.onerror=null;this.src='${fallback}'">
        <span class="product-code">${product.code}</span>
      </div>
      <div class="product-body">
        <h4 class="product-title">${product.name}</h4>
        <div class="product-price">
          <span class="current-price">${formatPKR(product.price)}</span>
          <span class="old-price">${formatPKR(oldPrice)}</span>
        </div>
        ${starRatingHTML(product, 'card')}
      </div>
    </article>`;
}

/**
 * Makes every .product-card inside a container clickable through to its
 * dedicated product page.
 * @param {HTMLElement} container - element containing .product-card nodes
 */
function attachProductCardNavigation(container) {
  if (!container) return;
  container.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const code = card.dataset.code;
      if (code) window.location.href = buildProductPageURL(code);
    });
  });
}
