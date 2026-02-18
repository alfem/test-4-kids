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

// ── Adverbs lesson data ──────────────────────────────────────────────────────

const ADVERBS_DATA = [
    // [adverb, type, example]
    ["aquí", "lugar", "El gato está aquí."],
    ["allí", "lugar", "El libro está allí."],
    ["cerca", "lugar", "Vivo cerca del colegio."],
    ["lejos", "lugar", "El parque está lejos."],
    ["dentro", "lugar", "El perro está dentro."],
    ["fuera", "lugar", "Juega fuera de casa."],
    ["arriba", "lugar", "El pájaro vuela arriba."],
    ["abajo", "lugar", "El gato está abajo."],
    ["hoy", "tiempo", "Hoy tenemos clase."],
    ["ayer", "tiempo", "Ayer fui al parque."],
    ["mañana", "tiempo", "Mañana es domingo."],
    ["siempre", "tiempo", "Siempre desayuno leche."],
    ["nunca", "tiempo", "Nunca llego tarde."],
    ["antes", "tiempo", "Antes llovía mucho."],
    ["después", "tiempo", "Después comemos."],
    ["pronto", "tiempo", "Llegaré pronto."],
    ["bien", "modo", "Canta muy bien."],
    ["mal", "modo", "Hoy me siento mal."],
    ["despacio", "modo", "Habla despacio, por favor."],
    ["rápido", "modo", "Corre muy rápido."],
    ["así", "modo", "Hazlo así."],
    ["mucho", "cantidad", "Come mucho."],
    ["poco", "cantidad", "Duerme poco."],
    ["bastante", "cantidad", "Hay bastante comida."],
    ["demasiado", "cantidad", "Hablas demasiado."],
    ["más", "cantidad", "Quiero más agua."],
    ["menos", "cantidad", "Hay menos niños."],
    ["sí", "afirmación", "Sí, quiero ir."],
    ["también", "afirmación", "Yo también quiero."],
    ["claro", "afirmación", "Claro que vengo."],
    ["no", "negación", "No quiero sopa."],
    ["tampoco", "negación", "Yo tampoco quiero."],
    ["jamás", "negación", "Jamás miento."],
    ["quizás", "duda", "Quizás llueva mañana."],
    ["tal vez", "duda", "Tal vez venga Pedro."],
    ["acaso", "duda", "¿Acaso no lo sabes?"]
];

const ADVERB_TYPES = {
    lugar: { label: "Lugar", emoji: "📍", color: "#e3f2fd" },
    tiempo: { label: "Tiempo", emoji: "⏰", color: "#f3e5f5" },
    modo: { label: "Modo", emoji: "🎭", color: "#e8f5e9" },
    cantidad: { label: "Cantidad", emoji: "🔢", color: "#fff3e0" },
    afirmación: { label: "Afirmación", emoji: "✅", color: "#e0f7fa" },
    negación: { label: "Negación", emoji: "❌", color: "#fce4ec" },
    duda: { label: "Duda", emoji: "🤔", color: "#f9fbe7" }
};

function generateAdverbTypeQuestions(count) {
    const questions = [];
    const pool = [...ADVERBS_DATA];
    pool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
        const item = pool[i % pool.length];
        const [adverb, correctType] = item;
        const correctLabel = ADVERB_TYPES[correctType].label;

        const allLabels = Object.values(ADVERB_TYPES).map(t => t.label);
        let options = [correctLabel];
        const shuffled = allLabels.filter(l => l !== correctLabel).sort(() => Math.random() - 0.5);
        options = options.concat(shuffled.slice(0, 3));
        options.sort(() => Math.random() - 0.5);

        questions.push({
            q: `¿De qué tipo es el adverbio "${adverb}"?`,
            options,
            a: options.indexOf(correctLabel)
        });
    }
    return questions;
}

