# Purelane Shopify MVP --- Complete UI & Project Specification

## 1. Document purpose

This document is the single working specification for the Purelane
Shopify MVP being developed for the Troopod AI Product Engineer
assessment.

The **`purelane-homepage.html`** file is the primary visual/UI source of
truth.

The goal is not to redesign the Purelane page. The goal is to reproduce
the supplied prototype's visual language, layout, content hierarchy,
product presentation, interactions, responsiveness, and overall UX
inside a Shopify-native implementation.

> **Core rule:** The implementation technology may change from
> standalone HTML/CSS/JavaScript to Shopify Liquid/sections, but the
> resulting UI should remain faithful to `purelane-homepage.html`.

------------------------------------------------------------------------

# 2. Project context

## Assessment objective

The assessment asks the candidate to take a prototype homepage live on
Shopify.

The supplied prototype is a complete Purelane storefront concept. The
assessment specifically prioritizes five homepage sections:

1.  Hero
2.  Shop / Product Grid
3.  Best-selling Combos
4.  Bundles
5.  Review Wall

The remaining prototype content is considered secondary/bonus for the
MVP.

## Assessment expectations

The assessment materials emphasize:

-   Pixel-accurate implementation
-   Merchant-editable sections
-   Real Shopify data
-   Reusable code
-   Theme-editor compatibility
-   Fast implementation
-   Accessibility
-   Clean and reviewable code
-   A working Shopify development store
-   GitHub repository with meaningful commit history
-   Documentation of metafields/metaobjects if created
-   Documentation of AI-assisted workflow where applicable

## MVP objective

The MVP should first prove that the five required sections can be
implemented faithfully in Shopify.

Do not spend the majority of the MVP effort on bonus sections before the
five required sections are correct.

------------------------------------------------------------------------

# 3. Source of truth

## Primary source

`@purelane-homepage.html`

This file contains:

-   HTML structure
-   CSS
-   CSS variables
-   responsive rules
-   SVG artwork
-   product imagery encoded in CSS/data URLs
-   product cards
-   bundle cards
-   review cards
-   hero carousel markup
-   animation/reveal behavior
-   navigation/progress UI
-   responsive/mobile behavior
-   accessibility attributes
-   JavaScript-driven interactions

The file should be studied before implementation.

## Important source-handling rule

Do not blindly copy the prototype's implementation into Shopify.

Instead:

``` text
purelane-homepage.html
        ↓
visual / UX specification
        ↓
Shopify-native implementation
        ↓
same intended UI + real Shopify data
```

The prototype's implementation can be refactored, but its resulting
visual design should not be arbitrarily redesigned.

------------------------------------------------------------------------

# 4. Recommended MVP technology stack

## Core

-   Shopify
-   Stock Dawn theme
-   Shopify Liquid
-   HTML5
-   CSS3
-   Vanilla JavaScript
-   Shopify section schema
-   Shopify JSON templates

## Shopify data

-   Products
-   Collections
-   Product images
-   Prices
-   Compare-at prices
-   Availability
-   Section settings
-   Section blocks
-   Metafields/metaobjects only where useful

## Development

-   Shopify CLI
-   VS Code
-   Git
-   GitHub
-   Shopify Partner development store
-   Shopify Theme Editor

## Deliberately excluded from the MVP

Do not add unnecessary:

-   React
-   Next.js
-   Vite
-   Express
-   Separate Node.js backend
-   PostgreSQL
-   Supabase
-   Firebase
-   External UI frameworks
-   External review systems
-   Complex bundle engines
-   Separate commerce backend

Node.js may be present locally as tooling for Shopify CLI, but this
project does not require a separate Node.js application/backend.

------------------------------------------------------------------------

# 5. High-level architecture

``` text
Shopify Partner Account
        ↓
Development Store
        ↓
Stock Dawn Theme
        ↓
Purelane Custom Sections
        ↓
┌───────────────────────────────────────┐
│ Hero                                  │
│ Shop / Product Grid                   │
│ Best-selling Combos                   │
│ Bundles                               │
│ Review Wall                           │
└───────────────────────────────────────┘
        ↓
Shopify Products / Collections / Data
        ↓
Theme Editor
        ↓
Live Development Store
```

Suggested custom theme organization:

``` text
sections/
├── purelane-hero.liquid
├── purelane-product-grid.liquid
├── purelane-best-selling-combos.liquid
├── purelane-bundles.liquid
└── purelane-review-wall.liquid

snippets/
├── purelane-product-card.liquid
├── purelane-combo-card.liquid
├── purelane-bundle-card.liquid
└── purelane-review-card.liquid

assets/
├── purelane.css
└── purelane.js

templates/
└── index.json
```

