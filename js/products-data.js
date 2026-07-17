/* ==========================================================================
   PRODUCT DATA
   The real Clarus Watches catalog. This is the ONLY place product info
   lives — the Home page ("Featured Collection"), the Products page grid,
   the dynamic product detail page (product.html?id=CODE), and "Related
   Products" all render from this same array, so they never fall out of
   sync. To add a new watch, add one object below — everything else
   (product page, gallery, breadcrumbs, meta tags, SEO data, related
   products, WhatsApp ordering, etc.) is generated automatically by
   js/products.js and js/product-page.js.

   REQUIRED fields:
     code        - unique product ID, shown as a badge (e.g. "CW009")
     name        - product name
     category    - used by the filter chips + breadcrumbs + category
                   pages ("Men's Watches", "Women's Watches", "Couple
                   Watches", or any new category name you invent)
     price       - number, in PKR (formatted with formatPKR())
     image       - main/cover photo
     images      - full photo set for the gallery slider (images[0]
                   should equal image — first image is the cover)
     description - paragraph shown on the product detail page
     specs       - object of label -> value ("Specifications")
     shortDesc   - one-line tagline (card + WhatsApp inquiry context)

   OPTIONAL fields (page auto-adapts — sections are simply skipped when
   a field is omitted, so old products without them keep working):
     features       - string[] of feature bullet points
     colours        - string[] of available colour names (rendered as
                      swatches/chips on the product page)
     whatsappMessage- custom WhatsApp inquiry text override; if omitted
                      a message is generated automatically from
                      name/code/price via buildProductInquiryMessage()
     metaTitle      - custom <title> for the product page; auto-built
                      from the product name if omitted
     metaDescription- custom meta description; auto-built from
                      shortDesc/description if omitted
     featured       - true = also shows in Home's "Featured Collection"

   NOTE: delivery information is communicated site-wide via the single
   "Free Delivery All Over Pakistan" badge on the Products page — do not
   add per-product delivery badges/labels/specs here.
   ========================================================================== */

/* ---- Customer review ratings, keyed by product code ----
   rating = average star rating (0-5), count = number of reviews.
   Looked up by code so the product objects below don't need editing
   whenever review numbers change. ---- */
const CLARUS_REVIEWS = {
  CW001: { rating: 4.7, count: 8 },
  CW002: { rating: 4.8, count: 5 },
  CW003: { rating: 4.4, count: 2 },
  CW004: { rating: 4.9, count: 10 },
  CW005: { rating: 4.3, count: 6 },
  CW006: { rating: 4.6, count: 3 },
  CW007: { rating: 3.8, count: 4 },
  CW008: { rating: 4.7, count: 9 },
  CW009: { rating: 4.5, count: 5 },
  CW010: { rating: 4.9, count: 4 },
  CW011: { rating: 4.6, count: 1 },
  CW012: { rating: 3.6, count: 3 },
  CW013: { rating: 4.8, count: 4 },
  CW014: { rating: 4.3, count: 4 },
  CW015: { rating: 4.5, count: 3 },
  CW016: { rating: 4.0, count: 3 },
  CW017: { rating: 3.7, count: 3 },
  CW018: { rating: 4.2, count: 4 },
  CW019: { rating: 4.4, count: 4 },
  CW020: { rating: 3.1, count: 2 },
  CW021: { rating: 3.7, count: 6 },
  CW022: { rating: 4.2, count: 4 },
  CW023: { rating: 4.8, count: 8 },
  CW024: { rating: 4.0, count: 1 },
  };

