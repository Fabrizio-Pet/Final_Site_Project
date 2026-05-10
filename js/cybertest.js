// CyberTest 
const questions = [
    { text: "Hai mai subito un attacco informatico?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Utilizzi password complesse e gestori di password?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "I tuoi dipendenti ricevono training sulla sicurezza?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Hai un piano di sicurezza documentato?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Conosci tutte le vulnerabilità dei tuoi sistemi?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Hai firewall, IDS/IPS e altre protezioni attive?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Quanti dipendenti sanno riconoscere il phishing?", a1: ["Quasi tutti", 0], a2: ["Pochi o nessuno", 2] },
    { text: "Hai una strategia di risk management?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Fai test di penetrazione almeno 1 volta l'anno?", a1: ["Sì", 0], a2: ["No", 2] },
    { text: "Mantieni i tuoi sistemi aggiornati?", a1: ["Sì", 0], a2: ["No", 2] }
];

let currentQ = 0;
let score = 0;

function showQuestion() {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    
    document.getElementById('test-container').innerHTML = `
        <div class="test-question">
            <div class="test-progress">
                <div class="test-progress-bar" style="width: ${progress}%"></div>
            </div>
            <div class="test-question-number">Domanda ${currentQ + 1} di 10</div>
            <h2 class="test-question-text">${q.text}</h2>
            <div class="test-answer-options">
                <button class="answer-btn" onclick="answer(0)">${q.a1[0]}</button>
                <button class="answer-btn" onclick="answer(1)">${q.a2[0]}</button>
            </div>
        </div>
    `;
}

function answer(choice) {
    const q = questions[currentQ];
    score += choice === 0 ? q.a1[1] : q.a2[1];
    
    currentQ++;
    if (currentQ < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = Math.round((score / 20) * 100);
    const message = getResultMessage(percentage);
    const color = getResultColor(percentage);
    
    document.getElementById('test-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    
    // Update immediatamente
    document.getElementById('result-percentage').style.width = percentage + '%';
    const resultText = document.getElementById('result-text');
    resultText.textContent = percentage + '%';
    resultText.style.setProperty('color', color, 'important');
    document.getElementById('result-message').textContent = message;
}

function getResultColor(pct) {
    if (pct <= 20) return "#00FF94";
    if (pct <= 40) return "#F59E0B";
    if (pct <= 60) return "#EF7C3B";
    if (pct <= 80) return "#EF4444";
    return "#DC2626";
}

function getResultMessage(pct) {
    if (pct <= 20) return "La tua sicurezza è molto buona! Mantieni comunque i controlli regolari.";
    if (pct <= 40) return "Hai una buona base, ma ci sono aree da migliorare.";
    if (pct <= 60) return "Hai significative lacune di sicurezza. Considera i nostri servizi.";
    if (pct <= 80) return "La tua sicurezza è a rischio. Contattaci al più presto!";
    return "CRITICO: La tua azienda è ad altissimo rischio. Contattaci subito!";
}

function restart() {
    currentQ = 0;
    score = 0;
    document.getElementById('test-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    showQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', restart);
});
