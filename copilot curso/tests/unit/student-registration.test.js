"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { CAREERS, calculateAge, isValidDateString, validateStudent } = require("../../src/student-registration/app");

const validStudent = {
    identification: "AB12345",
    firstName: "María José",
    lastName: "Peña",
    email: "maria@example.com",
    country: "Colombia",
    career: "Ing. Informática",
    birthDate: "2000-09-21"
};

test("isValidDateString acepta fechas reales y rechaza formatos o calendarios inválidos", () => {
    assert.equal(isValidDateString("2000-02-29"), true);
    assert.equal(isValidDateString("2001-02-29"), false);
    assert.equal(isValidDateString("21-09-2000"), false);
    assert.equal(isValidDateString(""), false);
});

test("isValidDateString rechaza valores vacíos, nulos y fechas con componentes inválidos", () => {
    for (const value of [null, undefined, 20200921, "2020-00-10", "2020-01-00", "2020-13-01"]) {
        assert.equal(isValidDateString(value), false);
    }
});

test("calculateAge calcula la edad antes o después del cumpleaños", () => {
    assert.equal(calculateAge("2000-09-21", new Date(2026, 8, 21)), 26);
    assert.equal(calculateAge("2000-09-22", new Date(2026, 8, 21)), 25);
    assert.equal(calculateAge("2027-01-01", new Date(2026, 8, 21)), null);
    assert.equal(calculateAge("invalid", new Date(2026, 8, 21)), null);
});

test("calculateAge devuelve cero para una persona nacida hoy", () => {
    assert.equal(calculateAge("2026-09-21", new Date(2026, 8, 21)), 0);
});

test("CAREERS contiene únicamente las opciones permitidas", () => {
    assert.deepEqual(CAREERS, [
        "Ing. Informática",
        "Ing. Electrónica",
        "Ing. Telecomunicaciones",
        "Ing. Robótica",
        "Otra"
    ]);
    assert.equal(Object.isFrozen(CAREERS), true);
});

test("validateStudent no devuelve errores para un estudiante válido", () => {
    assert.deepEqual(validateStudent(validStudent), {});
});

test("validateStudent valida campos obligatorios y formatos", () => {
    const errors = validateStudent({ ...validStudent, identification: "12", firstName: "A", email: "correo", career: "", birthDate: "2028-01-01" });
    assert.deepEqual(Object.keys(errors).sort(), ["birthDate", "career", "email", "firstName", "identification"]);
});

test("validateStudent informa todos los campos obligatorios cuando están vacíos", () => {
    const errors = validateStudent({});
    assert.deepEqual(Object.keys(errors).sort(), [
        "birthDate",
        "career",
        "country",
        "email",
        "firstName",
        "identification",
        "lastName"
    ]);
});

test("validateStudent acepta identificaciones alfanuméricas de longitud mínima", () => {
    assert.equal(validateStudent({ ...validStudent, identification: "A1234" }).identification, undefined);
    assert.match(validateStudent({ ...validStudent, identification: "A-1234" }).identification, /alfanuméricos/);
    assert.match(validateStudent({ ...validStudent, identification: "1234" }).identification, /al menos 5/);
});

test("validateStudent permite nombres con tildes y ñ", () => {
    assert.deepEqual(validateStudent({ ...validStudent, firstName: "Ángel", lastName: "Muñoz" }), {});
});

test("validateStudent rechaza nombres con números o símbolos no permitidos", () => {
    const errors = validateStudent({ ...validStudent, firstName: "Ana3", lastName: "Pérez123" });
    assert.match(errors.firstName, /nombre válido/);
    assert.match(errors.lastName, /apellido válido/);
});

test("validateStudent acepta correos válidos y rechaza formatos incompletos", () => {
    for (const email of ["a@b.co", "usuario.nombre+tag@dominio.com"]) {
        assert.equal(validateStudent({ ...validStudent, email }).email, undefined);
    }
    for (const email of ["usuario", "usuario@", "@dominio.com", "usuario@dominio"]) {
        assert.match(validateStudent({ ...validStudent, email }).email, /correo.*válido/);
    }
});

test("validateStudent rechaza carreras fuera del catálogo y países vacíos", () => {
    const errors = validateStudent({ ...validStudent, career: "Medicina", country: "   " });
    assert.match(errors.career, /carrera válida/);
    assert.match(errors.country, /país/);
});

test("validateStudent bloquea identificación y correo duplicados sin distinguir mayúsculas", () => {
    const errors = validateStudent(validStudent, [{ ...validStudent, identification: "ZZ99999", email: "otro@example.com" }]);
    assert.deepEqual(errors, {});
    const duplicates = validateStudent({ ...validStudent, identification: "ab12345", email: "MARIA@EXAMPLE.COM" }, [validStudent]);
    assert.equal(duplicates.identification, "Esta identificación ya está registrada.");
    assert.equal(duplicates.email, "Este correo ya está registrado.");
});

test("validateStudent permite registros diferentes al existente", () => {
    const existing = [{ ...validStudent }];
    const different = { ...validStudent, identification: "XY98765", email: "otro@example.com" };
    assert.deepEqual(validateStudent(different, existing), {});
});
