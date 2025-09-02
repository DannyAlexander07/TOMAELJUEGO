// scripts/torneo-menu.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.nav__hamburger-button');
  const closeButton = document.querySelector('.sidebar__close-button');
  const sidebar = document.querySelector('.sidebar');
  const pageContainer = document.querySelector('.page-container');
  const header = document.querySelector('.header');
  const logo = document.getElementById('logo');

  hamburgerButton.addEventListener('click', () => {
    pageContainer.classList.add('open');
  });
  closeButton.addEventListener('click', () => {
    pageContainer.classList.remove('open');
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      logo.src = '../images/logoPrincipalVerde.png';
    } else {
      header.classList.remove('scrolled');
      logo.src = '../images/logoPrincipalNegro.png';
    }
  });
});
