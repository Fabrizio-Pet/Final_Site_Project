// Script JavaScript per il Progetto TPSI

console.log('Script caricato correttamente');

// Evidenzia la pagina attiva nel menu con l'accent color
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.style.color = '#00FF94';
            link.style.fontWeight = '700';
        }
    });

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
});

// Aggiungi qui altre funzionalità JavaScript secondo le tue necessità
