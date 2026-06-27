import { packages, addons } from "../data.js";

const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function initConfigurator() {
  const packageGrid = document.querySelector("#package-grid");
  const packageOptions = document.querySelector("#package-options");
  const addonOptions = document.querySelector("#addon-options");
  const addonShowcase = document.querySelector("#addon-showcase");
  const summary = document.querySelector("#order-summary");
  if (!packageGrid || !packageOptions || !addonOptions || !summary) return;

  let selectedPackage = packages[1];
  const selectedAddons = new Set();

  packageGrid.innerHTML = packages.map((item, index) => `
    <article class="package-card reveal ${item.featured ? "is-featured" : ""}" data-package-card="${item.id}">
      ${item.featured ? '<span class="popular-label">Meest gekozen</span>' : ""}
      <div class="package-card-top">
        <span class="package-number">0${index + 1}</span>
        <span class="package-icon">${index === 0 ? "□" : index === 1 ? "▱" : "◇"}</span>
      </div>
      <p class="eyebrow">${item.eyebrow}</p>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="package-price"><small>vanaf</small><strong>${euro.format(item.price)}</strong></div>
      <details>
        <summary>Wat zit erin? <span>+</span></summary>
        <ul>${item.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
      </details>
      <button class="package-choose" type="button" data-select-package="${item.id}">Kies dit pakket <span>→</span></button>
    </article>
  `).join("");

  const packageCurrent = document.querySelector("#package-current");
  const packageDots = [...document.querySelectorAll("#package-dots i")];
  const packageCards = [...packageGrid.querySelectorAll(".package-card")];
  let carouselFrame;

  const updatePackageCarousel = () => {
    window.cancelAnimationFrame(carouselFrame);
    carouselFrame = window.requestAnimationFrame(() => {
      const card = packageCards[0];
      if (!card) return;
      const gap = Number.parseFloat(getComputedStyle(packageGrid).columnGap) || 18;
      const active = Math.min(packageCards.length - 1, Math.max(0, Math.round(packageGrid.scrollLeft / (card.offsetWidth + gap))));
      if (packageCurrent) packageCurrent.textContent = String(active + 1);
      packageDots.forEach((dot, index) => dot.classList.toggle("is-active", index === active));
    });
  };

  packageGrid.addEventListener("scroll", updatePackageCarousel, { passive: true });

  packageOptions.innerHTML = packages.map((item) => `
    <label class="choice-pill ${item.id === selectedPackage.id ? "is-selected" : ""}">
      <input type="radio" name="package" value="${item.id}" ${item.id === selectedPackage.id ? "checked" : ""}>
      <span><strong>${item.name}</strong><small>${euro.format(item.price)}</small></span>
    </label>
  `).join("");

  addonOptions.innerHTML = addons.slice(0, 6).map((item) => `
    <label class="addon-check">
      <input type="checkbox" value="${item.id}">
      <span class="custom-check">✓</span>
      <span><strong>${item.name}</strong><small>+ ${euro.format(item.price)}</small></span>
    </label>
  `).join("");

  if (addonShowcase) {
    addonShowcase.innerHTML = addons.map((item) => `
      <button class="addon-tile reveal" type="button" data-addon-jump="${item.id}">
        <span>${item.icon}</span>
        <strong>${item.name}</strong>
        <small>vanaf ${euro.format(item.price)}</small>
      </button>
    `).join("");
  }

  function renderSummary() {
    const chosen = addons.filter((item) => selectedAddons.has(item.id));
    const total = selectedPackage.price + chosen.reduce((sum, item) => sum + item.price, 0);
    summary.innerHTML = `
      <div class="summary-heading"><span>Jullie pakket</span><small>Prijsindicatie</small></div>
      <div class="summary-package"><strong>${selectedPackage.name}</strong><span>${euro.format(selectedPackage.price)}</span></div>
      <div class="summary-addons">
        ${chosen.length
          ? chosen.map((item) => `<div><span>${item.name}</span><small>+ ${euro.format(item.price)}</small></div>`).join("")
          : "<p>Nog geen uitbreidingen gekozen.</p>"}
      </div>
      <div class="summary-total"><span>Totaal vanaf</span><strong>${euro.format(total)}</strong></div>
      <a class="button button-gold summary-button" href="mailto:info@wieisdepiemel.nl?subject=Beschikbaarheid ${encodeURIComponent(selectedPackage.name)}">Vraag beschikbaarheid aan <span>↗</span></a>
      <small class="summary-note">Conceptprijs · nog niet definitief te bestellen</small>
    `;

    document.querySelectorAll(".choice-pill").forEach((pill) => {
      pill.classList.toggle("is-selected", pill.querySelector("input").value === selectedPackage.id);
    });
    document.querySelectorAll("[data-package-card]").forEach((card) => {
      card.classList.toggle("is-selected", card.dataset.packageCard === selectedPackage.id);
    });
  }

  packageOptions.addEventListener("change", (event) => {
    selectedPackage = packages.find((item) => item.id === event.target.value) ?? selectedPackage;
    renderSummary();
  });

  addonOptions.addEventListener("change", (event) => {
    event.target.checked ? selectedAddons.add(event.target.value) : selectedAddons.delete(event.target.value);
    renderSummary();
  });

  packageGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-package]");
    if (!button) return;
    selectedPackage = packages.find((item) => item.id === button.dataset.selectPackage) ?? selectedPackage;
    const radio = packageOptions.querySelector(`[value="${selectedPackage.id}"]`);
    if (radio) radio.checked = true;
    renderSummary();
    document.querySelector("#configurator")?.scrollIntoView({ behavior: "smooth" });
  });

  addonShowcase?.addEventListener("click", (event) => {
    const tile = event.target.closest("[data-addon-jump]");
    if (!tile) return;
    const checkbox = addonOptions.querySelector(`[value="${tile.dataset.addonJump}"]`);
    if (checkbox) {
      checkbox.checked = true;
      selectedAddons.add(checkbox.value);
      renderSummary();
    }
    document.querySelector("#configurator")?.scrollIntoView({ behavior: "smooth" });
  });

  renderSummary();
  updatePackageCarousel();
}
