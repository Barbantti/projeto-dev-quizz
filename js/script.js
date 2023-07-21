// Variable
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const scoreContainerZero = document.querySelector("#score-container-zero");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Questions
const questions = [
  {
    question: "PHP foi desenvolvido para qual finalidade?",
    answers: [
      {
        answer: "back-end",
        correct: true,
      },
      {
        answer: "front-end",
        correct: false,
      },
      {
        answer: "Sistema operacional",
        correct: false,
      },
      {
        answer: "Banco de dados",
        correct: false,
      },
    ],
  },
  {
    question: "Uma forma de declarar variável em JavaScript:",
    answers: [
      {
        answer: "$var",
        correct: false,
      },
      {
        answer: "var",
        correct: true,
      },
      {
        answer: "@var",
        correct: false,
      },
      {
        answer: "#let",
        correct: false,
      },
    ],
  },
  {
    question: "Qual o seletor de id no CSS?",
    answers: [
      {
        answer: "#",
        correct: true,
      },
      {
        answer: ".",
        correct: false,
      },
      {
        answer: "@",
        correct: false,
      },
      {
        answer: "/",
        correct: false,
      },
    ],
  },
];

// Quizz replacement for the first question
function init() {
  //create first question
  createQuestion(0);
}

// Creating question
function createQuestion(i) {
  // Clear previous question
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // Change text question
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;
  console.log("[i]:", questionText.textContent);
  console.log("i+1:", questionNumber.textContent);
  // Insert alternatives
  questions[i].answers.forEach(function (answer, i) {
    // Create template quizz button
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // Remove hide and class template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insert window question alternative
    answersBox.appendChild(answerTemplate);

    // Insert event click button
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this);
    });
  });
  // Increment question number
  actualQuestion++;
}

// Checking user answer
function checkAnswer(btn) {
  // Select all buttons
  const buttons = answersBox.querySelectorAll("button");

  // Checking if answer is correct and add buttons class
  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");

      // Check if user got the question right
      if (btn === button) {
        // Points increment
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  // Show next question
  nextQuestion();
}

function nextQuestion() {
  // Time for user verify answer
  setTimeout(function () {
    // Check if there are still questions
    if (actualQuestion >= questions.length) {
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1000);
}

// Show final screen

function showSuccessMessage() {
  hideOrShowQuizz();

  // Change data from successful screen

  // Calculate final score
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  // Change number of correctly answers
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// Hide or show quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Restarting quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {
  // Redefining default values
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// Starting quizz
init();
