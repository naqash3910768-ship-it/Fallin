# Fello — Shopify Online Store 2.0 Theme

A from-scratch Shopify theme rebuilding the design, layout, animations, copy
and structure of the Fello Moulded Furniture reference site
(https://fallin-dun.vercel.app/) using native Shopify Liquid, JSON templates
and section/block schemas — no page-builder apps or external frameworks.

## What's inside

- **Layout**: `layout/theme.liquid` — page shell, Google Font (Plus Jakarta
  Sans) loading, CSS custom properties driven by theme settings.
- **Sections**: one Liquid file per design block (hero, trust strip,
  collection showcase, featured products, quality/feature list, process
  steps, image+text, brochure CTA, blog teaser, CTA banner, page header,
  timeline, pillars grid, contact form, product/collection/blog/article/
  cart/search/404/page templates). Every section has its own `{% schema %}`
  with editable settings and, where the design repeats content, blocks.
- **Snippets**: reusable partials — `product-card`, `color-swatches`,
  `button`, `section-heading`, `icon-art` (the illustrative placeholder
  artwork system), `image-or-art` (renders a merchant image if present,
  otherwise falls back to `icon-art`), JSON-LD structured data.
- **Templates**: JSON templates wiring sections together for every page
  type (home, product, collection, search, blog, article, cart, 404,
  list-collections, and dedicated page templates for About, Quality,
  Brochure and Contact). Liquid templates for the standard customer
  account flows and gift cards.
- **Assets**: `base.css` (the full design system — colors, type scale,
  buttons, cards, animations) and `theme.js` (sticky header, mobile menu,
  scroll-reveal via `IntersectionObserver`, product gallery, quantity
  selector, progressive contact-form UX). No build step required.
- **Config**: `settings_schema.json` exposes the brand palette, typography,
  layout width, button radius and animation toggle in the Theme Editor.

## Every image and every word is editable

- All headings, body copy, button labels and links live in section/block
  **settings** — edit them from the Shopify Theme Editor, no code changes
  needed.
- Every visual slot uses the `image-or-art` snippet: upload a real photo
  through any `image_picker` setting in the Theme Editor and it replaces
  the illustrative line-art placeholder automatically. Leave it empty and
  the on-brand placeholder artwork renders instead, so sections never look
  broken before photography is uploaded.

## Setting up content after installing the theme

1. **Menus** — create a `main-menu` navigation (Home, Products, About Us,
   Quality, Brochure, Blog, Contact) and a `footer` navigation in
   Settings → Navigation. The header/footer sections default to these
   handles.
2. **Collections** — create collections for `Chairs`, `Tables & Stools`
   and `Junior Collection` (matching the original site's categories), plus
   the automatic `All` collection. Reference them in the homepage
   "Collection showcase" blocks, the "Featured products" section, and the
   category tabs on the products collection template.
3. **Pages** — create pages with the handles `about`, `quality`,
   `brochure` and `contact`, and assign them the matching alternate
   template (`page.about`, `page.quality`, `page.brochure`,
   `page.contact`) under Theme → Template in the page editor.
4. **Blog** — create a blog (e.g. "News") for the journal/blog teaser
   sections and select it in the "Blog posts" section settings.
5. **Product metafields (optional but recommended)** — define these
   metafields under Settings → Custom data → Products to unlock the
   item-number/tagline/spec layout from the original design:
   - `custom.item_number` (single line text)
   - `custom.tagline` (single line text)
   - `custom.icon` (single line text — one of `chair`, `armchair`,
     `stool`, `table`, `kids-chair`, `factory`, `resin`, `mould`,
     `quality`, `finish`, `stack`)
   - `custom.tone` (single line text — `sand`, `ink`, `red`, `yellow`,
     `charcoal`)
   - `custom.specifications` (multi-line text, one `Label: Value` pair per
     line)
   - `custom.spec_source` / `custom.color_source` (single line text,
     optional attribution captions)
   - Colour variants use Shopify's native **Color** option with swatch
     configuration (Settings → Product options → Color) — the theme reads
     `option.value.swatch.color` automatically and falls back to a
     built-in colour-name map if swatches aren't configured yet.

## Notes

- The theme ships fully functional Add to Cart / cart / checkout flows
  (standard Shopify commerce), in addition to the "Request Information" /
  "Download Brochure" calls to action from the reference design.
- Colors, type, layout width, button radius and the scroll-reveal
  animation toggle are all in the Theme Editor under **Theme settings**.