function generateAdverbExampleQuestions(count) {
    const questions = [];
    const pool = [...ADVERBS_DATA];
    pool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
        const item = pool[i % pool.length];
        const [adverb, , example] = item;
        // Ask: which adverb fits the blank?
        const blanked = example.replace(adverb, "___");

        let options = [adverb];
        const distractors = pool
            .filter(d => d[0] !== adverb)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(d => d[0]);
        options = options.concat(distractors);
        options.sort(() => Math.random() - 0.5);

        questions.push({
            q: `Elige el adverbio correcto: "${blanked}"`,
            options,
            a: options.indexOf(adverb)
        });
    }
    return questions;
}

// ── End adverbs data ─────────────────────────────────────────────────────────

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
        },
        {
            id: 'spanish-adverbs',
            title: '📚 Lengua: Los Adverbios',
            icon: '🔤',
            difficulty: '⭐⭐',
            theory: `
                <h3>¿Qué es un adverbio? 🤔</h3>
                <div class="theory-content">
                    <p>El <strong>adverbio</strong> es una palabra que acompaña al verbo, al adjetivo u a otro adverbio para <strong>modificar su significado</strong>.</p>
                    <p>Ejemplo: Corre <strong>rápido</strong>. Está muy <strong>lejos</strong>.</p>
                </div>

                <h3>Tipos de Adverbios 📋</h3>

                <div class="number-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="number-item" style="background:#e3f2fd">
                        <strong>📍 Lugar</strong><br>
                        aquí, allí, cerca, lejos,<br>dentro, fuera, arriba, abajo
                    </div>
                    <div class="number-item" style="background:#f3e5f5">
                        <strong>⏰ Tiempo</strong><br>
                        hoy, ayer, mañana, siempre,<br>nunca, antes, después, pronto
                    </div>
                    <div class="number-item" style="background:#e8f5e9">
                        <strong>🎭 Modo</strong><br>
                        bien, mal, despacio,<br>rápido, así
                    </div>
                    <div class="number-item" style="background:#fff3e0">
                        <strong>🔢 Cantidad</strong><br>
                        mucho, poco, bastante,<br>demasiado, más, menos
                    </div>
                    <div class="number-item" style="background:#e0f7fa">
                        <strong>✅ Afirmación</strong><br>
                        sí, también, claro
                    </div>
                    <div class="number-item" style="background:#fce4ec">
                        <strong>❌ Negación</strong><br>
                        no, tampoco, jamás
                    </div>
                </div>

                <div class="number-item" style="background:#f9fbe7; margin-top: 10px;">
                    <strong>🤔 Duda</strong><br>
                    quizás, tal vez, acaso
                </div>

                <h3>Truco para recordarlos 💡</h3>
                <div class="theory-content">
                    <p>Pregúntate: <em>¿Dónde? ¿Cuándo? ¿Cómo? ¿Cuánto?</em></p>
                    <ul style="text-align: left;">
                        <li>¿<strong>Dónde</strong>? → Adverbio de <strong>lugar</strong> (aquí, lejos…)</li>
                        <li>¿<strong>Cuándo</strong>? → Adverbio de <strong>tiempo</strong> (hoy, nunca…)</li>
                        <li>¿<strong>Cómo</strong>? → Adverbio de <strong>modo</strong> (bien, rápido…)</li>
                        <li>¿<strong>Cuánto</strong>? → Adverbio de <strong>cantidad</strong> (mucho, poco…)</li>
                    </ul>
                </div>
            `,
            questions: [
                { q: "¿Qué tipo de adverbio es 'aquí'?", options: ["Tiempo", "Lugar", "Modo", "Cantidad"], a: 1 },
                { q: "¿Qué tipo de adverbio es 'siempre'?", options: ["Lugar", "Modo", "Tiempo", "Duda"], a: 2 },
                { q: "¿Qué tipo de adverbio es 'bien'?", options: ["Modo", "Cantidad", "Afirmación", "Lugar"], a: 0 },
                { q: "¿Qué tipo de adverbio es 'mucho'?", options: ["Tiempo", "Negación", "Cantidad", "Duda"], a: 2 },
                { q: "¿Qué tipo de adverbio es 'no'?", options: ["Afirmación", "Negación", "Duda", "Modo"], a: 1 },
                { q: "¿Qué tipo de adverbio es 'quizás'?", options: ["Tiempo", "Afirmación", "Negación", "Duda"], a: 3 },
                { q: "¿Qué tipo de adverbio es 'sí'?", options: ["Negación", "Duda", "Afirmación", "Modo"], a: 2 },
                { q: "En 'Corre muy rápido', ¿qué tipo de adverbio es 'rápido'?", options: ["Lugar", "Tiempo", "Cantidad", "Modo"], a: 3 },
                { q: "¿Cuál de estos es un adverbio de lugar?", options: ["nunca", "bien", "lejos", "también"], a: 2 },
                { q: "¿Cuál de estos es un adverbio de tiempo?", options: ["aquí", "ayer", "poco", "jamás"], a: 1 },
                { q: "¿Cuál de estos es un adverbio de cantidad?", options: ["tal vez", "allí", "bastante", "mal"], a: 2 },
                { q: "¿Cuál de estos es un adverbio de negación?", options: ["claro", "tampoco", "pronto", "así"], a: 1 }
            ],
            generators: [
                (count) => generateAdverbTypeQuestions(count),
                (count) => generateAdverbExampleQuestions(count)
            ]
        },
        {
            id: 'spanish-conjunctions',
            title: '📚 Lengua: Las Conjunciones',
            icon: '🔗',
            difficulty: '⭐⭐⭐',
            theory: `
                <h3>¿Qué es una conjunción? 🤔</h3>
                <div class="theory-content">
                    <p>La <strong>conjunción</strong> es una palabra que <strong>une</strong> palabras, grupos de palabras u oraciones entre sí.</p>
                    <p>Ejemplo: María <strong>y</strong> Juan son amigos. Quiero ir, <strong>pero</strong> estoy cansado.</p>
                </div>

                <h3>Tipos de Conjunciones 📋</h3>

                <div class="number-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="number-item" style="background:#e3f2fd">
                        <strong>➕ Copulativas</strong><br>
                        Unen elementos<br>
                        <em>y, e, ni</em>
                    </div>
                    <div class="number-item" style="background:#fff3e0">
                        <strong>🔀 Disyuntivas</strong><br>
                        Presentan alternativas<br>
                        <em>o, u</em>
                    </div>
                    <div class="number-item" style="background:#fce4ec">
                        <strong>⚡ Adversativas</strong><br>
                        Expresan contraste<br>
                        <em>pero, sino, aunque</em>
                    </div>
                    <div class="number-item" style="background:#f3e5f5">
                        <strong>🔍 Causales</strong><br>
                        Indican causa<br>
                        <em>porque, pues, ya que</em>
                    </div>
                    <div class="number-item" style="background:#e8f5e9">
                        <strong>🎯 Finales</strong><br>
                        Expresan finalidad<br>
                        <em>para que, a fin de que</em>
                    </div>
                    <div class="number-item" style="background:#e0f7fa">
                        <strong>❓ Condicionales</strong><br>
                        Expresan condición<br>
                        <em>si, con tal de que</em>
                    </div>
                    <div class="number-item" style="background:#f9fbe7">
                        <strong>⏱️ Temporales</strong><br>
                        Sitúan en el tiempo<br>
                        <em>cuando, mientras, antes de que</em>
                    </div>
                    <div class="number-item" style="background:#ede7f6">
                        <strong>📝 Completivas</strong><br>
                        Introducen una oración<br>
                        <em>que</em>
                    </div>
                </div>

                <div class="number-grid" style="grid-template-columns: 1fr 1fr; margin-top: 10px;">
                    <div class="number-item" style="background:#e8eaf6">
                        <strong>⚖️ Comparativas</strong><br>
                        Establecen comparación<br>
                        <em>como, tan… como</em>
                    </div>
                    <div class="number-item" style="background:#fbe9e7">
                        <strong>➡️ Consecutivas</strong><br>
                        Expresan consecuencia<br>
                        <em>así que, por lo tanto</em>
                    </div>
                </div>

                <h3>Truco para recordarlas 💡</h3>
                <div class="theory-content">
                    <ul style="text-align: left;">
                        <li><strong>y / e / ni</strong> → suman cosas (copulativas)</li>
                        <li><strong>o / u</strong> → eligen entre opciones (disyuntivas)</li>
                        <li><strong>pero / sino / aunque</strong> → contradicen (adversativas)</li>
                        <li><strong>porque / pues</strong> → explican el motivo (causales)</li>
                        <li><strong>si</strong> → ponen una condición (condicionales)</li>
                        <li><strong>cuando / mientras</strong> → dicen cuándo (temporales)</li>
                    </ul>
                    <p>💡 <em>"e"</em> se usa en lugar de <em>"y"</em> cuando la siguiente palabra empieza por <strong>i</strong> o <strong>hi</strong>. <em>"u"</em> sustituye a <em>"o"</em> cuando la siguiente palabra empieza por <strong>o</strong> u <strong>ho</strong>.</p>
                </div>
            `,
            questions: [
                { q: "¿Qué tipo de conjunción es 'y'?", options: ["Disyuntiva", "Copulativa", "Adversativa", "Causal"], a: 1 },
                { q: "¿Qué tipo de conjunción es 'pero'?", options: ["Copulativa", "Causal", "Adversativa", "Final"], a: 2 },
                { q: "¿Qué tipo de conjunción es 'porque'?", options: ["Causal", "Condicional", "Temporal", "Copulativa"], a: 0 },
                { q: "¿Qué tipo de conjunción es 'o'?", options: ["Copulativa", "Adversativa", "Disyuntiva", "Causal"], a: 2 },
                { q: "¿Qué tipo de conjunción es 'si'?", options: ["Temporal", "Condicional", "Causal", "Final"], a: 1 },
                { q: "¿Qué tipo de conjunción es 'cuando'?", options: ["Causal", "Condicional", "Copulativa", "Temporal"], a: 3 },
                { q: "¿Qué tipo de conjunción es 'para que'?", options: ["Final", "Causal", "Temporal", "Adversativa"], a: 0 },
                { q: "¿Qué tipo de conjunción es 'que'?", options: ["Copulativa", "Comparativa", "Completiva", "Causal"], a: 2 },
                { q: "En 'Quiero ir, pero estoy cansado', ¿qué tipo es 'pero'?", options: ["Causal", "Adversativa", "Copulativa", "Disyuntiva"], a: 1 },
                { q: "¿Cuál de estas es una conjunción copulativa?", options: ["pero", "porque", "ni", "si"], a: 2 },
                { q: "¿Cuál de estas es una conjunción causal?", options: ["aunque", "ya que", "o", "cuando"], a: 1 },
                { q: "¿Cuándo usamos 'e' en lugar de 'y'?", options: ["Antes de palabras con 'a'", "Antes de palabras con 'i' o 'hi'", "Siempre al final", "Antes de palabras con 'o'"], a: 1 }
            ],
            generators: [
                (count) => generateConjunctionTypeQuestions(count),
                (count) => generateConjunctionFillQuestions(count)
            ]
        },
        {
            id: 'spanish-prepositions',
            title: '📚 Lengua: Las Preposiciones',
            icon: '🔀',
            difficulty: '⭐⭐',
            theory: `
                <h3>¿Qué es una preposición? 🤔</h3>
                <div class="theory-content">
                    <p>La <strong>preposición</strong> es una palabra <strong>invariable</strong> (no cambia) que sirve para <strong>relacionar</strong> palabras dentro de una oración.</p>
                    <p>Ejemplo: Voy <strong>a</strong> la escuela. El libro está <strong>sobre</strong> la mesa.</p>
                </div>

                <h3>Las Preposiciones en Español 📋</h3>
                <div class="number-grid" style="grid-template-columns: repeat(4, 1fr);">
                    <div class="number-item" style="background:#e3f2fd"><strong>a</strong></div>
                    <div class="number-item" style="background:#e8f5e9"><strong>ante</strong></div>
                    <div class="number-item" style="background:#fff3e0"><strong>bajo</strong></div>
                    <div class="number-item" style="background:#fce4ec"><strong>con</strong></div>
                    <div class="number-item" style="background:#f3e5f5"><strong>contra</strong></div>
                    <div class="number-item" style="background:#e0f7fa"><strong>de</strong></div>
                    <div class="number-item" style="background:#f9fbe7"><strong>desde</strong></div>
                    <div class="number-item" style="background:#ede7f6"><strong>durante</strong></div>
                    <div class="number-item" style="background:#e8eaf6"><strong>en</strong></div>
                    <div class="number-item" style="background:#fbe9e7"><strong>entre</strong></div>
                    <div class="number-item" style="background:#e3f2fd"><strong>hacia</strong></div>
                    <div class="number-item" style="background:#e8f5e9"><strong>hasta</strong></div>
                    <div class="number-item" style="background:#fff3e0"><strong>para</strong></div>
                    <div class="number-item" style="background:#fce4ec"><strong>por</strong></div>
                    <div class="number-item" style="background:#f3e5f5"><strong>según</strong></div>
                    <div class="number-item" style="background:#e0f7fa"><strong>sin</strong></div>
                    <div class="number-item" style="background:#f9fbe7"><strong>sobre</strong></div>
                    <div class="number-item" style="background:#ede7f6"><strong>tras</strong></div>
                </div>

                <h3>¿Para qué sirven? 💡</h3>
                <div class="theory-content">
                    <ul style="text-align: left;">
                        <li><strong>Lugar:</strong> El gato está <em>bajo</em> la silla. Vive <em>en</em> Madrid.</li>
                        <li><strong>Tiempo:</strong> Llegué <em>a</em> las tres. Estudié <em>durante</em> dos horas.</li>
                        <li><strong>Dirección:</strong> Voy <em>hacia</em> el parque. Caminé <em>hasta</em> casa.</li>
                        <li><strong>Compañía:</strong> Fui <em>con</em> mis amigos.</li>
                        <li><strong>Causa:</strong> Lo hice <em>por</em> ti.</li>
                        <li><strong>Finalidad:</strong> Estudia <em>para</em> aprender.</li>
                        <li><strong>Origen:</strong> Soy <em>de</em> España. Vengo <em>desde</em> lejos.</li>
                    </ul>
                </div>

                <h3>Truco para recordarlas 🎵</h3>
                <div class="theory-content">
                    <p>¡Aprende esta lista de memoria!</p>
                    <p style="font-size:1.1em; font-weight:bold; color:#5c6bc0;">
                        a · ante · bajo · con · contra · de · desde · durante · en · entre · hacia · hasta · para · por · según · sin · sobre · tras
                    </p>
                </div>
            `,
            questions: [
                { q: "¿Cuál de estas es una preposición?", options: ["pero", "muy", "de", "siempre"], a: 2 },
                { q: "Completa: Voy ___ la escuela.", options: ["en", "a", "de", "sin"], a: 1 },
                { q: "Completa: El libro está ___ la mesa.", options: ["sobre", "por", "desde", "hacia"], a: 0 },
                { q: "Completa: Fui ___ mis amigos.", options: ["sin", "con", "para", "entre"], a: 1 },
                { q: "Completa: Estudia ___ aprender.", options: ["por", "de", "para", "ante"], a: 2 },
                { q: "Completa: Soy ___ España.", options: ["a", "en", "de", "con"], a: 2 },
                { q: "Completa: Lo hice ___ ti.", options: ["sin", "por", "entre", "bajo"], a: 1 },
                { q: "Completa: Llegó ___ las tres.", options: ["desde", "a", "hacia", "tras"], a: 1 },
                { q: "¿Cuántas preposiciones tiene el español?", options: ["10", "14", "18", "20"], a: 2 },
                { q: "Completa: Caminé ___ el río.", options: ["sobre", "según", "junto", "contra"], a: 0 },
                { q: "¿Qué indica 'desde' en 'Vengo desde lejos'?", options: ["Finalidad", "Compañía", "Origen", "Lugar"], a: 2 },
                { q: "Completa: Hay secretos ___ nosotros.", options: ["entre", "ante", "tras", "bajo"], a: 0 }
            ],
            generators: [
                (count) => generatePrepositionFillQuestions(count),
                (count) => generatePrepositionIdentifyQuestions(count)
            ]
        }
    ]
};