const CLARUS_PRODUCTS = [
  {
    code: 'CW001',
    name: "Reward Premium Women's Watch",
    category: "Women's Watches",
    price: 4450,
    shortDesc: 'Timeless elegance crafted for the modern woman.',
    description: "Experience elegance and premium craftsmanship with the Reward Premium Women's Watch — VIP Edition AA, designed for women who appreciate timeless style and everyday reliability. Featuring a Japanese quartz movement, scratch-resistant sapphire glass, a premium stainless steel chain, luminous radium index, and a secure dual-clip butterfly lock. Premium packaging included.",
    image: 'https://i.postimg.cc/3rPwQ0X1/1.jpg',
    images: [
      'https://i.postimg.cc/3rPwQ0X1/1.jpg',
      'https://i.postimg.cc/Y2JSBL63/2.jpg',
      'https://i.postimg.cc/sft2CGYJ/3.jpg',
      'https://i.postimg.cc/59ZtWQBS/4.jpg',
      'https://i.postimg.cc/fW6bQSc7/5.jpg'
    ],
    specs: {
      'Edition': 'VIP Edition AA',
      'Movement': 'Japanese Quartz',
      'Glass': 'Scratch-Resistant Sapphire',
      'Strap': 'Stainless Steel Chain',
      'Lock': 'Dual Clip Butterfly Lock',
      'Luminous': 'Radium Index',
      'Packaging': 'Premium Included'
    },
    features: [
      'Japanese quartz movement for accurate, reliable timekeeping',
      'Scratch-resistant sapphire glass',
      'Premium stainless steel chain strap',
      'Luminous radium index for low-light visibility',
      'Secure dual-clip butterfly lock',
      'Premium presentation packaging included'
    ],
    colours: ['Gold', 'Silver', 'Rose Gold'],
    featured: false
  },
  {
    code: 'CW002',
    name: "Channel Women's Watch",
    category: "Women's Watches",
    price: 3150,
    shortDesc: 'Elegant sophistication with a modern touch.',
    description: "Enhance your everyday style with the Channel Women's Watch, crafted for women who appreciate elegance and comfort. Featuring a secure butterfly lock, attractive modern colours, and a refined design, this timepiece is perfect for both casual and formal occasions. Standard packaging included.",
    image: 'https://i.postimg.cc/tTXwnjKb/7.jpg',
    images: [
      'https://i.postimg.cc/tTXwnjKb/7.jpg',
      'https://i.postimg.cc/cJ7PJH5z/8.jpg',
      'https://i.postimg.cc/HkXhSnH9/6.jpg'
    ],
    specs: {
      'Brand': 'Channel',
      'Lock': 'Butterfly Lock',
      'Colours': 'New Attractive Colours',
      'Packaging': 'Standard Box Included'
    },
    features: [
      'Secure butterfly lock closure',
      'Refined, modern case design',
      'Comfortable for all-day wear',
      'Suits both casual and formal occasions'
    ],
    colours: ['Black', 'Rose Gold', 'Silver'],
    featured: true
  },
  {
    code: 'CW003',
    name: "SKMEI 9371 Men's Chronograph Watch",
    category: "Men's Watches",
    price: 4150,
    shortDesc: 'Bold precision with a modern stainless steel design.',
    description: "Elevate your everyday style with the SKMEI 9371 Men's Chronograph Watch, crafted for men who appreciate modern design and dependable performance. Featuring a premium stainless steel bracelet, reliable quartz movement, functional chronograph sub-dials, and a convenient date display, this timepiece is perfect for both business and casual wear.",
    image: 'https://i.postimg.cc/nLR7tKGQ/10.jpg',
    images: [
      'https://i.postimg.cc/nLR7tKGQ/10.jpg',
      'https://i.postimg.cc/KYqLy7DR/11.jpg',
      'https://i.postimg.cc/bvCbj09D/9.jpg'
    ],
    specs: {
      'Model': 'SKMEI 9371',
      'Movement': 'Quartz',
      'Dial': 'Chronograph with Functional Sub-Dials',
      'Case Size': '40mm',
      'Strap': 'Stainless Steel Bracelet',
      'Display': 'Date Window',
    },
    features: [
      'Functional chronograph sub-dials',
      'Convenient date display window',
      'Premium stainless steel bracelet',
      'Reliable quartz movement',
      '40mm case suited to business or casual wear'
    ],
    featured: true
  },
  {
    code: 'CW004',
    name: "Universe Point Men's Tank Watch",
    category: "Men's Watches",
    price: 1150,
    shortDesc: 'Classic tank-inspired design with timeless elegance.',
    description: "Refined and sophisticated, the Universe Point Men's Tank Watch is designed for men who appreciate timeless style. Featuring a sleek tank-inspired case, premium finish, and reliable quartz movement, this watch is ideal for both everyday wear and formal occasions. Includes a standard presentation box.",
    image: 'https://i.postimg.cc/TPXND6zp/Whats-App-Image-2026-07-08-at-4-54-35-PM-1-removebg-preview.png',
    images: [
      'https://i.postimg.cc/TPXND6zp/Whats-App-Image-2026-07-08-at-4-54-35-PM-1-removebg-preview.png',
      'https://i.postimg.cc/3wHfvTsN/Whats-App-Image-2026-07-08-at-4-54-35-PM-removebg-preview.png',
      'https://i.postimg.cc/d0KNyYb1/Whats-App-Image-2026-07-08-at-4-54-36-PM-removebg-preview.png',
      'https://i.postimg.cc/8zvnc50r/Whats-App-Image-2026-07-08-at-4-54-37-PM-removebg-preview.png'
    ],
    specs: {
      'Model': 'Universe Point Tank',
      'Movement': 'Quartz',
      'Design': 'Classic Tank Style',
      'Packaging': 'Standard Box Included'
    },
    features: [
      'Classic tank-inspired case shape',
      'Premium finish over a durable case',
      'Reliable quartz movement',
      'Standard presentation box included'
    ],
    featured: false
  },
  {
    code: 'CW005',
    name: 'Denvosi Crystal Watch',
    category: "Men's Watches",
    price: 3000,
    shortDesc: 'Sparkling elegance designed for every occasion.',
    description: "Enhance your style with the Denvosi Crystal Unisex Watch, crafted to combine elegance with everyday functionality. Featuring a shimmering crystal-studded design, a working date display, a secure butterfly lock, and available in attractive new colours, this timepiece is suitable for both men and women. Includes a standard presentation box.",
    image: 'https://i.postimg.cc/XJM0DmB1/12.jpg',
    images: [
      'https://i.postimg.cc/XJM0DmB1/12.jpg',
      'https://i.postimg.cc/4dCTFqHF/13.jpg',
      'https://i.postimg.cc/NMhwPS29/14.jpg'
    ],
    specs: {
      'Movement': 'Quartz',
      'Display': 'Working Date',
      'Lock': 'Butterfly Lock',
      'Colours': 'New Attractive Colours',
      'Packaging': 'Standard Box Included'
    },
    features: [
      'Shimmering crystal-studded bezel',
      'Working date display',
      'Secure butterfly lock',
      'Unisex design suits both men and women'
    ],
    featured: true
  },
  {
    code: 'CW006',
    name: "Bomei Luxury Women's Watch",
    category: "Women's Watches",
    price: 1300,
    shortDesc: 'Luxury styling with a timeless, sophisticated finish.',
    description: "Elevate your everyday style with the Bomei Luxury Women's Watch, designed for women who appreciate elegance and versatility. Featuring a premium luxury look and available in Silver, Gold, and Two-Tone Silver-Gold finishes, this watch is perfect for both casual and formal occasions. Includes a standard presentation box.",
    image: 'https://i.postimg.cc/VkCrhS76/1-removebg-preview-(1).png',
    images: [
      'https://i.postimg.cc/VkCrhS76/1-removebg-preview-(1).png',
      'https://i.postimg.cc/rwr0HdhF/2-removebg-preview.png',
      'https://i.postimg.cc/htdzYJCK/3-removebg-preview.png'
    ],
    specs: {
      'Movement': 'Quartz',
      'Design': 'Luxury Style',
      'Packaging': 'Standard Box Included'
    },
    features: [
      'Premium luxury styling',
      'Versatile for casual and formal occasions',
      'Available in three finishes'
    ],
    featured: false
  },
  {
    code: 'CW007',
    name: 'Aurora Couple Watch',
    category: 'Couple Watches',
    price: 4100,
    shortDesc: 'Elegant matching watches for couples.',
    description: "The Aurora Couple Watch set features matching timepieces crafted for couples who appreciate timeless elegance. Featuring a functional date display, a secure butterfly lock, durable stainless steel construction, and attractive colour options, these watches are perfect for everyday wear and special occasions.",
    image: 'https://i.postimg.cc/gJ8rM14x/4.jpg',
    images: [
      'https://i.postimg.cc/gJ8rM14x/4.jpg',
      'https://i.postimg.cc/k4KDjLwD/5.jpg',
      'https://i.postimg.cc/YSJhztNL/6.jpg'
    ],
    specs: {
      'Display': 'Working Date',
      'Lock': 'Butterfly Lock',
      'Material': 'Stainless Steel',
      'Colours': 'New Attractive Colours',
      'Packaging': 'Standard Box Included'
    },
    features: [
      'Matching his-and-hers pair design',
      'Functional date display',
      'Secure butterfly lock',
      'Durable stainless steel construction'
    ],
    featured: true
  },
  {
    code: 'CW008',
    name: "Universal Point Men's Watch",
    category: "Men's Watches",
    price: 2800,
    shortDesc: 'Premium craftsmanship with a secure butterfly lock and working date display.',
    description: "The Universal Point Men's Watch combines timeless style with dependable performance. Featuring a fully functional date display, a premium butterfly lock for a secure and comfortable fit, and available in new attractive colours, it is designed to complement both everyday wear and formal occasions. Built with quality craftsmanship.",
    image: 'https://i.postimg.cc/FHrs9cnR/Whats-App-Image-2026-07-09-at-1-14-38-AM.jpg',
    images: [
      'https://i.postimg.cc/FHrs9cnR/Whats-App-Image-2026-07-09-at-1-14-38-AM.jpg',
      'https://i.postimg.cc/3x8JKpbw/Whats-App-Image-2026-07-09-at-1-14-39-AM.jpg',
      'https://i.postimg.cc/HkYsp5P1/Whats-App-Image-2026-07-09-at-1-14-39-AM-(1).jpg',
      'https://i.postimg.cc/GmLhcYSh/Whats-App-Image-2026-07-09-at-1-14-39-AM-(2).jpg',
      'https://i.postimg.cc/HkYsp5Pk/Whats-App-Image-2026-07-09-at-1-14-40-AM.jpg'
    ],
    specs: {
      'Display': 'Working Date',
      'Lock': 'Butterfly Lock',
      'Colours': 'New Attractive Colours',
      'Availability': 'Limited Stock',
      'Packaging': 'Normal Box Included'
    },
    features: [
      'Fully functional date display',
      'Premium butterfly lock for a secure, comfortable fit',
      'Complements both everyday and formal wear',
      'Limited stock — quality craftsmanship'
    ],
    featured: false
  },
  {
  code: 'CW009',
  name: 'Audemars Piguet AP Collection',
  category: "Men's Watches",
  price: 1250,
  shortDesc: 'Classic AP-inspired design with working date and stainless steel chain.',
  description: 'The Audemars Piguet AP Collection offers a stylish and premium look for everyday wear. It features a working date display, a durable stainless steel chain, and a comfortable fit. Suitable for casual and formal occasions, this watch comes packed in a normal box.',
  image: 'https://i.postimg.cc/mD674tQ6/Whats-App-Image-2026-07-15-at-4-59-01-PM.jpg',
  images: [
    'https://i.postimg.cc/mD674tQ6/Whats-App-Image-2026-07-15-at-4-59-01-PM.jpg',
    'https://i.postimg.cc/G2SvRHk5/Whats-App-Image-2026-07-15-at-4-59-01-PM-(1).jpg',
    'https://i.postimg.cc/vBS5ycW2/Whats-App-Image-2026-07-15-at-4-59-03-PM.jpg',
    'https://i.postimg.cc/vBS5ycW0/Whats-App-Image-2026-07-15-at-4-59-03-PM-(1).jpg'
  ],
  specs: {
    'Display': 'Working Date',
    'Chain': 'Stainless Steel',
    'Collection': 'AP Collection',
    'Availability': 'Limited Stock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Working date display',
    'Premium stainless steel chain',
    'Comfortable for everyday wear',
    'Limited stock'
  ],
  featured: false
  },
{
  code: 'CW010',
  name: 'Original Chaxigo CA-068G',
  category: "Men's Watches",
  price: 3200,
  shortDesc: 'Original Chaxigo watch with day & date display and butterfly master lock.',
  description: 'The Original Chaxigo CA-068G is designed for those who prefer a premium everyday watch. It features a working day and date display, a stainless steel jubilee chain with a butterfly master lock for a secure fit, and comes in attractive colours. Packed in an original brand box.',
  image: 'https://i.postimg.cc/Ls8DLq3j/Whats-App-Image-2026-07-15-at-5-57-57-PM.jpg',
  images: [
    'https://i.postimg.cc/Ls8DLq3j/Whats-App-Image-2026-07-15-at-5-57-57-PM.jpg',
    'https://i.postimg.cc/vmZhf1tf/Whats-App-Image-2026-07-15-at-5-57-58-PM.jpg',
    'https://i.postimg.cc/QMdm1BJ5/Whats-App-Image-2026-07-15-at-5-57-59-PM.jpg',
    'https://i.postimg.cc/g02s8wHZ/Whats-App-Image-2026-07-15-at-5-57-59-PM-(1).jpg',
    'https://i.postimg.cc/jjScPW4f/Whats-App-Image-2026-07-15-at-5-58-00-PM.jpg',
    'https://i.postimg.cc/d0V6r7jZ/Whats-App-Image-2026-07-15-at-5-58-00-PM-(1).jpg',
    'https://i.postimg.cc/xd15Mk3b/Whats-App-Image-2026-07-15-at-5-58-00-PM-(2).jpg',
    'https://i.postimg.cc/g02s8wHw/Whats-App-Image-2026-07-15-at-5-58-01-PM.jpg'
  ],
  specs: {
    'Display': 'Day & Date',
    'Chain': 'Stainless Steel Jubilee Chain',
    'Lock': 'Butterfly Master Lock',
    'Model': 'CA-068G',
    'Packaging': 'Brand Box Included'
  },
  features: [
    'Working day & date display',
    'Stainless steel jubilee chain',
    'Butterfly master lock',
    'Trendy design'
  ],
  featured: false,
},
{
  code: 'CW011',
  name: 'Poedagar Ladies Watch',
  category: "Women's Watches",
  price: 3800,
  shortDesc: 'Elegant ladies watch with quartz movement, working date, and cut glass.',
  description: 'The Poedagar Ladies Watch combines elegance with everyday functionality. It features a reliable quartz movement, a working date display, a steel chain with a master lock, and a stylish cut glass design. Available in different colours and suitable for both casual and formal wear. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/fWf3nHNt/Whats-App-Image-2026-07-15-at-6-00-18-PM.jpg',
  images: [
    'https://i.postimg.cc/fWf3nHNt/Whats-App-Image-2026-07-15-at-6-00-18-PM.jpg',
    'https://i.postimg.cc/FFVf5P4f/Whats-App-Image-2026-07-15-at-6-00-18-PM-(1).jpg',
    'https://i.postimg.cc/1RrghWQt/Whats-App-Image-2026-07-15-at-6-00-19-PM.jpg',
    'https://i.postimg.cc/c1BKyDS1/Whats-App-Image-2026-07-15-at-6-00-19-PM-(1).jpg',
    'https://i.postimg.cc/KcDKS92Z/Whats-App-Image-2026-07-15-at-6-00-20-PM.jpg',
    'https://i.postimg.cc/kMvV3jmq/Whats-App-Image-2026-07-15-at-6-00-21-PM.jpg',
    'https://i.postimg.cc/44QKk8gG/Whats-App-Image-2026-07-15-at-6-00-21-PM-(1).jpg',
    'https://i.postimg.cc/fWf3nHNh/Whats-App-Image-2026-07-15-at-6-00-21-PM-(2).jpg',
    'https://i.postimg.cc/gcHwFMWF/Whats-App-Image-2026-07-15-at-6-00-22-PM.jpg',
    'https://i.postimg.cc/44QKk8TD/Whats-App-Image-2026-07-15-at-6-00-22-PM-(1).jpg',
    'https://i.postimg.cc/kMvV3jdz/Whats-App-Image-2026-07-15-at-6-00-22-PM-(2).jpg',
    'https://i.postimg.cc/MZmc2s84/Whats-App-Image-2026-07-15-at-6-00-23-PM.jpg',
    'https://i.postimg.cc/c1BKyDNz/Whats-App-Image-2026-07-15-at-6-00-23-PM-(1).jpg',
    'https://i.postimg.cc/QCmVQMbW/Whats-App-Image-2026-07-15-at-6-00-23-PM-(2).jpg'
  ],
  specs: {
    'Movement': 'Quartz',
    'Display': 'Working Date',
    'Chain': 'Steel Chain',
    'Lock': 'Master Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Reliable quartz movement',
    'Working date display',
    'Cut glass design',
    'Elegant look for everyday wear'
  ],
  featured: false,
},
{
  code: 'CW012',
  name: 'Poedagar Ladies Watch',
  category: "Women's Watches",
  price: 3850,
  shortDesc: 'Elegant ladies watch with quartz movement, working date, and cut glass.',
  description: 'The Poedagar Ladies Watch offers a stylish and elegant design for everyday wear. It features a reliable quartz movement, a working date display, a steel chain with a secure master lock, and a premium cut glass finish. Available in different colours and suitable for both casual and formal occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/MTxW9SXZ/Whats-App-Image-2026-07-15-at-7-55-24-PM-(1).jpg',
  images: [
    'https://i.postimg.cc/MTxW9SXZ/Whats-App-Image-2026-07-15-at-7-55-24-PM-(1).jpg',
    'https://i.postimg.cc/KYtG7zcx/Whats-App-Image-2026-07-15-at-7-55-25-PM.jpg',
    'https://i.postimg.cc/fbYz7LWZ/Whats-App-Image-2026-07-15-at-7-55-25-PM-(1).jpg',
    'https://i.postimg.cc/Bv2S56Zq/Whats-App-Image-2026-07-15-at-7-55-25-PM-(2).jpg',
    'https://i.postimg.cc/GpvLP23R/Whats-App-Image-2026-07-15-at-7-55-25-PM-(3).jpg',
    'https://i.postimg.cc/kg0Mt8Cr/Whats-App-Image-2026-07-15-at-7-55-26-PM.jpg'
  ],
  specs: {
    'Movement': 'Quartz',
    'Display': 'Working Date',
    'Chain': 'Steel Chain',
    'Lock': 'Master Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Reliable quartz movement',
    'Working date display',
    'Premium cut glass design',
    'Elegant design for everyday wear'
  ],
  featured: false,
},
{
  code: 'CW013',
  name: 'Poedagar Ladies Watch',
  category: "Women's Watches",
  price: 3850,
  shortDesc: 'Elegant ladies watch with quartz movement, working date, and cut glass.',
  description: 'The Poedagar Ladies Watch features a stylish design with a reliable quartz movement, working date display, steel chain, and secure master lock. The premium cut glass finish adds an elegant touch, making it suitable for both everyday wear and special occasions. Available in different colours and packed in a normal box.',
  image: 'https://i.postimg.cc/hjCHVWmt/Whats-App-Image-2026-07-15-at-7-56-38-PM.jpg',
  images: [
    'https://i.postimg.cc/hjCHVWmt/Whats-App-Image-2026-07-15-at-7-56-38-PM.jpg',
    'https://i.postimg.cc/26HPnRW5/Whats-App-Image-2026-07-15-at-7-56-38-PM-(1).jpg',
    'https://i.postimg.cc/Qt6RcG7h/Whats-App-Image-2026-07-15-at-7-56-39-PM.jpg'
  ],
  specs: {
    'Movement': 'Quartz',
    'Display': 'Working Date',
    'Chain': 'Steel Chain',
    'Lock': 'Master Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Reliable quartz movement',
    'Working date display',
    'Premium cut glass design',
    'Elegant design'
  ],
  featured: false,
},
{
  code: 'CW014',
  name: 'Poedagar Ladies Watch',
  category: "Women's Watches",
  price: 3850,
  shortDesc: 'Elegant ladies watch with quartz movement, working date, and steel chain.',
  description: 'The Poedagar Ladies Watch is designed with a stylish and elegant look for everyday wear. It features a reliable quartz movement, a working date display, a durable steel chain, and a secure master lock. Available in different colours and suitable for both casual and formal occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/wT5nkmLJ/Whats-App-Image-2026-07-15-at-7-57-22-PM.jpg',
  images: [
    'https://i.postimg.cc/wT5nkmLJ/Whats-App-Image-2026-07-15-at-7-57-22-PM.jpg',
    'https://i.postimg.cc/Wbmx7kgZ/Whats-App-Image-2026-07-15-at-7-57-22-PM-(1).jpg',
    'https://i.postimg.cc/RVxjfR6f/Whats-App-Image-2026-07-15-at-7-57-22-PM-(2).jpg'
  ],
  specs: {
    'Movement': 'Quartz',
    'Display': 'Working Date',
    'Chain': 'Steel Chain',
    'Lock': 'Master Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Reliable quartz movement',
    'Working date display',
    'Secure master lock',
    'Elegant design'
  ],
  featured: false,
},
{
  code: 'CW015',
  name: 'Poedagar Ladies Watch',
  category: "Women's Watches",
  price: 2850,
  shortDesc: 'Elegant ladies watch with quartz movement, working date, and cut glass.',
  description: 'The Poedagar Ladies Watch features a stylish design with a reliable quartz movement, working date display, a steel open chain with a secure buckle lock, and a premium cut glass finish. Designed for both everyday wear and special occasions, it is available in different colours and comes packed in a normal box.',
  image: 'https://i.postimg.cc/wM2c1gRF/Whats-App-Image-2026-07-15-at-7-59-01-PM.jpg',
  images: [
    'https://i.postimg.cc/wM2c1gRF/Whats-App-Image-2026-07-15-at-7-59-01-PM.jpg',
    'https://i.postimg.cc/QCmkFhK0/Whats-App-Image-2026-07-15-at-7-59-01-PM-(1).jpg',
    'https://i.postimg.cc/yxsy6kxF/Whats-App-Image-2026-07-15-at-7-59-01-PM-(2).jpg'
  ],
  specs: {
    'Movement': 'Quartz',
    'Display': 'Working Date',
    'Chain': 'Steel Open Chain',
    'Lock': 'Buckle Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Reliable quartz movement',
    'Working date display',
    'Premium cut glass finish',
    'Elegant design'
  ],
  featured: false,
},
{
  code: 'CW016',
  name: 'True Worth Automatic Skeleton Watch',
  category: "Men's Watches",
  price: 4850,
  shortDesc: 'Automatic skeleton watch with a stainless steel chain and premium design.',
  description: 'The True Worth Automatic Skeleton Watch features a premium automatic movement with a stylish skeleton dial that showcases the inner mechanics of the watch. It comes with a durable stainless steel chain and offers a modern look suitable for both everyday wear and special occasions. Packed in a normal box.',
  image: 'https://i.postimg.cc/DyD4BShv/Whats-App-Image-2026-07-14-at-8-30-56-PM.jpg',
  images: [
    'https://i.postimg.cc/DyD4BShv/Whats-App-Image-2026-07-14-at-8-30-56-PM.jpg',
    'https://i.postimg.cc/xT7NtXQc/Whats-App-Image-2026-07-14-at-8-30-59-PM.jpg',
    'https://i.postimg.cc/28JL21Y3/Whats-App-Image-2026-07-14-at-8-31-01-PM.jpg'
  ],
  specs: {
    'Movement': 'Automatic',
    'Dial': 'Skeleton Dial',
    'Chain': 'Stainless Steel Chain',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Automatic movement',
    'Premium skeleton dial',
    'Stainless steel chain',
    'Modern and elegant design'
  ],
  featured: false,
},
{
  code: 'CW017',
  name: 'Sunlifex Original',
  category: "Women's Watches",
  price: 2940,
  shortDesc: 'Classic Sunlifex watch with a stainless steel chain and attractive colours.',
  description: 'The Sunlifex Original is designed for a clean and stylish everyday look. It features a durable stainless steel chain and is available in new attractive colours, making it suitable for both casual and formal wear. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/D00T8QC7/1.jpg',
  images: [
    'https://i.postimg.cc/D00T8QC7/1.jpg',
    'https://i.postimg.cc/nrrJCKdp/2.jpg',
    'https://i.postimg.cc/900hrPxV/3.jpg',
    'https://i.postimg.cc/wMMp75Wp/4.jpg',
    'https://i.postimg.cc/0jjsbGVL/5.jpg'
  ],
  specs: {
    'Chain': 'Stainless Steel Chain',
    'Colours': 'New Attractive Colours',
    'Availability': 'Limited Stock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Stainless steel chain',
    'Available in new attractive colours',
    'Comfortable for everyday wear',
    'Classic design'
  ],
  featured: false,
},
{
  code: 'CW018',
  name: 'Carrier Watch',
  category: "Men's Watches",
  price: 2850,
  shortDesc: 'Classic watch with working day & date, butterfly lock, and steel chain.',
  description: 'The Carrier Watch offers a timeless design with practical everyday features. It comes with a working day and date display, a durable steel chain, and a secure butterfly lock for a comfortable fit. Available in new attractive colours and suitable for both casual and formal wear. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/W3bRH6cZ/6.jpg',
  images: [
    'https://i.postimg.cc/W3bRH6cZ/6.jpg',
    'https://i.postimg.cc/mD2x5NWM/8.jpg',
    'https://i.postimg.cc/mD2x5NWh/9.jpg',
    'https://i.postimg.cc/d1tMxmcr/Whats-App-Image-2026-07-16-at-6-08-39-PM.jpg'
  ],
  specs: {
    'Display': 'Working Day & Date',
    'Lock': 'Butterfly Lock',
    'Chain': 'Steel Chain',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Working day & date display',
    'Secure butterfly lock',
    'Durable steel chain',
    'Available in new attractive colours'
  ],
  featured: false,
},
{
  code: 'CW019',
  name: 'Seiko',
  category: "Men's Watches",
  price: 3200,
  shortDesc: 'Stylish watch with working date, seconds hand, and butterfly lock.',
  description: 'The Seiko watch combines a classic look with practical features for everyday wear. It includes a working date display, a functional seconds hand, and a secure butterfly lock for a comfortable fit. Available in new attractive colours and suitable for both casual and formal occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/JnvLHDvF/10.jpg',
  images: [
    'https://i.postimg.cc/JnvLHDvF/10.jpg',
    'https://i.postimg.cc/PxPHqzVT/11.jpg',
    'https://i.postimg.cc/cHrWJMkZ/12.jpg',
    'https://i.postimg.cc/bJsPvHCK/13.jpg'
  ],
  specs: {
    'Display': 'Working Date',
    'Seconds Hand': 'Working',
    'Lock': 'Butterfly Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Working date display',
    'Functional seconds hand',
    'Secure butterfly lock',
    'Available in new attractive colours'
  ],
  featured: false,
},
   {
  code: 'CW020',
  name: 'Success Way Double Time',
  category: "Men's Watches",
  price: 3650,
  shortDesc: 'Dual time watch with butterfly lock in new attractive colours.',
  description: 'The Success Way Double Time watch is designed for those who prefer a bold and modern look. It features a dual time display, a secure butterfly lock, and is available in new attractive colours. Suitable for everyday wear as well as special occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/QC4B37DH/1-removebg-preview.png',
  images: [
    'https://i.postimg.cc/QC4B37DH/1-removebg-preview.png',
    'https://i.postimg.cc/J06yLX8s/2-removebg-preview.png',
    'https://i.postimg.cc/T17y6b6Z/3-removebg-preview.png'
  ],
  specs: {
    'Display': 'Dual Time',
    'Lock': 'Butterfly Lock',
    'Colours': 'New Attractive Colours',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Dual time display',
    'Secure butterfly lock',
    'Available in new attractive colours',
    'Stylish design for everyday wear'
  ],
  featured: false,
},
   {
  code: 'CW021',
  name: 'Audemars Piguet',
  category: "Men's Watches",
  price: 2650,
  shortDesc: 'Premium watch with working date display and butterfly lock.',
  description: 'The Audemars Piguet watch offers a premium design with a functional working date display and a secure butterfly lock for a comfortable fit. Available in new attractive colours, it is suitable for both everyday wear and special occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/3JZhdh0p/Whats-App-Image-2026-07-17-at-5-01-14-PM.jpg',
  images: [
    'https://i.postimg.cc/3JZhdh0p/Whats-App-Image-2026-07-17-at-5-01-14-PM.jpg',
    'https://i.postimg.cc/zXkNVNHn/Whats-App-Image-2026-07-17-at-5-01-15-PM.jpg',
    'https://i.postimg.cc/Wb7VhVq0/Whats-App-Image-2026-07-17-at-5-01-20-PM-removebg-preview.png',
    'https://i.postimg.cc/HstmVm8X/Whats-App-Image-2026-07-17-at-5-01-21-PM-removebg-preview.png',
    'https://i.postimg.cc/TYcxpx5R/Whats-App-Image-2026-07-17-at-5-01-22-PM-removebg-preview.png'
  ],
  specs: {
    'Display': 'Working Date',
    'Lock': 'Butterfly Lock',
    'Colours': 'New Attractive Colours',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Working date display',
    'Secure butterfly lock',
    'Available in new attractive colours',
    'Premium stylish design'
  ],
  featured: false,
},
   {
  code: 'CW022',
  name: 'White Aura',
  category: "Men's Watches",
  price: 1700,
  shortDesc: 'Marble design watch with fibre quality and butterfly lock.',
  description: 'The White Aura watch features a unique marble design with a premium fibre quality finish and a secure butterfly lock for a comfortable fit. Its modern and elegant look makes it suitable for both everyday wear and special occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/9fkJWLdJ/Whats-App-Image-2026-07-17-at-6-22-01-PM-removebg-preview.png',
  images: [
    'https://i.postimg.cc/9fkJWLdJ/Whats-App-Image-2026-07-17-at-6-22-01-PM-removebg-preview.png'
  ],
  specs: {
    'Design': 'Marble Design',
    'Material': 'Fibre Quality',
    'Lock': 'Butterfly Lock',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Premium marble design',
    'Fibre quality finish',
    'Secure butterfly lock',
    'Modern everyday style'
  ],
  featured: false,
},
   {
  code: 'CW023',
  name: 'Universal Point',
  category: "Men's Watches",
  price: 1400,
  shortDesc: 'Stylish watch with magnetic lock and premium modern design.',
  description: 'The Universal Point watch features a sleek and modern design with a secure magnetic lock for a comfortable fit. Available in new attractive colours, it is perfect for both everyday wear and special occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/4ddy11qF/1-removebg-preview-(1).png',
  images: [
    'https://i.postimg.cc/4ddy11qF/1-removebg-preview-(1).png',
    'https://i.postimg.cc/hGMhxYyH/3-removebg-preview-(1).png',
    'https://i.postimg.cc/R0GqfYpr/4-removebg-preview.png',
    'https://i.postimg.cc/PqKNZ733/5-removebg-preview.png',
    'https://i.postimg.cc/mrVhMnpW/6-removebg-preview.png',
    'https://i.postimg.cc/6QzTRPjk/7-removebg-preview.png',
    'https://i.postimg.cc/Jnn0QQv2/Whats-App-Image-2026-07-15-at-5-34-07-PM-removebg-preview.png'
  ],
  specs: {
    'Lock': 'Magnetic Lock',
    'Colours': 'New Attractive Colours',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Secure magnetic lock',
    'Available in new attractive colours',
    'Premium modern design',
    'Comfortable for everyday wear'
  ],
  featured: false,
},
   {
  code: 'CW024',
  name: 'SunlifeX Original',
  category: "Men's Watches",
  price: 2990,
  shortDesc: 'Premium steel chain watch available in new attractive colours.',
  description: 'The SunlifeX Original watch features a premium steel chain with a stylish and modern design. Available in new attractive colours, it is suitable for both everyday wear and special occasions. Comes packed in a normal box.',
  image: 'https://i.postimg.cc/05KWW1Ym/1.jpg',
  images: [
    'https://i.postimg.cc/05KWW1Ym/1.jpg',
    'https://i.postimg.cc/mZ1XXWYS/2.jpg',
    'https://i.postimg.cc/T2577vV0/3.jpg',
    'https://i.postimg.cc/5NcPDKgC/4.jpg',
    'https://i.postimg.cc/DyVCRp6b/5.jpg',
    'https://i.postimg.cc/FstPwCp3/6.jpg'
  ],
  specs: {
    'Strap': 'Steel Chain',
    'Colours': 'New Attractive Colours',
    'Packaging': 'Normal Box Included'
  },
  features: [
    'Premium steel chain',
    'Available in new attractive colours',
    'Modern and stylish design',
    'Comfortable for everyday wear'
  ],
  featured: false,
},
];
