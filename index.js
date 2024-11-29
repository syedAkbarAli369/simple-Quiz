const questions = [
    {
        question: "What is the name of the only man-made object visible from space without magnification?",
        answers: [
            { text:"The Great Wall of China", correct:false},
            { text:"The Palm Islands", correct:false},
            { text:"The Greenhouses of Almería", correct:true},
            { text:"Hoover Dam", correct:false}
        ]
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        answers: [
            { text:"William Shakespear", correct:true},
            { text:"Albert Einstien", correct:false},
            { text:"Isaac Newton", correct:false},
            { text:"Mirza Ghalib", correct:false}
        ]
    },
    {
        question: "Who was the first person to ever go to space?",
        answers: [
            { text:"Buzz Aldrin", correct:false},
            { text:"Neil Armstrong", correct:false},
            { text:"Yuri gagarian", correct:true},
            { text:"Ishtihaq rafiq", correct:false}
        ]
    }
];

const questionElement = document.getElementById("questions");
const ansBtns = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener(
            "click",
            selectAnswer
        )

    })
}

const resetState = () => {
    nextBtn.style.display = "none";
    while(ansBtns.firstChild){
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener(
    "click",
    () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }
        else{
            startQuiz();
        }
    }
)

startQuiz();













