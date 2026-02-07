const QuizManager = {
    currentQuestions: [],
    currentIndex: 0,
    score: 0,
    onComplete: null,

    start(lesson, callback) {
        // dynamic generation
        let dynamicQuestions = [];
        if (lesson.generators) {
            lesson.generators.forEach(gen => {
                dynamicQuestions = dynamicQuestions.concat(gen(5)); // Generate 5 of each type
            });
        }

        // Randomize questions
        this.currentQuestions = [...lesson.questions, ...dynamicQuestions]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10); // Take max 10 random questions

        this.currentIndex = 0;
        this.score = 0;
        this.onComplete = callback;

        this.renderQuizFrame();
        this.showQuestion();
    },

    renderQuizFrame() {
        const content = document.getElementById('content-area');
        const template = document.getElementById('quiz-template').content.cloneNode(true);
        content.innerHTML = '';

        template.getElementById('btn-quit-quiz').onclick = () => App.showHome();
        content.appendChild(template);
    },

    showQuestion() {
        if (this.currentIndex >= this.currentQuestions.length) {
            this.finish();
            return;
        }

        const q = this.currentQuestions[this.currentIndex];
        const container = document.getElementById('content-area');

        // Update progress
        const progress = ((this.currentIndex) / this.currentQuestions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('question-text').innerText = q.q;

        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = ''; // Clear previous

        // Randomize options too? Maybe not for now to keep 'a' index correct, 
        // OR map options to preserve original index. 
        // Requirement said "Quiz random order", usually implies question order.
        // Let's keep option order fixed as per data or we need to map indices.
        // For simplicity: fixed option order as defined in Data.

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => this.handleAnswer(index, q.a, btn);
            optionsGrid.appendChild(btn);
        });

        // Hide feedback
        document.getElementById('feedback-area').classList.add('hidden');
    },

    handleAnswer(selectedIndex, correctIndex, btnElement) {
        // Disable all buttons
        const savedBtns = document.querySelectorAll('.option-btn');
        savedBtns.forEach(b => b.disabled = true);

        const isCorrect = selectedIndex === correctIndex;

        if (isCorrect) {
            btnElement.classList.add('correct');
            this.score++;
            document.getElementById('current-quiz-stars').innerText = this.score;
            SoundManager.playCorrect();
        } else {
            btnElement.classList.add('incorrect');
            // Highlight correct one
            savedBtns[correctIndex].classList.add('correct');
            SoundManager.playIncorrect();
        }

        setTimeout(() => {
            this.currentIndex++;
            this.showQuestion();
        }, 1500); // Wait 1.5s then next
    },

    finish() {
        if (this.onComplete) this.onComplete(this.score);
    }
};
