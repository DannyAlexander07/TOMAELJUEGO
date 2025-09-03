// scripts/queesToma.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".nav__hamburger"); // antes .nav__hamburger-button
  const closeButton = document.querySelector(".sidebar__close"); // antes .sidebar__close-button
  const pageContainer = document.querySelector(".page-container");
  const header = document.querySelector(".header");
  const logo = document.getElementById("logo");

  // Simplificar la gestión del menú
  const toggleMenu = () => {
    pageContainer.classList.toggle("open");
  };

  hamburgerButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);

  // Sticky header + swap logo
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      logo.src = "../images/logoPrincipalVerde.png";
    } else {
      header.classList.remove("scrolled");
      logo.src = "../images/logoPrincipalNegro.png";
    }
  });

  // Cerrar el menú si se redimensiona a escritorio
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && pageContainer.classList.contains("open")) {
      pageContainer.classList.remove("open");
    }
  });
});
