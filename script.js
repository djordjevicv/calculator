//SELECTING ELEMENTS
equalsButton = document.querySelector("#equals");
allClearButton = document.querySelector("#allClear");
clearButton = document.querySelector("#clear");
decimalPointButton = document.querySelector("#decimalPoint")

operators = Array.from(document.querySelectorAll(".operation:not(:last-of-type)"))
numbers = Array.from(document.querySelectorAll(`[id*="digit"]`));

displayText = document.querySelector("#display span");
displayDiv = document.querySelector("#display div");
//FUNCTIONS
function getOperatorButton(workingOperator) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i].dataset.value === workingOperator) {
            return operators[i];
        }
    }
}
function populateDisplay(workingOperator) {
    displayDiv.textContent = `${a} ${workingOperator} ${b}`
}
function operate(a, b, operator) {
    let af = Number(a);
    let bf = Number(b);
    switch (operator) {
        case "%":
            return af % bf;
        case "*":
            return af * bf;
        case "/":
            return (af / bf).toFixed(2);
        case "+":
            return af + bf;
        case "-":
            return af - bf;
        default:
            return;
    }
}
function handleOperator(e) {
   /**/if (!aCheck) {
        aCheck = true;
        e.target.classList.add("active");
    }
    else if (aCheck) bCheck = true;
    if (aCheck && bCheck) {
        console.table(a, b);
        a = String(operate(a, b, operator));
        displayText.textContent = a;
        bCheck = false;
        b = '';
        previousOperator.classList.remove("active");
        this.classList.add("active");
    }
    operator = this.dataset.value;
    previousOperator = this;
    populateDisplay();

}
function handleOperators(e) {
    operator = e.target.dataset.value != undefined ? e.target.dataset.value : e.key;

    if (!aCheck && a != '') { //input of the first number is done
        aCheck = true;
        let workingOperator = operator;
        getOperatorButton(workingOperator).classList.add("active");
        populateDisplay(workingOperator);
    }
    else if (aCheck && b === '') {
        console.log("uspeh")
        workingOperator = operator;
        getOperatorButton(previousOperator).classList.remove("active");
        getOperatorButton(workingOperator).classList.add("active");
        populateDisplay(workingOperator);
    }
    if (aCheck && !bCheck && operator != '') { //input for the second number is done
        bCheck = true;
    }
    if (aCheck && bCheck) { //result of the calculation becomes first number, last-clicked operator becomes 'workingOperator'
        a = String(operate(a, b, operator));
        displayText.textContent = a;
        bCheck = false;
        b = '';
    }
    previousOperator = operator;
}
function getResult() {

    if (aCheck) bCheck = true;
    if (aCheck && bCheck) {
        console.table(a, b);
        a = String(operate(a, b, operator));
        displayText.textContent = a;
        bCheck = false;
        b = '';
        previousOperator.classList.remove("active");
    }
    displayDiv.textContent = `${a} ${operator} ${b}`
}
function handleNumbers(e) {
    if (!aCheck) {
        a = concatToNumber(e, a);
        displayText.textContent = a;
    }
    else {
        displayText.textContent = '';
        b = concatToNumber(e, b);
        displayText.textContent = b;
    }
    displayDiv.textContent = `${a} ${operator} ${b}`
}
function concatToNumber(e, number) {
    const extraPart = e.target.dataset.value != undefined ? e.target.dataset.value : e.key;
    if (extraPart === '.' && !number.includes(".")) {
        number = number + extraPart;
    }
    else if (extraPart != '.') {
        number = number + extraPart;
    }
    displayDiv.textContent = `${a} ${operator} ${b}`
    return number;
}
function clearAll() {
    a = '';
    b = '';
    aCheck = false;
    bCheck = false;
    operator.classList.remove("active");
    previousOperator.classList.remove("active");
    operator = '';
    previousOperator = '';
    displayText.textContent = '';
    displayDiv.textContent = `${a} ${operator} ${b}`
}
function clear() {

}
function handleOperators1() {

}


//EVENT LISTENERS AND GLOBAL VARIABLES
let a = '', b = '', operator = '', previousOperator = '';
let aCheck = false;
let bCheck = false;

operators.forEach(operator => operator.addEventListener("click", handleOperators));
numbers.forEach(number => number.addEventListener("click", handleNumbers));
decimalPointButton.addEventListener("click", handleNumbers);
equalsButton.addEventListener("click", getResult);

allClearButton.addEventListener("click", clearAll);
clearButton.addEventListener("click", clear);

window.addEventListener("keyup", (e) => {
    if (e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9')
        handleNumbers(e);
    if (e.key === '+' ||
        e.key === '-' ||
        e.key === '*' ||
        e.key === '/' ||
        e.key === '%')
        handleOperators(e)
});
