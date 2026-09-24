import type { NextConfig } from "next";

/**
 * 301 redirects from the legacy travelmate.com.pk URL structure so existing
 * Google rankings and backlinks carry over to the new site.
 */
const legacyRedirects: [string, string][] = [
  ["/travel-packages/dubai-tour", "/destinations/dubai"],
  ["/travel-packages/domestic-tours", "/tours/pakistan-tours"],
  ["/travel-packages/europe-tour-packages", "/destinations/europe"],
  ["/travel-packages/switzerland-tour-packages", "/destinations/switzerland"],
  ["/travel-packages/hong-kong-packages", "/destinations/hong-kong"],
  ["/travel-packages/philippines-tour-package", "/destinations/philippines"],
  ["/travel-packages/azerbaijan-tour-packages", "/destinations/azerbaijan"],
  ["/baku-azerbaijan-tour-package", "/travel-packages/baku-azerbaijan-tour"],
  ["/philippines-tour-package", "/travel-packages/philippines-manila-boracay"],
  ["/london-tour-package", "/travel-packages/london-tour"],
  ["/canada-tour-package-toronto-montreal", "/travel-packages/canada-toronto-montreal"],
  ["/seychelles-tour-package-10", "/travel-packages/seychelles-island-escape"],
  ["/europe-cruise-tour", "/travel-packages/europe-cruise-royal-caribbean"],
  ["/cruise-tour-with-travel-mate", "/cruise-tours"],
  ["/visa-services-from-karachi", "/visa-services"],
  ["/umrah-packages", "/umrah"],
  ["/umrah-international", "/services"],
  ["/umrah/group", "/umrah?category=group"],
  ["/umrah/rajab-shaban-ramadan", "/umrah?category=rajab-shaban"],
  ["/umrahpackages/18-days-umrah-package-2", "/umrah/15-days-ramadan-umrah"],
  ["/umrahpackages/ramadan-group-umrah-package-2", "/umrah/ramadan-group-umrah"],
  ["/umrahpackages/:slug*", "/umrah"],
  ["/pearl-plus", "/hajj/pearl-plus"],
  ["/diamond/diamond-package", "/hajj/diamond"],
  ["/diamond/:slug*", "/hajj"],
  ["/tmg-hajj-packages-faqs", "/hajj#faqs"],
  ["/hajj-booking-from-pakistan", "/travel-tips/hajj-booking-from-pakistan"],
  ["/explore-france-with-travel-mate", "/travel-tips/explore-france-with-travel-mate"],
  ["/tag/:slug*", "/travel-tips"],
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2400],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
