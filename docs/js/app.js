// App Controller
const App = {
    currentLesson: null,

    init() {
        StorageManager.updateUI();
        this.checkUserName();
        this.router();

        // Listen for browser navigation
        window.onclick = (e) => {
            // Basic interaction to unlock AudioContext if needed
            if (SoundManager.audioCtx && SoundManager.audioCtx.state === 'suspended') {
                SoundManager.audioCtx.resume();
            }
        };
    },

    checkUserName() {
        const name = StorageManager.getName();
        if (!name) {
            this.showNamePrompt();
        } else {
            this.updateGreeting(name);
        }
    },

    showNamePrompt() {
        const content = document.getElementById('app');
        const modal = document.createElement('div');
        modal.id = 'name-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>¡Hola! 👋</h2>
                <p>¿Cómo te llamas?</p>
                <input type="text" id="username-input" placeholder="Tu nombre aquí..." autocomplete="off">
                <button id="btn-save-name" class="btn-primary">Guardar</button>
            </div>
        `;
        content.appendChild(modal);

        document.getElementById('btn-save-name').onclick = () => {
            const input = document.getElementById('username-input');
            const name = input.value.trim();
            if (name) {
                StorageManager.saveName(name);
                this.updateGreeting(name);
                document.getElementById('name-modal').remove();
            }
        };
    },

    updateGreeting(name) {
        const headerTitle = document.querySelector('header h1');
        headerTitle.innerHTML = `🎒 Aprende y Juega, ${name} 🚀`;
    },

    router() {
        this.showHome();
    },

    showHome() {
        const content = document.getElementById('content-area');
        const template = document.getElementById('home-template').content.cloneNode(true);
        content.innerHTML = '';

        const list = template.getElementById('subject-list');
        DATA.lessons.forEach(lesson => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div style="font-size: 3rem;">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p>Dificultad: ${lesson.difficulty}</p>
            `;
            card.onclick = () => this.showTheory(lesson);
            list.appendChild(card);
        });

        content.appendChild(template);
    },

    showTheory(lesson) {
        this.currentLesson = lesson;
        const content = document.getElementById('content-area');
        const template = document.getElementById('theory-template').content.cloneNode(true);
        content.innerHTML = '';

        template.getElementById('theory-title').innerText = lesson.title;
        template.getElementById('theory-content').innerHTML = lesson.theory;

        template.getElementById('btn-back-home').onclick = () => this.showHome();
        template.getElementById('btn-start-practice').onclick = () => this.startQuiz(lesson);

        content.appendChild(template);
    },

    startQuiz(lesson) {
        QuizManager.start(lesson, (score) => this.showResult(score));
    },

    showResult(score) {
        const content = document.getElementById('content-area');
        const template = document.getElementById('result-template').content.cloneNode(true);
        content.innerHTML = '';

        const name = StorageManager.getName() || "Campeón/a";
        template.querySelector('h2').innerText = `¡Muy bien, ${name}! 🎉`;

        template.getElementById('result-stars').innerText = score;
        template.getElementById('btn-finish-stats').onclick = () => {
            StorageManager.addStars(score);
            this.showHome();
        };

        if (score > 0) SoundManager.playWin();
        content.appendChild(template);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
