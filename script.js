// Pontuação inicial
let pontos = 0;

// Referências aos elementos HTML
const quizForm = document.getElementById("quizForm");
const resultDiv = document.getElementById("result");
const pontuacao = document.getElementById("pontuacao");
const mensagemResultado = document.getElementById("mensagemResultado");
const button = document.querySelector("#quizForm button[type='button']");
const resetButton = document.querySelector("#quizForm button[type='button']:last-child");
const refazerButton = document.getElementById("refazerButton");

// Array para armazenar as atitudes sustentáveis
let atitudes = [];

// Função para ler as atitudes do arquivo de texto
function lerAtitudes(arquivo) {
  fetch(arquivo)
    .then(response => response.text())
    .then(data => {
      atitudes = data.split("\n").map(atitude => atitude.trim());
      criarPerguntas();
    })
    .catch(error => {
      console.log("Ocorreu um erro ao ler o arquivo de atitudes:", error);
    });
}

// Função para criar as perguntas com base nas atitudes lidas do arquivo
function criarPerguntas() {
  const quizContainer = document.getElementById("quizContainer");

  atitudes.forEach(function (atitude, index) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "atitude" + index;
    checkbox.value = 1;
    checkbox.name = "atitude";
    
    const label = document.createElement("label");
    label.setAttribute("for", "atitude" + index);
    label.textContent = atitude;
    
    quizContainer.appendChild(checkbox);
    quizContainer.appendChild(label);
    quizContainer.appendChild(document.createElement("br"));
  });
  
  // Exibir o botão de cálculo após criar as perguntas
  button.style.display = "block";
}

// Função para realizar o teste
function calcularPontuacao() {
  // Desabilitar o botão de cálculo durante o teste
  button.disabled = true;

  const checkboxes = quizForm.querySelectorAll("input[type='checkbox']:checked");
  checkboxes.forEach(function (checkbox) {
    pontos += parseInt(checkbox.value);
  });

  // Exibir a pontuação e a mensagem de resultado
  pontuacao.textContent = "Sua pontuação em atitudes sustentáveis é: " + pontos;
  exibirMensagemResultado(pontos);

  // Esconder o formulário do teste e exibir a div de resultado
  quizForm.style.display = "none";
  resultDiv.style.display = "block";

  // Exibir o botão de refazer o teste
  refazerButton.style.display = "block";
}

// Função para exibir a mensagem de resultado
function exibirMensagemResultado(pontos) {
  let mensagem = "";
  if (pontos < 10) {
    mensagem = "Você precisa melhorar seu comportamento sustentável.";
  } else if (pontos >= 10 && pontos <= 15) {
    mensagem = "Você está no caminho para ser mais sustentável.";
  } else {
    mensagem = "Parabéns! Você realiza ações sustentáveis.";
  }
  mensagemResultado.textContent = mensagem;
}

// Função para reiniciar o teste
function resetTeste() {
  // Reiniciar pontuação e redefinir elementos HTML
  pontos = 0;
  quizForm.reset();

  // Exibir o formulário do teste e esconder a div de resultado
  quizForm.style.display = "block";
  resultDiv.style.display = "none";

  // Habilitar o botão de cálculo e desabilitar o botão de refazer o teste
  button.disabled = false;
  refazerButton.style.display = "none";
}

// Ler as atitudes do arquivo de texto ao carregar a página
window.addEventListener("DOMContentLoaded", function() {
  lerAtitudes("atitudes.txt");
});
