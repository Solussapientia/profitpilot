const shops = {
  cafe: {
    name: "Harbor Coffee",
    url: "harborcoffee.com",
    hours: "Open today until 6:00 pm",
    line: "Espresso, pastry, and a seat by the window.",
    services: ["Espresso", "Breakfast", "Wi-Fi"],
    address: "18 Dock Street",
  },
  salon: {
    name: "Northside Studio",
    url: "northsidestudio.com",
    hours: "Open today until 7:00 pm",
    line: "Cuts, color, and walk-ins welcome.",
    services: ["Cuts", "Color", "Walk-ins"],
    address: "214 Market Street",
  },
  shop: {
    name: "Market Supply",
    url: "marketsupply.com",
    hours: "Open today until 8:00 pm",
    line: "The hardware counter people already ask for.",
    services: ["Tools", "Paint", "Keys"],
    address: "90 Union Ave",
  },
  clinic: {
    name: "Elm Dental",
    url: "elmdental.com",
    hours: "Open today until 5:00 pm",
    line: "Cleanings and same-week visits.",
    services: ["Cleanings", "Crowns", "New patients"],
    address: "4 Elm Court",
  },
};

const places = [
  { id: "seattle", city: "Seattle", query: "coffee open now", shop: "Harbor Coffee", x: 0.1327, y: 0.1065, anchor: "right" },
  { id: "portland", city: "Portland", query: "brunch near me", shop: "A neighborhood cafe", x: 0.1155, y: 0.1733, anchor: "right" },
  { id: "boise", city: "Boise", query: "bike shop open", shop: "A neighborhood shop", x: 0.2009, y: 0.2756, anchor: "right" },
  { id: "sf", city: "San Francisco", query: "dinner tonight", shop: "A neighborhood restaurant", x: 0.0736, y: 0.4331, anchor: "right" },
  { id: "la", city: "Los Angeles", query: "haircut today", shop: "A neighborhood studio", x: 0.1225, y: 0.5875, anchor: "right" },
  { id: "sandiego", city: "San Diego", query: "tacos nearby", shop: "A neighborhood restaurant", x: 0.1347, y: 0.6397, anchor: "right" },
  { id: "vegas", city: "Las Vegas", query: "open late", shop: "A neighborhood spot", x: 0.1848, y: 0.5344, anchor: "right" },
  { id: "phoenix", city: "Phoenix", query: "dentist near me", shop: "A neighborhood clinic", x: 0.2264, y: 0.6432, anchor: "right" },
  { id: "slc", city: "Salt Lake City", query: "gym nearby", shop: "A neighborhood studio", x: 0.2559, y: 0.3934, anchor: "right" },
  { id: "denver", city: "Denver", query: "coffee nearby", shop: "A neighborhood cafe", x: 0.3635, y: 0.452, anchor: "above" },
  { id: "abq", city: "Albuquerque", query: "lunch near me", shop: "A neighborhood restaurant", x: 0.3254, y: 0.6084, anchor: "above" },
  { id: "dallas", city: "Dallas", query: "hardware store", shop: "Market Supply", x: 0.4954, y: 0.7051, anchor: "above" },
  { id: "houston", city: "Houston", query: "oil change near me", shop: "A neighborhood shop", x: 0.5213, y: 0.8094, anchor: "above" },
  { id: "austin", city: "Austin", query: "haircut near me", shop: "Northside Studio", x: 0.4775, y: 0.7915, anchor: "above" },
  { id: "sanantonio", city: "San Antonio", query: "breakfast nearby", shop: "A neighborhood cafe", x: 0.4632, y: 0.8201, anchor: "above" },
  { id: "okc", city: "Oklahoma City", query: "tires nearby", shop: "A neighborhood shop", x: 0.4835, y: 0.6114, anchor: "above" },
  { id: "omaha", city: "Omaha", query: "steakhouse near me", shop: "A neighborhood restaurant", x: 0.5106, y: 0.4105, anchor: "above" },
  { id: "minneapolis", city: "Minneapolis", query: "coffee open now", shop: "A neighborhood cafe", x: 0.5509, y: 0.2806, anchor: "above" },
  { id: "kc", city: "Kansas City", query: "bbq nearby", shop: "A neighborhood restaurant", x: 0.5329, y: 0.4851, anchor: "above" },
  { id: "chicago", city: "Chicago", query: "hardware store nearby", shop: "Market Supply", x: 0.6416, y: 0.3795, anchor: "left" },
  { id: "milwaukee", city: "Milwaukee", query: "brewery nearby", shop: "A neighborhood spot", x: 0.6351, y: 0.34, anchor: "left" },
  { id: "stlouis", city: "St. Louis", query: "lunch nearby", shop: "A neighborhood restaurant", x: 0.6054, y: 0.4972, anchor: "above" },
  { id: "nashville", city: "Nashville", query: "live music tonight", shop: "A neighborhood venue", x: 0.6668, y: 0.5753, anchor: "left" },
  { id: "atlanta", city: "Atlanta", query: "dentist taking patients", shop: "Elm Dental", x: 0.7138, y: 0.6513, anchor: "left" },
  { id: "miami", city: "Miami", query: "coffee near me", shop: "Harbor Coffee", x: 0.8153, y: 0.9055, anchor: "above" },
  { id: "tampa", city: "Tampa", query: "open now", shop: "A neighborhood shop", x: 0.7652, y: 0.8423, anchor: "above" },
  { id: "neworleans", city: "New Orleans", query: "dinner nearby", shop: "A neighborhood restaurant", x: 0.6191, y: 0.7974, anchor: "above" },
  { id: "charlotte", city: "Charlotte", query: "haircut today", shop: "A neighborhood studio", x: 0.7707, y: 0.5865, anchor: "left" },
  { id: "dc", city: "Washington", query: "lunch near me", shop: "A neighborhood restaurant", x: 0.8197, y: 0.4421, anchor: "left" },
  { id: "philadelphia", city: "Philadelphia", query: "cheesesteak nearby", shop: "A neighborhood restaurant", x: 0.8449, y: 0.3962, anchor: "left" },
  { id: "nyc", city: "New York", query: "coffee open now", shop: "A neighborhood cafe", x: 0.8595, y: 0.3637, anchor: "left" },
  { id: "boston", city: "Boston", query: "dentist near me", shop: "A neighborhood clinic", x: 0.8962, y: 0.2899, anchor: "left" },
  { id: "detroit", city: "Detroit", query: "auto shop nearby", shop: "A neighborhood shop", x: 0.7122, y: 0.3509, anchor: "left" },
  { id: "cleveland", city: "Cleveland", query: "open today", shop: "A neighborhood shop", x: 0.7358, y: 0.3745, anchor: "left" },
  { id: "pittsburgh", city: "Pittsburgh", query: "coffee nearby", shop: "A neighborhood cafe", x: 0.7663, y: 0.4039, anchor: "left" },
];

