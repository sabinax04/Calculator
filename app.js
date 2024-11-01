const calculationDisplay = document.querySelector(".calculation");
const operationDisplay = document.querySelector(".operation");
const inputDisplay = document.querySelector(".input");


let currentInput = "";
let operator = "";
let operand1 = null;

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
   
    if (button.id === "clear" || button.id === "equal" || button.classList.contains("different")) return;
    currentInput += button.textContent; 
    inputDisplay.textContent = currentInput; 
  });
});

document.querySelectorAll(".different").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "clearAll":
        clearAll();
        break;
      case "clear":
        clearLast();
        break;
      case "division":
      case "multiple":
      case "subtraction":
      case "plus":
        setOperator(button.id);
        break;
      case "equal":
        calculate();
        break;
      case "percent":
        applyPercent();
        break;
      case "plus-minus":
        toggleSign();
        break;
      default:
        break;
    }
  });
});


function setOperator(op) {
  if (currentInput === "") return; 
  operand1 = parseFloat(currentInput); 
  operator = op; 
  operationDisplay.textContent = getOperatorSymbol(op); 
  currentInput = ""; 
}

function calculate() {
  if (!operator || currentInput === "") return; 
  let operand2 = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "plus":
      result = operand1 + operand2;
      break;
    case "subtraction":
      result = operand1 - operand2;
      break;
    case "multiple":
      result = operand1 * operand2;
      break;
    case "division":
      result = operand1 / operand2;
      break;
    default:
      return;
  }

  inputDisplay.textContent = result;
  calculationDisplay.textContent = `${operand1} ${operationDisplay.textContent} ${operand2}`; 
  operationDisplay.textContent = `=`; 
  currentInput = result.toString(); 
  operator = ""; 
  operand1 = null; 
}

function clearAll() {
  currentInput = "";
  operator = "";
  operand1 = null;
  inputDisplay.textContent = "";
  operationDisplay.textContent = "";
  calculationDisplay.textContent = "";
}

function clearLast() {
  currentInput = currentInput.slice(0, -1); 
  inputDisplay.textContent = currentInput; 
}

function applyPercent() {
  if (currentInput === "") return; 
  currentInput = (parseFloat(currentInput) / 100).toString(); 
  inputDisplay.textContent = currentInput; 
}

function toggleSign() {
  if (currentInput === "") return; 
  currentInput = (parseFloat(currentInput) * -1).toString(); 
  inputDisplay.textContent = currentInput; 
}

function getOperatorSymbol(op) {
  switch (op) {
    case "plus":
      return "+";
    case "subtraction":
      return "-";
    case "multiple":
      return "×";
    case "division":
      return "÷";
    default:
      return "";
  }
}

document.getElementById("equal").addEventListener("click", calculate);