// ── Conjunctions lesson data ──────────────────────────────────────────────────

const CONJUNCTIONS_DATA = [
    // [conjunction, type, sentence_with_blank]
    ["y", "copulativa", "María ___ Juan son amigos."],
    ["e", "copulativa", "Pedro ___ Ignacio juegan juntos."],
    ["ni", "copulativa", "No como carne ___ pescado."],
    ["o", "disyuntiva", "¿Quieres leche ___ zumo?"],
    ["u", "disyuntiva", "¿Tienes siete ___ ocho años?"],
    ["pero", "adversativa", "Quiero ir, ___ estoy cansado."],
    ["sino", "adversativa", "No es azul, ___ verde."],
    ["aunque", "adversativa", "Salí ___ llovía."],
    ["porque", "causal", "No fui ___ estaba enfermo."],
    ["pues", "causal", "Descansa, ___ estás cansado."],
    ["ya que", "causal", "Come, ___ tienes hambre."],
    ["para que", "final", "Estudia ___ aprendas."],
    ["a fin de que", "final", "Habla despacio ___ te entiendan."],
    ["si", "condicional", "___ estudias, aprobarás."],
    ["con tal de que", "condicional", "Iré ___ me invites."],
    ["cuando", "temporal", "Llámame ___ llegues."],
    ["mientras", "temporal", "Juega ___ yo cocino."],
    ["antes de que", "temporal", "Sal ___ llueva."],
    ["que", "completiva", "Sé ___ vendrás."],
    ["como", "comparativa", "Es tan alto ___ su padre."],
    ["así que", "consecutiva", "Llovía, ___ cogí el paraguas."]
];

