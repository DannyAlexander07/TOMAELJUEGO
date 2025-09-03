// Archivo: scripts/formulario.js (Versión Final Completa Híbrida)

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
    // === LÓGICA DE ENVÍO DE FORMULARIO (HÍBRIDO) ===
    // ==================================================
    const btnSubmit = document.querySelector('.btn-form');
    const playerForms = document.querySelectorAll('.form-container form');
    
    const formEndpoints = {
        'ChorrillosM': 'https://formspree.io/f/mblazpzw',
        'ChorrillosF': 'https://formspree.io/f/xrbayoyr',
        'SanMiguelM': 'https://formspree.io/f/xnnbgogr',
        'SanMiguelF': 'https://formspree.io/f/mjkeapad'
    };
    
    function getCategoriaKey() {
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

            // --- BLOQUE DE VALIDACIÓN DE CAMPOS VACÍOS ---
            let formularioEsValido = true;
            for (let i = 0; i < 3; i++) {
                const form = playerForms[i];
                const inputsRequeridos = form.querySelectorAll('input'); 
                let rol = (i === 0) ? 'el Capitán' : `el Jugador ${i + 1}`;
                for (const input of inputsRequeridos) {
                    input.style.border = '1px solid #c4f638'; 
                    if (input.value.trim() === '') {
                        alert(`Por favor, completa todos los campos para ${rol}.`);
                        input.style.border = '2px solid red';
                        input.focus();
                        formularioEsValido = false;
                        break;
                    }
                }
                if (!formularioEsValido) break;
            }
            if (!formularioEsValido) return;

            // --- RECOLECCIÓN DE DATOS ---
            const categoriaKey = getCategoriaKey();
            const endpointFormspree = formEndpoints[categoriaKey];
            const emailCapitan = playerForms[0].querySelector('input[name="mail"]').value;
            const nombreCapitan = playerForms[0].querySelector('input[name="nombre"]').value;
            
            const equipoData = {
                "Categoría del Torneo": categoriaKey,
                "Jugadores": []
            };
            
            playerForms.forEach((form, index) => {
                const nombreInput = form.querySelector('input[name="nombre"]');
                if (nombreInput && nombreInput.value.trim() !== '') {
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

            // --- PROCESO DE DOBLE ENVÍO ---
            btnSubmit.textContent = 'Inscribiendo...';
            btnSubmit.disabled = true;

            // 1. Envío a Formspree (para tu notificación y respaldo)
            fetch(endpointFormspree, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(equipoData)
            })
            .then(response => {
                if (!response.ok) throw new Error('El envío a Formspree falló. Por favor, revisa la configuración.');
                console.log('Notificación para el organizador enviada (vía Formspree).');
                
                // 2. Envío a tu script PHP (para la confirmación del capitán)
                return fetch('/enviar_confirmacion1.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre_capitan: nombreCapitan,
                        email_capitan: emailCapitan
                    })
                });
            })
            .then(response => {
                if (!response.ok) throw new Error('El servidor de confirmación (PHP) no respondió correctamente.');
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log('Respuesta del script PHP:', data.message);
                    alert('¡Inscripción exitosa! El capitán recibirá un correo de confirmación en breve.');
                    playerForms.forEach(form => form.reset());
                } else {
                    // El script PHP reportó un error
                    throw new Error(data.message || 'El script PHP no pudo enviar el correo.');
                }
            })
            .catch(error => {
                console.error('Error en el proceso de inscripción:', error);
                alert(`Hubo un error al procesar la inscripción: ${error.message}`);
            })
            .finally(() => {
                btnSubmit.textContent = 'Inscribir a mi equipo';
                btnSubmit.disabled = false;
            });
        });
    }
});