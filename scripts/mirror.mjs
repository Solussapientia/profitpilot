#!/usr/bin/env node
/**
 * Mirror moneymotion.io static assets for local Profit Pilot template.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://moneymotion.io";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public");

const SEEDS = [
  "/",
  "/aup/",
  "/tos/",
  "/auth/login",
  "/auth/register",
];

const ASSET_RE =
  /(?:href|src|component-url|renderer-url|before-hydration-url)=["']([^"']+)["']|(?:url\(|import\(|import\s+["'])(\/[^"')\s]+)|["'](\/(?:_astro|assets|images|video)\/[^"'\s?]+)/g;

const LINK_RE = /href=["'](\/[^"'#?]+)["']/g;

const queue = new Set(SEEDS);
const done = new Set();
const binaryExt = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".mp4",
  ".woff",
  ".woff2",
  ".ttf",
]);

function normalizePath(urlPath) {
  if (!urlPath.startsWith("/")) return null;
  if (urlPath.startsWith("//")) return null;
  const clean = urlPath.split("?")[0].split("#")[0];
  if (clean.includes("..")) return null;
  return clean.endsWith("/") && clean !== "/" ? clean : clean;
}

function localPath(urlPath) {
  const n = normalizePath(urlPath);
  if (!n) return null;
  if (n === "/") return path.join(OUT, "index.html");
  if (n.endsWith("/")) return path.join(OUT, n.slice(1), "index.html");
  const ext = path.extname(n);
  if (!ext || n.startsWith("/auth/") || n.startsWith("/rpc/")) {
    return path.join(OUT, n.slice(1), "index.html");
  }
  return path.join(OUT, n.slice(1));
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ProfitPilot-Mirror/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const ct = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, contentType: ct };
}

function extractPaths(text) {
  const found = new Set();
  for (const re of [ASSET_RE, LINK_RE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      const p = m[1] || m[2] || m[3];
      if (!p) continue;
      if (p.startsWith("http") || p.startsWith("#") || p.startsWith("mailto:"))
        continue;
      if (p.startsWith("/")) found.add(normalizePath(p));
    }
  }
  return found;
}

async function saveFile(filePath, buf) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buf);
}

async function processPath(urlPath) {
  const key = normalizePath(urlPath);
  if (!key || done.has(key)) return;
  done.add(key);

  const url = BASE + (key === "/" ? "/" : key);
  let buf;
  let contentType;
  try {
    ({ buf, contentType } = await fetchBuffer(url));
  } catch (e) {
    console.warn("skip", url, e.message);
    return;
  }

  const dest = localPath(key);
  if (!dest) return;
  await saveFile(dest, buf);
  console.log("saved", key, `(${buf.length}b)`);

  const ext = path.extname(key);
  const looksText =
    contentType.includes("text") ||
    contentType.includes("javascript") ||
    contentType.includes("json") ||
    contentType.includes("svg") ||
    /\.(html|css|js|svg|json|txt|xml)$/i.test(key);
  const canScan =
    looksText ||
    (!binaryExt.has(ext) && buf.length < 4_000_000 && !buf.includes(0));

  if (canScan) {
    const text = buf.toString("utf8");
    for (const p of extractPaths(text)) {
      if (p && !done.has(p)) queue.add(p);
    }
    for (const m of text.matchAll(/\/assets\/[A-Za-z0-9_.-]+\.(js|css)/g)) {
      queue.add(m[0]);
    }
    for (const m of text.matchAll(
      /(?:from|import)\s*["'](\.[^"']+\.js)["']|import\(\s*["'](\.[^"']+\.js)["']\)/g
    )) {
      const spec = m[1] || m[2];
      const dir = key.slice(0, key.lastIndexOf("/"));
      const parts = `${dir}/${spec}`.split("/");
      const out = [];
      for (const part of parts) {
        if (part === "" || part === ".") continue;
        if (part === "..") out.pop();
        else out.push(part);
      }
      queue.add("/" + out.join("/"));
    }
  }
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  while (queue.size) {
    const batch = [...queue];
    queue.clear();
    for (const p of batch) {
      await processPath(p);
    }
  }

  console.log(`\nDone. ${done.size} paths → ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