const CONJUNCTION_TYPES = {
    copulativa: { label: "Copulativa", emoji: "➕", color: "#e3f2fd", desc: "unen elementos (y, e, ni)" },
    disyuntiva: { label: "Disyuntiva", emoji: "🔀", color: "#fff3e0", desc: "presentan alternativas (o, u)" },
    adversativa: { label: "Adversativa", emoji: "⚡", color: "#fce4ec", desc: "expresan contraste (pero, sino, aunque)" },
    causal: { label: "Causal", emoji: "🔍", color: "#f3e5f5", desc: "indican causa (porque, pues, ya que)" },
    final: { label: "Final", emoji: "🎯", color: "#e8f5e9", desc: "expresan finalidad (para que)" },
    condicional: { label: "Condicional", emoji: "❓", color: "#e0f7fa", desc: "expresan condición (si)" },
    temporal: { label: "Temporal", emoji: "⏱️", color: "#f9fbe7", desc: "sitúan en el tiempo (cuando, mientras)" },
    completiva: { label: "Completiva", emoji: "📝", color: "#ede7f6", desc: "introducen una oración (que)" },
    comparativa: { label: "Comparativa", emoji: "⚖️", color: "#e8eaf6", desc: "establecen comparación (como)" },
    consecutiva: { label: "Consecutiva", emoji: "➡️", color: "#fbe9e7", desc: "expresan consecuencia (así que)" }
};

