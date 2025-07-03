
const questions = [
  {
    q: "O que você prefere fazer no tempo livre?",
    options: [
      { text: "Ler um livro", type: "logica" },
      { text: "Ver um filme", type: "emocional" },
      { text: "Criar algo", type: "criativa" },
      { text: "Resolver desafios", type: "estrategica" }
    ]
  },
  {
    q: "Escolha uma palavra:",
    options: [
      { text: "Análise", type: "logica" },
      { text: "Inspiração", type: "criativa" },
      { text: "Conexão", type: "emocional" },
      { text: "Tática", type: "estrategica" }
    ]
  },
  {
    q: "Qual dessas te representa melhor?",
    options: [
      { text: "Mente clara", type: "logica" },
      { text: "Coração quente", type: "emocional" },
      { text: "Mãos criativas", type: "criativa" },
      { text: "Olhar estratégico", type: "estrategica" }
    ]
  }
];

let current = 0;
let scores = {
  logica: 0,
  emocional: 0,
  criativa: 0,
  estrategica: 0
};

function load() {
  const q = questions[current];
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  quiz.innerHTML = "<p>" + q.q + "</p>";
  result.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt.text;
    btn.onclick = () => select(opt.type);
    quiz.appendChild(btn);
  });
}

function select(type) {
  scores[type]++;
  document.getElementById("next").style.display = "inline-block";
}

function next() {
  document.getElementById("next").style.display = "none";
  current++;
  if (current < questions.length) {
    load();
  } else {
    showResult();
  }
}

function showResult() {
  const result = document.getElementById("result");
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";
  let max = "";
  let maxVal = 0;
  for (let key in scores) {
    if (scores[key] > maxVal) {
      maxVal = scores[key];
      max = key;
    }
  }
  const tipos = {
    logica: "🧠 Mente Lógica: Você adora pensar com clareza e resolver problemas.",
    emocional: "💖 Mente Emocional: Você sente tudo com intensidade. Age com o coração.",
    criativa: "🎨 Mente Criativa: Sua mente vê arte, ideias e novas possibilidades em tudo.",
    estrategica: "♟️ Mente Estratégica: Você planeja, calcula e pensa sempre no próximo passo."
  };
  result.textContent = tipos[max];
  document.getElementById("restart").style.display = "inline-block";
}

function restart() {
  current = 0;
  for (let key in scores) scores[key] = 0;
  document.getElementById("restart").style.display = "none";
  load();
}

window.onload = load;
