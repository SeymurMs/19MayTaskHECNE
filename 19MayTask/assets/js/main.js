var answer = [];
fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    return response.json();
  })
  .then((quizFlags) => {
    for (let i = 0; i < 5; i++) {
      let random = quizFlags[Math.floor(Math.random() * quizFlags.length)];
      let item = quizFlags.find((f) => f.name.common == random.name.common);
      answer[answer.length] = item;
      for (let j = 0; j < 3; j++) {
        let anw = quizFlags[Math.floor(Math.random() * quizFlags.length)];
        answer[answer.length] = anw;
      }
      answer[Math.floor(Math.random() * answer.length)];
      answer = randomCountries(answer);

      rowId.innerHTML += `<div id="question-container" class="hide">
          <div id="question"><img src="${random.flags.png}" alt=""></div>
          <div id="answer-buttons" class="btn-grid">
            <button class="btn">${answer[0].name.common}</button>
            <button class="btn">${answer[1].name.common}</button>
            <button class="btn">${answer[2].name.common}</button>
            <button class="btn">${answer[3].name.common}</button>
          </div>
        `;

      answer = [];
    }
  });

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  const questionContainerElement = document.getElementById("question-container");
  startButton.classList.add("hide");
  shuffledQuestions = answer.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// var groceries = [
//     'milk',
//     'coriander',
//     'cucumber',
//     'eggplant'
//     ]
//     let mygroceries = groceries[Math.floor(Math.random() * groceries.length)]
//     console.log(mygroceries)

// let submit  = document.querySelector(".btn");
// submit.addEventListener("click", function () {
//     let answer = document.querySelectorAll(".anw")
//     answer.forEach(anw=>{
//         if (anw.checked == true) {
//         }
//     })
// })

function randomCountries(ans) {
  return [...ans].sort(() => (Math.random() > 0.5 ? 1 : -1));
}
