let btnStart = document.querySelector(".start-quiz");
let infoBox = document.querySelector(".info-box");
let infoExit = document.querySelector(".info-exit");
let infoContinue = document.querySelector(".info-continue");
let quizBox = document.querySelector(".quiz-box");
let quizBoxNext = document.querySelector(".quiz-box-next");
let textNum = document.querySelector(".text-num");
let eleLine = document.querySelector(".line-timer");
let timerText = document.querySelector(".timer-text");
let resultBox = document.querySelector(".result-box");
let quitResult = document.querySelector(".quit-result");
let replayResult = document.querySelector(".replay-result");

// click on btn start quiz
btnStart.addEventListener("click", () => {
    infoBox.classList.add("info-box-active")
});

// click on btn info exit
infoBox.addEventListener("click", () => {
    infoBox.classList.remove("info-box-active")
});

// click on btn info continue
infoContinue.addEventListener("click", () => {
    infoBox.classList.remove("info-box-active");
    quizBox.classList.add("quiz-box-active");
    changeQuiz(0)
    totalQuiz(1)
    startTimer(15)
    lineTimer(0) 
    quizBoxNext.style.display = "none"
});

let num = 0;
let num2 = 1;
let counter;
let counter2;
let timerValue = 15;
let lineValue = 0;
let score= 0

// click on btn next quiz
quizBoxNext.addEventListener("click", () => {
    if (num < questions.length - 1) {
        num++
        num2++
        changeQuiz(num)
        totalQuiz(num2)
        clearInterval(counter)
        startTimer(timerValue)
        clearInterval(counter2)
        lineTimer(lineValue) 
        quizBoxNext.style.display = "none"
    }else {
        showResultBox()
    }
})


function changeQuiz(index) {
    let quizTitle = document.querySelector(".quiz-text");
    let quizOptions = document.querySelector(".quiz-options");
    quizTitle.innerHTML = `${questions[index].num}. ${questions[index].question}`;
    quizOptions .innerHTML = `
        <div class="option">
            <span>${questions[index].options[0]}</span>
        </div>
        <div class="option">
            <span>${questions[index].options[1]}</span>
        </div>
        <div class="option">
            <span>${questions[index].options[2]}</span>
        </div>
        <div class="option">
            <span>${questions[index].options[3]}</span>
        </div>
    `
    let options = document.querySelectorAll(".option");
    options.forEach((option) => {
        option.setAttribute("onclick", "clickOption(this)")
    });
};

// element icon correct and wrong
let correctIcon = '<i class="fa-solid fa-check correct"></i>';
let wrongIcon = '<i class="fa-solid fa-xmark wrong"></i>'


function clickOption(option) {
    clearInterval(counter)
    clearInterval(counter2)
    let answerOption = option.querySelectorAll("span")[0];
    let mainAnswer = questions[num].answer;
    if (answerOption.innerHTML == mainAnswer) {
        score += 1
        option.classList.add("option-correct");
        option.innerHTML += correctIcon;

        let options = document.querySelectorAll(".option");
        options.forEach((option) => {
        option.classList.add("disable")
        });

    }else {
        option.classList.add("option-wrong");
        option.innerHTML += wrongIcon;

        // loop all options because show correct option
        let options = document.querySelectorAll(".option");
        options.forEach((option) => {
        option.classList.add("disable");
        if (option.firstElementChild.innerHTML == mainAnswer) {
            option.classList.add("option-correct");
            option.innerHTML += correctIcon;
        }
        });
    }

    quizBoxNext.style.display = "block"
};


function showResultBox() {
    infoBox.classList.remove("info-box-active");
    quizBox.classList.remove("quiz-box-active");
    resultBox.classList.add("result-box-active");
    let scoreText = document.querySelector(".score-text");
    if (score > 3) {
        scoreText.innerHTML = `and congrats! you got <span>${score}</span> out of <span>${questions.length}</span>`
    }else if (score > 1) {
        scoreText.innerHTML = `and nice you got <span>${score}</span> out of <span>${questions.length}</span>`
    }else {
        scoreText.innerHTML = `and sorry you got <span>${score}</span> out of <span>${questions.length}</span>`
    }
};

quitResult.addEventListener("click", () => {
    window.location.reload()
});

replayResult.addEventListener("click", () => {
    quizBox.classList.add("quiz-box-active");
    resultBox.classList.remove("result-box-active");
    let num = 0;
    let num2 = 1;
    let counter;
    let counter2;
    let timerValue = 15;
    let lineValue = 0;
    let score= 0
    changeQuiz(num)
    totalQuiz(num2)
    clearInterval(counter)
    startTimer(timerValue)
    clearInterval(counter2)
    lineTimer(lineValue) 
    quizBoxNext.style.display = "none"

})

// timer quiz
function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        textNum.innerHTML = time;
        time--
        if (time < 9) {
            textNum.innerHTML = `0${time}`;
        }
        if (time < 0 ) {
            clearInterval(counter);
            textNum.innerHTML = `00`;
            timerText.innerHTML = "Time off"
             // loop all options because show correct option
            let mainAnswer = questions[num].answer;
            let options = document.querySelectorAll(".option");
            options.forEach((option) => {
            option.classList.add("disable");
            if (option.firstElementChild.innerHTML == mainAnswer) {
                option.classList.add("option-correct");
                option.innerHTML += correctIcon;
            }
            });
            quizBoxNext.style.display = "block"
        }
    }
}


function lineTimer(value) {
    counter2 = setInterval(line, 27)
    function line() {
        value += 1;
        eleLine.style.width = `${value}px`;
        
        if (value > 549) {
            clearInterval(counter2)
        }
    }
}

function totalQuiz(index) {
    let totalQue = document.querySelector(".total-que");
    totalQue.innerHTML = `<p><span>${index}</span> of <span>${questions.length}</span> questions</p>`
}


