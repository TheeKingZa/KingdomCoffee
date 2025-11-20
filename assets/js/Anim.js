/*
  anim.js — simple animations + helpers
  - Adds smooth fade-in scroll animations
  - Updates footer year automatically
  - Includes helpful console logs with color coding

  (comments explain how code works)
*/

// Helper: fancy console colors
const log = {
  ok: (msg) => console.log(`%c✔ ${msg}`, 'color: #00ff88; font-weight: bold;'),
  err: (msg) => console.log(`%c✖ ${msg}`, 'color: #ff5555; font-weight: bold;'),
  info: (msg) => console.log(`%cℹ ${msg}`, 'color: #d4af37; font-weight: bold;')
};

// (returns: current year auto-update)
(() => {
  try {
    const y = document.getElementById('year');
    if (!y) return log.err('Year element not found');
    y.textContent = new Date().getFullYear();
    log.ok('Year updated');
  } catch (e) {
    log.err('Error updating year: ' + e.message);
  }
})();

// Fade-in animation on scroll
// (uses IntersectionObserver to track visibility)
const fadeElements = document.querySelectorAll('.card, .about p, .hero-title, .hero-sub');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      log.info(`Animated: ${entry.target.tagName}`);
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach((el) => observer.observe(el));

// Add minimal CSS hook for fade-in
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  .card, .about p, .hero-title, .hero-sub {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
  }
`;
document.head.appendChild(style);

log.ok('Animation script loaded');