function generateConjunctionTypeQuestions(count) {
    const questions = [];
    const pool = [...CONJUNCTIONS_DATA];
    pool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
        const item = pool[i % pool.length];
        const [conj, correctType] = item;
        const correctLabel = CONJUNCTION_TYPES[correctType].label;

        const allLabels = Object.values(CONJUNCTION_TYPES).map(t => t.label);
        let options = [correctLabel];
        const shuffled = allLabels.filter(l => l !== correctLabel).sort(() => Math.random() - 0.5);
        options = options.concat(shuffled.slice(0, 3));
        options.sort(() => Math.random() - 0.5);

        questions.push({
            q: `¿De qué tipo es la conjunción "${conj}"?`,
            options,
            a: options.indexOf(correctLabel)
        });
    }
    return questions;
}

function generateConjunctionFillQuestions(count) {
    const questions = [];
    const pool = [...CONJUNCTIONS_DATA];
    pool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
        const item = pool[i % pool.length];
        const [conj, , sentence] = item;

        let options = [conj];
        const distractors = pool
            .filter(d => d[0] !== conj)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(d => d[0]);
        options = options.concat(distractors);
        options.sort(() => Math.random() - 0.5);

        questions.push({
            q: `Elige la conjunción correcta: "${sentence}"`,
            options,
            a: options.indexOf(conj)
        });
    }
    return questions;
}

