const questions = [
    {
        question: "Who sang the title song for the latest Bond film, No Time to Die?",
        answers: [
            {text: "Adele", correct:false},
            {text: "Billie Eilish", correct:true},
            {text: "Sam Smith", correct:false},
            {text: "Alicia Keys", correct:false},

        ]
    },
    {
        question: "Which flies a green, white, and orange (in that order) tricolor flag",
        answers: [
            {text: "Ireland", correct:true},
            {text: "Ivory Coast", correct:false},
            {text: "Italy", correct:false},
            {text: "France", correct:false},

        ]  
    },
    {
        question: "What is the largest lake in the world?",
        answers: [
            {text: "Caspian Sea", correct:false},
            {text: "Baikal", correct:true},
            {text: "Lake Superior", correct:false},
            {text: "Ontario", correct:false},

        ]  
    },
    {
        question: "Which planet in the solar system is known as the “Red Planet",
        answers: [
            {text: "Venus", correct:false},
            {text: "Earth", correct:false},
            {text: "Mars", correct:true},
            {text: "Jupiter", correct:false},

        ]  
    },
    {
        question: "For which of these disciplines Nobel Prize is awarded?",
        answers: [
            {text: "Physics, Chemistry", correct:false},
            {text: "Physiology", correct:false},
            {text: "Medicine", correct:false},
            {text: "All of the above", correct:true},

        ]  
    },
    {
        question: "Entomology is the science that studies:",
        answers: [
            {text: "Behavior of human beings", correct:false},
            {text: "Insects", correct:true},
            {text: "The origin and history of technical and scientific terms", correct:false},
            {text: "The formation of rocks", correct:false},

        ]  
    },
    {
        question: "What is the most popular bread in France?",
        answers: [
            {text: "Brioche", correct:false},
            {text: "Baguette", correct:true},
            {text: "White bread", correct:false},
            {text: "Ciabatta", correct:false},

        ]  
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); // Corrected this line
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    
    })
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = `Play Again`;
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();