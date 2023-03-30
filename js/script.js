let operator = "";
let leftOperand = "";
let rightOperand = "";

let numberButtons = document.querySelectorAll('#data-number');

let operationButtons = document.querySelectorAll('#data-operation');

let pastOperationScreen = document.querySelector('#pastOperationScreen');

let currentOperationScreen = document.querySelector('#currentOperationScreen');

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
    if(operator === '+'){ return add(leftOperand, rightOperand);}
    if(operator === '-'){ return subtract(leftOperand, rightOperand);}
    if(operator === '÷'){ return divide(leftOperand, rightOperand);}
    if(operator === '×'){ return multiply(leftOperand, rightOperand);}
}

function handleNumber(digit){
    if(rightOperand.length <= 7){ rightOperand += digit;}
    currentOperationScreen.textContent = rightOperand;
}