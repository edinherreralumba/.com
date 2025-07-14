document.addEventListener('DOMContentLoaded', () => {
    // --- NAVEGACIÓN (Menú de Hamburguesa y Scroll Suave) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdownToggle = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active'); // Para animar el icono de hamburguesa
            // Si el menú se cierra, asegurar que el dropdown también lo haga
            if (!navLinks.classList.contains('active') && dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });

        // Manejo del dropdown en móvil (dentro del menú de hamburguesa)
        if (dropdownToggle && dropdownContent) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault(); // Evita que el enlace de 'Más' navegue
                // Toggle del display para el dropdown
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Cierra el menú móvil al hacer clic en un enlace (excepto el dropdown toggle)
        navLinks.querySelectorAll('a:not(.dropbtn)').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('is-active');
                    if (dropdownContent) {
                        dropdownContent.style.display = 'none'; // Asegura que el dropdown también se cierre
                    }
                }
            });
        });
    }

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Evitar scroll suave si es el dropdown toggle o si ya está activo
            if (this.classList.contains('dropbtn')) {
                return;
            }
            e.preventDefault(); // Evita el comportamiento por defecto del ancla

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula la posición de scroll ajustando por la altura del header fijo
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20 para un pequeño padding extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- VALIDACIÓN DE FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;
            let errorMessage = '';

            if (name === '') {
                isValid = false;
                errorMessage += '• El nombre es obligatorio.\n';
            }

            if (email === '') {
                isValid = false;
                errorMessage += '• El correo electrónico es obligatorio.\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += '• Por favor, introduce un correo electrónico válido.\n';
            }

            if (message === '') {
                isValid = false;
                errorMessage += '• El mensaje es obligatorio.\n';
            }

            if (isValid) {
                // Aquí iría la lógica para enviar el formulario, por ejemplo, a un servicio de backend.
                // Por ahora, simularemos el envío.
                alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
                this.reset(); // Limpia el formulario
                console.log('Datos del formulario:', { name, email, message });
            } else {
                alert('Por favor, corrige los siguientes errores:\n' + errorMessage);
            }
        });
    }

    // Función auxiliar para validar formato de email
    function isValidEmail(email) {
        // Expresión regular para validar email (más robusta)
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    // --- FUNCIONALIDAD DE RECURSOS (MODAL DE DESCARGA) ---
    // NOTA: La lógica de categorización de recursos se ha eliminado de esta página
    // ya que solo se mostrarán recursos destacados sin filtro en el home.
    // Esta lógica se implementará en la página "recursos.html".

    // Modal para descarga de recursos gratuitos
    const downloadModal = document.getElementById('downloadModal');
    const closeButton = document.querySelector('.modal .close-button');
    const downloadButtons = document.querySelectorAll('.btn-download'); // Todos los botones de "Descargar"
    const downloadForm = document.getElementById('downloadForm');
    const modalEmailInput = document.getElementById('modalEmail');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    let currentResourceName = '';
    let currentResourceUrl = '';

    // Manejador de clics para TODOS los botones de "Descargar"
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtenemos el nombre del recurso desde el h3 padre de la tarjeta
            const cardContent = button.closest('.card-content');
            currentResourceName = cardContent ? cardContent.querySelector('h3[data-resource-name]').dataset.resourceName : 'el recurso';
            currentResourceUrl = button.dataset.resourceUrl; // Obtener la URL del recurso

            modalTitle.textContent = `Descarga tu recurso`;
            modalMessage.innerHTML = `Por favor, introduce tu correo electrónico para acceder a la descarga de **${currentResourceName}**.`;
            downloadModal.style.display = 'flex'; // Muestra el modal
        });
    });

    // Cierra el modal con el botón X
    closeButton.addEventListener('click', () => {
        downloadModal.style.display = 'none'; // Oculta el modal
        downloadForm.reset(); // Limpia el formulario
        currentResourceName = ''; // Limpia el nombre del recurso
        currentResourceUrl = ''; // Limpia la URL del recurso
    });

    // Cierra el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === downloadModal) {
            downloadModal.style.display = 'none';
            downloadForm.reset();
            currentResourceName = '';
            currentResourceUrl = '';
        }
    });

    // Maneja el envío del formulario de descarga
    downloadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = modalEmailInput.value.trim();

        if (isValidEmail(email)) {
            // **Paso 1: Registrar el correo en tu CRM**
            // Esta es la parte crucial que NECESITA un backend.
            // Para un sitio estático como este, puedes usar servicios como Formspree, Netlify Forms, Basin, etc.
            // O, si tienes un backend propio (PHP, Node.js, Python), enviar una petición AJAX a tu endpoint.

            // EJEMPLO DE CÓMO SIMULARÍAS EL ENVÍO A UN BACKEND (usando fetch API):
            /*
            fetch('/api/register-email', { // Reemplaza con la URL de tu endpoint de backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    resource_id: currentResourceId, // Si quieres registrar el ID del recurso
                    resource_name: currentResourceName,
                    timestamp: new Date().toISOString()
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Registro de email exitoso:', data);
                // Si el registro fue exitoso, procede con la descarga
                handleResourceDownload(currentResourceUrl, currentResourceName);
            })
            .catch((error) => {
                console.error('Error al registrar el email:', error);
                alert('Hubo un error al intentar registrar tu correo. Por favor, inténtalo de nuevo más tarde.');
            });
            */

            // **OPCIÓN MÁS VIABLE PARA HTML/CSS/JS PURO (Sin Backend complejo):**
            // Si NO tienes un backend para procesar el email, la opción más viable es:
            // 1. Alertar al usuario que el enlace será enviado (si usas un servicio de email marketing con autoresponder).
            // 2. Iniciar la descarga directa.

            // Opción 1: Enviar enlace por correo (Requiere un servicio de email marketing o backend)
            // Si usas un servicio como Mailchimp, ActiveCampaign, etc., la integración se haría a través de su API o formularios embebidos.
            // Este `alert` y `console.log` solo simulan la acción.

            alert(`¡Gracias! El enlace para descargar "${currentResourceName}" ha sido enviado a tu correo electrónico: ${email}.`);
            console.log(`Email capturado para "${currentResourceName}": ${email}. (Simulación de envío a CRM)`);

            // Opción 2: Iniciar la descarga de inmediato
            // Esta es la más directa si no quieres depender de envíos de email post-registro.
            if (currentResourceUrl) {
                // Crear un enlace temporal y hacer clic en él para iniciar la descarga
                const a = document.createElement('a');
                a.href = currentResourceUrl;
                // Intentar un nombre de archivo más amigable, si es posible
                a.download = currentResourceName.replace(/[^a-z0-9\s]/gi, '').replace(/\s/g, '_').toLowerCase() + '.zip';
                // Asegurarse de que el nombre del archivo no sea excesivamente largo o con caracteres inválidos
                if (a.download.length > 100) {
                    a.download = 'recurso_descarga.zip';
                }

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                console.log(`Descarga iniciada para "${currentResourceName}" desde: ${currentResourceUrl}`);
            } else {
                console.warn('URL del recurso no definida para la descarga.');
            }

            // Ocultar el modal y limpiar el formulario
            downloadModal.style.display = 'none';
            downloadForm.reset();
            currentResourceName = '';
            currentResourceUrl = '';
        } else {
            alert('Por favor, introduce un correo electrónico válido.');
        }
    });

    // --- COOKIE CONSENT BANNER ---
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    // Muestra el banner de cookies solo si no ha sido aceptado previamente
    if (localStorage.getItem('cookieConsent') !== 'accepted') {
        cookieConsent.style.display = 'flex';
    } else {
        cookieConsent.style.display = 'none'; // Asegura que esté oculto si ya se aceptó
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted'); // Guarda la preferencia
        cookieConsent.style.display = 'none'; // Oculta el banner
    });
});