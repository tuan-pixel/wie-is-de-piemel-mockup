import { faqs } from "../data.js";

export function initFaq() {
  const list = document.querySelector("#faq-list");
  if (!list) return;

  list.innerHTML = faqs.map((item, index) => `
    <article class="faq-item ${index === 0 ? "is-open" : ""}">
      <button type="button" aria-expanded="${index === 0}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${item.question}</strong>
        <i>+</i>
      </button>
      <div class="faq-answer"><p>${item.answer}</p></div>
    </article>
  `).join("");

  list.addEventListener("click", (event) => {
    const button = event.target.closest(".faq-item button");
    if (!button) return;
    const item = button.closest(".faq-item");
    const willOpen = !item.classList.contains("is-open");
    list.querySelectorAll(".faq-item").forEach((row) => {
      row.classList.remove("is-open");
      row.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
}
