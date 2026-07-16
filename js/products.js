/* ==========================================================================
   PRODUCTS — renders the grid + category filter + sort on the Products
   page and the "Featured Collection" grid on Home. Clicking a card (or
   its "View Details" link) opens that product's dedicated page,
   generated dynamically by product-page.js from CLARUS_PRODUCTS.
   Depends on: utils.js (productCardHTML, attachProductCardNavigation,
               buildWhatsAppLink, placeholderWatchSVG, formatPKR)
               products-data.js (CLARUS_PRODUCTS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Free delivery badge: guarantee the phrase always fits on one line ----
  const badgeText = document.querySelector('.free-delivery-badge span');
  if (badgeText) {
    fitTextToCircle(badgeText);
    window.addEventListener('resize', debounce(() => {
      badgeText.style.fontSize = ''; // reset to CSS clamp() baseline before re-measuring
      fitTextToCircle(badgeText);
    }, 150));
  }

  const grid = document.getElementById('productGrid');
  if (!grid) return; // this page has no product grid, nothing to do

  const onlyFeatured = grid.dataset.featuredOnly === 'true';
  const chips = document.querySelectorAll('.filter-chip');
  const sortSelect = document.getElementById('sortSelect');
  let currentCategory = 'All';
  let currentSort = 'default';

  // ---- If we arrived here via a category link from the product detail
  // page, pre-select that filter chip instead of always defaulting to "All" ----
  const pendingCategory = onlyFeatured ? null : sessionStorage.getItem('clarus-pending-category');
  if (pendingCategory) {
    sessionStorage.removeItem('clarus-pending-category');
    const matchingChip = Array.from(chips).find((c) => c.dataset.category === pendingCategory);
    if (matchingChip) {
      chips.forEach((c) => c.classList.remove('is-active'));
      matchingChip.classList.add('is-active');
      currentCategory = pendingCategory;
    }
  }

  // ---- Applies the active sort option without touching which products matched the filter ----
  function sortProducts(list) {
    const sorted = list.slice();
    if (currentSort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (currentSort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    // 'default' -> leave in catalog order
    return sorted;
  }

  // ---- Renders the grid using the active category filter + sort option ----
  function renderGrid() {
    const source = onlyFeatured ? CLARUS_PRODUCTS.filter((p) => p.featured) : CLARUS_PRODUCTS;
    const filtered = !currentCategory || currentCategory === 'All'
      ? source
      : source.filter((p) => p.category === currentCategory);
    const list = sortProducts(filtered);

    grid.innerHTML = list.length
      ? list.map((p, i) => productCardHTML(p, i)).join('')
      : `<p class="products-empty">No watches in this category yet — check back soon or ask us on WhatsApp.</p>`;

    attachProductCardNavigation(grid);
  }

  // ---- Category filter chips (Products page only) ----
  if (chips.length) {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        currentCategory = chip.dataset.category;
        renderGrid();
      });
    });
  }

  // ---- Sort dropdown (Products page only) ----
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderGrid();
    });
  }

  renderGrid();
});
