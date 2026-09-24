# Travel Mate: Site Analysis & Sitemap

## 1. How the reference site was analysed

The build environment's network policy **blocks `www.travelmate.com.pk`**, so it could not be crawled
directly. The structure and content were rebuilt from search-engine indexes of the live site:
page titles, URLs and snippets for every indexed page. Business details such as the address,
phone numbers, emails, department contacts, the 2007 founding story, Hajj package tiers and
prices, and the package list come from those indexed pages.

**Before launch, compare against the live site** for anything search engines don't index (e.g.
exact current prices, hotel names, new packages) and update `src/data/*`.

### Legacy pages found on travelmate.com.pk → new location

| Legacy URL (travelmate.com.pk) | Content | New URL (301 redirect) |
| --- | --- | --- |
| `/` | Home: tour packages from Karachi, visa service, cruise service | `/` |
| `/about-us/` | Founded 2007 with an Umrah department, now a full travel house | `/about-us` |
| `/contact-us/` | Address, (021) 111 800 500, info@, Tours & Visa + Hajj & Umrah contacts | `/contact-us` |
| `/travel-packages/` | All travel & tour packages from Pakistan | `/travel-packages` |
| `/travel-packages/dubai-tour/` | Dubai packages (desert safari, city tour, dhow cruise) | `/destinations/dubai` |
| `/travel-packages/domestic-tours/` | Pakistan tours (Shogran & Kashmir, Naran & Shogran, Murree) | `/tours/pakistan-tours` |
| `/travel-packages/europe-tour-packages/` | Italy, Switzerland & France, 10 nights + rail pass | `/destinations/europe` |
| `/travel-packages/switzerland-tour-packages/` | Switzerland | `/destinations/switzerland` |
| `/travel-packages/hong-kong-packages/` | Hong Kong & Macau, 5 nights | `/destinations/hong-kong` |
| `/travel-packages/philippines-tour-package/` | Philippines | `/destinations/philippines` |
| `/travel-packages/azerbaijan-tour-packages/` | Baku, 6 nights B&B, visa & tours | `/destinations/azerbaijan` |
| `/baku-azerbaijan-tour-package/` | Baku, Absheron & Gabala, 5 days | `/travel-packages/baku-azerbaijan-tour` |
| `/london-tour-package/` | London | `/travel-packages/london-tour` |
| `/canada-tour-package-toronto-montreal/` | Canada | `/travel-packages/canada-toronto-montreal` |
| `/seychelles-tour-package-10/` | Seychelles | `/travel-packages/seychelles-island-escape` |
| `/philippines-tour-package/` | Philippines | `/travel-packages/philippines-manila-boracay` |
| `/europe-cruise-tour/` | Royal Caribbean 7-night full-board cruise | `/travel-packages/europe-cruise-royal-caribbean` |
| `/cruise-tour-with-travel-mate/` | Cruise deals for families | `/cruise-tours` |
| `/visa-services-from-karachi/` | Tourist, student & business visas | `/visa-services` |
| `/umrah/`, `/umrah-packages/` | Umrah packages from Pakistan | `/umrah` |
| `/umrah/group/`, `/umrah/rajab-shaban-ramadan/` | Umrah categories | `/umrah?category=…` |
| `/umrahpackages/18-days-umrah-package-2/` | 15 Days Ramadan Umrah | `/umrah/15-days-ramadan-umrah` |
| `/umrahpackages/ramadan-group-umrah-package-2/` | Ramadan Group Umrah | `/umrah/ramadan-group-umrah` |
| `/umrah-international/` | Umrah & international services | `/services` |
| `/hajj/` | Luxury / VIP Hajj packages (Signature, Executive, Deluxe) | `/hajj` |
| `/diamond/diamond-package/` | TMG Diamond Hajj | `/hajj/diamond` |
| `/pearl-plus/` | Pearl Plus Hajj | `/hajj/pearl-plus` |
| `/tmg-hajj-packages-faqs/` | Hajj FAQs | `/hajj#faqs` |
| `/hajj-booking-from-pakistan/` | Hajj booking guide | `/travel-tips/hajj-booking-from-pakistan` |
| `/travel-tips/` | Blog | `/travel-tips` |
| `/explore-france-with-travel-mate/` | Blog post | `/travel-tips/explore-france-with-travel-mate` |
| `/tag/*` | Tag archives | `/travel-tips` |

All redirects are defined in `next.config.ts`.

## 2. New sitemap

```
/                                   Home
├── /destinations                   All destinations (region filter + search)
│   └── /destinations/[slug]        22 destinations (16 international, 6 Pakistan)
├── /travel-packages                All packages (scope / type / destination / duration filters + sort)
│   └── /travel-packages/[slug]     25 packages with itinerary, inclusions, enquiry form
├── /tours/[category]               International, Pakistan, Honeymoon, Family, Group, Corporate
├── /umrah                          Umrah packages (category filter) + custom Umrah form + FAQs
│   └── /umrah/[slug]               6 Umrah packages
├── /hajj                           TMG Hajj tiers, packages, pricing table, add-ons, FAQs
│   └── /hajj/[slug]                Sapphire, Diamond, Pearl Plus, Pearl Plus (Deluxe), Gold
├── /visa-services                  Visa types, countries, process, documents, desk contacts, FAQs
├── /cruise-tours                   Cruise benefits, cruise packages, cruise enquiry
├── /services                       All 8 services
├── /about-us                       Story, mission/vision, milestones, team desks
├── /contact-us                     Contact cards, form, department contacts, map
├── /enquiry                        "Plan my trip" booking enquiry (pre-fills from query params)
├── /travel-tips                    Blog index
│   └── /travel-tips/[slug]         5 articles
├── /search                         Site-wide search (noindex)
├── /privacy-policy
├── /terms-and-conditions
├── /sitemap.xml, /robots.txt, /manifest.webmanifest
└── /api
    ├── POST /api/enquiry           Booking enquiry (Zod-validated, honeypot, webhook-ready)
    ├── POST /api/contact           Contact form
    ├── POST /api/newsletter        Newsletter sign-up
    ├── GET  /api/search?q=         Search index JSON
    └── GET  /api/packages          Packages JSON (?category=&destination=)
```

## 3. User journeys covered

| Journey | Path |
| --- | --- |
| Browse → book a holiday | Home hero search → filtered `/travel-packages` → package page → sticky enquiry form / WhatsApp |
| Inspiration first | Home destinations → destination page → its packages → enquiry |
| Umrah | Home / nav → `/umrah` → category filter → package → WhatsApp the Umrah desk or enquire |
| Hajj | `/hajj` → compare tiers & pricing → package → register interest |
| Visa | `/visa-services` → checklist → free consultation form or direct desk phone |
| Quick contact | Floating WhatsApp on every page, click-to-call in header/footer, `/contact-us` |
