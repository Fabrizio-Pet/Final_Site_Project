// Threat dashboard interactions: blinking dots, Chart.js donut, terminal log simulation

document.addEventListener('DOMContentLoaded', function(){
    initMapDots();
    initDonutChart();
    initTerminalLog();
});

function initMapDots(){
    const dotsContainer = document.getElementById('puntini-mappa');
    if(!dotsContainer) return;

    // sample positions (percent x, percent y) over the map image
    const positions = [
        {x:30, y:28}, {x:52, y:38}, {x:68, y:44}, {x:40, y:62}, {x:20, y:48}, {x:80, y:18}
    ];

    positions.forEach((p, i)=>{
        const dot = document.createElement('div');
        dot.className = 'punto-mappa';
        dot.style.left = p.x + '%';
        dot.style.top = p.y + '%';
        dotsContainer.appendChild(dot);

        // staggered lampeggio
        setTimeout(()=>{
            dot.classList.add('lampeggia');
        }, i * 300);
    });

    // occasional random bursts
    setInterval(()=>{
        const dots = dotsContainer.querySelectorAll('.punto-mappa');
        const idx = Math.floor(Math.random() * dots.length);
        const d = dots[idx];
        if(!d) return;
        d.classList.remove('lampeggia');
        // re-trigger
        setTimeout(()=> d.classList.add('lampeggia'), 50);
    }, 2200 + Math.random()*1800);
}

function initDonutChart(){
    const ctx = document.getElementById('threat-donut');
    if(!ctx) return;

    const riskLevelEl = document.getElementById('risk-level');

    const data = {
        labels: ['Basso','Moderato','Alto'],
        datasets: [{
            data: [68, 22, 10],
            backgroundColor: ['#10B981','#F59E0B','#EF4444'],
            hoverOffset: 6,
            borderWidth: 0
        }]
    };

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 700,
                easing: 'easeOutCubic'
            },
            plugins: {
                legend: { position: 'bottom', labels: { color: '#0F172A' } },
                tooltip: { enabled: true }
            },
            cutout: '60%'
        }
    });

    function nextThreatDistribution(){
        // Small random drift around a realistic baseline, then normalize to 100.
        const low = Math.max(52, Math.min(78, data.datasets[0].data[0] + (Math.random() * 8 - 4)));
        const moderate = Math.max(14, Math.min(32, data.datasets[0].data[1] + (Math.random() * 6 - 3)));
        const high = Math.max(6, Math.min(20, 100 - low - moderate));

        const total = low + moderate + high;
        const normalizedLow = Math.round((low / total) * 100);
        const normalizedModerate = Math.round((moderate / total) * 100);
        const normalizedHigh = 100 - normalizedLow - normalizedModerate;

        return [normalizedLow, normalizedModerate, normalizedHigh];
    }

    function updateChart(){
        const [low, moderate, high] = nextThreatDistribution();
        chart.data.datasets[0].data = [low, moderate, high];
        chart.update();

        if(riskLevelEl){
            riskLevelEl.textContent = high + '%';
        }
    }

    setInterval(updateChart, 3200);
}

function initTerminalLog(){
    const terminal = document.getElementById('terminale-log');
    if(!terminal) return;

    const messages = [
        '[ShieldUp] Analisi pacchetti in ingresso...',
        '[IDS] Regola #412: signature matched',
        '[FW] IP 192.168.1.12 bloccato per comportamento sospetto',
        '[Scanner] Scan TCP/443 from 82.45.11.9',
        '[Updater] Threat signature DB aggiornato (v2026.05.10)',
        '[Monitor] Latency spike detected: 320ms',
        '[Alert] Brute-force attempt mitigated (user: admin)',
        '[GeoIP] Suspicious traffic from RU -> flagged',
        '[Service] Heartbeat OK',
        '[Audit] New certificate pinned for api.shieldup.local'
    ];

    function appendLine(){
        const idx = Math.floor(Math.random()*messages.length);
        const line = document.createElement('div');
        line.className = 'terminale-linea';
        const time = new Date().toLocaleTimeString();
        line.textContent = time + ' ' + messages[idx];
        terminal.appendChild(line);

        // keep last 200 lines max
        while(terminal.children.length > 200){ terminal.removeChild(terminal.firstChild); }
        terminal.scrollTop = terminal.scrollHeight;
    }

    // seed with a few lines
    for(let i=0;i<6;i++){ setTimeout(appendLine, i*120); }
    setInterval(appendLine, 1200 + Math.random()*900);
}
