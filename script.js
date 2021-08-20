const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second Values depending on operator
const calculate = {
    '/':(firstNumber, secondNumber) => firstNumber / secondNumber,
    '*':(firstNumber, secondNumber) => firstNumber * secondNumber,
    '+':(firstNumber, secondNumber) => firstNumber + secondNumber,
    '-':(firstNumber, secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // console.log(number);
    // calculatorDisplay.textContent = number; // this was not adding numbers if more than 1 digit.
    //Replace current displayValue if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if current display value is 0, replace it, if not add number to make it multi-digit
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number //ternary expression used. if displayValue is equal to 0, then  displayValue will equal the number pressed, else the display Value will add on the numbers pressed.
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue) return; // this will not let it run the next part of the function thus, not allowing to add a decimal
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent); 
    // prevent multiple operators being entered
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator; // this allows after calculation to add a new operator to further calculate or change of operator for the operatorValue to be assigned if pressed wrong operator
        return; // if an operator is selected and we are awaiting next value then the return will prevent rest of this function to run, preventing adding more operators.
    }
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        // console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue); // uses the key (operatorvalue) in object calculate  to perform the calculation for the operator and its two values.
        // console.log('calculation', calculation);
        // To allow further calculations on calculation
        calculatorDisplay.textContent = calculation; 
        firstValue = calculation; // this line along with line 45 is added to allow mistake in operatorValue inputed or to add further calculations
    }
    // Ready for the next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
    // console.log('firstValue', firstValue);
    // console.log('operator', operatorValue);
}

// Rest all values, display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    let awaitingNextValue = false;  // this line and the above two were added to clear first value and operator if there was either was type before
    calculatorDisplay.textContent = '0';
}


// Add event listeners for numbers, operators, decimal buttons
// console.log(inputBtns);
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) { // targetting the numbers only which have no class
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value)); // input.Btn value here will be from the button (html) thus needs arrow function, same for the below 
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

//event Listener
clearBtn.addEventListener('click', resetAll);