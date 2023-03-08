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

function operate(leftNumber, rightNumber, operator){
    if(operator === '+'){ return add(leftNumber, rightNumber);}
    if(operator === '-'){ return subtract(leftNumber, rightNumber);}
    if(operator === '÷'){ return divide(leftNumber, rightNumber);}
    if(operator === 'x'){ return multiply(leftNumber, rightNumber);}
}