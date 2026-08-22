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
            result = divide(prev, curr);
            break;
        default:
            break;
    }
    current = result.toLocaleString("en-US", {
        minimumFractionalDigits: 0,
        maximumFractionalDigits: 7,
    });
    operator = "";
    previous = "";
    updateDisplay(current);
}

function appendTheNumber(value) {
    current = value;
    updateDisplay(current);
}

function appendTheOperator(value) {
    if (current === "") return;

    if (previous !== "") {
        display.textContent = "";
        operate();
    }
    updateDisplay(value);

    operator = value;
    previous = current;
    current = "";
}

function updateDisplay(value) {
    display.textContent += value;
}

let current = "";
let previous = "";
let operator = "";

const display = document.querySelector("#display");
const numberPad = document.querySelector("#numbers");
const operation = document.querySelector("#operators");
const equalKey = document.querySelector("#equals");
const clearKey = document.querySelector("#clear");

// handle all number key events
numberPad.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return;
    appendTheNumber(e.target.closest("button").textContent);
});

// handle all operator events
operation.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn") || e.target.textContent === "C")
        return;
    appendTheOperator(e.target.closest("button").textContent);
});

// handle equal key only
equalKey.addEventListener("click", (e) => {
    display.textContent = "";
    operate();
});

// handle clear key only
clearKey.addEventListener("click", (e) => {
    current = "";
    previous = "";
    operator = "";
    display.textContent = "";
});