Use Dawn's existing infrastructure where appropriate instead of
duplicating it.

------------------------------------------------------------------------

# 6. UI design system

## 6.1 Overall visual direction

The Purelane prototype uses a premium, editorial, eco-cleaning
aesthetic.

Major visual characteristics include:

-   Dark/green-purple branded surfaces in the supplied visual treatment
-   Strong purple brand accents
-   Warm orange accent color
-   Pale mint/green product imagery
-   Glassmorphism
-   Soft gradients
-   Fine borders
-   Large display typography
-   Small uppercase editorial labels
-   Rounded cards
-   Soft shadows
-   Product-focused visual staging
-   Large whitespace
-   Premium ecommerce presentation
-   Cinematic background/water effects
-   Subtle motion

The HTML contains multiple style blocks and a documented palette/version
section. The final rendered result should be treated as the authority
rather than manually inventing a different palette.

------------------------------------------------------------------------

# 7. Color system

The supplied HTML defines brand variables including:

``` css
--brand: #4b3a8f;
--brand-lt: #6b55b8;
--accent: #b8701c;
--accent-2: #c9761d;
--surface: #17102b;
```

Other referenced colors include:

``` css
--ink: #f4f0fb;
--deep: #e2daf3;
--paper: #241a3d;
```

The prototype also uses:

-   Deep green tones
-   Teal
-   Purple
-   Mint
-   Off-white
-   Transparent white overlays
-   Warm orange accent
-   Dark green shadows
-   Soft lavender backgrounds in parts of the supplied style system

### Important

The HTML contains multiple CSS style blocks and version/palette
comments. Do not simply copy an isolated variable block and assume it is
the final visual state.

The active cascade and rendered prototype are the source of truth.

------------------------------------------------------------------------

# 8. Typography

The prototype uses:

-   **Outfit** for major display/headline/brand typography
-   **Inter** for body/UI/supporting text

Typography characteristics:

### Display headings

-   Outfit
-   Bold/heavy weight
-   Large scale
-   Tight visual hierarchy
-   Strong contrast
-   Uppercase/small editorial labels around them

### Body text

-   Inter
-   Smaller sizes
-   Comfortable line-height
-   Muted/secondary colors
-   Short readable line lengths

### Kicker/eyebrow labels

-   Uppercase
-   Small font
-   High letter spacing
-   Strong weight
-   Brand/secondary accent color

### Buttons

-   Small uppercase typography
-   Letter spacing
-   Medium/bold weight
-   Compact height

------------------------------------------------------------------------

# 9. Layout system

The prototype uses a centered max-width layout.

Important layout characteristics:

-   Centered content wrapper
-   Horizontal padding around content
-   Large vertical section spacing on desktop
-   Reduced vertical spacing on mobile
-   Grid layouts for cards
-   Horizontal scrolling rails for selected sections
-   Absolute positioning for hero product staging
-   Responsive switching from multi-column layouts to horizontal/mobile
    layouts

The prototype uses approximately 18px horizontal mobile content padding
in several mobile rules.

------------------------------------------------------------------------

# 10. Glassmorphism system

The prototype heavily uses glass effects.

Key characteristics:

-   Semi-transparent surfaces
-   Backdrop blur
-   Saturation
-   Fine borders
-   Soft inset highlights
-   Low-opacity white overlays
-   Rounded corners
-   Subtle shadows

The source uses blur values such as:

``` css
backdrop-filter: blur(16px) saturate(140%);
```

and:

``` css
backdrop-filter: blur(12px) saturate(130%);
```

Do not replace the glass UI with ordinary opaque cards unless
Shopify/browser constraints force it.

------------------------------------------------------------------------

# 11. Borders and shadows

Common characteristics:

-   Very subtle 1px borders
-   Transparent white borders on dark/glass surfaces
-   Soft large shadows
-   Product-specific drop shadows
-   Inner highlight/inset effects

The source includes a shadow system such as:

``` css
--g-shadow: 0 22px 54px rgba(58,44,112,.13);
```

Product imagery uses stronger drop shadows to separate products from the
background.

------------------------------------------------------------------------

# 12. Buttons

The prototype uses at least two main button styles.

## Primary button

Characteristics:

-   Gradient background
-   Warm orange/green brand treatment
-   Dark text
-   Rounded shape
-   Shadow
-   Slight upward hover movement
-   Arrow icon

The source defines a primary gradient similar to:

``` css
background: linear-gradient(135deg, var(--accent-2), #5d8d1c);
```

## Ghost button

Characteristics:

-   Transparent/semi-transparent background
-   Fine border
-   Glass effect
-   Light/brand text
-   Slight background change on hover
-   Slight upward movement
-   Arrow icon where appropriate

## Small button

Used in product cards:

-   Lower height
-   Compact horizontal padding
-   Small uppercase text
-   Increased letter spacing

------------------------------------------------------------------------

# 13. Animation system

The UI uses subtle, premium animation rather than aggressive motion.

## Reveal animation

The source uses a reveal class with:

-   Initial opacity 0
-   Downward offset
-   Blur
-   Smooth transition
-   Staggered delays

Conceptually:

``` text
opacity: 0
transform: translateY(30px)
filter: blur(7px)

        ↓

opacity: 1
transform: none
filter: none
```

Stagger delays include approximately:

-   0.09s
-   0.18s
-   0.27s
-   0.36s
-   0.45s

## Hover behavior

Cards/buttons can:

-   Move upward slightly
-   Increase shadow
-   Change background opacity
-   Reveal stronger visual emphasis

## Ticker

The top ticker uses continuous horizontal animation.

The source uses a roughly 30-second linear ticker animation.

## Review marquee

The review rail automatically scrolls horizontally.

On mobile, the review animation duration is increased to approximately
40 seconds.

## Reduced motion

The source explicitly supports:

``` css
@media(prefers-reduced-motion: reduce)
```

Reduced motion should:

-   Disable/shorten animations
-   Remove reveal transforms
-   Disable marquee/bubble animations
-   Disable smooth scrolling

This behavior should be preserved.

------------------------------------------------------------------------

# 14. Global navigation UI

The prototype contains:

## Ticker

A thin promotional ticker near the top.

Characteristics:

-   Uppercase text
-   Small typography
-   High letter spacing
-   Semi-transparent background
-   Backdrop blur
-   Bottom border
-   Continuous horizontal animation
-   Accent-colored highlighted words

## Fixed navigation

The header is fixed.

The source uses a transition where the header moves upward when the page
scroll state changes.

The navigation uses a rounded/pill-like container.

## Desktop progress rail

A vertical section progress rail appears on larger screens.

The source enables it at:

``` text
min-width: 1180px
```

It contains small circular section indicators.

The active indicator becomes:

-   Accent colored
-   Taller
-   Pill-shaped
-   Surrounded by a subtle glow

On smaller screens it is hidden.

------------------------------------------------------------------------

# 15. HERO --- REQUIRED MVP SECTION

## Purpose

The Hero is the highest-priority visual section.

It establishes:

-   Purelane brand
-   Product promise
-   Product imagery
-   Offer structure
-   Primary CTA
-   Secondary CTA
-   Trust badges

## Hero content

The supplied prototype contains messaging around Purelane being:

-   Plant powered
-   Safe for kids and pets
-   Free from harsh chemicals

The Hero CTA includes:

-   Shop now
-   How it works

## Hero layout

Desktop:

``` text
┌─────────────────────────────────────────────┐
│                                             │
│  Hero copy                    Product stage │
│  Heading                       Product(s)   │
│  Supporting copy              Price card    │
│  CTA buttons                               │
│                                             │
│                               Badge rail    │
└─────────────────────────────────────────────┘
```

The product stage is positioned toward the right.

The copy is positioned toward the left.

## Hero copy

The source uses:

-   Large display heading
-   Supporting paragraph
-   Decorative rule
-   CTA row
-   Mobile badge strip

## Hero product stage

The source uses a height-driven stage:

``` css
height: clamp(380px, 74svh, 680px);
```

Hero slides fade between states.

### Slide 1

Single bottle:

-   Kitchen cleaner
-   ₹200
-   ₹299 compare-at
-   33% off

### Slide 2

Any 2 products:

-   ₹349
-   ₹598 compare-at
-   Save ₹249

### Slide 3

Any 3 products:

-   ₹499
-   ₹897 compare-at
-   Save ₹398

## Hero carousel

The source provides three dot controls:

-   Show 1 product
-   Show 2 products
-   Show 3 products

Each dot is an accessible button.

The implementation should preserve:

-   fade transition
-   active dot
-   product arrangement
-   pricing card
-   responsive behavior

## Desktop trust badges

Three stacked badges appear on the right side:

1.  Plant powered
2.  Safe for kids & pets
3.  Zero harsh chemicals

Each uses:

-   circular icon
-   accent-colored icon
-   uppercase text
-   small typography
-   divider lines

## Mobile trust badges

The desktop badge rail is hidden.

A horizontal three-item badge strip appears below the Hero copy.

------------------------------------------------------------------------

# 16. SHOP / PRODUCT GRID --- REQUIRED MVP SECTION

## Purpose

