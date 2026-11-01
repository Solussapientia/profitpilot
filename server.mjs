import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC = path.join(ROOT, "public");
const DATA = path.join(ROOT, "data", "inquiries.json");
const PASSWORD = "7676";
const PORT = Number(process.env.PORT || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".json": "application/json",
};

function readInquiries() {
  try {
    return JSON.parse(fs.readFileSync(DATA, "utf8"));
  } catch {
    return [];
  }
}

function writeInquiries(list) {
  fs.mkdirSync(path.dirname(DATA), { recursive: true });
  fs.writeFileSync(DATA, JSON.stringify(list, null, 2));
}

function send(res, code, body, type = "application/json; charset=utf-8") {
  res.writeHead(code, { "content-type": type, "cache-control": "no-store" });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString() || "{}";
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "content-type": TYPES[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");

  try {
    if (req.method === "POST" && url.pathname === "/api/inquiries") {
      const body = await readBody(req);
      const inquiry = {
        id: Date.now().toString(36),
        createdAt: new Date().toISOString(),
        name: String(body.name || "").trim().slice(0, 200),
        business: String(body.business || "").trim().slice(0, 200),
        email: String(body.email || "").trim().slice(0, 200),
        phone: String(body.phone || "").trim().slice(0, 50),
        city: String(body.city || "").trim().slice(0, 120),
        about: String(body.about || "").trim().slice(0, 4000),
      };
      if (!inquiry.name || !inquiry.business || !inquiry.email || !inquiry.phone) {
        send(res, 400, JSON.stringify({ error: "Name, business, email, and phone are required." }));
        return;
      }
      const list = readInquiries();
      list.unshift(inquiry);
      writeInquiries(list);
      send(res, 201, JSON.stringify({ ok: true }));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/inquiries") {
      if (req.headers["x-admin-key"] !== PASSWORD) {
        send(res, 401, JSON.stringify({ error: "Unauthorized" }));
        return;
      }
      send(res, 200, JSON.stringify(readInquiries()));
      return;
    }
  } catch {
    send(res, 400, JSON.stringify({ error: "Bad request" }));
    return;
  }

  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const filePath = path.normalize(path.join(PUBLIC, pathname));
  if (!filePath.startsWith(PUBLIC)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
    return;
  }
  const nested = path.join(filePath, "index.html");
  if (fs.existsSync(nested)) {
    serveFile(res, nested);
    return;
  }
  send(res, 404, "Not found", "text/plain; charset=utf-8");
});

server.listen(PORT, () => {
  console.log(`Profit Pilot http://localhost:${PORT}`);
});
