const calcPage = document.querySelector("body");
const calcScreen = document.querySelector(".screen");

let currentNumber = "";
let pendingOperator = "";
let accumulator = null;
let unaryFlag = false;
let resultFlag = false;

calcPage.addEventListener("click", handleButtonEventListeners);
calcPage.addEventListener("keydown", handleKeyboardEventListeners)

function findSum(num1, num2) {
  return +num1 + +num2;
}

function findDifference(num1, num2) {
  return +num1 - +num2;
}

function findProduct(num1, num2) {
  return +num1 * +num2;
}

function findRatio(num1, num2) {
  return +num1 / +num2;
}

function findPercentage(num1, num2) {
  return (+num1 * +num2) / 100;
}

function handleDelete() {
  if (currentNumber != "|") {
    currentNumber = currentNumber.slice(0, -1);
    calcScreen.textContent = calcScreen.textContent.slice(0, -1);
  }

  if (calcScreen.textContent === "") {
     calcScreen.textContent = "|";
  }
}

function handleNumbers(button) {
  const newNumber = button;

  if (newNumber == '.' && currentNumber.includes('.')) return;

  currentNumber += newNumber;
  calcScreen.textContent += newNumber;
}

function handleOperators(button) {
  const newOperator = button;

  if (currentNumber == "" && unaryFlag == false && resultFlag != true) {
    if (newOperator == '-' || newOperator == '+') {
      currentNumber += newOperator;
      calcScreen.textContent += `(${newOperator}`;
      unaryFlag = true;
    }
  } else if (pendingOperator == "") {
    if (unaryFlag == true) calcScreen.textContent += ')'; // to show a closing parenthesis if unary was used
    accumulator = currentNumber;
    pendingOperator = newOperator;
    calcScreen.textContent += " " + pendingOperator + " ";
    currentNumber = "";
    unaryFlag = false;
  } else {
    if (unaryFlag == true) calcScreen.textContent += ')';
    accumulator = calculate(accumulator, pendingOperator, currentNumber);
    pendingOperator = newOperator;
    calcScreen.textContent += " " + pendingOperator + " ";
    currentNumber = "";
    unaryFlag = false;
  }
}

function handleSpecialButtons(button) {
  const buttonContent = button;

  if (buttonContent == "=" || buttonContent == "Enter") {
    accumulator = calculate(accumulator, pendingOperator, currentNumber);

    calcScreen.textContent = (accumulator == 'Infinity') ? 'MATH ERROR' : accumulator;

    currentNumber = "";
    pendingOperator = "";
    accumulator = null;
    unaryFlag = false;
    decimalFlag = false;
    resultFlag = true;
  } else if (buttonContent == "AC") {
    currentNumber = "";
    pendingOperator = "";
    accumulator = null;
    unaryFlag = false;
    decimalFlag = false;
    calcScreen.textContent = "|";
  } else if (buttonContent == "DEL" || buttonContent == "Backspace") {
    if (calcScreen.textContent == '|') return;
    handleDelete();
  }
}

function handleButtonEventListeners(event) {
  const button = event.target;

  if (!button.matches("button")) return;

  const input = button.textContent;
  if (calcScreen.textContent == '|') calcScreen.textContent = '';

  if (resultFlag == true) {
    calcScreen.textContent = '|'; // to clear the screen if user clicks any number
    resultFlag = false;
  }

  if (button.classList.contains("numbers")) {
    handleNumbers(input);
  } else if (button.classList.contains("operators")) {
    handleOperators(input);
  } else {
    handleSpecialButtons(input);
  }
}

function handleKeyboardEventListeners(event) {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '%', 'Enter', 'Backspace'];
  const numberKeys = allowedKeys.slice(0, 10);
  const operatorKeys = allowedKeys.slice(10, 15);
  const specialKeys = allowedKeys.slice(15, 17);
  const key = event.key;

  if (!allowedKeys.includes(key)) return;
  if (calcScreen.textContent == '|') calcScreen.textContent = '';

  if (resultFlag == true) {
    calcScreen.textContent = '|'; // to clear the screen if user clicks any number
    resultFlag = false;
  }

  if (numberKeys.includes(key)) {
    handleNumbers(key);
  } else if (operatorKeys.includes(key)) {
    handleOperators(key);
  } else if (specialKeys.includes(key)) {
    handleSpecialButtons(key);
  }

}

function calculate(accumulator, pendingOperator, currentNumber) {
  switch (pendingOperator) {
    case "+":
      accumulator = findSum(accumulator, currentNumber);
      break;
    case "-":
      accumulator = findDifference(accumulator, currentNumber);
      break;
    case "x":
      accumulator = findProduct(accumulator, currentNumber);
      break;
    case "/":
      accumulator = findRatio(accumulator, currentNumber);
      break;
    case "%":
      accumulator = findPercentage(accumulator, currentNumber);
      break;
    default:
      calcScreen.textContent = "SYNTAX ERROR";
  }
  return accumulator;
}
