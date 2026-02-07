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

function generateFrenchTranslationQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        // Translation: Un -> One (but in Spanish context: Un -> Uno?)
        // The app is in Spanish. "Un" -> "Uno" or "1"?
        // Let's ask to write the NUMBER in French given the digit.
        // ex: "Escribe en francés: 5" -> "Cinq"

        const num = Math.floor(Math.random() * 20) + 1; // 1-20
        const frenchWord = FRENCH_NUMBERS[num];

        questions.push({
            q: `Escribe en francés: ${num}`,
            type: 'text',
            a: frenchWord
        });
    }
    return questions;
}

const FRENCH_VERBS = {
    etre: {
        name: "Être",
        conjugation: [
            { s: "Je", v: "suis" },
            { s: "Tu", v: "es" },
            { s: "Il/Elle/On", v: "est" },
            { s: "Nous", v: "sommes" },
            { s: "Vous", v: "êtes" },
            { s: "Ils/Elles", v: "sont" }
        ]
    },
    avoir: {
        name: "Avoir",
        conjugation: [
            { s: "J'", v: "ai" },
            { s: "Tu", v: "as" },
            { s: "Il/Elle/On", v: "a" },
            { s: "Nous", v: "avons" },
            { s: "Vous", v: "avez" },
            { s: "Ils/Elles", v: "ont" }
        ]
    }
};

