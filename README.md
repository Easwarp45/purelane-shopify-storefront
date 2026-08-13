# Purelane Shopify Storefront MVP

A premium, highly interactive Shopify storefront built on top of the stock Shopify Dawn theme. This storefront converts the Purelane visual prototype into a fully modular, merchant-customizable Shopify theme.

---

## ðŸŽ¨ Visual Identity & Design System
This theme implements the **Version 2 (Light Theme)** design cascade from the prototype:
* **Backgrounds:** Pale mint body backgrounds with glassmorphism card containers (`.glass` and `.glass-2`).
* **Accents:** Sleek brand purple (`#4b3a8f`) and warm orange leaf (`#c9761d`) highlights.
* **Typography:** Outfit (headings) and Inter (body copy) scales loaded dynamically from Google Fonts.
* **Ambient cinemagraphs:** Renders the Sunlit Water animated SVG and bubble particles in the background of the homepage.

---

## âš¡ Main Interactive Features
1. **Vertical Progress Rail:** Synchronizes vertical scroll positions to track and highlight links on a progress rail indicator.
2. **Hero Carousel:** A three-slide carousel exhibiting product configurations with floating glassmorphism price tags.
3. **Parallax Mouse Drifting:** Interactive mouse coordinates dynamically shift water SVG displacement filters and hero product layers.
4. **Active Scene Crossfades:** Evaluates scroll coordinates to fade background colors between four distinct gradient scenes.
5. **Infinite Review Wall:** Infinitely scrolls customer reviews horizontally using pure CSS keyframe marquees.
6. **Descaler Product Rotator:** Slides through descaler cleaning stages using observer viewport entries.

---

## ðŸ› ï¸ Theme Architecture & Custom Components
Every custom module is registered as a native Shopify section or snippet, allowing full merchant editing, block addition, and layout reordering in the Shopify Customizer.

### Custom Sections (`sections/`)
* **[purelane-hero.liquid](file:///d:/app%20development/Troopod%20Ai/sections/purelane-hero.liquid):** Customizable text copy, buttons, vertical promise badges (desktop), horizontal badges strip (mobile), and product staging.
* **[purelane-product-grid.liquid](file:///d:/app%20development/Troopod%20Ai/sections/purelane-product-grid.liquid):** Collection-driven shelf with kicker tags and title rules.
* **[purelane-best-selling-combos.liquid](file:///d:/app%20development/Troopod%20Ai/sections/purelane-best-selling-combos.liquid):** Pre-built combo layouts rendering in swipe-enabled tracks.
* **[purelane-bundles.liquid](file:///d:/app%20development/Troopod%20Ai/sections/purelane-bundles.liquid):** Explanations grid, categories links, and Starter Kit tiers with product stack overlays.
* **[purelane-review-wall.liquid](file:///d:/app%20development/Troopod%20Ai/sections/purelane-review-wall.liquid):** Double-buffered review card marquee tracks.

### Custom Snippets (`snippets/`)
* **[purelane-product-card.liquid](file:///d:/app%20development/Troopod%20Ai/snippets/purelane-product-card.liquid):** Dynamic product rating stars, prices, compare prices, calculated discount percentages, and add-to-cart form actions.
* **[purelane-combo-card.liquid](file:///d:/app%20development/Troopod%20Ai/snippets/purelane-combo-card.liquid):** Customizable product icons, labels, savings tags, and CTA routes.
* **[purelane-bundle-card.liquid](file:///d:/app%20development/Troopod%20Ai/snippets/purelane-bundle-card.liquid):** Category link boxes.
* **[purelane-review-card.liquid](file:///d:/app%20development/Troopod%20Ai/snippets/purelane-review-card.liquid):** Star icons, reviewer details, and verified purchase checkmarks.

### Asset Scripts (`assets/`)
* **[purelane.css](file:///d:/app%20development/Troopod%20Ai/assets/purelane.css):** Integrates Outfit/Inter fonts, CSS variables, resets, and glassmorphism styles.
* **[purelane.js](file:///d:/app%20development/Troopod%20Ai/assets/purelane.js):** Coordinates triggers for intersection reveals, active scene shifts, parallax drifting, and carousel intervals. **Features customizer lifecycle event triggers (`shopify:section:load` / `unload`) to prevent memory leaks and safely re-initialize sliders upon Customizer re-renders.**

---

## ðŸš€ Running Locally
To launch a local development server with hot-reloading:

1. Install the Shopify CLI if you haven't already:
   ```bash
   npm install -g @shopify/cli
   ```
2. Log into your store and run the local development server:
   ```bash
   npx shopify theme dev --store <your-store-handle>.myshopify.com
   ```
3. Open `http://127.0.0.1:9292` in your browser to preview the storefront.

---

## ðŸ“ Code Validation & Quality Assurance
Run validation checks locally using the Shopify Theme Check utility:
```bash
npx shopify theme check
```
* **Validation Outcome:** **0 Errors.**
* All image tags utilize native `width` and `height` dimensions to eliminate Cumulative Layout Shift (CLS) and conform to Shopify's performance audit guidelines.