// ── End conjunctions data ─────────────────────────────────────────────────────

// ── Prepositions lesson data ──────────────────────────────────────────────────

const PREPOSITIONS_DATA = [
    // [preposition, use, sentence_with_blank]
    ["a", "Dirección/Tiempo", "Voy ___ la escuela."],
    ["ante", "Lugar", "Se presentó ___ el juez."],
    ["bajo", "Lugar", "El gato está ___ la silla."],
    ["con", "Compañía", "Fui ___ mis amigos."],
    ["contra", "Oposición", "Chocó ___ la pared."],
    ["de", "Origen/Posesión", "Soy ___ España."],
    ["desde", "Origen", "Vengo ___ lejos."],
    ["durante", "Tiempo", "Estudié ___ dos horas."],
    ["en", "Lugar", "Vive ___ Madrid."],
    ["entre", "Lugar", "Hay secretos ___ nosotros."],
    ["hacia", "Dirección", "Voy ___ el parque."],
    ["hasta", "Límite", "Caminé ___ casa."],
    ["para", "Finalidad", "Estudia ___ aprender."],
    ["por", "Causa", "Lo hice ___ ti."],
    ["según", "Modo/Opinión", "___ el mapa, giramos aquí."],
    ["sin", "Ausencia", "Salió ___ paraguas."],
    ["sobre", "Lugar/Tema", "El libro está ___ la mesa."],
    ["tras", "Posterioridad", "Llegó ___ la lluvia."]
];

