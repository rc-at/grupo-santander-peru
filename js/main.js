const waMsg = document.getElementById('wa-msg');
const waBtn = document.querySelector('.whatsapp-btn');

if (waMsg && waBtn) {
    // Escuchar el fin de la animación para ocultar físicamente
    waMsg.addEventListener('animationend', (e) => {
        if (e.animationName === 'handleMessage') {
            waMsg.style.display = 'none';
        }
    });

    // Reaparecer si el usuario pasa el mouse por el área del icono
    waBtn.addEventListener('mouseenter', () => {
        waMsg.style.display = 'block';
    });
}