Show real Shopify products using the Purelane product-card visual
design.

The source prototype uses product cards with:

-   Product image
-   Badge
-   Product title
-   Rating
-   Review count
-   Current price
-   Compare-at price
-   Discount
-   Add to cart button

## Product card visual structure

``` text
┌─────────────────────────┐
│ Badge                   │
│                         │
│      PRODUCT IMAGE      │
│                         │
├─────────────────────────┤
│ Product title           │
│ ★ 4.8 · reviews         │
│ ₹200  ₹299  33% off     │
│                         │
│ [ Add to cart ]         │
└─────────────────────────┘
```

## Example source products

The prototype includes product concepts such as:

-   Kitchen cleaner, foaming
-   Tap cleaner & limescale remover
-   Copper, bronze & brass cleaner
-   Washing machine cleaner & descaler
-   Laundry detergent
-   Floor cleaner
-   Toilet cleaner
-   Handwash
-   Magic eraser
-   Dishwash gel
-   Other Purelane cleaning products

## Source examples

Kitchen cleaner:

-   ₹200
-   ₹299
-   33% off
-   4.8 rating
-   254 reviews
-   Badge: Best seller

Tap cleaner:

-   ₹200
-   ₹299
-   33% off
-   4.8 rating
-   237 reviews

Copper/bronze/brass cleaner:

-   ₹200
-   ₹299
-   33% off
-   4.8 rating
-   231 reviews

Washing machine cleaner/descaler:

-   ₹200
-   ₹299
-   33% off
-   4.8 rating
-   183 reviews

For the final Shopify MVP, prices and product availability should come
from real Shopify products rather than remaining hardcoded.

## Product card behavior

-   Add to cart button
-   Product link
-   Image alt text
-   Hover effect
-   Responsive card sizing
-   Scroll/reveal behavior where appropriate

------------------------------------------------------------------------

# 17. BEST-SELLING COMBOS --- REQUIRED MVP SECTION

## Section header

The source uses:

**Kicker:** "Pre-built to save you money"

**Heading:** "Best selling combos"

**Supporting copy:** "Swipe through the boxes people order most. Each
one is already priced below buying the same products on their own."

## Layout

Desktop:

-   Multiple combo cards
-   Large horizontal content area

Mobile:

-   Horizontal scrolling
-   Cards become fixed-width swipeable items

The source specifies mobile combo width around:

``` text
268px
```

## Combo card

Each combo includes:

-   Savings badge
-   Optional popularity flag
-   Product stack
-   Product benefit line
-   Product count
-   Combo title
-   Description
-   Current price
-   Compare-at price
-   Savings amount
-   Tax/COD note
-   Shop bundle CTA

## Combo 1 --- Kitchen essentials

-   3 products
-   Kitchen Cleaner
-   Dishwash Gel
-   Tap Cleaner
-   ₹499
-   ₹897 compare-at
-   Save ₹398
-   Most popular
-   Includes "Inclusive of all taxes · COD available"

Benefits:

-   Cuts grease instantly
-   Squeaky clean dishes
-   Melts hard water stains

## Combo 2 --- Laundry care bundle

-   3 products
-   Laundry Detergent
-   Fabric Conditioner
-   Washing Machine Cleaner
-   ₹499
-   ₹947 compare-at
-   Save ₹448

Benefits:

-   Removes tough stains & odour
-   Softens & freshens every wash
-   Deep-cleans your machine

## Other source combo

The prototype also includes:

### Complete home bundle

-   5 products
-   ₹799
-   ₹1,495 compare-at
-   Save ₹696

Includes:

-   Kitchen Cleaner
-   Laundry Detergent
-   Floor Cleaner
-   Toilet Cleaner
-   Handwash

### Bathroom deep clean

-   3 products
-   ₹499
-   ₹897 compare-at
-   Save ₹398

Includes:

-   Toilet Cleaner
-   Tap Cleaner
-   Magic Eraser

Benefits:

-   Kills 99.9% germs
-   Melts hard water stains
-   Scrubs away soap scum

For MVP, these can be modeled as Shopify section blocks rather than
building a complex bundle engine.

------------------------------------------------------------------------

# 18. BUNDLES --- REQUIRED MVP SECTION

## Visual system

The bundle UI uses:

-   Glass cards
-   Product imagery
-   Tier/quantity presentation
-   Category cards
-   Product stacks
-   Savings messaging
-   Large numbers
-   Responsive grids

## Bundle category cards

The source uses:

-   2-column grid on smaller screens
-   4-column grid at 900px+

The category image area is approximately:

-   194px high desktop
-   158px high mobile

Product imagery receives drop shadows.

Category text uses:

