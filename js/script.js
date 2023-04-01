let operator = "";
let leftOperand = "";
let rightOperand = "";

let numberButtons = document.querySelectorAll('#data-number');

let operationButtons = document.querySelectorAll('#data-operation');

let pastOperationScreen = document.querySelector('#pastOperationScreen');

let currentOperationScreen = document.querySelector('#currentOperationScreen');

let equalsButton = document.querySelector('#equalsBtn');

let clearButton = document.querySelector('#clearBtn');

let negateButton = document.querySelector('#negateBtn');

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(leftOperand, rightOperand, operator){
    leftOperand = parseInt(leftOperand);
    rightOperand = parseInt(rightOperand);
    if(operator === '+'){ return add(leftOperand, rightOperand);}
    if(operator === '-'){ return subtract(leftOperand, rightOperand);}
    if(operator === '÷'){ return divide(leftOperand, rightOperand);}
    if(operator === '×'){ return multiply(leftOperand, rightOperand);}
}

function clear(){
    leftOperand = "";
    rightOperand = "";
    operator = "";
    currentOperationScreen.textContent = "";
    pastOperationScreen.textContent = "";
}

function negate(){
    if(rightOperand.charAt(0) === '-'){
        rightOperand = rightOperand.slice(1);
    }
    else{
        rightOperand = "-" + rightOperand;
    }
    currentOperationScreen.textContent = rightOperand;
}

function handleNumber(digit){
    if(rightOperand.length <= 7){ rightOperand += digit;}
    currentOperationScreen.textContent = rightOperand;
}

function handleOperator(op){
    operator = op;
    leftOperand = rightOperand;
    pastOperationScreen.textContent = leftOperand + " " + operator;
    rightOperand = "";
}

function handleEquals(){
    pastOperationScreen.textContent += " " + rightOperand;
    currentOperationScreen.textContent = "";
    rightOperand = operate(leftOperand, rightOperand, operator).toString();
    currentOperationScreen.textContent = rightOperand;
}

numberButtons.forEach((button, index) => {
    button.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
    });
});

operationButtons.forEach((button, index) => {
    button.addEventListener("click", function(e) {
        handleOperator(e.target.textContent);
    });
});

equalsButton.addEventListener("click", function(e) {
    handleEquals();
});

clearButton.addEventListener("click", function(e) {
    clear();
});
