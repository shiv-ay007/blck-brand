# BLCK — Minimal Fashion Store Frontend

React + Vite fashion-store frontend, built around the supplied BLCK wordmark and 310 Green Monster socks artwork. The visual direction is inspired by minimalist editorial commerce, with original code and a model image (not a copy of another site's hero).

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Latest update: clean image-led hero

- **No hero video**, no large marketing headlines or paragraphs. The page opens with a full-viewport, high-resolution editorial **still image**.
- **BLCK wordmark centered** in the transparent top navigation, with minimal category links plus search, bag and menu.
- **BLCK circular-logo coin** is centered over the model's torso. Hover gives a gentle rotation/lift. **Click/tap** slides it to reveal a compact 310 Green Monster socks preview with a real product link. Click again or press Escape to close.
- Only a small **SHOP NOW** link appears at the bottom of the hero.
- Mobile and reduced-motion styles included. All rest-of-site pages and working demo cart retained.

### Hero files

- `src/components/home/HeroSection.jsx` — functional coin interaction, still image and minimal CTA
- `src/components/home/HeroSection.css` — isolated hero, coin slide animation, responsive CSS
- `src/components/layout/Header.jsx` — navigation, centered wordmark, menu/search/cart
- `public/assets/hero-editorial.webp` — generated full-screen model photo (BLCK-inspired green socks)
- `public/assets/blck-monogram.png` — supplied logo inside the coin
- `public/assets/blck-wordmark.png` — supplied logo displayed in header
- `public/assets/blck-310-green-socks.webp` — supplied product artwork

No MP4 files are required or shipped in this build.

## File architecture

```
BLCK-Minimal-Fashion-Frontend/
├── public/assets/
├── src/
│   ├── App.jsx                 # providers only — NO route declarations
│   ├── main.jsx
│   ├── routes/MainRoute.jsx    # all React Router routes
│   ├── pages/                 # pages compose sections
│   ├── components/
│   │   ├── home/              # one component per section
│   │   ├── layout/            # Header, Footer, Layout, CartDrawer
│   │   ├── common/            # ScrollToTop, ProductCard etc.
│   │   ├── shop/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── about/
│   │   ├── contact/
│   │   └── policies/
│   ├── context/CartContext.jsx
│   ├── data/products.js
│   └── styles/global.css
├── package.json
└── index.html
```

## Pages

`/` Home • `/shop` Shop • `/product/:slug` Product • `/cart` Cart • `/checkout` Checkout demo • `/order-confirmed` Demo order confirmation • `/about` About • `/contact` Contact • `/policies` and `/policies/:slug` Policies.

`Layout` includes Header, Footer, CartDrawer and ScrollToTop. Links use React Router.

## Client contact

- **Brand:** BLCK
- **Email:** blckofficial2026@gmail.com
- **WhatsApp:** +91 98997 33351
- **Location:** New Delhi, India

## Frontend demonstration only

This is **not a live e-commerce backend**. Product price ₹799 is a **placeholder** pending approval; the catalog currently contains the one product supplied. Cart runs in localStorage, checkout is UI-only and **does not process payments or create real orders**. Contact opens an email composer; policies are placeholders until approved. Before going live, integrate a backend, actual product inventory and prices, shipping calculations, payment processing and approved legal pages.
