// Script JavaScript per il Progetto TPSI

console.log('Script caricato correttamente');

// Funzione per evidenziare la pagina attiva nel menu
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.style.color = '#ffa500';
        }
    });
});

// Aggiungi qui altre funzionalità JavaScript secondo le tue necessità
