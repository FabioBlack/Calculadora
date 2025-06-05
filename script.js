const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // O número que está sendo digitado
let previousInput = ""; // O número armazenado para o cálculo
let operator = null; // O operador selecionado

// Atualiza o display
function updateDisplay(value) {
  display.textContent = value || "0"; // Exibe "0" se o valor for vazio
}

// Limpa todos os dados da calculadora
function clearCalculator() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

// Realiza o cálculo
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  if (isNaN(num1) || isNaN(num2)) return;

  let result = 0;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Erro";
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay(currentInput);
}

// Adiciona funcionalidade aos botões
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      // Limpar tudo
      clearCalculator();
    } else if (value === "=") {
      // Calcular o resultado
      calculate();
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Armazenar o operador e número anterior
      if (currentInput) {
        if (previousInput && operator) {
          calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else {
      // Adicionar números ou ponto
      if (value === "." && currentInput.includes(".")) return; // Evitar múltiplos pontos
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});
