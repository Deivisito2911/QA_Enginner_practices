const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

/**
 * Step Definitions para TC_CP_003
 * Verificación de Detalles del Producto
 * Herramienta: Playwright + Cucumber
 * Lenguaje: JavaScript (Node.js)
 */

// --- LOCALIZADORES (Page Object Model simulado) ---
const locators = {
    productCard: (sku) => `[data-testid="product-card-${sku}"]`,
    productTitle: '.product-detail-title',
    productPrice: '.product-detail-price',
    imageCarousel: '.carousel-container',
    sizeSelector: '[data-testid="size-selector"]',
    reviewsSection: '#reviews-section',
    addToCartBtn: '[data-testid="btn-add-to-cart"]',
    outOfStockBadge: '.badge-out-of-stock'
};

// --- STEP DEFINITIONS ---

// Contexto inicial: Inyectamos el SKU al entorno de ejecución ('this')
Given('que existe el producto {string} con SKU {string}', async function (productName, sku) {
    this.currentSku = sku;
    // Aquí podríamos validar en la DB que el producto realmente existe
});

Given('el producto tiene configuradas múltiples imágenes, tallas y reseñas', async function () {
    // Aquí podríamos invocar una API para inyectar estos datos mockeados si el entorno lo permite
});

When('el usuario navega al catálogo de productos', async function () {
    await this.page.goto('https://stylehaven-demo.com/catalogo');
});

When('hace clic en la imagen del producto {string}', async function (productName) {
    // Usamos el locador dinámico con el SKU guardado previamente
    const productLocator = this.page.locator(locators.productCard(this.currentSku));
    await productLocator.click();
});

Then('el sistema debe cargar la página de detalles del producto', async function () {
    // Playwright maneja las esperas (auto-waiting) automáticamente
    await expect(this.page).toHaveURL(/.*\/producto\/.*/);
});

Then('debe mostrar el título completo y el precio actual', async function () {
    await expect(this.page.locator(locators.productTitle)).toBeVisible();
    await expect(this.page.locator(locators.productPrice)).toBeVisible();
});

Then('debe cargar el carrusel con imágenes de alta resolución', async function () {
    await expect(this.page.locator(locators.imageCarousel)).toBeVisible();
});

Then('debe estar visible el selector de la guía de tallas', async function () {
    await expect(this.page.locator(locators.sizeSelector)).toBeVisible();
});

Then('la sección de reseñas de usuarios debe mostrarse correctamente en la parte inferior', async function () {
    const reviews = this.page.locator(locators.reviewsSection);
    // Asegurar que el elemento entre al viewport
    await reviews.scrollIntoViewIfNeeded();
    await expect(reviews).toBeVisible();
});

// --- ESCENARIO ALTERNATIVO (Sin Stock) ---

Given('que el producto {string} se encuentra {string}', async function (productName, status) {
    // Simulación de estado en base de datos
    this.productStatus = status; 
});

Then('el botón "Añadir al carrito" debe estar deshabilitado', async function () {
    const btnLocator = this.page.locator(locators.addToCartBtn);
    await expect(btnLocator).toBeDisabled();
});

Then('debe mostrarse una etiqueta indicando "Sin Stock"', async function () {
    const badgeLocator = this.page.locator(locators.outOfStockBadge);
    await expect(badgeLocator).toBeVisible();
    await expect(badgeLocator).toHaveText(/Sin Stock/i);
});
