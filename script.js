const calcBody = document.querySelector("#cal-body");
const calcScreen = document.querySelector(".screen");

let currentNumber = "";
let pendingOperator = "";
let accumulator = null;
let unaryFlag = false;
let resultFlag = false;

calcBody.addEventListener("click", handleEventListeners);

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

function handleNumbers(button) {
  const newNumber = button.textContent;

  if (resultFlag == true) {
    calcScreen.textContent = ''; // to clear the screen if user clicks any number
    resultFlag = false;
  }

  if (newNumber == '.' && currentNumber.includes('.')) return;

  currentNumber += newNumber;
  calcScreen.textContent += newNumber;
}

function handleOperators(button) {
  const newOperator = button.textContent;

  if (currentNumber == "" && unaryFlag == false) {
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
  const buttonContent = button.textContent;

  if (buttonContent == "=") {
    accumulator = calculate(accumulator, pendingOperator, currentNumber);
    (accumulator == 'Infinity') ? calcScreen.textContent = 'MATH ERROR' : calcScreen.textContent = accumulator;
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
    calcScreen.textContent = "";
  }
}

function handleEventListeners(event) {
  const button = event.target;
  if (!button.matches("button")) return;

  if (button.classList.contains("numbers")) {
    handleNumbers(button);
  } else if (button.classList.contains("operators")) {
    handleOperators(button);
  } else {
    handleSpecialButtons(button);
  }
}

function calculate(accumulator, pendingOperator, currentNumber) {
  if (pendingOperator != "" && currentNumber != "") {
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
    }
  } else {
    calcScreen.textContent = "SYNTAX ERROR";
  }
  return accumulator;
}
