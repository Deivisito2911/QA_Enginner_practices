import { test, expect } from '@playwright/test';

const BASE_URL = 'https://testing1.geekqa.net/';

test.describe('US-002: Gestión de incorporación de nuevos empleados', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('TC_001: Registro exitoso con datos válidos completos y visualización en tabla', async ({ page }) => {
        await page.fill('#name', 'Carlos Santana');
        await page.fill('#age', '35');
        await page.fill('#dob', '1989-05-15');
        await page.check('#male');
        await page.fill('#address', 'Av. Siempre Viva 742, Springfield');
        await page.fill('#email', 'carlos.santana@geekretail.com');
        await page.fill('#phone', '9876543210');
        await page.fill('#position', 'Desarrollador Senior');
        await page.selectOption('#department', 'ventas');
        await page.check('#contractStatus');
        await page.fill('#workHours', '08:00 - 17:00');
        await page.fill('#profileUrl', 'https://linkedin.com/in/csantana');
        await page.fill('#salary', '3500');

        await page.click('button[type="submit"]');

        // Verificar mensaje de éxito
        const successMessage = page.locator('#successMessage');
        await expect(successMessage).toBeVisible();

        // Verificar inserción en la tabla
        const lastRow = page.locator('#tableBody tr').last();
        await expect(lastRow).toBeVisible();
        await expect(lastRow.locator('td').nth(0)).toHaveText('Carlos Santana');
        await expect(lastRow.locator('td').nth(1)).toHaveText('35');
    });

    test('TC_002: Validación de longitud mínima de Nombre (< 3 caracteres)', async ({ page }) => {
        await page.fill('#name', 'Al');
        await page.click('button[type="submit"]');

        const nameError = page.locator('#nameError');
        await expect(nameError).toHaveText('El nombre debe tener al menos 3 caracteres');
    });

    test('TC_003: Validación de Edad Límite Inferior (Menor a 18 años)', async ({ page }) => {
        // Según AC 1: Edad entre 18 y 65 años. Edad 16 debe ser rechazada.
        await page.fill('#name', 'Ana Torres');
        await page.fill('#age', '16');
        await page.fill('#dob', '2010-02-10');
        await page.check('#female');
        await page.fill('#address', 'Calle 10 # 45-20');
        await page.fill('#email', 'ana.torres@geekretail.com');
        await page.fill('#phone', '3001234567');
        await page.fill('#salary', '2000');

        await page.click('button[type="submit"]');

        const ageError = page.locator('#ageError');
        await expect(ageError).toHaveText('La edad debe estar entre 18 y 65 años');
    });

    test('TC_004: Validación de Edad Válida en Rango Superior (62 años)', async ({ page }) => {
        // Según AC 1: Edad entre 18 y 65 años. Edad 62 debe ser aceptada.
        await page.fill('#name', 'Roberto Gómez');
        await page.fill('#age', '62');
        await page.fill('#dob', '1964-08-20');
        await page.check('#male');
        await page.fill('#address', 'Carrera 7 # 100-12');
        await page.fill('#email', 'roberto.gomez@geekretail.com');
        await page.fill('#phone', '3109876543');
        await page.fill('#salary', '4200');

        await page.click('button[type="submit"]');

        const ageError = page.locator('#ageError');
        await expect(ageError).toBeEmpty();
        await expect(page.locator('#tableBody tr')).toHaveCount(1);
    });

    test('TC_005: Validación de Salario menor o igual a 0', async ({ page }) => {
        await page.fill('#name', 'Luis Morales');
        await page.fill('#age', '30');
        await page.fill('#dob', '1995-11-05');
        await page.check('#male');
        await page.fill('#address', 'Diagonal 45 # 22-10');
        await page.fill('#email', 'luis.morales@geekretail.com');
        await page.fill('#phone', '3157891234');
        await page.fill('#salary', '0');

        await page.click('button[type="submit"]');

        const salaryError = page.locator('#salaryError');
        await expect(salaryError).toHaveText('El salario debe ser mayor a 0');
    });

    test('TC_006: Integridad del dato Salario en la tabla de Empleados Registrados', async ({ page }) => {
        await page.fill('#name', 'Elena Benítez');
        await page.fill('#age', '28');
        await page.fill('#dob', '1998-04-12');
        await page.check('#female');
        await page.fill('#address', 'Av. Las Palmas 500');
        await page.fill('#email', 'elena.benitez@geekretail.com');
        await page.fill('#phone', '3206549871');
        await page.fill('#salary', '4500');

        await page.click('button[type="submit"]');

        const lastRow = page.locator('#tableBody tr').last();
        // Verificar que el salario guardado en tabla sea 4500 y no 0
        await expect(lastRow.locator('td').nth(12)).toHaveText('4500');
    });

    test('TC_007: Validación de Formato de Correo Electrónico', async ({ page }) => {
        await page.fill('#name', 'Mario Vargas');
        await page.fill('#email', 'correo_sin_formato');
        await page.click('button[type="submit"]');

        const emailError = page.locator('#emailError');
        await expect(emailError).toHaveText('Correo electrónico inválido');
    });

    test('TC_008: Validación de Campo Obligatorio Fecha de Nacimiento', async ({ page }) => {
        await page.fill('#name', 'Diana Prince');
        await page.fill('#dob', '');
        await page.click('button[type="submit"]');

        const dobError = page.locator('#dobError');
        await expect(dobError).toHaveText('La fecha de nacimiento es obligatoria');
    });

    test('TC_009: Validación de Género Obligatorio y Bloqueo de Envío', async ({ page }) => {
        await page.fill('#name', 'Valeria Rios');
        await page.fill('#age', '29');
        await page.fill('#dob', '1997-03-14');
        // No seleccionar género
        await page.fill('#address', 'Calle 80 # 11-20');
        await page.fill('#email', 'valeria.rios@geekretail.com');
        await page.fill('#phone', '3112223344');
        await page.fill('#salary', '3200');

        await page.click('button[type="submit"]');

        const genderError = page.locator('#genderError');
        await expect(genderError).toHaveText('Seleccione un género');
        // Debe impedir el registro
        await expect(page.locator('#tableBody tr')).toHaveCount(0);
    });

    test('TC_010: Validación de Texto Exacto del Mensaje de Éxito', async ({ page }) => {
        await page.fill('#name', 'Gabriel Soto');
        await page.fill('#age', '40');
        await page.fill('#dob', '1986-07-21');
        await page.check('#male');
        await page.fill('#address', 'Transversal 23 # 45-67');
        await page.fill('#email', 'gabriel.soto@geekretail.com');
        await page.fill('#phone', '3194445566');
        await page.fill('#salary', '3800');

        await page.click('button[type="submit"]');

        const successMessage = page.locator('#successMessage');
        await expect(successMessage).toHaveText('¡Empleado registrado con éxito!');
    });
});