function setShop(key) {
  const shop = shops[key];
  const preview = document.querySelector("[data-preview]");
  if (!shop || !preview) return;
  preview.classList.add("is-swapping");
  window.setTimeout(() => {
    preview.querySelector("[data-url]").textContent = shop.url;
    preview.querySelector("[data-name]").textContent = shop.name;
    preview.querySelector("[data-hours]").textContent = shop.hours;
    preview.querySelector("[data-line]").textContent = shop.line;
    preview.querySelector("[data-address]").textContent = shop.address;
    preview.querySelector("[data-services]").innerHTML = shop.services
      .map((item) => `<span class="pp-chip">${item}</span>`)
      .join("");
    preview.classList.remove("is-swapping");
  }, 140);
  document.querySelectorAll("[data-shop]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.shop === key ? "true" : "false");
  });
}

function renderModules() {
  const list = document.querySelector("[data-modules-on]");
  if (!list) return;
  const on = [...document.querySelectorAll("[data-module][aria-pressed='true']")].map(
    (button) => button.dataset.module
  );
  list.innerHTML = on.length
    ? on.map((item) => `<li>${item}</li>`).join("")
    : "<li>Pick what the page should include.</li>";
}

function mapBox(img) {
  const parent = img.parentElement.getBoundingClientRect();
  const frame = img.getBoundingClientRect();
  const ratio = 1000 / 620;
  const frameRatio = frame.width / Math.max(frame.height, 1);
  let width;
  let height;
  if (frameRatio > ratio) {
    width = frame.width;
    height = width / ratio;
  } else {
    height = frame.height;
    width = height * ratio;
  }
  const left = frame.left - parent.left + (frame.width - width) / 2;
  const top = frame.top - parent.top + (frame.height - height) / 2;
  return { left, top, width, height };
}

