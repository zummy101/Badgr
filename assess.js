document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const restartButton = document.getElementById('restart-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let quizQuestions = []; // Array to hold quiz questions

    // Define your quiz questions
    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "London", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false },
                { text: "Berlin", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Venus", correct: false }
            ]
        },
        {
            question: "What is 2 + 2?",
            answers: [
                { text: "3", correct: false },
                { text: "4", correct: true },
                { text: "5", correct: false },
                { text: "6", correct: false }
            ]
        }
        // Add more questions here
    ];

    // Function to start the quiz
    function startQuiz() {
        quizQuestions = shuffleArray(questions); // Randomize question order
        currentQuestionIndex = 0;
        score = 0;
        nextButton.classList.add('hide');
        resultContainer.classList.add('hide');
        questionContainer.classList.remove('hide');
        showQuestion();
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to display a question
    function showQuestion() {
        resetState();
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct; // Store correct status
            }
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    // Function to reset the state for the next question
    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    // Function to handle answer selection
    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === "true";

        if (isCorrect) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('wrong');
        }

        // Disable all buttons after an answer is selected
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add('correct'); // Show correct answer
            }
            button.removeEventListener('click', selectAnswer); // Prevent multiple clicks
            button.disabled = true;
        });

        nextButton.classList.remove('hide');
    }

    // Function to handle the "Next" button click
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    // Function to show quiz results
    function showResult() {
        questionContainer.classList.add('hide');
        nextButton.classList.add('hide');
        resultContainer.classList.remove('hide');
        scoreSpan.innerText = score;
        totalQuestionsSpan.innerText = quizQuestions.length;
    }

    // Function to restart the quiz
    restartButton.addEventListener('click', startQuiz);

    // Initial call to start the quiz when the page loads
    startQuiz();
});