-   Outfit
-   Uppercase heading
-   Small description
-   Fine divider

## Tier product rows

The source uses a product image row inside a rounded panel.

Desktop approximate height:

``` text
78px
```

Mobile:

``` text
70px
```

Five-product tier imagery becomes smaller.

## MVP principle

The Bundle section should reproduce the supplied visual system while
using simple Shopify section blocks/settings.

Do not build a sophisticated backend bundle-calculation system unless
explicitly required.

------------------------------------------------------------------------

# 19. REVIEW WALL --- REQUIRED MVP SECTION

## Review header

The source uses:

-   Kicker: "That's what they said"
-   Five-star display
-   4.8 rating
-   8,000+ reviews
-   "Loved by 12 lakh+ homes"

## Review card

Cards use:

-   Glass surface
-   Five stars
-   Short title
-   Review paragraph
-   Verified/check icon
-   Customer name
-   Product category

## Source examples

### Anita

Title: "Works like a charm"

Product: Laundry detergent

Review concept: An eco option that cleans as well as a chemical
detergent and smells better.

### Priya

Title: "Best dishwash ever"

Product: Dishwash gel

Review concept: Switching away from the previous dishwash stopped the
user's dry/cracked skin issue.

Additional review cards exist in the prototype and should be preserved
when implementing the full section.

## Review rail behavior

Desktop:

-   Horizontal auto-moving review cards

Mobile:

-   Narrower cards
-   Approximately 250px card width
-   Slower animation

The review rail should be merchant-editable using Shopify blocks for the
MVP.

------------------------------------------------------------------------

# 20. OTHER SOURCE UI SECTIONS

These are present in the supplied prototype but are lower priority for
the MVP.

## Full range

Heading:

"Every room, one shelf"

Supporting concept:

Floors, taps, kitchen, laundry, bathroom and hands.

The source describes fourteen plant-based formulas.

This section contains a horizontal product range and category-style
presentation.

## Ingredients

The source navigation references:

``` text
#ingredients
```

This is part of the broader prototype experience.

## How it works

The source navigation references:

``` text
#how
```

The Hero secondary CTA links to this section.

## Proof

The source navigation references:

``` text
#proof
```

This is part of the broader trust/proof storytelling.

## Footer

The source includes footer styling and mobile footer spacing.

## Newsletter / supporting content

Additional source sections may exist outside the five required MVP
sections.

Treat them as P1/P2 unless required by the final assessment review.

------------------------------------------------------------------------

# 21. Product imagery

The prototype contains many product images represented through CSS
custom properties and embedded SVG/data URLs.

Defined product visual classes include:

``` text
p-combo2
p-dish
p-eraser
p-floor
p-handwash
p-kbtl
p-kitchen
p-laundry
p-mbtl
p-metal
p-tap
p-tbtl
p-toilet
p-wm
```

These should be treated as the prototype's visual asset system.

## Important implementation decision

For MVP:

-   Preserve the supplied visual appearance.
-   Where the final Shopify store has real product images, use Shopify
    product media.
-   If the prototype asset is necessary to match the UI before Shopify
    products are configured, preserve the asset as a theme asset rather
    than redesigning the product image.

Do not replace the visual product staging with generic stock photos.

------------------------------------------------------------------------

# 22. Product image styling

The source uses:

``` css
.pimg {
  display: block;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
}
```

Product visuals are generally:

-   Centered
-   Contained
-   Bottom aligned
-   Given fixed/aspect-ratio-based sizing
-   Enhanced with drop shadows

The Hero product stage is height-driven.

------------------------------------------------------------------------

# 23. Responsive design

The prototype contains specific mobile optimization.

## Primary breakpoint

A major breakpoint occurs around:

``` text
760px
```

At this width and below:

-   Section padding reduces
-   Horizontal product rails become scrollable
-   Review cards become narrower
-   Combo cards become fixed-width swipe cards
-   Product imagery becomes smaller
-   Some desktop-only decorative effects are hidden
-   Hero layout changes
-   Badge rail becomes mobile badge strip

## 420px breakpoint

At around 420px:

-   Badge typography becomes smaller
-   Badge icon size reduces
-   Hero product width becomes approximately: `min(92vw, 360px)`

## 900px breakpoint

Hero changes around 900px:

-   Desktop right-side product becomes a normal flow element
-   Hero copy becomes full-width
-   Product stage becomes centered below copy
-   Desktop badge rail disappears
-   Mobile badge strip appears

## 1200px breakpoint

Hero copy/product dimensions are adjusted.

## 1180px breakpoint

Desktop progress rail appears.

------------------------------------------------------------------------

# 24. Mobile behavior

Mobile is not simply a scaled desktop.