function enhanceMap() {
  const img = document.querySelector('img[alt="Customers looking for a business like yours"]');
  if (!img || img.dataset.ppReady) return false;
  const frame = img.parentElement;
  if (!frame) return false;
  img.dataset.ppReady = "1";
  const layer = document.createElement("div");
  layer.className = "pp-map-layer";
  layer.innerHTML = places
    .map(
      (place) =>
        `<button type="button" class="pp-place" data-place="${place.id}" data-anchor="${place.anchor}" aria-label="${place.city}"></button>`
    )
    .join("");
  frame.appendChild(layer);
  img.style.zIndex = "0";

  const buttons = [...layer.querySelectorAll("[data-place]")];
  const visible = () => buttons.filter((button) => !button.hidden);

  const layout = () => {
    const box = mapBox(img);
    layer.style.left = `${box.left}px`;
    layer.style.top = `${box.top}px`;
    layer.style.width = `${box.width}px`;
    layer.style.height = `${box.height}px`;
    const frameW = frame.clientWidth;
    const frameH = frame.clientHeight;
    buttons.forEach((button) => {
      const place = places.find((item) => item.id === button.dataset.place);
      const px = box.left + place.x * box.width;
      const py = box.top + place.y * box.height;
      button.style.left = `${place.x * 100}%`;
      button.style.top = `${place.y * 100}%`;
      const out = px < 16 || py < 16 || px > frameW - 16 || py > frameH - 16;
      button.hidden = out;
      if (out) button.classList.remove("is-active");
    });
  };
  layout();
  window.addEventListener("resize", layout);

  let hovered = null;
  const show = (button) => {
    buttons.forEach((item) => item.classList.toggle("is-active", item === button));
  };
  const next = () => {
    const list = visible();
    if (!list.length) return;
    const current = list.findIndex((button) => button.classList.contains("is-active"));
    show(list[(current + 1) % list.length]);
  };
  next();
  buttons.forEach((button) => {
    button.addEventListener("pointerenter", () => {
      if (button.hidden) return;
      hovered = button;
      show(button);
    });
    button.addEventListener("pointerleave", () => {
      if (hovered === button) hovered = null;
    });
  });
  window.setInterval(() => {
    if (hovered) return;
    next();
  }, 2600);
  return true;
}

function boot() {
  document.querySelectorAll("[data-shop]").forEach((button) => {
    button.addEventListener("click", () => setShop(button.dataset.shop));
  });
  document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const pressed = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", pressed ? "false" : "true");
      renderModules();
    });
  });
  document.querySelectorAll("[data-faq]").forEach((item) => {
    item.querySelector("button").addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll("[data-faq]").forEach((other) => other.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });
  const compare = document.querySelector("[data-compare]");
  if (compare) {
    const before = compare.querySelector(".pp-compare-before");
    const handle = compare.querySelector(".pp-compare-handle");
    const range = compare.querySelector("input");
    const paint = () => {
      const value = `${range.value}%`;
      before.style.width = value;
      handle.style.left = value;
    };
    range.addEventListener("input", paint);
    paint();
  }
  renderModules();
  setShop("salon");

  const watch = new MutationObserver(() => {
    if (enhanceMap()) watch.disconnect();
  });
  watch.observe(document.body, { childList: true, subtree: true });
  if (enhanceMap()) watch.disconnect();

  const shot = new URLSearchParams(location.search).get("shot");
  if (shot) {
    const target = document.getElementById(shot);
    if (target) target.scrollIntoView({ block: "start" });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
