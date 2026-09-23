import { test, expect } from '@playwright/test';

test.describe('Página Principal y Feedback - WaveLink', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página principal antes de cada prueba
    await page.goto('https://wavelinkconexiondelfuturo.vercel.app/');
  });

  test('debería cargar la página principal correctamente', async ({ page }) => {
    // Verificar título de la página
    await expect(page).toHaveTitle('WaveLink - Conexión del Futuro | Internet de Alta Velocidad');
    
    // Verificar elementos principales
    await expect(page.getByRole('heading', { name: 'Planes de Servicio WaveLink' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Gestión de Calidad y Opiniones' })).toBeVisible();
  });

  test('debería mostrar formulario de feedback de calidad', async ({ page }) => {
    // Verificar sección de calidad
    await expect(page.getByText('Calidad de la Fibra: 5/5')).toBeVisible();
    
    // Verificar slider de calidad
    const slider = page.getByRole('slider', { name: '5' });
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('aria-valuenow', '5');
    
    // Verificar campo de comentarios
    await expect(page.getByRole('textbox', { name: 'Comentarios (Opcional)' })).toBeVisible();
    
    // Verificar checkbox de anonimato
    await expect(page.getByRole('checkbox', { name: 'Realizar opinión de forma anónima.' })).toBeVisible();
    
    // Verificar botón de enviar feedback
    await expect(page.getByRole('button', { name: 'Enviar Feedback' })).toBeVisible();
  });

  test('debería permitir interactuar con el formulario de feedback', async ({ page }) => {
    // Probar campo de comentarios
    const comentariosField = page.getByRole('textbox', { name: 'Comentarios (Opcional)' });
    await comentariosField.fill('Excelente servicio, muy rápida la instalación');
    await expect(comentariosField).toHaveValue('Excelente servicio, muy rápida la instalación');
    
    // Probar checkbox de anonimato
    const checkboxAnonimo = page.getByRole('checkbox', { name: 'Realizar opinión de forma anónima.' });
    await checkboxAnonimo.check();
    await expect(checkboxAnonimo).toBeChecked();
    
    // Desmarcar checkbox
    await checkboxAnonimo.uncheck();
    await expect(checkboxAnonimo).not.toBeChecked();
  });

  test('debería navegar entre secciones principales', async ({ page }) => {
    // Verificar navegación principal
    await expect(page.getByRole('button', { name: 'Planes y Calidad' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reporte / Instalación' })).toBeVisible();
    
    // Probar navegación a Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    await expect(page.getByRole('heading', { name: 'Reporte de Falla' })).toBeVisible();
    
    // Volver a Planes y Calidad
    await page.getByRole('button', { name: 'Planes y Calidad' }).click();
    await expect(page.getByRole('heading', { name: 'Planes de Servicio WaveLink' })).toBeVisible();
  });

  test('debería mostrar información de usuario invitado', async ({ page }) => {
    // Verificar que muestra estado de invitado
    await expect(page.getByText('Invitado')).toBeVisible();
    
    // Verificar que el botón de login está disponible
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeVisible();
  });

  test('debería verificar elementos de navegación responsiva', async ({ page }) => {
    // Verificar logo
    await expect(page.getByRole('img', { name: 'WaveLink - Conexión del Futuro' })).toBeVisible();
    
    // Verificar que todos los botones principales son accesibles
    const mainButtons = [
      'Planes y Calidad',
      'Reporte / Instalación',
      'Iniciar Sesión'
    ];
    
    for (const buttonName of mainButtons) {
      const button = page.getByRole('button', { name: buttonName });
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  });
});