document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const hamburgerButton = document.querySelector(".nav__hamburger"); // antes .nav__hamburger-button
  const closeButton = document.querySelector(".sidebar__close"); // antes .sidebar__close-button
  const sidebar = document.querySelector(".sidebar");
  const pageContainer = document.querySelector(".page-container");
  const header = document.querySelector(".header");
  const logo = document.getElementById("logo");

  const navLinks = document.querySelectorAll(".nav__link");
  const hamburgerLines = document.querySelectorAll(".nav__hamburger-line");

  hamburgerButton.addEventListener("click", () => {
    pageContainer.classList.add("open");
  });
  closeButton.addEventListener("click", () => {
    pageContainer.classList.remove("open");
  });

  // Sticky header + swap del logo al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      if (logo) logo.src = "../images/logoPrincipalVerde.png";
    } else {
      header.classList.remove("scrolled");
      if (logo) logo.src = "../images/logoPrincipalNegro.png";
    }
  });

  // Cierra el menú si se pasa a escritorio (>768px)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMenu();
    }
  });
});
