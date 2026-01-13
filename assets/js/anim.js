document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  const toggle = () => {
    const show = window.scrollY > 400;
    btn.classList.toggle("is-visible", show);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
});