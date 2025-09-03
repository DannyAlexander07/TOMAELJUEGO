// Archivo: scripts/formulario.js (Versión con Validación)

document.addEventListener("DOMContentLoaded", () => {
  
    // ==================================================
    // === LÓGICA DEL MENÚ DE HAMBURGUESA ===
    // ==================================================
    const hamburgerButton = document.querySelector(".nav__hamburger, .nav__hamburger-button");
    const closeButton = document.querySelector(".sidebar__close, .sidebar__close-button");
    const pageContainer = document.querySelector(".page-container");

    if (hamburgerButton && closeButton && pageContainer) {
        const toggleMenu = () => {
            pageContainer.classList.toggle("open");
        };
        hamburgerButton.addEventListener("click", toggleMenu);
        closeButton.addEventListener("click", toggleMenu);
    }

    // ==================================================
    // === LÓGICA DE VALIDACIÓN DE EDAD ===
    // ==================================================
    const fechaInputs = document.querySelectorAll('.fechaNacimiento');
    fechaInputs.forEach((input) => {
        input.addEventListener('change', () => validarEdad(input));
    });

    function validarEdad(input) {
        // ... (La función de validar edad se queda igual)
        const errorEdad = input.closest('.form-group').querySelector('.errorEdad');
        if (!input.value) return;
        const nacimiento = new Date(input.value);
        const fechaTorneo = new Date('2025-10-11');
        let edad = fechaTorneo.getFullYear() - nacimiento.getFullYear();
        const mesAniversario = fechaTorneo.getMonth() - nacimiento.getMonth();
        const diaAniversario = fechaTorneo.getDate() - nacimiento.getDate();
        if (mesAniversario < 0 || (mesAniversario === 0 && diaAniversario < 0)) { edad--; }
        errorEdad.style.display = (edad >= 15 && edad <= 21) ? 'none' : 'inline';
    }

    // ==================================================
    // === LÓGICA DE ENVÍO A FORMSPREE ===
    // ==================================================
    const btnSubmit = document.querySelector('.btn-form');
    const playerForms = document.querySelectorAll('.form-container form');
    
    const formEndpoints = {
        'ChorrillosM': 'https://formspree.io/f/mjkeavqz',
        'ChorrillosF': 'https://formspree.io/f/myzdnyry',
        'SanMiguelM': 'https://formspree.io/f/mzzajbnz',
        'SanMiguelF': 'https://formspree.io/f/meolrqye'
    };
    
    function getCategoriaKey() {
        // ... (La función de obtener categoría se queda igual)
        const path = window.location.pathname;
        if (path.includes('ChorrillosM')) return 'ChorrillosM';
        if (path.includes('ChorrillosF')) return 'ChorrillosF';
        if (path.includes('SanMiguelM')) return 'SanMiguelM';
        if (path.includes('SanMiguelF')) return 'SanMiguelF';
        return null;
    }
    
    if (btnSubmit) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();

            // --- ¡NUEVO BLOQUE DE VALIDACIÓN ANTES DE ENVIAR! ---
            let formularioEsValido = true;
            // Recorremos los 3 primeros formularios (Capitán, Jugador 2, Jugador 3), que son obligatorios.
            for (let i = 0; i < 3; i++) {
                const form = playerForms[i];
                const inputsRequeridos = form.querySelectorAll('input'); 
                let rol = (i === 0) ? 'el Capitán' : `el Jugador ${i + 1}`;

                for (const input of inputsRequeridos) {
                    // Quitamos los bordes rojos de validaciones anteriores
                    input.style.border = '1px solid #c4f638'; 
                    
                    if (input.value.trim() === '') {
                        alert(`Por favor, completa todos los campos para ${rol}.`);
                        input.style.border = '2px solid red'; // Resaltamos el campo vacío
                        input.focus(); // Ponemos el cursor en el campo vacío
                        formularioEsValido = false;
                        break; // Salimos del bucle de los inputs
                    }
                }
                if (!formularioEsValido) {
                    break; // Salimos del bucle principal si ya encontramos un error
                }
            }

            if (!formularioEsValido) {
                return; // Detenemos la función aquí y NO se envía el formulario
            }
            // --- FIN DEL BLOQUE DE VALIDACIÓN ---


            const categoriaKey = getCategoriaKey();
            const endpoint = formEndpoints[categoriaKey];
            const equipoData = { "Categoría del Torneo": categoriaKey, "Jugadores": [] };
            
            playerForms.forEach((form, index) => {
                const nombreInput = form.querySelector('input[name="nombre"]');
                if (nombreInput && nombreInput.value.trim() !== '') {
                    // (El resto de la lógica de recolección de datos sigue igual)
                    let rol = (index === 0) ? 'Capitán' : (index === 3) ? 'Suplente' : `Jugador ${index + 1}`;
                    equipoData["Jugadores"].push({
                        "Rol": rol,
                        "Nombre": nombreInput.value,
                        "DNI": form.querySelector('input[name="DNI"]').value,
                        "Fecha de Nacimiento": form.querySelector('.fechaNacimiento').value,
                        "Whatsapp": form.querySelector('input[name="whatsapp"]').value,
                        "Email": form.querySelector('input[name="mail"]').value,
                        "Dirección": form.querySelector('input[name="direccion"]') ? form.querySelector('input[name="direccion"]').value : 'No especificada'
                    });
                }
            });

            // (El resto del código fetch para enviar a Formspree sigue igual)
            btnSubmit.textContent = 'Inscribiendo...';
            btnSubmit.disabled = true;
            fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(equipoData)
            })
            .then(response => {
              if (response.ok) {
                alert('¡Inscripción enviada con éxito!');
                playerForms.forEach(form => form.reset());
              } else {
                alert('Hubo un error al enviar tu inscripción. Por favor, inténtalo de nuevo.');
              }
            })
            .catch(error => alert('Hubo un error de conexión. Por favor, inténtalo de nuevo.'))
            .finally(() => {
              btnSubmit.textContent = 'Inscribir a mi equipo';
              btnSubmit.disabled = false;
            });
        });
    }
});