Required behavior:

-   Horizontal scrolling product rails
-   Swipe-friendly cards
-   Smaller typography
-   Reduced spacing
-   Centered hero product
-   Mobile trust badge strip
-   Smaller product image stages
-   Reduced decorative effects
-   Accessible touch targets

The source explicitly uses horizontal scrolling with hidden scrollbars
for certain product rails.

------------------------------------------------------------------------

# 25. Accessibility

The prototype already contains meaningful accessibility attributes such
as:

-   `aria-label`
-   semantic buttons
-   role descriptions for product imagery
-   accessible carousel controls
-   navigation labels

The Shopify implementation should preserve/improve:

-   semantic HTML
-   heading hierarchy
-   alt text
-   keyboard navigation
-   focus states
-   button labels
-   carousel controls
-   reduced-motion support
-   contrast
-   screen-reader clarity

Do not remove accessibility merely to make the markup shorter.

------------------------------------------------------------------------

# 26. Merchant editability

The Shopify implementation should use section schemas.

Merchant-editable content should include meaningful controls such as:

## Hero

-   Heading
-   Supporting copy
-   CTA labels
-   CTA links
-   Product/offer selection where practical
-   Trust badge content where appropriate

## Product grid

-   Collection selection
-   Number of products
-   Heading
-   Supporting copy

## Combos

Each combo should be a block with editable:

-   Title
-   Product selections or product references
-   Description
-   Current price/offer representation where necessary
-   Savings text
-   Badge
-   CTA

## Bundles

Editable:

-   Bundle title
-   Product selection
-   Tier label
-   Description
-   CTA
-   Savings message
-   Visual badge

## Reviews

Each review should be a block with:

-   Customer name
-   Product
-   Rating
-   Review title
-   Review text
-   Verified state

Do not expose every CSS value as a theme setting.

------------------------------------------------------------------------

# 27. Real Shopify data

The Shop/Product Grid should use real Shopify data.

Dynamic values should come from:

-   Product title
-   Product featured image
-   Product URL
-   Product price
-   Compare-at price
-   Availability
-   Collection membership

Avoid hardcoding final product prices into the product grid.

The prototype's content is the visual/content reference, but Shopify
should become the source for live commerce data.

------------------------------------------------------------------------

# 28. Shopify section architecture

Each major section should be isolated.

Example:

``` liquid
{% schema %}
{
  "name": "Purelane Product Grid",
  "settings": [
    {
      "type": "collection",
      "id": "collection",
      "label": "Product collection"
    }
  ]
}
{% endschema %}
```

Sections should:

-   Be independently movable
-   Be removable
-   Be configurable
-   Not rely on fixed page position
-   Work inside the Shopify Theme Editor

------------------------------------------------------------------------

# 29. Theme editor compatibility

This is a major requirement.

The implementation must survive:

-   Section reorder
-   Section removal
-   Block reorder
-   Block addition
-   Block deletion
-   Merchant content changes
-   Theme editor reload
-   Dynamic section rendering

JavaScript must not assume that the entire page initializes only once.

Use safe initialization patterns.

Avoid duplicated event listeners and interval leaks.

------------------------------------------------------------------------

# 30. JavaScript implementation principles

Use Vanilla JavaScript.

Core interactions to preserve:

1.  Hero carousel
2.  Hero dot controls
3.  Auto rotation where present
4.  Scroll reveal
5.  Product/combo horizontal behavior
6.  Review marquee
7.  Header scroll behavior
8.  Progress rail state where retained

## Theme editor safety

JavaScript should be written so that sections can be reinitialized.

Avoid:

``` text
one global initialization that assumes permanent DOM
```

Prefer:

``` text
section initialization
→ attach listeners
→ store/clean up references
→ support re-render
```

------------------------------------------------------------------------

# 31. Performance requirements

The storefront should remain lightweight.

Avoid:

-   Large external libraries
-   Unnecessary dependencies
-   Duplicate assets
-   Excessive JavaScript
-   Unnecessary DOM operations
-   Excessive animations
-   Oversized images

Use Shopify image handling where possible.

Use appropriate lazy loading for below-the-fold imagery.

Keep Hero imagery optimized without changing the visual design.

------------------------------------------------------------------------

# 32. Visual QA checklist

Every section should be compared against the supplied prototype.

Check:

## Geometry

-   Width
-   Height
-   Padding
-   Margin
-   Gap
-   Alignment
-   Card proportions

## Typography

-   Font family
-   Font size
-   Font weight
-   Line height
-   Letter spacing
-   Case

## Color

-   Background
-   Text
-   Accent
-   Borders
-   Gradients
-   Opacity

