const page = document.querySelector("body");
const title = document.querySelector("title");
const landingPageSection = document.querySelector("#landing-page");
const nekulatorSection = document.querySelector("#nekulator");
const main = document.querySelector("main");
const calcScreen = document.querySelector(".screen");

let currentOperand = "";
let pendingOperator = "";
let accumulator = null;
let unaryFlag = false;
let resultFlag = false;
let currentTheme = "light";

page.addEventListener("click", handleButtonEventListeners);
page.addEventListener("keydown", handleKeyboardEventListeners);

// >>> Functions To Perform Calculations <<<

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

function calculate(accumulator, pendingOperator, currentOperand) {
  switch (pendingOperator) {
    case "+":
      accumulator = findSum(accumulator, currentOperand);
      break;
    case "-":
      accumulator = findDifference(accumulator, currentOperand);
      break;
    case "x":
      accumulator = findProduct(accumulator, currentOperand);
      break;
    case "/":
      accumulator = findRatio(accumulator, currentOperand);
      break;
    case "%":
      accumulator = findPercentage(accumulator, currentOperand);
      break;
  }
  return accumulator;
}

// >>> Primary Functions To Handle Core Functionality <<<

function handleButtonEventListeners(event) {
  const button = event.target;

  if (!button.matches("button")) return;

  const input = button.textContent;

  if (resultFlag == true) {
    calcScreen.textContent = "|"; // to clear the screen if user clicks any number
    resultFlag = false;
  }

  if (button.classList.contains("numbers")) {
    handleNumbers(input);
  } else if (button.classList.contains("operators")) {
    handleOperators(input);
  } else if (button.classList.contains("special-buttons")) {
    handleSpecialButtons(input);
  } else if (button.classList.contains("switch-theme")) {
    changeTheme();
  } else {
    title.textContent = "Nekulator ✿˚₊";
    landingPageSection.classList.toggle("hidden");
    main.style.height = "100vh";
    nekulatorSection.classList.toggle("hidden");
  }
}

function handleKeyboardEventListeners(event) {
  const allowedKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","x","/","%","Enter","Backspace"];
  const numberKeys = allowedKeys.slice(0, 10);
  const operatorKeys = allowedKeys.slice(10, 15);
  const specialKeys = allowedKeys.slice(15, 17);
  const key = event.key;

  if (!allowedKeys.includes(key)) return;

  if (resultFlag == true) {
    calcScreen.textContent = "|"; // to clear the screen if user clicks any number
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

// >>> Secondary Functions To Support Primary Functions <<<

function handleNumbers(button) {
  const newNumber = button;

  if (calcScreen.textContent == "|") calcScreen.textContent = "";
  if (newNumber == "." && currentOperand.includes(".")) return;

  currentOperand += newNumber;
  calcScreen.textContent += newNumber;
}

function handleOperators(button) {
  const newOperator = button;

  if (currentOperand == "" && unaryFlag == false && resultFlag != true) {
    if (newOperator == "-" || newOperator == "+") {
      if (calcScreen.textContent == "|") calcScreen.textContent = "";
      currentOperand += newOperator;
      calcScreen.textContent += `(${newOperator}`;
      unaryFlag = true;
    }
  } else if (pendingOperator == "") {
    if (unaryFlag == true) calcScreen.textContent += ")"; // to show a closing parenthesis if unary was used
    accumulator = currentOperand;
    pendingOperator = newOperator;
    calcScreen.textContent += " " + pendingOperator + " ";
    currentOperand = "";
    unaryFlag = false;
  } else {
    if (unaryFlag == true) calcScreen.textContent += ")";
    accumulator = calculate(accumulator, pendingOperator, currentOperand);
    pendingOperator = newOperator;
    calcScreen.textContent += " " + pendingOperator + " ";
    currentOperand = "";
    unaryFlag = false;
  }
}

function handleSpecialButtons(button) {
  const buttonContent = button;
  if (calcScreen.textContent == "|") return;

  if (buttonContent == "=" || buttonContent == "Enter") {
    handleEqualsButton();
  } else if (buttonContent == "AC") {
    handleAcButton();
  } else if (buttonContent == "DEL" || buttonContent == "Backspace") {
    handleDelete();
  }
}

function changeTheme() {
  switch (currentTheme) {
    case "light":
      page.classList.remove("light-theme");
      page.classList.add("dark-theme");
      currentTheme = "dark";
      break;
    case "dark":
      page.classList.remove("dark-theme");
      page.classList.add("light-theme");
      currentTheme = "light";
      break;
  }
}

// >>> Helper Functions To support Secondary Functions <<<

function handleEqualsButton() {
  accumulator = calculate(accumulator, pendingOperator, currentOperand);

  if (accumulator == null || Number.isNaN(accumulator)) {
    calcScreen.textContent = "SYNTAX ERROR";
  } else if (accumulator == "Infinity") {
    calcScreen.textContent = "MATH ERROR";
  } else {
    calcScreen.textContent = accumulator;
  }

  currentOperand = "";
  pendingOperator = "";
  accumulator = null;
  unaryFlag = false;
  resultFlag = true;
}

function handleAcButton() {
  currentOperand = "";
  pendingOperator = "";
  accumulator = null;
  unaryFlag = false;
  calcScreen.textContent = "|";
}

function handleDelete() {
  currentOperand = currentOperand.slice(0, -1);
  calcScreen.textContent = calcScreen.textContent.slice(0, -1);

  if (calcScreen.textContent === "") {
    calcScreen.textContent = "|";
  }
}
