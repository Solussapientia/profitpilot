#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const TEXT_REPLACEMENTS = [
  // Same-origin links become local paths. Leave docs/api hosts alone.
  [/https:\/\/moneymotion\.io/gi, ""],
  [/\/branding\/moneymotion\//g, "/branding/profitpilot/"],
  [/"name":\s*"moneymotion"/g, '"name": "Profit Pilot"'],
  [/Accept credit card payments using moneymotion/gi, "Profit Pilot — powered by Emergente Labs"],
  [/moneymotion \| Payments for Everyone/gi, "Profit Pilot | Payments for Everyone"],
  [/Join moneymotion today/gi, "Join Profit Pilot today"],
  [/Join thousands of businesses who are using moneymotion/gi,
    "Join thousands of businesses who are using Profit Pilot"],
  [/using moneymotion to accept/gi, "using Profit Pilot to accept"],
  [/children:\["money",/g, 'children:["profit",'],
  [/children:"motion"/g, 'children:"pilot"'],
  [/money<span class="opacity-30">motion<\/span>/g,
    'profit<span class="opacity-30">pilot</span>'],
  [/money<span class='opacity-30'>motion<\/span>/g,
    "profit<span class='opacity-30'>pilot</span>"],
  // Do not rewrite domains (moneymotion.io) or identifiers like _moneymotion-verification.
  [/(?<![\w.])moneymotion(?!\.io)/gi, "Profit Pilot"],
  [/mm_dark\.png/g, "pp_dark.png"],
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else await rebrandFile(full);
  }
}

async function rebrandFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const textLike = [
    ".html",
    ".js",
    ".css",
    ".json",
    ".svg",
    ".txt",
    ".xml",
    ".webmanifest",
  ].includes(ext);
  if (!textLike) return;

  let text = await fs.readFile(filePath, "utf8");
  let next = text;
  for (const [re, rep] of TEXT_REPLACEMENTS) {
    next = next.replace(re, rep);
  }
  if (next !== text) {
    await fs.writeFile(filePath, next);
    console.log("rebranded", path.relative(PUBLIC, filePath));
  }
}

async function copyFavicon() {
  const src = path.join(PUBLIC, "images", "mm_dark.png");
  const dest = path.join(PUBLIC, "images", "pp_dark.png");
  try {
    await fs.copyFile(src, dest);
  } catch {
    /* optional */
  }
}

async function copyBranding() {
  const src = path.join(PUBLIC, "branding", "moneymotion");
  const dest = path.join(PUBLIC, "branding", "profitpilot");
  try {
    await fs.cp(src, dest, { recursive: true });
  } catch {
    /* optional */
  }
}

await walk(PUBLIC);
await copyFavicon();
await copyBranding();
console.log("Rebrand complete.");
