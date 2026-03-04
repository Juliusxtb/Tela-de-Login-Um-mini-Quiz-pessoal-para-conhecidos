// quiz.js completo e interativo com reinício

// Lista original de perguntas
const originalQuestions = [
    {
        type: "text",
        question: "Qual é o nome completo do Júlio?",
        answer: ["júlio césar de bomfim"]
    },
    {
        type: "single",
        question: "Qual a idade do Júlio?",
        options: ["19", "27", "25", "35", "Nenhuma das alternativas"],
        answer: "25"
    },
    {
        type: "multiple",
        question: "Quais são os hobbys do Júlio?",
        options: ["Jogar bola", "jogar videogame/pc", "dormir", "assistir série", "Todas as alternativas"],
        answer: ["jogar videogame/pc", "dormir", "assistir série"]
    },
    {
        type: "single",
        question: "Qual o nome dos cachorros do Júlio?",
        options: ["Bidu e Rex", "Thor e Max", "Bob e Marley", "Billy e Pingo", "Nix e Lord"],
        answer: "Bob e Marley"
    },
    {
        type: "single",
        question: "Qual a data de Nascimento do Júlio?",
        options: ["01/01/2000", "22/11/2000", "15/08/1999", "30/12/2001", "10/10/2000"],
        answer: "22/11/2000"
    }
];

let questions = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerContainer = document.getElementById("answerContainer");
const nextBtn = document.getElementById("nextBtn");

// Função para embaralhar array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Inicializa quiz
function startQuiz() {
    questions = shuffleArray([...originalQuestions]);
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "block";
    questionEl.style.textAlign = "left";
    loadQuestion();
}

// Carrega pergunta atual
function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answerContainer.innerHTML = "";
    let selectedOptions = [];

    questionEl.style.opacity = 0;
    answerContainer.style.opacity = 0;
    setTimeout(() => {
        questionEl.style.opacity = 1;
        answerContainer.style.opacity = 1;
    }, 200);

    if (q.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "textAnswer";
        input.placeholder = "Digite sua resposta";
        input.classList.add("text-input");
        answerContainer.appendChild(input);
    }

    if (q.type === "single" || q.type === "multiple") {
        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.classList.add("option");
            btn.addEventListener("click", () => {
                if (q.type === "multiple") {
                    btn.classList.toggle("selected");
                    selectedOptions = Array.from(answerContainer.querySelectorAll(".selected")).map(b => b.textContent);
                } else {
                    answerContainer.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");
                    selectedOptions = [btn.textContent];
                }
            });
            answerContainer.appendChild(btn);
        });
    }

    // Listener do botão Próxima
    nextBtn.onclick = () => {
        let correct = false;

        if (q.type === "text") {
            const input = document.getElementById("textAnswer");
            const userAnswer = input.value.trim().toLowerCase();
            if (userAnswer === "") {
                alert("Digite uma resposta antes de continuar!");
                return;
            }
            correct = q.answer.some(ans => ans.toLowerCase() === userAnswer);
        }

        if (q.type === "single") {
            const selected = Array.from(answerContainer.querySelectorAll(".selected")).map(b => b.textContent);
            if (selected.length === 0) {
                alert("Selecione uma alternativa antes de continuar!");
                return;
            }
            correct = selected[0] === q.answer;
        }

        if (q.type === "multiple") {
            const selected = Array.from(answerContainer.querySelectorAll(".selected")).map(b => b.textContent);
            if (selected.length === 0) {
                alert("Selecione pelo menos uma alternativa antes de continuar!");
                return;
            }
            const correctAnswer = q.answer.sort().join(",").toLowerCase();
            const user = selected.sort().join(",").toLowerCase();
            correct = user === correctAnswer;
        }

        if (correct) score++;
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    };
}

// Exibe resultado final
function showResult() {
    answerContainer.innerHTML = "";
    nextBtn.style.display = "none";
    questionEl.style.textAlign = "center";

    if (score === questions.length) {
        questionEl.textContent = `🎉 Parabéns!! Parece que você realmente conhece o Júlio muito bem!!\nVocê acertou todas as ${questions.length} perguntas.`;
    } else {
        questionEl.textContent = `Poxa vida, pelo que parece você não conhece o Júlio tão bem assim em? \nVocê acertou ${score} de ${questions.length} perguntas.`;
        // Botão tentar novamente
        const retryBtn = document.createElement("button");
        retryBtn.textContent = "Tentar novamente";
        retryBtn.classList.add("login");
        retryBtn.style.marginTop = "20px";
        retryBtn.onclick = () => startQuiz();
        answerContainer.appendChild(retryBtn);
    }
}

// Inicia quiz na primeira vez
startQuiz();