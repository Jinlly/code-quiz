//consts for start button trigger
const startbtn = document.getElementById("start-btn")
const introtext = document.getElementById("introtext")
startbtn.addEventListener("click", startGame)

//next button
const nextbtn = document.getElementById("next-btn")
nextbtn.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
})

//finish button
const finishbtnEl = document.getElementById("finishbtn")
finishbtnEl.addEventListener("click", finish)
finishpageEl = document.getElementById("finishpage")

//submit button
const submitbtn = document.getElementById("submit")
submitbtn.addEventListener("click", scorepage, initialstore)
let inputEl = document.getElementById("initialinput")

function initialstore() {
    localStorage.setItem(inputEl)
}

//time element
timeEl = document.getElementById("timer")
timeEl.innerText = "100s"

//final score element
let finalscoreEl = document.getElementById("final-score")


//score page
const scoreEl = document.getElementById("scores")
const initialsInput = document.getElementById("initial-scale")
let scoreListEl = document.querySelector("#score-list");


//function start the game
const questioneContainer = document.getElementById("question-container")

function startGame() {
    introtext.classList.add("hide")
    startbtn.classList.add("hide")
    finishbtnEl.classList.add("hide")
    questioneContainer.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    nextQuestion()
    timer()
}

let secondsLeft = 100;

//function timer

function timer() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = `Timeleft:${secondsLeft}s`;
        if (!((secondsLeft <= 0) || (shuffledQuestions.length > currentQuestionIndex + 1))) {
            clearInterval(timerInterval);
            finish()
        }
    }, 1000);

}

//consts for question element
const questionEl = document.getElementById("question")
const questions = [
    //question0
    {
        question: "what is a js ignore  syntax?",
        answers: [
            { Text: "1. /**/", correct: false },
            { Text: "2. //", correct: true },
            { Text: "3. <!---->", correct: false },
            { Text: "4. <!!>", correct: false },
        ]
    },
    //question1
    {
        question: "Which element holdes the largest font-size by default?",
        answers: [
            { Text: "1. h2", correct: false },
            { Text: "2. h1", correct: true },
            { Text: "3. title", correct: false },
            { Text: "4. p", correct: false },
        ]
    },
    //question2
    {
        question: "Which of the listed can NOT be inclued in an array?",
        answers: [
            { Text: "1. Numbers", correct: false },
            { Text: "2. strings", correct: false },
            { Text: "3. Functions", correct: true },
            { Text: "4. Special Caracters", correct: false },
        ]
    },
    //question3
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            { Text: "1. commmas", correct: false },
            { Text: "2. parentheses", correct: false },
            { Text: "3. quotes", correct: false },
            { Text: "4. curly brackets", correct: true },
        ]
    },
    //question4
    {
        question: "How many columns of a default webpage",
        answers: [
            { Text: "1. 12", correct: true },
            { Text: "2. 10", correct: false },
            { Text: "3. 24", correct: false },
            { Text: "4. 30", correct: false },
        ]
    },
]

let shuffledQuestions, currentQuestionIndex


//function set the qeustion
function nextQuestion() {
    resetState() //clear answers each next question
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(questions) {
    questionEl.innerText = questions.question

    questions.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.Text
        button.classList.add("btn")

        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerbtnEl.appendChild(button)

    })

}

function resetState() {
    nextbtn.classList.add("hide")
    while (answerbtnEl.firstChild) {
        answerbtnEl.removeChild(answerbtnEl.firstChild)
    }
}


//function answer select
const answerbtnEl = document.getElementById("answerbtns")

function selectAnswer(e) {
    const selectedbtn = e.target
    const correct = selectedbtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerbtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextbtn.classList.remove("hide")
    } else {
        finishbtnEl.classList.remove("hide")
    }
}
//answercheck
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

//function finish
finishbtnEl.addEventListener("click", finish)

function finish() {
    introtext.classList.add("hide")
    startbtn.classList.add("hide")
    finishbtnEl.classList.add("hide")
    nextbtn.classList.add("hide")
    questioneContainer.classList.add("hide")
    finishpageEl.classList.remove("hide")
    finalscoreEl.innerText = secondsLeft

}



//function scoreList
const retryEl = document.getElementById("retry")
retryEl.addEventListener("click", restart)
let scoreList = [];

function restart() {
    window.location.reload(true);
}


function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}


function scorepage() {
    introtext.classList.add("hide")
    startbtn.classList.add("hide")
    finishbtnEl.classList.add("hide")
    nextbtn.classList.add("hide")
    questioneContainer.classList.add("hide")
    finishpageEl.classList.add("hide")
    timeEl.classList.add("hide")
    scoreEl.classList.remove("hide")

    scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].inputEl}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }
}