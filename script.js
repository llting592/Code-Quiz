//Declare variables for script.js
var questionSection = document.querySelector("#quizQuestion");
var answerButtons =  [document.querySelector("#ansOne"), document.querySelector("#ansTwo"),
document.querySelector("#ansThree"), document.querySelector("#ansFour")];
var answerText ="";
var quizAnswer = document.querySelector("#ansResult");
var gameFinished = document.querySelector("#gameEnd");
var userInitial = document.querySelector("#userInitials");
var time = 75;
var questionNum = 0;
var scoreArray;
userInitial.value='';
var errorMessage = document.querySelector("#errorAlert");

function quizStart(){
    event.stopPropagation();
    document.querySelector("#title").style= "animation-play-state: running;";
    document.querySelector(".navbar-timer").style= "Time: " + time;

    changeQuestion();

    setTimeout(function(){
        document.querySelector("#title").style = "display: none;";
        document. querySelector("quizQuestions").style= "display: block;";
        document.querySelector("#quizQuestions").className = "slideUp;";
    }, 500);
    
    timeLimit = setInterval(function(){
        time--;
        document.querySelector(".navbar-timer").textContent = "Time: " + time;
        if (time <=0){
            clearInterval(timeLimit);
            showGameEnd();
        }
    }, 500);
}

function showGameEnd(){
    document.querySelector(".navbar-timer").textContent = "Time: " + time;
    if (time != 0){
        document.querySelector("#finalScore").textContent = time;
    }else{
        document.querySelector("#finalScore").textContent = "0";
    }

    if (questionSection.className != "questionFadeOut"){
        questionSection.className = "questionFadeOut";
    }
    setTimeout(function(){
        questionSection.style = "display: none;";
        quizAnswer.style = "display: none;";
        gameFinished.style = "display: block;";
        gameFinished.className = "slideDown";
    }, 500)
}
    

function changeQuestion(){
    var questionPrompt = questions[questionNum];
    if (questionPrompt == undefined){
        clearInterval(timeLimit);
        showGameEnd();
        return;
    }
    setTimeout(function(){
        for (var i=0; i < answerButtons.length; i++){
            answerButtons[i].textContent = i+ 1 +'. ' + questionPrompt.choices[i];
            answerButtons[i].value = questionPrompt[i];
        }
        document.querySelector("#questionText").textContent = questionPrompt.title;
        questionSection.className = "questionFadeIn";
    }, 500);

}

function checkInput(){
    if(event.target.nodeName == "BUTTON"){
        var playerAns = event.target.value;
        if (playerAns){
            if (playerAns === questions[questionNum].answer){
                answerText = "Correct";
            }else{
                answerText = "Incorrect";
                time -=10;
                if (time <=0){
                    time = 0;
                }
            }
        }
    

    quizAnswer.innterHTML = `<hr /> $(answerText)`
    if (quizAnswer.style != "display: block;"){
        quizAnswer.style = "display:block;";
    }
    quizAnswer.className = "answerSlideUp";
    setTimeout(function(){
        quizAnswer.className = "fadeAway";
        setTimeout(function(){
            quizAnswer.style = "display: none;";
        }, 500);
    }, 500);
    quizAnswer.className = "questionFadeOut";
}
questionNum++;
changeQuestion();
}

function submitScore(event){
    event.preventDefault();
    if (userInitial.value.trim() == ''){
        if (errorMessage.style != "display:block;"){
            errorMessage.style = "display:block;";
            setTimeout(function(){
                errorMessage.style = "display: nont";
            },500);
        }
        return;
    }else{
        var newScore = {
            initial: userInitial.value.toUpperCase().trim(),
            score: time
        };
        scoreArray.push(newScore);
        scoreArray.sort(function(a,b){return b.score-a.score});
        localStorage.setItem("localScore", JSOn.stringify(scoreArray));
        window.location.href = "highscore.html"
    }
}

if (localStorage.getItem("localScore")){
    scoreArray = JSOn.parse(localStorage.getItem("localScores"));
} else{
    scoreArray =[];
}

document.querySelector("#quizStart").onclick = quizStart;
document.addEventListener("click", checkInput);
document.querySelector("#submitBtn").onClick = submitScore;

    
    

