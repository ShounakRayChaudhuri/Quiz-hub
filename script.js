const quizQuestions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], correctAnswer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Cu", "Fe"], correctAnswer: "Au" },
    { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], correctAnswer: "Einstein" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" }
];

let score = 0;
let timeLeft = 60;
let timerInterval;
let answeredQuestions = 0;

document.getElementById("start-button").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    displayAllQuestions();
    startTimer();
}

function displayAllQuestions() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    
    quizQuestions.forEach((questionObj, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");
        
        const questionText = document.createElement("p");
        questionText.innerHTML = `<strong>${index + 1}. ${questionObj.question}</strong>`;
        questionBlock.appendChild(questionText);
        
        const answerButtons = document.createElement("div");
        answerButtons.classList.add("answer-buttons");
        
        questionObj.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("answer-button");
            button.addEventListener("click", function() { checkAnswer(option, questionObj.correctAnswer, button); });
            answerButtons.appendChild(button);
        });
        
        questionBlock.appendChild(answerButtons);
        questionContainer.appendChild(questionBlock);
    });
}

function checkAnswer(selectedOption, correctAnswer, button) {
    if (selectedOption === correctAnswer) {
        score++;
        button.style.backgroundColor = "#00ff00"; 
    } else {
        button.style.backgroundColor = "#ff0000";
    }
    button.disabled = true;
    answeredQuestions++;
    
    if (answeredQuestions === quizQuestions.length) {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML += `
        <h2 style="color: #00ffff; text-shadow: 0 0 10px #00ffff;">Quiz Completed!</h2>
        <p style="color: #fff;">Your Score: ${score} out of ${quizQuestions.length}</p>
    `;
}