import { initConfigurator } from "./components/configurator.js";
import { initGameFlow } from "./components/gameFlow.js";
import { initReviews } from "./components/reviews.js";
import { initFaq } from "./components/faq.js";

initConfigurator();
initGameFlow();
initReviews();
initFaq();

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Menu openen" : "Menu sluiten");
  mobileNav?.classList.toggle("is-open", !open);
});
mobileNav?.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
});

const bottomNav = document.querySelector(".mobile-bottom-nav");
const bottomLinks = [...document.querySelectorAll("[data-mobile-section]")];
const bottomSections = bottomLinks
  .map((link) => document.querySelector(`#${link.dataset.mobileSection}`))
  .filter(Boolean);
const heroSection = document.querySelector(".hero");
const finalSection = document.querySelector(".final-cta");
const configuratorSection = document.querySelector("#configurator");

if (bottomNav && "IntersectionObserver" in window) {
  let heroVisible = true;
  const blockedZones = new Set();

  const updateBottomNav = () => {
    bottomNav.classList.toggle("is-visible", !heroVisible && blockedZones.size === 0);
  };

  if (heroSection) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateBottomNav();
    }, { threshold: 0.12 }).observe(heroSection);
  }

  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting ? blockedZones.add(entry.target) : blockedZones.delete(entry.target);
    });
    updateBottomNav();
  }, { threshold: 0.12 });
  [configuratorSection, finalSection].filter(Boolean).forEach((section) => blockObserver.observe(section));

  const spyObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    bottomLinks.forEach((link) => {
      const active = link.dataset.mobileSection === visible.target.id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-22% 0px -58% 0px", threshold: [0, .2, .5] });
  bottomSections.forEach((section) => spyObserver.observe(section));
}

const progress = document.querySelector(".scroll-progress span");
function updateScrollProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reduceMotion.matches) {
  document.body.classList.add("has-motion");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

const demoModal = document.querySelector("#demo-modal");
const openDemo = () => {
  if (!demoModal) return;
  demoModal.classList.add("is-open");
  demoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  demoModal.querySelector(".demo-close")?.focus();
};
const closeDemo = () => {
  if (!demoModal) return;
  demoModal.classList.remove("is-open");
  demoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};
document.querySelector("#demo-play")?.addEventListener("click", openDemo);
demoModal?.querySelectorAll(".demo-close, .demo-close-action").forEach((button) => button.addEventListener("click", closeDemo));
demoModal?.addEventListener("click", (event) => {
  if (event.target === demoModal) closeDemo();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDemo();
});

const hostMessages = [
  "“Welkom dames, jullie eerste opdracht staat klaar…”",
  "“Eén van jullie weet meer. Tijd voor de eerste hint…”",
  "“Envelop twee mag open. Maar alleen door de bride-to-be.”",
];
let hostIndex = 0;
document.querySelector("#host-button")?.addEventListener("click", () => {
  hostIndex = (hostIndex + 1) % hostMessages.length;
  const message = document.querySelector("#host-message");
  if (message) message.textContent = hostMessages[hostIndex];
});
