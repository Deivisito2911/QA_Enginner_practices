import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';

test('Verify iphone X is present in Shop Page after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);

    // 1. Navegar a la página de login
    await loginPage.navigate();

    // 2. Ingresar credenciales y hacer click
    // NOTA: Se identificó previamente en el análisis manual que la contraseña 'learning' 
    // fue desactivada en el backend arrojando un error. 
    // Para que navegue a /shop, se debe usar 'Learning@830$3mK2'. 
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');

    // 3. Esperar navegación a la tienda
    await shopPage.waitForPageLoad();

    // 4. Verificar si el producto iphone X está presente en la página
    const isPresent = await shopPage.isIphoneXPresent();
    expect(isPresent).toBeTruthy();
});
