// spec: tests/plan-de-pruebas.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.use({
  baseURL: process.env.BASE_URL ?? 'https://futbol1.geekqa.net/',
});

test.describe('Suite de Navegación de Página Principal', () => {
  test('Probar funcionalidad de paginación', async ({ page }) => {
    test.setTimeout(60000);

    const page1Button = page.getByRole('button', { name: '1', exact: true });
    const page2Button = page.getByRole('button', { name: '2', exact: true });
    const page3Button = page.getByRole('button', { name: '3', exact: true });
    const paginationButtons = page.locator('main button');
    const previousButton = paginationButtons.first();
    const nextButton = paginationButtons.last();
    const clubHeading = (clubName: string) =>
      page.getByRole('heading', { name: clubName, exact: true });

    await expect(async () => {
      await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
    }).toPass({
      timeout: 30000,
      intervals: [250, 500, 1000, 2000],
    });

    // 1. Hacer clic en el botón de página 2
    await page2Button.click();
    await expect(page2Button).toHaveClass(/bg-blue-600/, { timeout: 10000 });
    await expect(clubHeading('Chelsea FC')).toBeVisible({ timeout: 10000 });
    await expect(previousButton).toBeEnabled();

    // 2. Hacer clic en el botón de página 3
    await page3Button.click();
    await expect(page3Button).toHaveClass(/bg-blue-600/, { timeout: 10000 });
    await expect(clubHeading('Arsenal FC')).toBeVisible({ timeout: 10000 });

    // 3. Hacer clic en el botón anterior
    await previousButton.click();
    await expect(page2Button).toHaveClass(/bg-blue-600/, { timeout: 10000 });
    await expect(clubHeading('Chelsea FC')).toBeVisible({ timeout: 10000 });

    // 4. Hacer clic en el botón siguiente
    await nextButton.click();
    await expect(page3Button).toHaveClass(/bg-blue-600/, { timeout: 10000 });
    await expect(clubHeading('Arsenal FC')).toBeVisible({ timeout: 10000 });

    // 5. Regresar a la página 1
    await page1Button.click();
    await expect(page1Button).toHaveClass(/bg-blue-600/, { timeout: 10000 });
    await expect(clubHeading('Real Madrid CF')).toBeVisible({ timeout: 10000 });
    await expect(previousButton).toBeDisabled();
  });
});
