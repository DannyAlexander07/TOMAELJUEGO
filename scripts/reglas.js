// scripts/reglas.js 
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".nav__hamburger-button");
  const closeButton = document.querySelector(".sidebar__close-button");
  const pageContainer = document.querySelector(".page-container");

  hamburgerButton.addEventListener("click", () => {
    pageContainer.classList.add("open");
  });
  closeButton.addEventListener("click", () => {
    pageContainer.classList.remove("open");
  });

  // Sticky header logic
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.querySelector(".header").classList.add("scrolled");
    } else {
      document.querySelector(".header").classList.remove("scrolled");
    }
  });
});
