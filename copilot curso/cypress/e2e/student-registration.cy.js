const StudentRegistrationPage = require("../pages/StudentRegistrationPage");

const page = new StudentRegistrationPage();
const uniqueSuffix = `${Date.now()}${Cypress._.random(100, 999)}`;
const student = {
    identification: `QA${uniqueSuffix}`,
    name: "María José",
    lastName: "Muñoz",
    email: `qa.student.${uniqueSuffix}@example.com`,
    country: "Colombia",
    career: "Ing. Informática",
    birthDate: "2000-09-21"
};

describe("Registro de estudiantes", () => {
    beforeEach(() => {
        page.visit();
    });

    it("muestra todos los campos y controles requeridos", () => {
        [
            "identification",
            "name",
            "lastName",
            "email",
            "country",
            "career",
            "birthDate",
            "age"
        ].forEach((field) => page.field(field).should("be.visible"));
        cy.get(page.selectors.registerButton).should("be.visible").and("contain", "Registrar");
        cy.get(page.selectors.clearButton).should("be.visible").and("contain", "Limpiar");
        cy.get("table").should("be.visible");
        cy.get("thead th").should("have.length", 8);
    });

    it("calcula la edad automáticamente al modificar la fecha de nacimiento", () => {
        page.field("birthDate").invoke("val", "2000-09-21").trigger("change");
        page.field("age").should("not.have.value", "");
        page.field("age").invoke("val").then((age) => {
            expect(Number(age)).to.be.a("number").and.to.be.greaterThan(0);
        });
    });

    it("registra un estudiante válido y lo muestra en la tabla", () => {
        page.fillStudent(student).register();
        page.message().should("contain.text", "registrado");
        page.rows().should("contain.text", student.identification)
            .and("contain.text", student.name)
            .and("contain.text", student.lastName)
            .and("contain.text", student.email)
            .and("contain.text", student.country)
            .and("contain.text", student.career)
            .and("contain.text", student.birthDate);
    });

    it("muestra errores y no registra cuando faltan campos obligatorios", () => {
        page.register();
        page.message().should("contain.text", "corrija");
        page.tableBody().should("not.contain.text", "registrado");
    });

    it("rechaza un correo electrónico inválido", () => {
        page.fillStudent({ ...student, email: "correo-invalido" }).register();
        page.fieldError("email").should("contain.text", "correo");
        page.tableBody().should("not.contain.text", "correo-invalido");
    });

    it("rechaza una identificación con formato inválido", () => {
        page.fillStudent({ ...student, identification: "12-34" }).register();
        page.fieldError("identification").should("contain.text", "identificación");
        page.tableBody().should("not.contain.text", "12-34");
    });

    it("rechaza registros duplicados por identificación o correo", () => {
        page.fillStudent(student).register();
        page.fillStudent({ ...student, identification: `${student.identification}2` }).register();
        page.message().should("contain.text", "registrados");
    });

    it("rechaza una fecha de nacimiento futura", () => {
        page.fillStudent({ ...student, birthDate: "2999-12-31" }).register();
        page.fieldError("birthdate").should("contain.text", "fecha");
        page.field("age").should("have.value", "");
    });

    it("limpia los campos, mensajes y edad sin borrar la tabla", () => {
        page.fillStudent(student).register();
        page.clear();
        ["identification", "name", "lastName", "email", "country", "birthDate"].forEach((field) => {
            page.field(field).should("have.value", "");
        });
        page.field("career").should("have.value", "");
        page.field("age").should("have.value", "");
        page.rows().should("contain.text", student.identification);
    });
});