## Components

-   Buttons
-   Badges
-   Cards
-   Product imagery
-   Price blocks
-   Review cards

## Motion

-   Reveal timing
-   Hover movement
-   Carousel fade
-   Marquee speed
-   Reduced motion

## Responsive

Test:

-   1440px
-   1280px
-   1024px
-   900px
-   768px
-   430px
-   420px
-   390px
-   375px

------------------------------------------------------------------------

# 33. MVP implementation order

## Phase 0 --- Understand

Read and analyze the complete `purelane-homepage.html`.

Document:

-   DOM structure
-   UI sections
-   CSS variables
-   product assets
-   typography
-   animations
-   responsive breakpoints
-   JavaScript interactions

## Phase 1 --- Shopify setup

-   Create/use Shopify Partner account
-   Create development store
-   Install Dawn
-   Connect Shopify CLI
-   Clone/pull theme
-   Establish Git repository

## Phase 2 --- Global styling

Build:

-   Purelane CSS variables
-   typography
-   colors
-   glass system
-   buttons
-   global spacing
-   responsive foundation

## Phase 3 --- Hero

Complete Hero visually before moving on.

## Phase 4 --- Product Grid

Connect real Shopify products.

## Phase 5 --- Best-selling Combos

Implement blocks and responsive horizontal scrolling.

## Phase 6 --- Bundles

Implement bundle cards and merchant-editable blocks.

## Phase 7 --- Review Wall

Implement review blocks and marquee.

## Phase 8 --- Interactions

Add:

-   carousel
-   reveal animations
-   hover states
-   header behavior
-   marquee

## Phase 9 --- Theme Editor

Test all sections inside Shopify Customize.

## Phase 10 --- Responsive QA

Test all target widths.

## Phase 11 --- Accessibility

Keyboard, focus, alt text, reduced motion.

## Phase 12 --- Performance

Optimize images, CSS, JavaScript.

## Phase 13 --- Git/documentation

Create clean commits and prepare submission materials.

------------------------------------------------------------------------

# 34. Suggested Git commit history

Use meaningful commits.

Example:

``` text
feat: initialize Purelane Dawn theme
feat: establish Purelane design tokens
feat: build Purelane hero section
feat: add hero product carousel
feat: add Shopify product grid
feat: build best selling combos
feat: build Purelane bundles
feat: add review wall
feat: add responsive Purelane styling
feat: add merchant editable section settings
fix: improve hero mobile layout
fix: improve theme editor compatibility
fix: improve accessibility and focus states
perf: optimize Purelane assets
docs: add assessment implementation notes
```

Do not make one giant final commit.

------------------------------------------------------------------------

# 35. Project deliverables

The assessment materials request/expect deliverables around:

-   Development store URL
-   Store password
-   GitHub repository
-   Commit history
-   Metafield/metaobject definitions if created
-   Short notes on the build
-   Short notes on AI-assisted workflow
-   Final submission using the specified assignment subject

The assessment deadline shown in the provided requirements is:

**2 days from the email that brought the candidate to the assignment.**

The final submission should follow the exact email/submission
instructions supplied by Troopod rather than inventing different
submission details.

------------------------------------------------------------------------

# 36. AI-assisted workflow

The assessment explicitly asks for notes about AI-assisted development.

Document:

1.  What was delegated to AI
2.  What AI generated
3.  What failed
4.  What was manually corrected
5.  How the process could be systematized for many similar assignments

Recommended approach:

``` text
Human:
- Understand requirements
- Define UI acceptance criteria
- Review architecture
- Validate Shopify behavior
- Compare visual output
- Make final decisions

AI:
- Extract UI patterns
- Help convert HTML patterns to Liquid
- Draft section schema
- Generate repetitive markup
- Suggest responsive CSS
- Help debug errors
- Generate test/checklists
- Review code for accessibility/performance
```

Do not blindly accept generated code.

------------------------------------------------------------------------

# 37. What NOT to do

Do not:

-   Redesign the Purelane UI
-   Replace it with a generic Dawn storefront
-   Build a React application
-   Build a separate Node backend
-   Add a database without need
-   Hardcode all Shopify product data
-   Use an external commerce backend
-   Remove the five required sections
-   Ignore mobile
-   Ignore the Theme Editor
-   Create inaccessible carousels
-   Use excessive libraries
-   Make one giant Liquid file
-   Copy the entire prototype blindly into `theme.liquid`
-   Rewrite the visual design based on personal preference

------------------------------------------------------------------------

# 38. MVP acceptance criteria

The MVP is considered successful when:

## Shopify

-   Runs on a Shopify development store
-   Uses Dawn
-   Can be edited through the Shopify Theme Editor

