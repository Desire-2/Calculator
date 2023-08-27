function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "Cannot divide by 0";
    }
}

function percentage(a) {
    return a / 100;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "%":
            return percentage(num1);
        default:
            return "Invalid operator";
    }
}

let currentInput = "";
let firstNumber = null;
let operator = null;

function updateDisplay(value) {
    const display = document.getElementById("display");
    display.value = value;
}

document.querySelectorAll(".digit, .operator").forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        currentInput += buttonText;
        updateDisplay(currentInput);
    });
});

document.querySelector(".decimal").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay(currentInput);
    }
});

document.querySelector(".backspace").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
});

document.querySelector(".equals").addEventListener("click", () => {
    performCalculation();
    updateDisplay();
});

document.querySelector(".enter").addEventListener("click", () => {
    performCalculation();
    updateDisplay();

});

function performCalculation() {
    if (firstNumber !== null && operator !== null) {
        const secondNumber = currentInput === "" ? 0 : parseFloat(currentInput);
        const result = operate(operator, firstNumber, secondNumber);

        firstNumber = null;
        operator = null;
        currentInput = result.toString();
        updateDisplay(result);
    }
}

document.querySelector(".divide").addEventListener("click", () => {
    if (currentInput === "0") {
        updateDisplay("Cannot divide by 0");
        currentInput = "";
    } else {
        operator = "/";
        updateDisplay(currentInput + operator);
        firstNumber = parseFloat(currentInput);
        currentInput = "";
    }
});

document.addEventListener("keydown", event => {
    const key = event.key;

    if ((key >= "0" && key <= "9") || key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        currentInput += key;
        updateDisplay(currentInput);
    }

    if (key === "Enter") {
        event.preventDefault();  // Prevent default behavior of Enter key
        performCalculation();    // Perform the calculation
    }

    if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }
});
