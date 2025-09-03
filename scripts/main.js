// scripts/main.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".nav__hamburger"); // antes .nav__hamburger-button
  const closeButton = document.querySelector(".sidebar__close"); // antes .sidebar__close-button
  const pageContainer = document.querySelector(".page-container");
  const header = document.querySelector(".header");
  const logo = document.getElementById("logo");

  // Mejorar la lógica para el menú lateral
  const toggleMenu = () => {
    pageContainer.classList.toggle("open");
  };

  hamburgerButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);

  // Cambio de logo al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      // CORRECCIÓN: La ruta no debe tener "../" para la página principal
      logo.src = "./images/logoPrincipalVerde.png"; 
    } else {
      header.classList.remove("scrolled");
      logo.src = "./images/logoPrincipalNegro.png";
    }
  });
});
