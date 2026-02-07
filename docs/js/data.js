const FRENCH_NUMBERS = [
    "Zéro", "Un", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix",
    "Onze", "Douze", "Treize", "Quatorze", "Quinze", "Seize", "Dix-sept", "Dix-huit", "Dix-neuf", "Vingt",
    "Vingt-et-un", "Vingt-deux", "Vingt-trois", "Vingt-quatre", "Vingt-cinq", "Vingt-six", "Vingt-sept", "Vingt-huit", "Vingt-neuf", "Trente",
    "Trente-et-un", "Trente-deux", "Trente-trois", "Trente-quatre", "Trente-cinq", "Trente-six", "Trente-sept", "Trente-huit", "Trente-neuf", "Quarante",
    "Quarante-et-un", "Quarante-deux", "Quarante-trois", "Quarante-quatre", "Quarante-cinq", "Quarante-six", "Quarante-sept", "Quarante-huit", "Quarante-neuf", "Cinquante"
];

function generateFrenchMathQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        // Sumas sencillas hasta 20
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const sum = a + b;

        const qText = `Calcula: ${FRENCH_NUMBERS[a]} + ${FRENCH_NUMBERS[b]} = ?`;
        const correctAnswer = FRENCH_NUMBERS[sum];

        let options = [correctAnswer];
        while (options.length < 4) {
            let distractorVal = sum + Math.floor(Math.random() * 7) - 3; // +/- 3 range
            if (distractorVal < 0) distractorVal = 0;
            if (distractorVal > 50) distractorVal = 50;

            const distractorWord = FRENCH_NUMBERS[distractorVal];
            if (distractorVal !== sum && !options.includes(distractorWord)) {
                options.push(distractorWord);
            }
        }

        // Shuffle
        options.sort(() => Math.random() - 0.5);
        questions.push({
            q: qText,
            options: options,
            a: options.indexOf(correctAnswer)
        });
    }
    return questions;
}

function generateFrenchSequenceQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        // Sequences like: Un, Deux, ___
        const start = Math.floor(Math.random() * 20) + 1;

        const qText = `Sigue la serie: ${FRENCH_NUMBERS[start]}, ${FRENCH_NUMBERS[start + 1]}, ___`;
        const correctAnswer = FRENCH_NUMBERS[start + 2];

        let options = [correctAnswer];
        while (options.length < 4) {
            let distractorVal = (start + 2) + Math.floor(Math.random() * 7) - 3;
            if (distractorVal < 0) distractorVal = 0;
            if (distractorVal > 50) distractorVal = 50;

            const distractorWord = FRENCH_NUMBERS[distractorVal];
            if (distractorVal !== (start + 2) && !options.includes(distractorWord)) {
                options.push(distractorWord);
            }
        }

        options.sort(() => Math.random() - 0.5);
        questions.push({
            q: qText,
            options: options,
            a: options.indexOf(correctAnswer)
        });
    }
    return questions;
}

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

                <h3>Trucos Mágicos ✨</h3>
                <div class="theory-content">
                    <p><strong>1. Conjunción "et-un" ☝️</strong></p>
                    <p>Cuando un número a partir del 20 termina en 1, se añade "et" (y) entre la decena y el uno.</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li>21 ➝ Vingt-<strong>et-un</strong></li>
                        <li>31 ➝ Trente-<strong>et-un</strong></li>
                        <li>41 ➝ Quarante-<strong>et-un</strong></li>
                    </ul>

                    <p><strong>2. Uso del guion 🔗</strong></p>
                    <p>Para el resto de números compuestos, simplemente unimos la decena y la unidad con un guion.</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li>22 ➝ Vingt-<strong>deux</strong></li>
                        <li>35 ➝ Trente-<strong>cinq</strong></li>
                        <li>48 ➝ Quarante-<strong>huit</strong></li>
                    </ul>
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
            ],
            generators: [
                (count) => generateFrenchMathQuestions(count),
                (count) => generateFrenchSequenceQuestions(count)
            ]
        }
    ]
};
