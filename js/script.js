const MAX_DIGITS = 7;

let leftOperand = "";
let rightOperand = "";
let operator = "";
let decimalMode = false;

let numberButtons = document.querySelectorAll('#data-number');
let operationButtons = document.querySelectorAll('#data-operation');
let pastScreen = document.querySelector('#pastOperationScreen');
let currentScreen = document.querySelector('#currentOperationScreen');
let equalsButton = document.querySelector('#equalsBtn');
let clearButton = document.querySelector('#clearBtn');
let negateButton = document.querySelector('#negateBtn');
let pointButton = document.querySelector('#pointBtn');

currentScreen.textContent = "";
pastScreen.textContent = "";

// MAIN_FUNCTIONS

function Add(a, b){return a + b;}

function Subtract(a, b){return a - b;}

function Multiply(a, b){return a * b;}

function Divide(a, b){return a / b;}

function Operate(leftOperand, rightOperand, operator)
{
    leftOperand = Number(leftOperand);
    rightOperand = Number(rightOperand);
    switch(operator){
        case "+":
            return Add(leftOperand, rightOperand);
        case "-":
            return Subtract(leftOperand, rightOperand);
        case "×":
            return Multiply(leftOperand, rightOperand);
        case "÷":
            return Divide(leftOperand, rightOperand);
        default:
            break;        
    }
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

// HELPER_FUNCTIONS

function SetOperatorValue(value)
{
    operator = value;
}

function SetLeftOperandValue(value)
{
    leftOperand = value;
}

function AppendValueToLeftOperand(value)
{
    leftOperand += value;
}

function AppendValueToRightOperand(digit)
{
    rightOperand += digit;
}

function SetRightOperandValue(value)
{
    rightOperand = value;
}

function SetScreenValue(screen, text)
{
    screen.textContent = text;
}

function AppendValueToScreen(screen,value)
{
    screen.textContent += value;
}

function IsLengthInRange(variable)
{
    return variable.length <= MAX_DIGITS;
}

function IsNumber(key)
{
    return key == '' || !isNaN(key - 0);
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