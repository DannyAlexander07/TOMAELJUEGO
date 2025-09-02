document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".nav__hamburger-button");
  const closeButton = document.querySelector(".sidebar__close-button");
  const pageContainer = document.querySelector(".page-container");
  const header = document.querySelector(".header");

  hamburgerButton.addEventListener("click", () => {
    pageContainer.classList.add("open");
  });
  closeButton.addEventListener("click", () => {
    pageContainer.classList.remove("open");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
