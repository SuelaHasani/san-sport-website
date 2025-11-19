/* Simple slideshow helper
   - Exposes changeSlide(n) and currentSlide(n) to control which slide is visible
   - Expects HTML with elements .slide and dots with class .dot
*/

let slideIndex = 1;

// Show slide at index n (1-based)
// Hides others and marks matching dot active.
function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  else if (n < 1) slideIndex = slides.length;
  else slideIndex = n;

  slides.forEach((s, i) => s.classList.toggle('active', i === slideIndex - 1));
  dots.forEach((d, i) => d.classList.toggle('active', i === slideIndex - 1));
}

// Move relative by n (e.g. +1 next, -1 prev)
window.changeSlide = function (n) {
  showSlide(slideIndex + n);
};

// Jump to a particular slide index
window.currentSlide = function (n) {
  showSlide(n);
};

// Initialize on DOM ready: show first slide
document.addEventListener('DOMContentLoaded', () => {
  showSlide(slideIndex);
});