## Required sections

-   Hero exists
-   Shop/Product Grid exists
-   Best-selling Combos exists
-   Bundles exists
-   Review Wall exists

## UI

-   Visually faithful to `purelane-homepage.html`
-   Correct typography
-   Correct spacing
-   Correct card language
-   Correct product staging
-   Correct colors/gradients
-   Correct glass treatment
-   Correct buttons
-   Correct responsive behavior

## Data

-   Product grid uses real Shopify products
-   Product URLs work
-   Product images work
-   Prices are dynamic

## Interaction

-   Hero carousel works
-   Core scrolling/marquee behavior works
-   Hover states work
-   Reduced motion works

## Merchant editing

-   Important content can be edited
-   Blocks can be reordered
-   Sections can be reordered
-   Theme Editor does not break JavaScript

## Engineering

-   No major console errors
-   Responsive
-   Accessible
-   Reasonably performant
-   Clean Git history
-   Clear documentation

------------------------------------------------------------------------

# 39. Source-specific implementation notes

## Product visual classes

The prototype defines product image classes including:

``` text
p-combo2
p-dish
p-eraser
p-floor
p-handwash
p-kbtl
p-kitchen
p-laundry
p-mbtl
p-metal
p-tap
p-tbtl
p-toilet
p-wm
```

These correspond to different Purelane product visuals.

## Hero visual states

``` text
State 1:
Single bottle

State 2:
Two products

State 3:
Three products
```

## Main source navigation references

The prototype includes section references such as:

``` text
top
ingredients
how
proof
bundles
shop
voices
```

The MVP can prioritize the required five sections while preserving
useful navigation relationships.

------------------------------------------------------------------------

# 40. Design philosophy

The Purelane page is not meant to look like a generic ecommerce
template.

Its identity comes from the combination of:

-   Editorial typography
-   Premium cleaning-product presentation
-   Eco/natural messaging
-   Purple/green/orange palette
-   Glass surfaces
-   Water/light visual effects
-   Strong product imagery
-   Savings-driven ecommerce cards
-   Small uppercase labels
-   Horizontal content rails
-   Motion
-   Mobile-first interaction patterns

When rebuilding it in Shopify, preserve this combination.

------------------------------------------------------------------------

# 41. Final implementation principle

Always ask:

> **"Does this implementation reproduce the Purelane prototype
> accurately while satisfying the Shopify assessment requirements?"**

If yes, implement it.

If no, reconsider it.

The goal is:

``` text
Purelane Prototype
       ↓
Faithful Shopify MVP
       ↓
Real Shopify Data
       ↓
Merchant Editable
       ↓
Responsive
       ↓
Accessible
       ↓
Fast
       ↓
Reviewable
```

------------------------------------------------------------------------

# 42. Final stack summary

``` text
Shopify
Dawn Theme
Liquid
HTML5
CSS3
Vanilla JavaScript
Shopify Section Schema
Shopify JSON Templates
Shopify Products
Shopify Collections
Metafields / Metaobjects when useful
Shopify CLI
Git
GitHub
VS Code
Shopify Development Store
```

No React. No Next.js. No separate Node backend. No database unless a
later requirement genuinely requires one.

------------------------------------------------------------------------

# 43. Final MVP priority matrix

  Feature                        Priority               MVP
  ---------------------------- ---------- -----------------
  Hero                                 P0               Yes
  Shop/Product Grid                    P0               Yes
  Best-selling Combos                  P0               Yes
  Bundles                              P0               Yes
  Review Wall                          P0               Yes
  Real Shopify product data            P0               Yes
  Merchant editing                     P0               Yes
  Theme Editor compatibility           P0               Yes
  Responsive design                    P0               Yes
  Accessibility                        P0               Yes
  Performance                          P0               Yes
  Hero carousel                        P1               Yes
  Review marquee                       P1               Yes
  Header/progress rail                 P1   As time permits
  Full range                           P2             Later
  Ingredients                          P2             Later
  How it works                         P2             Later
  Proof                                P2             Later
  Other bonus sections                 P2             Later

------------------------------------------------------------------------

# 44. Working rule for future AI coding sessions

When asking an AI coding agent to work on this project, always provide:

1.  `@purelane-homepage.html`
2.  This specification file
3.  The current Shopify theme state
4.  The exact section being implemented
5.  The visual acceptance criteria

Use the following instruction:

> `@purelane-homepage.html` is the visual source of truth. This
> specification is the project/architecture source of truth. Do not
> redesign the UI. Implement only the requested scope, preserve existing
> behavior, use Shopify-native patterns, and verify the result against
> the prototype before considering the task complete.
