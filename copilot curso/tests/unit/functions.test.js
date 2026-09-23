"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const { sumNumbers1, multiplyNumbers1 } = require("../../src/functions/01-functions");

test("sumNumbers1 suma dos enteros positivos", () => {
    assert.strictEqual(sumNumbers1(5, 3), 8);
});

test("sumNumbers1 soporta enteros negativos y cero", () => {
    assert.strictEqual(sumNumbers1(-5, 0), -5);
    assert.strictEqual(sumNumbers1(-5, -3), -8);
});

test("sumNumbers1 conserva la precisión esperada para decimales", () => {
    assert.strictEqual(sumNumbers1(1.25, 2.75), 4);
});

test("sumNumbers1 rechaza entradas no numéricas o no finitas", () => {
    for (const [a, b] of [
        ["5", 3],
        [5, null],
        [5, undefined],
        [Infinity, 1],
        [NaN, 1]
    ]) {
        assert.throws(() => sumNumbers1(a, b), TypeError);
    }
});

test("multiplyNumbers1 multiplica dos enteros positivos", () => {
    assert.strictEqual(multiplyNumbers1(5, 3), 15);
});

test("multiplyNumbers1 soporta enteros negativos, cero y signos distintos", () => {
    assert.strictEqual(multiplyNumbers1(-5, 3), -15);
    assert.strictEqual(multiplyNumbers1(-5, -3), 15);
    assert.strictEqual(multiplyNumbers1(0, 10), 0);
});

test("multiplyNumbers1 conserva la precisión esperada para decimales", () => {
    assert.strictEqual(multiplyNumbers1(1.5, 2), 3);
});

test("multiplyNumbers1 rechaza entradas no numéricas o no finitas", () => {
    for (const [a, b] of [
        ["5", 2],
        [2, null],
        [2, undefined],
        [Infinity, 2],
        [NaN, 2]
    ]) {
        assert.throws(() => multiplyNumbers1(a, b), TypeError);
    }
});
