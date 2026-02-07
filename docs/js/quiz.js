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

        // Update progress
        const progress = ((this.currentIndex) / this.currentQuestions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('question-text').innerText = q.q;

        const optionsGrid = document.getElementById('options-grid');
        const textInputArea = document.getElementById('text-input-area');
        const answerInput = document.getElementById('answer-input');

        // Reset UI
        optionsGrid.innerHTML = '';
        textInputArea.classList.add('hidden');
        optionsGrid.classList.remove('hidden');
        document.getElementById('feedback-area').classList.add('hidden');
        answerInput.value = '';

        if (q.type === 'text') {
            optionsGrid.classList.add('hidden');
            textInputArea.classList.remove('hidden');

            const submitBtn = document.getElementById('btn-submit-answer');
            // Remove old event listeners
            const newBtn = submitBtn.cloneNode(true);
            submitBtn.parentNode.replaceChild(newBtn, submitBtn);

            newBtn.onclick = () => this.handleTextAnswer(answerInput.value, q.a, newBtn, answerInput);

            // Allow Enter key
            answerInput.onkeyup = (e) => {
                if (e.key === 'Enter') newBtn.click();
            };
            answerInput.focus();

        } else {
            q.options.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => this.handleAnswer(index, q.a, btn);
                optionsGrid.appendChild(btn);
            });
        }
    },

    handleTextAnswer(userAnswer, correctAnswer, btnElement, inputElement) {
        btnElement.disabled = true;
        inputElement.disabled = true;

        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = correctAnswer.toLowerCase();

        const isCorrect = normalizedUser === normalizedCorrect;

        if (isCorrect) {
            inputElement.style.borderColor = 'var(--success-color)';
            inputElement.style.color = 'var(--success-color)';
            this.score++;
            document.getElementById('current-quiz-stars').innerText = this.score;
            SoundManager.playCorrect();
        } else {
            inputElement.style.borderColor = 'var(--error-color)';
            inputElement.style.color = 'var(--error-color)';
            SoundManager.playIncorrect();
            // Show correct answer feedback
            const feedback = document.getElementById('feedback-area');
            document.getElementById('feedback-message').innerText = `La respuesta era: ${correctAnswer}`;
            feedback.classList.remove('hidden');

            // Hook up next button for incorrect text answer (special case)
            document.getElementById('btn-next-question').onclick = () => {
                this.currentIndex++;
                this.showQuestion();
            };
            return; // Exit here, let user click Next
        }

        setTimeout(() => {
            this.currentIndex++;
            this.showQuestion();
        }, 1500);
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
