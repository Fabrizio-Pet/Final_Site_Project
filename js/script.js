// Script JavaScript per il Progetto TPSI

function isInternalNavigationLink(link) {
    if (!link || !link.getAttribute) {
        return false;
    }

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return false;
    }

    return !link.target && !href.startsWith('http://') && !href.startsWith('https://');
}

function initRevealOnScroll() {
    const revealTargets = document.querySelectorAll(
        '.service-card, .team-card, .past-work-card, .contact-panel, .carta-piccola, .carta-grande, .cybertest-card'
    );

    if (!revealTargets.length || !('IntersectionObserver' in window)) {
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -32px 0px'
    });

    revealTargets.forEach((element) => {
        element.classList.add('is-reveal');
        observer.observe(element);
    });
}

// Evidenzia la pagina attiva nel menu con l'accent color
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('page-ready');
    initRevealOnScroll();

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('is-active');
        }
    });

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Transizione in uscita per i link interni
    document.querySelectorAll('a').forEach(link => {
        if (!isInternalNavigationLink(link)) {
            return;
        }

        link.addEventListener('click', (event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            const href = link.getAttribute('href');
            if (!href || href === window.location.pathname.split('/').pop()) {
                return;
            }

            event.preventDefault();
            document.body.classList.add('page-leaving');

            window.setTimeout(() => {
                window.location.href = href;
            }, 130);
        });
    });
});

// Aggiungi qui altre funzionalità JavaScript secondo le tue necessità

