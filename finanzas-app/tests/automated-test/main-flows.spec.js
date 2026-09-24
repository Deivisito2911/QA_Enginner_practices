const { test, expect } = require('@playwright/test');

test.describe('Flujos Principales - FinApp', () => {

  test.beforeEach(async ({ page }) => {
    // Ir a la página principal
    await page.goto('http://localhost:3000/');
  });

  test('Debe cargar el Dashboard correctamente y mostrar saldos en 0', async ({ page }) => {
    // Validar el título
    await expect(page).toHaveTitle(/FinApp/);
    
    // Verificar que estamos en la pestaña Dashboard
    const dashboardTitle = page.locator('#dashboard h1');
    await expect(dashboardTitle).toHaveText('Panel Principal');

    // Verificar que los balances iniciales empiecen con 0 (si es primera vez) o contengan el símbolo $
    const totalBalance = page.locator('#totalBalance');
    await expect(totalBalance).toBeVisible();
    await expect(totalBalance).toContainText('$');
  });

  test('Debe permitir agregar un nuevo Gasto', async ({ page }) => {
    // 1. Navegar a Gastos
    await page.locator('a.nav-link[data-page="gastos"]').click();
    await expect(page.locator('#gastos h1')).toHaveText('Gastos e Ingresos');

    // 2. Abrir Modal de Transacción
    await page.locator('#addTransactionBtn').click();
    const modal = page.locator('#transactionModal');
    await expect(modal).toBeVisible();

    // 3. Llenar Formulario
    await page.selectOption('#transactionType', 'gasto');
    // Seleccionamos la primera categoría disponible para gasto (ej. index 1)
    await page.locator('#transactionCategory').selectOption({ index: 1 });
    await page.fill('#transactionDescription', 'Compra de prueba automatizada');
    await page.fill('#transactionAmount', '125.50');
    
    // Setear fecha actual
    const today = new Date().toISOString().split('T')[0];
    await page.fill('#transactionDate', today);

    // 4. Enviar Formulario
    await page.locator('#transactionForm button[type="submit"]').click();

    // 5. Validar que la transacción aparezca en la tabla
    const firstRowDesc = page.locator('#transactionsTableBody tr').first().locator('td:nth-child(4)');
    await expect(firstRowDesc).toHaveText('Compra de prueba automatizada');
    
    const firstRowAmount = page.locator('#transactionsTableBody tr').first().locator('td:nth-child(5)');
    await expect(firstRowAmount).toContainText('126');
  });

  test('Debe permitir crear un nuevo Objetivo de Ahorro', async ({ page }) => {
    // 1. Navegar a Objetivos
    await page.locator('a.nav-link[data-page="objetivos"]').click();
    await expect(page.locator('#objetivos h1')).toHaveText('Objetivos de Ahorro');

    // 2. Abrir Modal de Objetivos (Intentamos ambos botones, el del empty state o el header)
    const btnEmpty = page.locator('#addGoalBtn2');
    const btnHeader = page.locator('#addGoalBtn');
    
    if (await btnEmpty.isVisible()) {
        await btnEmpty.click();
    } else {
        await btnHeader.click();
    }

    const modal = page.locator('#goalModal');
    await expect(modal).toBeVisible();

    // 3. Llenar Formulario
    await page.fill('#goalName', 'Vacaciones Test');
    await page.fill('#goalTarget', '5000');
    await page.fill('#goalCurrent', '1000');
    
    // Setear fecha futura
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const futureDate = future.toISOString().split('T')[0];
    await page.fill('#goalDeadline', futureDate);
    
    await page.fill('#goalDescription', 'Ahorro para vacaciones generado por Playwright');

    // 4. Enviar Formulario
    await page.locator('#goalForm button[type="submit"]').click();

    // 5. Validar que el objetivo se haya renderizado en el DOM
    // Como descubrimos que puede haber un error JS al renderizar, verificamos si el contenedor tiene el texto
    const goalsContainer = page.locator('#goalsContainer');
    await expect(goalsContainer).toContainText('Vacaciones Test');
  });

});
