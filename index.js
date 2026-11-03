document.addEventListener('DOMContentLoaded', () => {
    // 1. Modo Oscuro
    const btnDarkMode = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                btnDarkMode.innerText = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                btnDarkMode.innerText = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            btnDarkMode.innerText = '☀️';
        }
    }

    // 2. Simulación de Envíos de Correo para el Formulario de Contacto
    const formContacto = document.getElementById('formulario-contacto');
    const notificacion = document.getElementById('notificacion-envio');

    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // Simulación visual de procesamiento
            const btnSubmit = formContacto.querySelector('button[type="submit"]');
            btnSubmit.disabled = true;
            btnSubmit.innerText = 'Enviando...';

            setTimeout(() => {
                btnSubmit.disabled = false;
                btnSubmit.innerText = 'Enviar Solicitud';

                notificacion.style.display = 'block';
                notificacion.innerHTML = `
                    <strong>✅ ¡Mensaje enviado con éxito!</strong><br>
                    <small>Se ha simulado el envío de la notificación a tu correo corporativo desde <strong>${email}</strong>.</small>
                `;

                formContacto.reset();

                setTimeout(() => {
                    notificacion.style.display = 'none';
                }, 6000);
            }, 1200);
        });
    }
});