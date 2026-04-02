document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');

    // 1. Animación inicial
    if (heroSection) {
        setTimeout(() => heroSection.classList.add('loaded'), 100);
    }

    // 2. Scroll Events (Sticky & Hero Fade)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY; // Más moderno que pageYOffset

        if (navbar) {
            scrolled > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
        }

        if (heroSection) {
            // Desvanecimiento suave del hero
            let opacity = 1 - (scrolled / 600);
            heroSection.style.opacity = Math.max(0, opacity);
        }
    });

    // 3. Smooth Scrolling de Precisión
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // SEGURIDAD: Si el enlace es solo "#", no hacer nada
            if (targetId === '#') return;

            e.preventDefault();

            // CASO ESPECIAL: Logo o inicio (Tope absoluto)
            if (targetId === '#inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const isNavScrolled = navbar.classList.contains('scrolled');
                // 65px es la altura promedio del navbar cuando ya encogió
                const dynamicOffset = isNavScrolled ? navbar.offsetHeight : 65;

                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - dynamicOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Intersection Observer para animaciones al bajar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-appear').forEach(el => observer.observe(el));

    // --- Lógica Menú Hamburguesa ---
    const menuToggle = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Abrir menú
        menuToggle.addEventListener('click', () => {
            navLinks.classList.add('active');
        });

        // Cerrar menú con el botón X
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        }

        // Cerrar menú al elegir una sección (UX mejorada)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Lógica Servicios Expandibles ---
    document.querySelectorAll(".service-toggle").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const card = btn.closest(".service-card");
            const isActive = card.classList.contains("active");

            // Cerrar todas
            document.querySelectorAll(".service-card").forEach(c => {
                c.classList.remove("active");
                const b = c.querySelector(".service-toggle");
                if (b) b.textContent = "Ver detalles";
            });

            // Abrir actual
            if (!isActive) {
                card.classList.add("active");
                btn.textContent = "Ocultar";
            }
        });
    });
});