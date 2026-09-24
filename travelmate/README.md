# Travel Mate: Next.js Website

A modern, conversion-focused rebuild of [travelmate.com.pk](https://www.travelmate.com.pk), a Karachi travel
house offering tour packages, Hajj & Umrah, visa services, cruises, hotels and air ticketing since 2007.

See **[SITEMAP.md](./SITEMAP.md)** for the analysis of the original site, the full sitemap and the
legacy-URL redirect map.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, static generation) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`) + `tw-animate-css` |
| UI | shadcn/ui-style components (Radix primitives + CVA) in `src/components/ui`, `components.json` included |
| Motion | Framer Motion (reveals, parallax hero, filter transitions, mobile menu) |
| Forms | React Hook Form + Zod (shared schemas for client and API) |
| Carousel | Embla (testimonials) |
| Images | `next/image` (AVIF/WebP, responsive `sizes`) |

## Getting started

Requires **Node.js 20.9+**.

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (96 statically generated pages) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run images:placeholders` | Generate placeholder images for any missing `/images/...` file |

### Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used in metadata, `sitemap.xml` and JSON-LD. Default `https://www.travelmate.com.pk` |
| `ENQUIRY_WEBHOOK_URL` | Optional. Enquiry, contact and newsletter submissions are POSTed here as JSON (Zapier, Make, n8n, HubSpot, Google Apps Script…). If empty, leads are logged on the server. |

## Project structure

```
src/
├── app/                 Routes (App Router), API routes, sitemap.ts, robots.ts, manifest.ts
├── components/
│   ├── ui/              shadcn-style primitives (button, input, accordion, sheet, badge…)
│   ├── layout/          Header (sticky, transparent → solid), mobile nav, footer, logo
│   ├── shared/          PageHero, Breadcrumbs, SectionHeading, CTA banner, FAQ, JSON-LD, WhatsApp…
│   ├── forms/           Enquiry, contact, newsletter & hero search forms
│   ├── packages/        Package / Umrah / Hajj cards, grid, filterable explorer
│   └── destinations/    Destination card & filterable explorer
├── sections/home/       Homepage sections (hero, destinations, packages, why us, categories…)
├── data/                Typed content: destinations, packages, umrah, hajj, services, blog, nav…
├── hooks/               useScrolled, useFormSubmit
├── lib/                 site-config, seo helpers & schema builders, validations, search, api layer
└── types/               Shared TypeScript types
```

## Editing content

All business content lives in **`src/data/`** and **`src/lib/site-config.ts`**:

- **Contact details, departments, social links, WhatsApp number:** `src/lib/site-config.ts`
- **Packages, prices, itineraries:** `src/data/packages.ts`
- **Destinations:** `src/data/destinations.ts`
- **Umrah / Hajj packages & FAQs:** `src/data/umrah.ts`, `src/data/hajj.ts`
- **Blog posts:** `src/data/blog.ts`
- **Navigation menus:** `src/data/navigation.ts`

New packages and destinations automatically get pages, search results, sitemap entries, filters and
schema markup.

> ⚠️ **Review before launch**
> - Package and Umrah prices are **indicative placeholders**. Replace them with your current rates.
> - Hajj prices are the reference rates published for the last TMG season.
> - `src/data/testimonials.ts` contains **sample reviews**. Replace them with real, verified customer reviews.
> - The main WhatsApp number is set to the Tours & Visa desk (0300 0800 527). Change `contact.whatsapp` if you use a different WhatsApp Business line.
> - Office hours in `site-config.ts` are assumed. Confirm them.

## Images

Every image is referenced by a descriptive path, e.g.

```
/images/destinations/hunza-valley.jpg
/images/packages/turkey-tour.jpg
/images/umrah/ramadan-umrah.jpg
/images/hero/hero-main.jpg
```

`public/images` currently holds **generated placeholders** (the build environment could not download
photography). To go live, overwrite each file with a real photo of the **same name**. No code changes
are needed. Recommended sizes: hero 2400×1350, destinations 1600×1200, everything else 1200×900,
OG image 1200×630. After adding or renaming image paths in code, run `npm run images:placeholders` to
fill any gaps.

For a **video hero**, replace the `<Image>` in `src/sections/home/hero.tsx` with a
`<video autoPlay muted loop playsInline poster="/images/hero/hero-main.jpg">`.

## SEO

- Per-page `metadata` via `buildMetadata()` (title template, description, canonical, Open Graph, Twitter)
- JSON-LD: `TravelAgency` + `WebSite` (search action) sitewide, `BreadcrumbList` on every inner page,
  `TouristTrip`/`Product` + `Offer` on packages, `TouristDestination`, `FAQPage`, `ItemList`, `BlogPosting`
- `sitemap.xml` and `robots.txt` generated from data
- **301 redirects** from every known legacy URL (`next.config.ts`) to keep existing rankings
- Semantic headings (one `h1` per page), descriptive alt text, clean URLs

## Functionality

- Hero search (packages / destinations / Umrah & Hajj) → filtered listings via query params
- Package filtering: scope, trip type, destination, duration, sort, free-text search (URL-synced, shareable)
- Destination filtering by region + search
- Site-wide search page (`/search`) + JSON API (`/api/search`)
- Booking enquiry forms (pre-filled per package), contact form, newsletter: Zod validation on client and server, honeypot anti-spam
- WhatsApp CTAs everywhere (floating button, per-package pre-filled messages, per-person desk links)
- Mobile sticky "Enquire now" bar on package pages

### Connecting a backend

`src/lib/api.ts` is the single integration point. `submitLead()` forwards validated leads to
`ENQUIRY_WEBHOOK_URL`. `listPackages()` / `findPackage()` etc. currently read local data and can be
switched to a CMS or booking-engine `fetch` without touching UI components.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. On [vercel.com/new](https://vercel.com/new), import the repository.
   - If the project lives in a sub-folder of the repo (e.g. `travelmate/`), set **Root Directory** to that folder.
   - Framework preset: **Next.js** (auto-detected). Build command `next build`, output handled automatically.
3. Add environment variables (Project → Settings → Environment Variables):
   `NEXT_PUBLIC_SITE_URL=https://www.travelmate.com.pk` and optionally `ENQUIRY_WEBHOOK_URL`.
4. Deploy. Then under **Settings → Domains**, add `travelmate.com.pk` and `www.travelmate.com.pk`
   and update DNS as Vercel instructs (A record `76.76.21.21` for the apex, CNAME `cname.vercel-dns.com` for `www`).
5. After DNS switches over, submit `https://www.travelmate.com.pk/sitemap.xml` in Google Search Console.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```