const PREPOSITION_USES = [
    "Dirección/Tiempo", "Lugar", "Compañía", "Oposición",
    "Origen/Posesión", "Origen", "Tiempo", "Límite",
    "Finalidad", "Causa", "Modo/Opinión", "Ausencia",
    "Posterioridad"
];

function generatePrepositionFillQuestions(count) {
    const questions = [];
    const pool = [...PREPOSITIONS_DATA];
    pool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
        const item = pool[i % pool.length];
        const [prep, , sentence] = item;

        let options = [prep];
        const distractors = pool
            .filter(d => d[0] !== prep)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(d => d[0]);
        options = options.concat(distractors);
        options.sort(() => Math.random() - 0.5);

        questions.push({
            q: `Elige la preposición correcta: "${sentence}"`,
            options,
            a: options.indexOf(prep)
        });
    }
    return questions;
}

function generatePrepositionIdentifyQuestions(count) {
    const questions = [];
    const allPreps = PREPOSITIONS_DATA.map(d => d[0]);
    const nonPreps = ["pero", "muy", "siempre", "bien", "nunca", "también", "y", "o", "que", "cuando", "así", "ya"];

    for (let i = 0; i < count; i++) {
        // Ask: which of these IS a preposition?
        const correctPrep = allPreps[Math.floor(Math.random() * allPreps.length)];
        const distractors = nonPreps.sort(() => Math.random() - 0.5).slice(0, 3);
        let options = [correctPrep, ...distractors];
        options.sort(() => Math.random() - 0.5);

        questions.push({
            q: `¿Cuál de estas palabras es una preposición?`,
            options,
            a: options.indexOf(correctPrep)
        });
    }
    return questions;
}

// ── End prepositions data ─────────────────────────────────────────────────────
