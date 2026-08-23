"use strict";

let current = "";
let previous = "";
let operator = "";
let result = "0";

const display = document.querySelector("#num-input");
const numberPad = document.querySelector("#numbers");
const operation = document.querySelector("#operators");
const equalKey = document.querySelector("#equals");
const clearKey = document.querySelector("#clear");

const add = (op1, op2) => op1 + op2;
const subtract = (op1, op2) => op1 - op2;
const multiply = (op1, op2) => op1 * op2;
const divide = (op1, op2) => op1 / op2;

const updateDisplay = () => (display.value = current === "" ? "0" : current);

function operate() {
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
    current = Number(result.toFixed(7));
    previous = "";
    display.value = "";
    updateDisplay();
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

function displayError() {
    display.value = "Not today bro!";
    clear();
}

function clear() {
    current = "";
    previous = "";
    operator = "";
    result = "0";
}

// handle all number key events
numberPad.addEventListener("click", (e) => {
    if (current === result) return;
    // make sure button is clicked and not the parent
    if (!e.target.classList.contains("btn")) return;

    let currentButton = e.target.closest("button").textContent;

    // prevent decimal point from being pressed
    if (current.toString().includes(".") && currentButton === ".") {
        return;
    }

    if (operator) {
        display.value = "";
    }

    current += currentButton;
    updateDisplay();
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
