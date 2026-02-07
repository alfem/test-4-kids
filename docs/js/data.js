const DATA = {
    lessons: [
        {
            id: 'french-numbers-1-50',
            title: '🇫🇷 Francés: Números 1-50',
            icon: '🥐',
            difficulty: '⭐',
            theory: `
                <h3>Los Números del 1 al 10</h3>
                <div class="number-grid">
                    <div class="number-item">1 - Un</div>
                    <div class="number-item">2 - Deux</div>
                    <div class="number-item">3 - Trois</div>
                    <div class="number-item">4 - Quatre</div>
                    <div class="number-item">5 - Cinq</div>
                    <div class="number-item">6 - Six</div>
                    <div class="number-item">7 - Sept</div>
                    <div class="number-item">8 - Huit</div>
                    <div class="number-item">9 - Neuf</div>
                    <div class="number-item">10 - Dix</div>
                </div>
                
                <h3>Del 11 al 20</h3>
                <div class="number-grid">
                    <div class="number-item">11 - Onze</div>
                    <div class="number-item">12 - Douze</div>
                    <div class="number-item">13 - Treize</div>
                    <div class="number-item">14 - Quatorze</div>
                    <div class="number-item">15 - Quinze</div>
                    <div class="number-item">16 - Seize</div>
                    <div class="number-item">17 - Dix-sept</div>
                    <div class="number-item">18 - Dix-huit</div>
                    <div class="number-item">19 - Dix-neuf</div>
                    <div class="number-item">20 - Vingt</div>
                </div>

                 <h3>Las Decenas</h3>
                <div class="number-grid">
                    <div class="number-item">10 - Dix</div>
                    <div class="number-item">20 - Vingt</div>
                    <div class="number-item">30 - Trente</div>
                    <div class="number-item">40 - Quarante</div>
                    <div class="number-item">50 - Cinquante</div>
                </div>
            `,
            questions: [
                { q: "¿Cómo se escribe 1 en francés?", options: ["Un", "Une", "On", "Ein"], a: 0 },
                { q: "¿Qué número es 'Cinq'?", options: ["4", "5", "15", "50"], a: 1 },
                { q: "Sigue la serie: Un, Deux, ___", options: ["Six", "Dix", "Trois", "Quatre"], a: 2 },
                { q: "¿Cómo se dice 10?", options: ["Dix", "Douze", "Deux", "Diz"], a: 0 },
                { q: "¿Cuál es el número 'Vingt'?", options: ["12", "22", "20", "2"], a: 2 },
                { q: "¿Cómo se escribe 15?", options: ["Cinq", "Quinze", "Cinquante", "Canze"], a: 1 },
                { q: "Suma: Deux + Deux =", options: ["Trois", "Quatre", "Cinq", "Six"], a: 1 },
                { q: "¿Qué número es 'Trente'?", options: ["3", "13", "30", "300"], a: 2 },
                { q: "¿Cómo se dice 50?", options: ["Cinq", "Quinze", "Saint", "Cinquante"], a: 3 },
                { q: "¿Cómo se dice 8?", options: ["Huit", "Nuit", "Sept", "Six"], a: 0 },
                { q: "El número 'Quarante' es...", options: ["14", "40", "4", "44"], a: 1 },
                { q: "¿Qué viene después de Dix-neuf?", options: ["Dix-dix", "Vingt", "Dix-huit", "Trent"], a: 1 }
            ]
        }
    ]
};
