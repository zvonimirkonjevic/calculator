let operator = "";
let leftOperand = "";
let rightOperand = "";
let isDecimal = false;

let numberButtons = document.querySelectorAll('#data-number');
let operationButtons = document.querySelectorAll('#data-operation');
let pastScreen = document.querySelector('#pastOperationScreen');
let currentScreen = document.querySelector('#currentOperationScreen');
let equalsButton = document.querySelector('#equalsBtn');
let clearButton = document.querySelector('#clearBtn');
let negateButton = document.querySelector('#negateBtn');
let pointButton = document.querySelector('#pointBtn');

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
    leftOperand = Number(leftOperand);
    rightOperand = Number(rightOperand);
    if(operator === '+'){ return add(leftOperand, rightOperand);}
    if(operator === '-'){ return subtract(leftOperand, rightOperand);}
    if(operator === '÷'){ return divide(leftOperand, rightOperand);}
    if(operator === '×'){ return multiply(leftOperand, rightOperand);}
}

function clear(){
    leftOperand = "";
    rightOperand = "";
    operator = "";
    currentScreen.textContent = "";
    pastScreen.textContent = "";
    isDecimal = false;
}

function negate(){
    if(rightOperand.charAt(0) === '-'){
        rightOperand = rightOperand.slice(1);
    }
    else{
        rightOperand = "-" + rightOperand;
    }
    currentScreen.textContent = rightOperand;
}

function handleNumber(numberDigit){
    if(rightOperand.length <= 7){ rightOperand += numberDigit;}
    if(operator == "="){
        operator = "";
        rightOperand = "";
        rightOperand += numberDigit;
        pastScreen.textContent = "";
    }
    currentScreen.textContent = rightOperand;
}

function handleOperator(operatorSymbol){
    if(operator !== "" && leftOperand != "" && rightOperand != "" && operator !== "="){
        rightOperand = operate(leftOperand, rightOperand, operator);
        currentScreen.textContent = rightOperand;
    }
    operator = operatorSymbol;
    if(rightOperand !== ""){
        leftOperand = rightOperand;
        rightOperand = "";
        isDecimal = false;
    }
    if(leftOperand.slice(leftOperand.length-1) === "."){
        leftOperand += "0";
        currentScreen.textContent += "0";
    }
    if(leftOperand!==""){
        pastScreen.textContent = leftOperand + " " + operator;
    }
}

function handleEquals(){
    if(rightOperand.charAt(0) === "-" && operator === "-"){
        rightOperand = rightOperand.slice(1);
        operator = "+";
        pastScreen.textContent = pastScreen.textContent.replace("-", "+");
    }
    if(operator !== "="){
        pastScreen.textContent += " " + rightOperand;
        rightOperand = operate(leftOperand, rightOperand, operator).toString();
        if(rightOperand.length > 8){ rightOperand = rightOperand.slice(0,8);} 
        currentScreen.textContent = rightOperand;
        operator = "=";
    }
}

function appendPoint(){
    if(rightOperand !== "" && isDecimal === false){
        rightOperand += ".";
        currentScreen.textContent = rightOperand;
        isDecimal = true;
    }
}

function handleBackspace(id){
    currentScreen.textContent = currentScreen.textContent.slice(0,currentScreen.textContent.length-1);
    rightOperand = currentScreen.textContent;
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

equalsButton.addEventListener("click", () => {
    if(leftOperand !== "" && rightOperand !== ""){ handleEquals(); }
});

clearButton.addEventListener("click", () => {
    clear();
});

negateButton.addEventListener("click", () =>{
    if(rightOperand !== "") { negate(); }
});

pointButton.addEventListener("click", () => {
    appendPoint();
});

window.addEventListener("keydown",function(e) {
    if(e.key === "Backspace"){ handleBackspace(e.key); }
});