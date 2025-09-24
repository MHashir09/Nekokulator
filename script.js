const calcBody = document.querySelector("#cal-body");
const calcScreen = document.querySelector(".screen");

let leftOperand = "";
let operator = "";
let rightOperand = "";
let result = "";
let sciMode = false;
let errorState = false; // NEW: prevents typing after "SYNTAX ERROR"

// ✅ Math operations
function operate() {
  const num1 = parseFloat(leftOperand);
  const num2 = parseFloat(rightOperand);

  if (isNaN(num1) || isNaN(num2)) {
    calcScreen.textContent = "SYNTAX ERROR";
    errorState = true;
    return;
  }

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "/":
      result = num2 === 0 ? "SYNTAX ERROR" : num1 / num2;
      if (result === "SYNTAX ERROR") errorState = true;
      break;
    default:
      result = "SYNTAX ERROR";
      errorState = true;
  }

  calcScreen.textContent = result;
  leftOperand = result.toString();
  rightOperand = "";
  operator = "";
}

// ✅ Handle numbers
function handleNumbers(button) {
  if (errorState) return; // prevent typing after error

  const value = button.textContent;

  if (!operator) {
    leftOperand += value;
    calcScreen.textContent = leftOperand;
  } else {
    rightOperand += value;
    calcScreen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
  }
}

// ✅ Handle operators
function handleOperators(button) {
  if (errorState) return;

  const value = button.textContent;

  // Allow negative number at start
  if (!leftOperand && value === "-") {
    leftOperand = "-";
    calcScreen.textContent = leftOperand;
    return;
  }

  // Allow negative right operand
  if (operator && !rightOperand && value === "-") {
    rightOperand = "-";
    calcScreen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    return;
  }

  if (leftOperand) {
    operator = value;
    calcScreen.textContent = `${leftOperand} ${operator}`;
  }
}

// ✅ Handle special buttons
function handleSpecialButtons(button) {
  const value = button.textContent;

  if (value === "AC") {
    leftOperand = "";
    rightOperand = "";
    operator = "";
    result = "";
    errorState = false;
    calcScreen.textContent = "";
  }

  if (value === "DEL") {
    if (errorState) return; // can’t delete error
    if (rightOperand) {
      rightOperand = rightOperand.slice(0, -1);
      calcScreen.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    } else if (operator) {
      operator = "";
      calcScreen.textContent = leftOperand;
    } else {
      leftOperand = leftOperand.slice(0, -1);
      calcScreen.textContent = leftOperand;
    }
  }

  if (value === "SCI") {
    sciMode = !sciMode;
    calcScreen.textContent = sciMode
      ? "SCI MODE ON (sin, cos, tan...)"
      : "";
  }
}

// ✅ Handle equals
function handleEquals() {
  if (errorState) return;
  if (leftOperand && operator && rightOperand) {
    operate();
  }
}

// ✅ Event Listener
calcBody.addEventListener("click", (event) => {
  const button = event.target;
  if (!button.matches("button")) return;

  if (button.classList.contains("numbers")) {
    handleNumbers(button);
  } else if (button.classList.contains("operators")) {
    handleOperators(button);
  } else if (button.classList.contains("equals-button")) {
    handleEquals();
  } else {
    handleSpecialButtons(button);
  }
});
