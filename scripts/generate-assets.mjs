import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "assets");

const svg = String.raw`
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="desk" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f7f7f3"/>
      <stop offset="0.48" stop-color="#e6ece6"/>
      <stop offset="1" stop-color="#d9ded6"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#17201b"/>
      <stop offset="1" stop-color="#0f766e"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#151b18" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#desk)"/>
  <path d="M0 720 C270 650 360 760 620 690 C880 620 1070 650 1600 560 L1600 1000 L0 1000 Z" fill="#cfd8d0" opacity="0.72"/>
  <g opacity="0.22" stroke="#151b18" stroke-width="2">
    <path d="M120 120 H1480"/>
    <path d="M120 240 H1480"/>
    <path d="M120 360 H1480"/>
    <path d="M120 480 H1480"/>
    <path d="M120 600 H1480"/>
    <path d="M120 720 H1480"/>
    <path d="M260 80 V900"/>
    <path d="M520 80 V900"/>
    <path d="M780 80 V900"/>
    <path d="M1040 80 V900"/>
    <path d="M1300 80 V900"/>
  </g>
  <g filter="url(#shadow)">
    <rect x="470" y="230" width="720" height="460" rx="26" fill="#151b18"/>
    <rect x="510" y="270" width="640" height="360" rx="14" fill="url(#screen)"/>
    <rect x="390" y="690" width="880" height="52" rx="14" fill="#2a332e"/>
    <rect x="710" y="704" width="240" height="12" rx="6" fill="#6f7b72"/>
  </g>
  <g filter="url(#shadow)">
    <rect x="170" y="220" width="360" height="520" rx="18" fill="#ffffff"/>
    <rect x="210" y="270" width="190" height="26" rx="13" fill="#0f766e"/>
    <rect x="210" y="330" width="260" height="12" rx="6" fill="#aab5ad"/>
    <rect x="210" y="360" width="230" height="12" rx="6" fill="#c3ccc5"/>
    <rect x="210" y="420" width="280" height="14" rx="7" fill="#b45309"/>
    <rect x="210" y="462" width="240" height="12" rx="6" fill="#c3ccc5"/>
    <rect x="210" y="492" width="260" height="12" rx="6" fill="#c3ccc5"/>
    <rect x="210" y="552" width="170" height="14" rx="7" fill="#5b4bdb"/>
    <rect x="210" y="594" width="255" height="12" rx="6" fill="#c3ccc5"/>
    <rect x="210" y="624" width="220" height="12" rx="6" fill="#c3ccc5"/>
  </g>
  <g filter="url(#shadow)">
    <rect x="1070" y="160" width="300" height="410" rx="18" fill="#ffffff"/>
    <rect x="1110" y="205" width="110" height="22" rx="11" fill="#d7a521"/>
    <rect x="1110" y="260" width="210" height="12" rx="6" fill="#b8c3bb"/>
    <rect x="1110" y="292" width="185" height="12" rx="6" fill="#d1d8d2"/>
    <rect x="1110" y="350" width="190" height="12" rx="6" fill="#0f766e"/>
    <rect x="1110" y="386" width="220" height="12" rx="6" fill="#d1d8d2"/>
    <rect x="1110" y="418" width="170" height="12" rx="6" fill="#d1d8d2"/>
    <circle cx="1288" cy="503" r="34" fill="#b45309"/>
  </g>
  <g opacity="0.9">
    <rect x="590" y="335" width="180" height="14" rx="7" fill="#c4fff7"/>
    <rect x="590" y="380" width="330" height="14" rx="7" fill="#ffffff" opacity="0.78"/>
    <rect x="620" y="425" width="260" height="14" rx="7" fill="#f0a35d"/>
    <rect x="620" y="470" width="390" height="14" rx="7" fill="#ffffff" opacity="0.68"/>
    <rect x="650" y="515" width="210" height="14" rx="7" fill="#a69cff"/>
    <rect x="650" y="560" width="340" height="14" rx="7" fill="#ffffff" opacity="0.62"/>
  </g>
  <text x="122" y="870" fill="#151b18" opacity="0.16" font-family="Arial, sans-serif" font-size="74" font-weight="800">RESUME</text>
  <text x="930" y="865" fill="#151b18" opacity="0.13" font-family="Arial, sans-serif" font-size="62" font-weight="800">BLOG / CV</text>
</svg>
`;

await mkdir(outputDir, { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outputDir, "profile-visual.png"));
await sharp(Buffer.from(svg)).resize(1200, 630).png({ compressionLevel: 9 }).toFile(path.join(outputDir, "og-cover.png"));

console.log("[assets] generated public/assets/profile-visual.png and public/assets/og-cover.png");
