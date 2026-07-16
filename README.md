# Clarus Watches — Website

Plain HTML/CSS/JS, no frameworks, no build step. Open `index.html` in a
browser, or upload the whole folder to any static host.

## File map

```
index.html      Home  (hero, stats, featured collection, why-choose)
about.html      About (mission/vision/values, founder quote)
products.html   Products (full catalog, category filters, modal)
reviews.html    Customer Review (gallery, review cards, lightbox)
contact.html    Contact Us (form, contact info, hours)

css/variables.css   Colors, fonts, spacing — edit this first for re-skinning
css/base.css        Reset, typography, buttons, utilities (shared)
css/layout.css      Navbar, footer, floating WhatsApp button (shared)
css/components.css  Card/modal/form components (shared, reused across pages)
css/animations.css  Shared keyframes
css/responsive.css  Tablet + mobile breakpoints (shared)
css/home.css        Home-only: hero
css/about.css       About-only: page banner, founder quote
css/products.css    Products-only: page banner, filter chips
css/reviews.css     Reviews-only: page banner, "leave a review" CTA
css/contact.css     Contact-only: page banner, business hours

js/utils.js          WhatsApp link builder, currency formatter, placeholder image generator
js/theme.js          Light/dark toggle (saved in localStorage)
js/navigation.js     Sticky navbar, mobile menu, active-page highlight, back-to-top
js/counters.js       Animated stat counters (Home only)
js/products-data.js  Product catalog — EDIT THIS to add/change watches
js/products.js       Renders product cards + the details modal
js/reviews.js        Sample review data + gallery lightbox
js/contact.js        Contact form validation + submit feedback
```

## Common edits

**Logo** — every page looks for it at `/Images/Clarus Watches Logo.png`
(as given). Drop your logo file at that exact path/name on your server.
If it's missing, the text "Clarus Watches" still shows on its own.

**WhatsApp number** — change once in `js/utils.js`:
```js
const CLARUS_WHATSAPP_NUMBER = '923343407848';
```
Every WhatsApp button/link on every page reads from this one constant.

**Add or edit products** — open `js/products-data.js` and copy one object
in the `CLARUS_PRODUCTS` array, then change the values. Fields:
`code`, `name`, `category`, `price`, `shortDesc`, `image`, `specs` (object
of label→value), `featured` (true = also shows on the Home page).

**Product photos** — put real photos at `images/products/<code>.jpg`
(lowercase code, e.g. `images/products/cw001.jpg`) matching each
product's `image` path. Until a file exists there, a generated
placeholder watch graphic is shown automatically — no code changes
needed when you add the real photo later.

**Review photos** — `reviews.html` currently shows 12 generated
placeholder tiles. Replace the loop in `js/reviews.js`
(`reviewGallery` section) with your own `<img>` list pointing at
`images/reviews/`.

**Colors / fonts / spacing** — all in `css/variables.css`. Change
`--accent` to re-brand the whole site instantly.

## Notes

- No backend: the contact form (`js/contact.js`) simulates a submission.
  Wire the `fetch()` call in that file to a real endpoint when ready.
- Everything is responsive down to small phones and respects
  `prefers-reduced-motion`.
- Keyboard focus is visible everywhere (accessibility).
