// scripts/torneo-menu.js
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
});
