/**
 * Generates branded placeholder images for every `/images/...` path referenced in `src/`.
 * Existing files are never overwritten — drop real photography into `public/images`
 * with the same file names and they will be used automatically.
 *
 *   npm run images:placeholders
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const srcDir = join(root, "src");
const publicDir = join(root, "public");

// Palettes: [sky top, sky bottom, far mountains, near mountains]
const palettes = {
  destinations: ["#0f4c75", "#f6b26b", "#3a6b8c", "#1b3a4b"],
  packages: ["#155e75", "#fbbf77", "#2c7a7b", "#123040"],
  hero: ["#0b2a44", "#f59e5b", "#274b69", "#0e1f2e"],
  umrah: ["#2b2140", "#e8b07a", "#4a3b5c", "#1a1426"],
  hajj: ["#3b2a1e", "#f1c27d", "#5c4331", "#221710"],
  categories: ["#134e4a", "#fcd34d", "#2d6a64", "#0f2e2c"],
  services: ["#1e3a5f", "#93c5fd", "#35577f", "#12243a"],
  gallery: ["#164e63", "#fda4af", "#2f6f85", "#0f2f3b"],
  blog: ["#1f3b57", "#fde68a", "#3b5f80", "#13263a"],
  about: ["#0f3d3e", "#fbcfa0", "#2a6061", "#0b2627"],
  cta: ["#0b2233", "#f59e0b", "#1d3f59", "#08141f"],
  og: ["#0b2233", "#f59e0b", "#1d3f59", "#08141f"],
  brand: ["#0e7490", "#0e7490", "#0e7490", "#0e7490"],
  testimonials: ["#0e7490", "#f59e0b", "#0e7490", "#0e7490"],
};

const sizes = { hero: [2400, 1350], destinations: [1600, 1200], og: [1200, 630], testimonials: [160, 160], brand: [512, 512] };

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(p);
  }
  return out;
}

function hash(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function humanize(file) {
  return file
    .replace(/\.[a-z]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function landscapeSvg(w, h, [top, bottom, far, near], seed, label, folder) {
  const r = (n) => ((seed >> n) % 100) / 100;
  const ridge = (base, amp, pts) =>
    Array.from({ length: pts + 1 }, (_, i) => {
      const x = (i / pts) * w;
      const y = base + Math.sin(i * 1.7 + seed) * amp * (0.5 + r(i % 16));
      return `${x.toFixed(0)},${y.toFixed(0)}`;
    }).join(" ");
  const sunX = w * (0.2 + r(3) * 0.6);
  const fontSize = Math.round(Math.min(w, h) * 0.055);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>
    <radialGradient id="sun"><stop offset="0" stop-color="#fff7e6" stop-opacity="0.95"/><stop offset="1" stop-color="#fff7e6" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#sky)"/>
  <circle cx="${sunX}" cy="${h * 0.42}" r="${h * 0.22}" fill="url(#sun)"/>
  <polygon points="0,${h} ${ridge(h * 0.58, h * 0.12, 7)} ${w},${h}" fill="${far}" opacity="0.85"/>
  <polygon points="0,${h} ${ridge(h * 0.74, h * 0.08, 5)} ${w},${h}" fill="${near}"/>
  <text x="50%" y="${h * 0.86}" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="#ffffff" fill-opacity="0.9">${label}</text>
  <text x="50%" y="${h * 0.86 + fontSize * 1.1}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(fontSize * 0.42)}" letter-spacing="3" fill="#ffffff" fill-opacity="0.55">PLACEHOLDER · /images/${folder}</text>
</svg>`;
}

function avatarSvg(w, seed) {
  const hues = ["#0e7490", "#b45309", "#7c3aed", "#be185d", "#15803d"];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}"><rect width="100%" height="100%" fill="${hues[seed % hues.length]}"/>
  <circle cx="${w / 2}" cy="${w * 0.4}" r="${w * 0.18}" fill="#fff" fill-opacity="0.85"/><ellipse cx="${w / 2}" cy="${w * 0.95}" rx="${w * 0.34}" ry="${w * 0.3}" fill="#fff" fill-opacity="0.85"/></svg>`;
}

function logoSvg(w) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0e7490"/>
  <g transform="translate(4.2 4.2) scale(0.65)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></g></svg>`;
}

const refs = new Set();
for (const file of walk(srcDir)) {
  for (const m of readFileSync(file, "utf8").matchAll(/\/images\/[a-z0-9/_.-]+\.(?:jpg|jpeg|png|webp)/gi)) refs.add(m[0]);
}

let created = 0;
for (const ref of [...refs].sort()) {
  const out = join(publicDir, ref);
  if (existsSync(out)) continue;
  mkdirSync(dirname(out), { recursive: true });
  const folder = ref.split("/")[2];
  const fileName = ref.split("/").pop();
  const seed = hash(ref);
  const [w, h] = sizes[folder] ?? [1200, 900];
  const svg =
    folder === "testimonials" ? avatarSvg(w, seed) : folder === "brand" ? logoSvg(w) : landscapeSvg(w, h, palettes[folder] ?? palettes.packages, seed, humanize(fileName), folder);
  const img = sharp(Buffer.from(svg));
  await (ref.endsWith(".png") ? img.png() : img.jpeg({ quality: 72, mozjpeg: true })).toFile(out);
  created++;
}

// App icons (favicon / apple touch icon) live in src/app for Next.js file conventions.
for (const [name, size] of [["icon.png", 512], ["apple-icon.png", 180]]) {
  const out = join(srcDir, "app", name);
  if (!existsSync(out)) {
    await sharp(Buffer.from(logoSvg(size))).png().toFile(out);
    created++;
  }
}

console.log(`Placeholders: ${created} created, ${refs.size} referenced.`);
