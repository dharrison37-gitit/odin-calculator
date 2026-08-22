"use strict";

function add(op1, op2) {
    return op1 + op2;
}

function subtract(op1, op2) {
    return op1 - op2;
}

function multiply(op1, op2) {
    return op1 * op2;
}

function divide(op1, op2) {
    return op1 / op2;
}

function operate() {
    let result = 0;
    const prev = Number(previous);
    const curr = Number(current);

    switch (operator) {
        case "+":
            result = add(prev, curr);
            break;
        case "-":
            result = subtract(prev, curr);
            break;
        case "x":
            result = multiply(prev, curr);
            break;
        case "/":
            if (curr === 0) {
                displayError();
                return;
            }
            result = divide(prev, curr);
            break;
        default:
            break;
    }
    result.toLocaleString("en-US", {
        minimumFractionalDigits: 0,
        maximumFractionalDigits: 7,
    });

    current = result;
    previous = "";
    display.value = "";
    updateDisplay(result);
}

function setOperation(value) {
    if (value === "." && current.value.includes(".")) return;

    if (current === "") return;

    if (previous !== "") {
        operate();
    }

    operator = value;
    previous = current;
    current = "";
}

function updateDisplay(value) {
    display.value = value;
}

function displayError() {
    display.value = "Not today bro!";
    clear();
}

function clear() {
    current = "";
    previous = "";
    operator = "";
}

let current = "";
let previous = "";
let operator = "";

const display = document.querySelector("#num-input");
const numberPad = document.querySelector("#numbers");
const operation = document.querySelector("#operators");
const equalKey = document.querySelector("#equals");
const clearKey = document.querySelector("#clear");

// handle all number key events
numberPad.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return;

    let currentButton = e.target.closest("button").textContent;
    console.log(typeof current);
    if (current.toString().includes(".") && currentButton === ".") {
        return;
    }

    if (operator) {
        display.value = "";
    }

    current += currentButton;
    updateDisplay(current);
});

// handle all operator events
operation.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn") || e.target.textContent === "C")
        return;
    if (!current && previous) return;

    current = display.value;
    setOperation(e.target.closest("button").textContent);
});

// handle equal key only
equalKey.addEventListener("click", (e) => {
    if (!operator) return;
    operate();
});

// handle clear key only
clearKey.addEventListener("click", (e) => {
    clear();
    display.value = "";
});
