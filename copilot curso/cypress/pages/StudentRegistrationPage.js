class StudentRegistrationPage {
    selectors = {
        identification: "#identification",
        name: "#name",
        lastName: "#lastname",
        email: "#email",
        country: "#country",
        career: "#career",
        birthDate: "#birthdate",
        age: "#age",
        registerButton: "#registerBtn",
        clearButton: "#clearBtn",
        rows: "table tbody tr"
    };

    visit() {
        cy.visit("/");
        return this;
    }

    fillStudent(student) {
        cy.get(this.selectors.identification).clear().type(student.identification);
        cy.get(this.selectors.name).clear().type(student.name);
        cy.get(this.selectors.lastName).clear().type(student.lastName);
        cy.get(this.selectors.email).clear().type(student.email);
        cy.get(this.selectors.country).clear().type(student.country);
        cy.get(this.selectors.career).select(student.career);
        cy.get(this.selectors.birthDate).invoke("val", student.birthDate).trigger("change");
        return this;
    }

    register() {
        cy.get(this.selectors.registerButton).click();
        return this;
    }

    clear() {
        cy.get(this.selectors.clearButton).click();
        return this;
    }

    field(field) {
        return cy.get(this.selectors[field]);
    }

    rows() {
        return cy.get(this.selectors.rows);
    }

    message() {
        return cy.get("#message");
    }

    fieldError(field) {
        return cy.get(`#${field}Error`);
    }

    tableBody() {
        return cy.get("table tbody");
    }
}

module.exports = StudentRegistrationPage;
