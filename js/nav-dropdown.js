/* ==========================================================================
   "WATCHES" NAV DROPDOWN — shown on every page. Exactly four plain-text
   links: All, Mens, Womens, Couple. No thumbnails/prices — just the
   category name, per the site's nav spec. Opens on hover (the primary
   interaction) and also toggles on click/tap for touch devices; a
   click is never required on desktop.

   Categories are intentionally a fixed list here (a navigation-design
   decision), but each link's destination is built from the real
   category name via buildCategoryPageURL(), so if you ever rename a
   category in products-data.js you only need to update the
   `categoryName` values below to match — the rest of the site
   (category pages, filters, breadcrumbs) stays fully automatic.
   ========================================================================== */

const NAV_CATEGORIES = [
  { label: 'Mens', categoryName: "Men's Watches" },
  { label: 'Womens', categoryName: "Women's Watches" },
  { label: 'Couple', categoryName: 'Couple Watches' }
];

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('watchesDropdown');
  const panel = document.getElementById('watchesDropdownPanel');
  const trigger = dropdown?.querySelector('.nav-dropdown-trigger');
  if (!dropdown || !panel || !trigger) return;

  renderDropdownPanel(panel);

  // ---- Click / tap also toggles it (needed for touch devices, where
  // :hover never fires) — hover alone is enough on desktop ----
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) closeDropdown();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  function closeDropdown() {
    dropdown.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});

function renderDropdownPanel(panel) {
  panel.innerHTML = NAV_CATEGORIES.map((cat) => {
    const url = cat.url || buildCategoryPageURL(cat.categoryName);
    return `<a class="nav-dropdown-link" href="${url}">${cat.label}</a>`;
  }).join('');
}
