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
function getOperatorButton(someOperator) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i].dataset.value === someOperator) {
            return operators[i];
        }
    }
}
function populateDisplay(someOperator) { //handles upper-left part of calculator display
    displayDiv.textContent = `${a} ${someOperator} ${b}`
}
function operate(a, b, someOperator) {
    let af = Number(a);
    let bf = Number(b);
    switch (someOperator) {
        case "%":
            return af % bf;
        case "*":
            return af * bf;
        case "/":
            return af % bf === 0 ? (af / bf) : (af / bf).toFixed(2);
        case "+":
            return af + bf;
        case "-":
            return af - bf;
        default:
            return;
    }
}
function handleOperators(e) {
    operator = e.target.dataset.value != undefined ? e.target.dataset.value : e.key;
    //both keyboard and button clicks are valid

    if (!aCheck && a != '') { //input of the first number is done
        aCheck = true;
        workingOperator = operator;
        getOperatorButton(workingOperator).classList.add("active");
        populateDisplay(workingOperator);
    }
    else if (aCheck && b === '') { //handling cases like '2 +' -> '2 -'
        workingOperator = operator;
        getOperatorButton(previousOperator).classList.remove("active");
        getOperatorButton(workingOperator).classList.add("active");
        populateDisplay(workingOperator);
    }
    else if (aCheck && !bCheck && operator != '') { //input for the second number is done
        bCheck = true;
        // in this case i am using 'workingOperator for calculation, and setting up `operator` as the new `workingOperator`
        a = operate(a, b, workingOperator);
        displayText.textContent = a;
        b = '';
        bCheck = false;
        getOperatorButton(workingOperator).classList.remove("active");
        workingOperator = operator;
        getOperatorButton(workingOperator).classList.add("active");
        populateDisplay(workingOperator);
    }
    previousOperator = operator;
    operator = '';
}
function getResult() {
    if (aCheck && !bCheck && b != '' && previousOperator != '') { //input for the second number is done
        bCheck = true;
        //i am using 'workingOperator for calculation, 
        //setting up`operator` as the new `workingOperator,
        //and result of the calculation as `a` once the calculation is over
        if (workingOperator === '/' && b === "0") {
            alert("Diving by 0 is illegal");
            b = '';
            bCheck = false;
            populateDisplay(workingOperator);
            displayText.textContent = b;
            return;
        }
        a = operate(a, b, workingOperator);
        displayText.textContent = a;
        b = '';
        bCheck = false;
        getOperatorButton(workingOperator).classList.remove("active");
        workingOperator = ''
        populateDisplay(workingOperator);
    }
}
function handleNumbers(e) {
    if (!aCheck) {
        a = concatToNumber(e, a);
        displayText.textContent = a;
    }
    else if (workingOperator != '') {
        displayText.textContent = '';
        b = concatToNumber(e, b);
        displayText.textContent = b;
    }
    populateDisplay(workingOperator);
}
function concatToNumber(e, number) {
    const extraPart = e.target.dataset.value != undefined ? e.target.dataset.value : e.key;
    //both keyboard and button clicks are valid

    if (extraPart === '.' && !number.includes(".")) {   //to make sure the string that represents the 
        //number has only one decimal point
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
    getOperatorButton(workingOperator) != undefined ?
        getOperatorButton(workingOperator).classList.remove("active") :
        getOperatorButton(previousOperator).classList.remove("active");

    workingOperator = '';
    previousOperator = '';
    populateDisplay(workingOperator);
    displayText.textContent = '';
}
function clear() { //to undo number typing typos
    if (!aCheck && a != '') {
        a = removeEnd(a);
        populateDisplay(workingOperator);
        displayText.textContent = a;
    }
    else if (!bCheck && b != '') {
        b = removeEnd(b);
        populateDisplay(workingOperator);
        displayText.textContent = b;
    }
}
function removeEnd(string) {
    const Length = string.length;
    string = string.substring(0, Length - 1);
    return string;
}


//EVENT LISTENERS AND GLOBAL VARIABLES
let a = '', b = '', operator = '', previousOperator = '', workingOperator = '';
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
