/**
 * One-shot generator for static brand assets:
 *   - public/og-image.png        1200x630 social sharing image
 *   - public/favicon-16.png / favicon-32.png
 *   - public/apple-touch-icon.png (180)
 *   - public/icon-192.png / icon-512.png (web manifest)
 *
 * Run: node scripts/generate-assets.mjs
 * Sources: src/assets/logo-white.png (og), public/favicon.png (icons).
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const logoB64 = readFileSync('src/assets/logo-white.png').toString('base64');

const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="0" y="0" width="1200" height="630" fill="#F89A32"/>
  <polygon points="0,630 1200,630 1200,470 0,560" fill="#F36C32"/>
  <image x="331" y="128" width="537" height="212" xlink:href="data:image/png;base64,${logoB64}"/>
  <text x="600" y="445" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF">Business Management for Creatives</text>
  <text x="600" y="555" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="3" fill="#FFFFFF">BRIBIZ.NET</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile('public/og-image.png');
console.log('og-image.png written');

const sizes = [
  [16, 'public/favicon-16.png'],
  [32, 'public/favicon-32.png'],
  [180, 'public/apple-touch-icon.png'],
  [192, 'public/icon-192.png'],
  [512, 'public/icon-512.png'],
];
for (const [size, out] of sizes) {
  await sharp('public/favicon.png').resize(size, size).png().toFile(out);
  console.log(out + ' written');
}
