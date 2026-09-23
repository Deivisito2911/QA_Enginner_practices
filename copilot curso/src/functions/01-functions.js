"use strict";

function validateNumbers(a, b) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new TypeError("Los argumentos deben ser números finitos.");
    }
}

function sumNumbers1(a, b) {
    validateNumbers(a, b);
    return a + b;
}

function multiplyNumbers1(a, b) {
    validateNumbers(a, b);
    return a * b;
}

if (require.main === module) {
    // llamar las funciones e imprimir los resultados en consola
    console.log("Suma de 5 y 3:", sumNumbers1(5, 3)); // Imprime: Suma de 5 y 3: 8
    console.log("Multiplicación de 5 y 3:", multiplyNumbers1(5, 3)); // Imprime: Multiplicación de 5 y 3: 15
}

module.exports = { sumNumbers1, multiplyNumbers1 };
