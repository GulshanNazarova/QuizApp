const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timeCount = document.querySelector(".timer .second");
const quizOver =document.querySelector(".complete_text");
const quizBox = document.querySelector(".quiz_box");
const  resultBox = document.querySelector(".result_box");


let counter;

startButton.onclick = () =>{
  startTimer(10);
};

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer (){
    timeCount.textContent = time;
    time--;
    if(time < 0){ 
      clearInterval(counter);
      SonucEkrani(); //sonuç ekranını göster
      }
    }
  };

  function SonucEkrani(){
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show result box
};

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'what was written on the ring?',
    answers: [
      { text: 'Ash nazg durbatulûk, ash nazg gimbatul,Ash nazg thrakatulûk agh burzum-ishi krimpatul', correct: true },
      { text: 'Ash nazg thrakatulûk agh burzum-ishi krimpatul', correct: false },
      { text: 'Ash nazg durbatulûk, ash nazg gimbatul', correct: false },
      { text: 'Ash nazg thrakatulûk agh burzum-ishi krimpatul,Ash nazg durbatulûk, ash nazg gimbatul', correct: false }
    ]
  },

]