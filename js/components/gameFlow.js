import { gameSteps } from "../data.js";

export function initGameFlow() {
  const tabs = document.querySelector("#gameflow-tabs");
  const stage = document.querySelector("#gameflow-stage");
  if (!tabs || !stage) return;
  let active = 0;

  tabs.innerHTML = gameSteps.map((step, index) => `
    <button type="button" role="tab" aria-selected="${index === 0}" data-step="${index}" class="${index === 0 ? "is-active" : ""}">
      <span>${step.number}</span><strong>${step.title}</strong>
    </button>
  `).join("");

  function render() {
    const step = gameSteps[active];
    stage.innerHTML = `
      <div class="stage-orbit" aria-hidden="true"><span>${step.icon}</span></div>
      <span class="stage-number">${step.number} / 04</span>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
      <div class="stage-progress"><span style="width:${((active + 1) / gameSteps.length) * 100}%"></span></div>
    `;
    tabs.querySelectorAll("[data-step]").forEach((button, index) => {
      button.classList.toggle("is-active", index === active);
      button.setAttribute("aria-selected", String(index === active));
    });
  }

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step]");
    if (!button) return;
    active = Number(button.dataset.step);
    render();
  });

  render();
}
