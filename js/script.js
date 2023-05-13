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

function HandleNumber(numberDigit)
{
    if(IsLengthInRange(rightOperand))
    {
        AppendValueToRightOperand(numberDigit);
    }
    HandleInputAfterEquals(numberDigit);
    SetScreenValue(currentScreen, rightOperand);
}

function HandleOperator(operatorSymbol)
{
    HandleOperatorAfterOperator();
    SetOperatorValue(operatorSymbol);
    if(rightOperand !== "")
    {
        SetLeftOperandValue(rightOperand);
        SetRightOperandValue("");
        decimalMode = false;
    }
    HandleEmptyFractional();
    if(leftOperand !== "")
    {
        SetScreenValue(pastScreen, leftOperand + " " + operator);
    }
}

function HandleEquals()
{
    HandleDoubleNegation();
    HandleEmptyFractional();
    if(operator !== "=")
    {
        SetScreenValue(pastScreen, "");
        SetScreenValue(pastScreen, leftOperand + " " + operator + " " + rightOperand);
        SetRightOperandValue(Operate(leftOperand, rightOperand, operator).toString());
        if(!IsLengthInRange(rightOperand))
        {
            SetRightOperandValue(rightOperand.slice(0, 8));
        }
        SetScreenValue(currentScreen, rightOperand);
        SetOperatorValue("=");
    }
}

function Negate()
{
    if(rightOperand.charAt(0) === '-')
    {
        SetRightOperandValue(rightOperand.slice(1));
    }
    else
    {
        SetRightOperandValue("-" + rightOperand);
    }
    SetScreenValue(currentScreen, rightOperand);
}

function AppendDecimalPoint()
{
    if(rightOperand !== "" && decimalMode === false)
    {
        AppendValueToRightOperand(".");
        SetScreenValue(currentScreen, rightOperand);
        decimalMode = true;
    }
}

function HandleBackspace()
{
    SetScreenValue(currentScreen, currentScreen.textContent.slice(0, currentScreen.textContent.length-1));
    SetRightOperandValue(currentScreen.textContent);
}

function Clear()
{
    SetLeftOperandValue("");
    SetRightOperandValue("");
    SetOperatorValue("");
    SetScreenValue(pastScreen, "");
    SetScreenValue(currentScreen, "");
    decimalMode = false;
}

function HandleInputAfterEquals(numberDigit)
{
    if(operator === "=")
    {
        SetOperatorValue("");
        SetRightOperandValue("");
        AppendValueToRightOperand(numberDigit);
        SetScreenValue(pastScreen, "");
    }
}

function HandleOperatorAfterOperator()
{
    if(operator !== "" && leftOperand != "" && rightOperand != "" && operator !== "=")
    {
        SetScreenValue(pastScreen, "");
        SetScreenValue(pastScreen, leftOperand + " " + operator + " " + rightOperand);
        SetRightOperandValue(Operate(leftOperand, rightOperand, operator).toString());
        SetScreenValue(currentScreen, rightOperand);
    }
}


function HandleEmptyFractional()
{
    if(rightOperand.slice(rightOperand.length-1) === ".")
    {
        AppendValueToRightOperand("0");
    }
    if(leftOperand.slice(leftOperand.length-1) === ".")
    {
        AppendValueToLeftOperand("0");
        AppendValueToScreen(currentScreen, "0");
    }
}

function HandleDoubleNegation()
{
    if(rightOperand.charAt(0) === "-" && operator === "-")
    {
        SetRightOperandValue(rightOperand.slice(1));
        SetOperatorValue("+");
        SetScreenValue(pastScreen,pastScreen.textContent.replace("-", "+"));
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

// EVENT_LISTENERS
numberButtons.forEach((button, index) => {
    button.addEventListener("click", function(e){
        HandleNumber(e.target.textContent);
    });
});

operationButtons.forEach((button, index) => {
    button.addEventListener("click", function(e) {
        HandleOperator(e.target.textContent);
    });
});

equalsButton.addEventListener("click", () => {
    if(leftOperand !== "" && rightOperand !== "")
    { 
        HandleEquals(); 
    }
});

clearButton.addEventListener("click", () => {
    Clear();
});

negateButton.addEventListener("click", () =>{
    if(rightOperand !== "") 
    {
        Negate(); 
    }
});

pointButton.addEventListener("click", () => {
    AppendDecimalPoint();
});

window.addEventListener("keydown",function(e) {
    if(e.key === "Backspace")
    {
        HandleBackspace(); 
    }
});

// KEYBOARD_INPUT_SUPPORT

window.addEventListener("keydown", function(e){
    if(IsNumber(e.key))
    {
        HandleNumber(e.key);
    }
});

window.addEventListener("keydown", function(e){
    if(e.key === "*")
    {
        HandleOperator("×");
    }
    if(e.key === "/")
    {
        HandleOperator("÷");
    }
    if(e.key === "+")
    {
        HandleOperator("+");
    }
    if(e.key === "-")
    {
        HandleOperator("-");
    }
});