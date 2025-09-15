function findSum(num1, num2) {
  return num1 + num2;
}
function findDifference(num1, num2) {
  return num1 - num2;
}
function findProduct(num1, num2) {
 return num1 * num2;
}
function findRatio(num1, num2) {
  return num1 / num2;
}


let leftOperand = +prompt('Enter value of left operand');
let rightOperand = +prompt('Enter value of right operand');
let operator = prompt('Enter which operation you want to do (+, -, /)');

let result = operate(leftOperand, rightOperand, operator);

console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);

function operate(leftOperand, rightOperand, operator) {
  let returnValue = 0;

  switch(operator) {
    case '-':
    returnValue = findDifference(leftOperand, rightOperand);
    break;

    case 'x':
    returnValue = findProduct(leftOperand, rightOperand);
    break;

    case '/':
    returnValue = findRatio(leftOperand, rightOperand);
    break;

    case '+':
    returnValue = findSum(leftOperand, rightOperand);
    break;
  }

  return returnValue;
}

