var title = document.querySelector(".title");
var quizStart = document.querySelector(".quizStart");
var start = document.getElementById("start-Btn");
var quiz = document.querySelector(".quiz");
var question = document.querySelector(".quizQuestion");
var choices = document.querySelector(".answer-choices");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var timeLeft = document.querySelector("#timeRemaining");
var highscoreBtn = document.getElementById("highscore-Btn");
var scoreList = document.querySelector(".scoreList");
var scoreMenu = document.querySelector(".scoreMenu");
var clearScores = document.getElementById("clear-Btn");
var backToTitle = document.getElementById("title-Btn");
var initials = document.getElementById("playerInitials");
var score = document.getElementById("playerScore");
var secondsLeft=75;
var questionNum = 0;

var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choiceA: "Strings",
      choiceB: "Booleans",
      choiceC: "Alerts",
      choiceD: "Numbers",
      answer: "C",
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      choiceA: "Quotes",
      choiceB: "Curly Brackets",
      choiceC: "Parantheses",
      choiceD: "Square Brackets",
      answer: "C",
    },
    {
      question: "String values must be enclosed within _____ when being assigned to variables.",
      choiceA: "Commas",
      choiceB: "Curly Brackets",
      choiceC: "Quotes",
      choiceD: "Parantheses",
      answer: "C",
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choiceA: "Javascript",
      choiceB: "Terminal/Bash",
      choiceC: "For Loops",
      choiceD: "console.log",
      answer: "D",
    },
    {
      question: "Arrays in JavaScript can be used to store ______.",
      choiceA: "Numbers and strings",
      choiceB: "Other arrays",
      choiceC: "Booleans",
      choiceD: "All of the above",
      answer: "D",
    }
  ];



function startQuiz() {
  title.style.display = "none";
  quizStart.style.display = "none";
  quiz.style.display = "block";
  countDown();
  generateQuestion();
}

start.addEventListener('click', startQuiz)


let timerInterval;
function countDown() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeLeft.textContent = secondsLeft;

    if(secondsLeft === 0) {
      alert('Out of time!')
      location.reload();
    }
  }, 500);
}


function generateQuestion() {
  if (questionNum < questions.length) {
    let q = questions[questionNum];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
  } else {
    stopTime();
  }
}

//Quiz output when choice selected is correct or incorrect
function choose(choice) {
  let q = questions[questionNum];
  if (choice == q.answer) {
    questionNum++;
    generateQuestion();
  } else {
    secondsLeft -= 10;
    alert("Incorrect!");
  }
}
//local storage for high scores
function stopTime() {
    clearInterval(timerInterval);
    var highScore = confirm("Time's up! Would you like to save your score?");
  
    if (highScore) {
      localStorage.setItem("playerScore", secondsLeft);
      var initials = prompt("Please enter your initials.");
      localStorage.setItem("playerInitials", initials);
      location.reload();
    } else {
      location.reload();
    }
  }

highscoreBtn.addEventListener('click', function(){
    title.style.display = "none";
    start.style.display = "none";
    scoreList.style.display = "block";
    scoreMenu.style.display = "block";
    playerInitials.innerHTML = localStorage.getItem('playerInitials');
    playerScore.innerHTML = localStorage.getItem('playerScore');
})

backToTitle.addEventListener('click', function(){
    title.style.display= "block";
    start.style.display = "block";
    scoreList.style.display = "none";
    scoreMenu.style.display ="none";
})

clearScores.addEventListener('click', function(){
    localStorage.removeItem('playerScore');
    localStorage.removeItem('playerInitials');
    playerInitials.innerHTML = '';
    playerScore.innerHTML = '';
})

