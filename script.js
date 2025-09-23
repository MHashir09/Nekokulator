const calcBody = document.querySelector("#cal-body");
const calcScreen = document.querySelector(".screen");

let leftOperand = '';
let leftOperandNegated = '';
let operator = "";
let rightOperand = '';
let rightOperandNegated = '';
let operatorFlag = 0;
let result = 0;

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
  var buttonContent = button.textContent;
    if (operatorFlag == 0) {
      calcScreen.textContent += buttonContent;
      leftOperand += `${leftOperandNegated}${buttonContent}`;
      leftOperandNegated = '';
    } else {
      calcScreen.textContent += buttonContent;
      rightOperand += `${rightOperandNegated}${buttonContent}`;
      rightOperandNegated = '';
    }
}

function handleOperators(button) {
  var buttonContent = button.textContent;
  if (operatorFlag == 0 && leftOperand == '') {
    calcScreen.textContent += buttonContent;
    leftOperandNegated = buttonContent;
  } else if (operatorFlag == 1) {
    calcScreen.textContent += ' ' + buttonContent;
    rightOperandNegated = buttonContent;
  } else if (operatorFlag == 0) {
    calcScreen.textContent += ' ' + buttonContent;
    operator = buttonContent;
    operatorFlag = 1;
  }
}

function handleSpecialButtons(button) {
  var buttonContent = button.textContent;
  if (buttonContent == '=') {
    calcScreen.textContent = '';
    operate();
    leftOperand = '';
    rightOperand = '';
    operatorFlag = 0;
  } else if (buttonContent == 'AC') {
    leftOperand = '';
    rightOperand = '';
    operatorFlag = 0;
    calcScreen.textContent = '';
  }
}

function handleEventListeners(event) {
  const button = event.target;
  if (!button.matches("button")) return;

  if (button.classList.contains('numbers')) {
    handleNumbers(button);
  } else if (button.classList.contains('operators')) {
    if (leftOperand == '') {
      if (button.textContent == '-') {
        handleOperators(button);
      }
    } else if (operatorFlag == 1 )  {
      if (button.textContent == '-') {
        handleOperators(button);
      }
    } else if (operatorFlag == 0) {
        handleOperators(button);
    }
  } else {
    handleSpecialButtons(button);
  }
}

function operate() {
  if (leftOperand != '' && rightOperand != '') {
    switch (operator) {
      case '+':
        result = findSum(leftOperand, rightOperand);
        break;
      case '-':
        result = findDifference(leftOperand, rightOperand);
        break;
      case 'x':
        result = findProduct(leftOperand, rightOperand);
        break;
      case '/':
        result = findRatio(leftOperand, rightOperand);
        break;
    }
    calcScreen.textContent = result;
  } else {
    calcScreen.textContent = 'SYNTAX ERROR';
  }
  return;
}
