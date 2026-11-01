let logoClicks = 0;

document.addEventListener("click", (event) => {
  const header = event.target.closest(".fixed");
  const logo = event.target.closest("img[alt='logo']");
  if (!header || !logo || !header.contains(logo)) return;
  logoClicks += 1;
  if (logoClicks >= 20) {
    logoClicks = 0;
    location.href = "/admin/";
  }
});
