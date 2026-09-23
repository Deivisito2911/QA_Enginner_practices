import { test, expect } from '@playwright/test';

test.describe('Funcionalidad de Login - WaveLink', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página principal antes de cada prueba
    await page.goto('https://wavelinkconexiondelfuturo.vercel.app/');
  });

  test('debería mostrar el modal de login al hacer clic en el botón', async ({ page }) => {
    // Verificar que el botón de login esté visible
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeVisible();
    
    // Hacer clic en el botón de login
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Verificar que el modal de login se muestra
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Contraseña')).toBeVisible();
  });

  test('debería permitir escribir en los campos del formulario de login', async ({ page }) => {
    // Abrir modal de login
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Escribir en el campo de email
    await page.getByLabel('Email').fill('usuario@ejemplo.com');
    await expect(page.getByLabel('Email')).toHaveValue('usuario@ejemplo.com');
    
    // Escribir en el campo de contraseña
    await page.getByLabel('Contraseña').fill('password123');
    await expect(page.getByLabel('Contraseña')).toHaveValue('password123');
  });

  test('debería mostrar enlace de registro en el modal de login', async ({ page }) => {
    // Abrir modal de login
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Verificar enlace de registro
    await expect(page.getByRole('button', { name: '¿No tienes cuenta? Regístrate aquí' })).toBeVisible();
  });

  test('debería poder cerrar el modal de login', async ({ page }) => {
    // Abrir modal de login
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Verificar que el modal está visible
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();
    
    // Cerrar el modal (botón X)
    await page.getByRole('button').first().click();
    
    // Verificar que el modal ya no está visible
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).not.toBeVisible();
  });

  test('debería mantener el estado "Invitado" en la barra superior', async ({ page }) => {
    // Verificar que muestra "Invitado" en la barra superior
    await expect(page.getByText('Invitado')).toBeVisible();
  });
});