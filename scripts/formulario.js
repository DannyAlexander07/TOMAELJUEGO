document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.nav__hamburger-button');
  const closeButton = document.querySelector('.sidebar__close-button');
  const sidebar = document.querySelector('.sidebar');
  const pageContainer = document.querySelector('.page-container');
  const header = document.querySelector('.header');
  const logo = document.getElementById('logo');
  const navLinks = document.querySelectorAll('.nav__link');
  const hamburgerLines = document.querySelectorAll('.nav__hamburger-line');

  hamburgerButton.addEventListener('click', () => {
    pageContainer.classList.add('open');
  });
  closeButton.addEventListener('click', () => {
    pageContainer.classList.remove('open');
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Cerrar el menú si se redimensiona a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000 && isMenuOpen) {
      closeMenu();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Obtener todos los inputs de tipo fecha con la clase "fechaNacimiento"
  const fechaInputs = document.querySelectorAll('.fechaNacimiento');

  fechaInputs.forEach((input) => {
    input.addEventListener('change', function () {
      validarEdad(input);
    });
  });
});

function validarEdad(input) {
  const errorEdad = input.nextElementSibling; // El siguiente elemento es el <span> de error
  const fechaLimite = new Date('2025-10-11'); // Fecha límite de 11 de octubre

  if (!input.value) {
    return; // Si no hay valor en la fecha, no hacemos nada
  }

  const nacimiento = new Date(input.value);
  const hoy = new Date();

  // Calcular la edad
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() + 1;
  const dia = hoy.getDate();

  // Ajustamos la edad si no ha cumplido años este año aún
  if (
    mes < nacimiento.getMonth() + 1 ||
    (mes === nacimiento.getMonth() + 1 && dia < nacimiento.getDate())
  ) {
    edad--;
  }

  // Verificar si tiene entre 15 y 21 años antes del 11 de octubre
  const esMayorDe15 = edad >= 15;
  const esMenorDe22AntesDeOctubre =
    edad < 22 || (edad === 21 && hoy <= fechaLimite);

  if (esMayorDe15 && esMenorDe22AntesDeOctubre) {
    errorEdad.style.display = 'none'; // Si cumple la condición, ocultamos el mensaje de error
  } else {
    errorEdad.style.display = 'inline'; // Si no cumple, mostramos el mensaje de error
  }
}