function generateFrenchVerbQuestions(count) {
    const questions = [];
    const verbs = ['etre', 'avoir'];

    for (let i = 0; i < count; i++) {
        const verbKey = verbs[Math.floor(Math.random() * verbs.length)];
        const verbData = FRENCH_VERBS[verbKey];
        const index = Math.floor(Math.random() * 6);
        const item = verbData.conjugation[index];

        const qText = `Completa: ${item.s} ______ (${verbData.name})`;
        const correctAnswer = item.v;

        // Distractors
        let options = [correctAnswer];
        while (options.length < 4) {
            // Pick random form from same verb
            const randIdx = Math.floor(Math.random() * 6);
            const distractor = verbData.conjugation[randIdx].v;
            if (!options.includes(distractor)) {
                options.push(distractor);
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

const FRENCH_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const FRENCH_MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function generateDaySequenceQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const start = Math.floor(Math.random() * 5);

        const qText = `Sigue la serie: ${FRENCH_DAYS[start]}, ${FRENCH_DAYS[start + 1]}, ___`;
        const correctAnswer = FRENCH_DAYS[start + 2];

        let options = [correctAnswer];
        while (options.length < 4) {
            const randIdx = Math.floor(Math.random() * 7);
            const distractor = FRENCH_DAYS[randIdx];
            if (!options.includes(distractor)) {
                options.push(distractor);
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

function generateMonthSequenceQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const start = Math.floor(Math.random() * 10);

        const qText = `Sigue la serie: ${FRENCH_MONTHS[start]}, ${FRENCH_MONTHS[start + 1]}, ___`;
        const correctAnswer = FRENCH_MONTHS[start + 2];

        let options = [correctAnswer];
        while (options.length < 4) {
            const randIdx = Math.floor(Math.random() * 12);
            const distractor = FRENCH_MONTHS[randIdx];
            if (!options.includes(distractor)) {
                options.push(distractor);
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
                (count) => generateFrenchSequenceQuestions(count),
                (count) => generateFrenchTranslationQuestions(count)
            ]
        },
        {
            id: 'french-verbs-etre-avoir',
            title: '🇫🇷 Francés: Être y Avoir',
            icon: '🏰',
            difficulty: '⭐⭐',
            theory: `
                <h3>Verbo Être (Ser/Estar) 🦸‍♂️</h3>
                <p>Se usa para decir quién eres o cómo estás.</p>
                <div class="number-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="number-item" style="background:#e3f2fd">Je suis (Yo soy)</div>
                    <div class="number-item" style="background:#e3f2fd">Nous sommes (Nosotros somos)</div>
                    <div class="number-item" style="background:#bbdefb">Tu es (Tú eres)</div>
                    <div class="number-item" style="background:#bbdefb">Vous êtes (Vosotros sois)</div>
                    <div class="number-item" style="background:#90caf9">Il est (Él es)</div>
                    <div class="number-item" style="background:#90caf9">Ils sont (Ellos son)</div>
                </div>

                <h3>Verbo Avoir (Tener) 🎒</h3>
                <p>Se usa para decir qué tienes.</p>
                <div class="number-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="number-item" style="background:#f3e5f5">J'ai (Yo tengo)</div>
                    <div class="number-item" style="background:#f3e5f5">Nous avons (Nosotros tenemos)</div>
                    <div class="number-item" style="background:#e1bee7">Tu as (Tú tienes)</div>
                    <div class="number-item" style="background:#e1bee7">Vous avez (Vosotros tenéis)</div>
                    <div class="number-item" style="background:#ce93d8">Il a (Él tiene)</div>
                    <div class="number-item" style="background:#ce93d8">Ils ont (Ellos tienen)</div>
                </div>

                <h3>Trucos para Recordar 💡</h3>
                <ul style="text-align: left; margin-top: 20px;">
                    <li><strong>TU</strong> siempre lleva <strong>S</strong> al final (E<strong>s</strong>, A<strong>s</strong>).</li>
                    <li>Con <strong>VOUS</strong> casi siempre acaba en <strong>EZ</strong> (Av<strong>ez</strong>), ¡pero Êtes es especial!</li>
                    <li><strong>J'ai</strong> se escribe así porque "Je" y "ai" chocan las vocales 💥.</li>
                </ul>
            `,
            questions: [
                { q: "¿Qué significa 'Je suis'?", options: ["Yo tengo", "Yo soy", "Tú eres", "Él es"], a: 1 },
                { q: "Completa: Tu ___ intelligent.", options: ["es", "est", "suis", "sommes"], a: 0 },
                { q: "¿Cómo se dice 'Nosotros tenemos'?", options: ["Nous sommes", "Nous avons", "Vous avez", "Ils ont"], a: 1 },
                { q: "Completa: J'___ un chien (perro).", options: ["ai", "as", "a", "ave"], a: 0 },
                { q: "Elige la correcta: Vous ___.", options: ["sommes", "êtes", "sont", "est"], a: 1 },
                { q: "Completa: Ils ___ contents (contentos).", options: ["ont", "sont", "est", "a"], a: 1 },
                { q: "¿Qué significa 'Il a'?", options: ["Él es", "Él tiene", "Ella es", "Ella tiene"], a: 1 },
                { q: "Completa: Elle ___ belle.", options: ["es", "est", "a", "as"], a: 1 },
                { q: "Completa: Tu ___ un chat.", options: ["es", "as", "a", "est"], a: 1 },
                { q: "¿Cómo se escribe 'Ellos tienen'?", options: ["Ils sont", "Ils ont", "Elles sont", "Elles ont"], a: 1 }
            ],
            generators: [
                (count) => generateFrenchVerbQuestions(count)
            ]
        },
        {
            id: 'french-days-months',
            title: '🇫🇷 Francés: Días y Meses',
            icon: '📅',
            difficulty: '⭐⭐',
            theory: `
                <h3>Los Días de la Semana 🗓️</h3>
                <div class="number-grid">
                    <div class="number-item">Lundi (Lunes)</div>
                    <div class="number-item">Mardi (Martes)</div>
                    <div class="number-item">Mercredi (Miércoles)</div>
                    <div class="number-item">Jeudi (Jueves)</div>
                    <div class="number-item">Vendredi (Viernes)</div>
                    <div class="number-item" style="background:#ffccbc">Samedi (Sábado)</div>
                    <div class="number-item" style="background:#ffccbc">Dimanche (Domingo)</div>
                </div>

                <h3>Los Meses del Año 🎂</h3>
                <div class="number-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="number-item">Janvier</div>
                    <div class="number-item">Février</div>
                    <div class="number-item">Mars</div>
                    <div class="number-item">Avril</div>
                    <div class="number-item">Mai</div>
                    <div class="number-item">Juin</div>
                    <div class="number-item">Juillet</div>
                    <div class="number-item">Août</div>
                    <div class="number-item">Septembre</div>
                    <div class="number-item">Octobre</div>
                    <div class="number-item">Novembre</div>
                    <div class="number-item">Décembre</div>
                </div>

                <h3>Curiosidades 🤓</h3>
                <ul style="text-align: left; margin-top: 20px;">
                    <li>En francés, los días y meses se escriben <strong>siempre en minúscula</strong> (lundi, enero), no como en inglés.</li>
                    <li>Sábado y Domingo (Le Week-end) son los días favoritos 🎉.</li>
                </ul>
            `,
            questions: [
                { q: "¿Qué día va después de Lundi?", options: ["Mardi", "Mercredi", "Jeudi", "Dimanche"], a: 0 },
                { q: "¿Cómo se dice 'Domingo'?", options: ["Samedi", "Dimanche", "Lundi", "Mardi"], a: 1 },
                { q: "¿En qué mes es Navidad?", options: ["Janvier", "Décembre", "Juillet", "Août"], a: 1 },
                { q: "¿Qué mes tiene menos días?", options: ["Février", "Mars", "Mai", "Juin"], a: 0 },
                { q: "Sigue la serie: Jeudi, Vendredi, ___", options: ["Samedi", "Dimanche", "Lundi", "Mardi"], a: 0 },
                { q: "¿Cuál es el primer mes del año?", options: ["Décembre", "Janvier", "Mars", "Avril"], a: 1 },
                { q: "¿Cómo se dice 'Fin de semana'?", options: ["La Semaine", "Le Week-end", "Le Jour", "L'Année"], a: 1 },
                { q: "El día antes de Mercredi es...", options: ["Lundi", "Mardi", "Jeudi", "Vendredi"], a: 1 },
                { q: "¿En qué mes empiezan las clases?", options: ["Septembre", "Juillet", "Décembre", "Février"], a: 0 },
                { q: "¿Cuál es el quinto mes?", options: ["Avril", "Mai", "Juin", "Mars"], a: 1 }
            ],
            generators: [
                (count) => generateDaySequenceQuestions(count),
                (count) => generateMonthSequenceQuestions(count)
            ]
        }
    ]
};
