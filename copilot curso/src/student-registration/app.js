"use strict";

const CAREERS = Object.freeze([
    "Ing. Informática",
    "Ing. Electrónica",
    "Ing. Telecomunicaciones",
    "Ing. Robótica",
    "Otra"
]);

function isValidDateString(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function calculateAge(birthDate, today = new Date()) {
    if (!isValidDateString(birthDate)) return null;
    const [year, month, day] = birthDate.split("-").map(Number);
    const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const date = new Date(year, month - 1, day);
    if (date > current) return null;
    let age = current.getFullYear() - year;
    if (current.getMonth() < month - 1 || (current.getMonth() === month - 1 && current.getDate() < day)) age--;
    return age;
}

function validateStudent(data, existing = []) {
    const errors = {};
    const identification = String(data.identification || "").trim();
    const firstName = String(data.firstName || "").trim();
    const lastName = String(data.lastName || "").trim();
    const email = String(data.email || "").trim();
    const country = String(data.country || "").trim();
    const career = String(data.career || "").trim();
    const birthDate = String(data.birthDate || "").trim();
    const namePattern = /^[\p{L}]+(?:[ '\u00b7-][\p{L}]+)*$/u;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const duplicateId = existing.some((student) => student.identification.toLowerCase() === identification.toLowerCase());
    const duplicateEmail = existing.some((student) => student.email.toLowerCase() === email.toLowerCase());

    if (!/^[a-zA-Z0-9]+$/.test(identification) || identification.length < 5) errors.identification = "Usa al menos 5 caracteres alfanuméricos.";
    else if (duplicateId) errors.identification = "Esta identificación ya está registrada.";
    if (!namePattern.test(firstName) || firstName.length < 2) errors.firstName = "Ingresa un nombre válido (mínimo 2 letras).";
    if (!namePattern.test(lastName) || lastName.length < 2) errors.lastName = "Ingresa un apellido válido (mínimo 2 letras).";
    if (!emailPattern.test(email)) errors.email = "Ingresa un correo electrónico válido.";
    else if (duplicateEmail) errors.email = "Este correo ya está registrado.";
    if (!country) errors.country = "Ingresa el país de residencia.";
    if (!CAREERS.includes(career)) errors.career = "Selecciona una carrera válida.";
    if (!isValidDateString(birthDate) || calculateAge(birthDate) === null) errors.birthDate = "Ingresa una fecha válida que no sea futura.";
    return errors;
}

function setupStudentForm(documentRef = document) {
    const form = documentRef.querySelector("#student-form");
    if (!form) return;
    const fields = ["identification", "firstName", "lastName", "email", "country", "career", "birthDate"];
    const ageInput = documentRef.querySelector("#age");
    const message = documentRef.querySelector("#form-message");
    const rows = documentRef.querySelector("#student-rows");
    const count = documentRef.querySelector("#record-count");
    const students = [];
    const getData = () => Object.fromEntries(fields.map((field) => [field, form.elements[field].value]));
    const setMessage = (text, type) => {
        message.textContent = text;
        message.className = `form-message ${type}`;
        message.hidden = false;
    };
    const clearMessage = () => {
        message.textContent = "";
        message.className = "form-message";
        message.hidden = true;
    };
    const showErrors = (errors) => fields.forEach((field) => {
        const input = form.elements[field];
        const wrapper = input.closest(".field");
        const error = documentRef.querySelector(`#${field}-error`);
        wrapper.classList.toggle("has-error", Boolean(errors[field]));
        input.setAttribute("aria-invalid", errors[field] ? "true" : "false");
        error.textContent = errors[field] || "";
    });
    const updateAge = () => {
        ageInput.value = calculateAge(form.elements.birthDate.value) ?? "—";
    };
    const render = (student) => {
        documentRef.querySelector("#empty-row")?.remove();
        const row = documentRef.createElement("tr");
        [student.identification, student.firstName, student.lastName, student.email, student.country, student.career, student.birthDate, student.age]
            .forEach((value) => { const cell = documentRef.createElement("td"); cell.textContent = value; row.appendChild(cell); });
        rows.appendChild(row);
        count.textContent = `${students.length} ${students.length === 1 ? "registro" : "registros"}`;
    };
    form.elements.birthDate.addEventListener("input", updateAge);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearMessage();
        const data = getData();
        const errors = validateStudent(data, students);
        showErrors(errors);
        if (Object.keys(errors).length) {
            setMessage("Revisa los campos indicados antes de registrar.", "error");
            form.querySelector(".has-error input, .has-error select")?.focus();
            return;
        }
        const student = { ...data, age: calculateAge(data.birthDate) };
        students.push(student);
        render(student);
        fields.forEach((field) => { form.elements[field].value = ""; });
        ageInput.value = "—";
        showErrors({});
        setMessage("Estudiante registrado correctamente.", "success");
    });
    form.addEventListener("reset", () => {
        window.setTimeout(() => { clearMessage(); ageInput.value = "—"; showErrors({}); }, 0);
    });
}

if (typeof document !== "undefined") setupStudentForm();

if (typeof module !== "undefined") {
    module.exports = { CAREERS, calculateAge, isValidDateString, validateStudent };
}
