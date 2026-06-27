import { reviews } from "../data.js";

export function initReviews() {
  const track = document.querySelector("#review-track");
  const dots = document.querySelector("#review-dots");
  const previous = document.querySelector("#review-prev");
  const next = document.querySelector("#review-next");
  if (!track || !dots || !previous || !next) return;

  let active = 0;
  let timer;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  track.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <span class="review-quote">“</span>
      <blockquote>${review.quote}</blockquote>
      <footer><strong>${review.name}</strong><span>${review.city} · ${review.package}</span></footer>
    </article>
  `).join("");

  dots.innerHTML = reviews.map((_, index) => `<button type="button" data-review="${index}" aria-label="Toon review ${index + 1}"></button>`).join("");

  function show(index) {
    active = (index + reviews.length) % reviews.length;
    track.style.transform = `translateX(-${active * 100}%)`;
    dots.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === active);
      dot.setAttribute("aria-current", dotIndex === active ? "true" : "false");
    });
  }

  function start() {
    window.clearInterval(timer);
    if (!reduceMotion.matches) timer = window.setInterval(() => show(active + 1), 5800);
  }

  previous.addEventListener("click", () => { show(active - 1); start(); });
  next.addEventListener("click", () => { show(active + 1); start(); });
  dots.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-review]");
    if (!dot) return;
    show(Number(dot.dataset.review));
    start();
  });
  track.addEventListener("pointerdown", () => window.clearInterval(timer), { passive: true });

  show(0);
  start();
}
