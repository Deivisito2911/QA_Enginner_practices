import { test, expect } from '@playwright/test';

test.describe('Funcionalidad de Reporte/Instalación - WaveLink', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página principal antes de cada prueba
    await page.goto('https://wavelinkconexiondelfuturo.vercel.app/');
  });

  test('debería navegar a la sección de Reporte/Instalación', async ({ page }) => {
    // Verificar que el botón esté visible
    await expect(page.getByRole('button', { name: 'Reporte / Instalación' })).toBeVisible();
    
    // Hacer clic en el botón
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Verificar que se muestra la sección correcta
    await expect(page.getByRole('heading', { name: 'Reporte de Falla' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reportar Falla' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Solicitar Instalación' })).toBeVisible();
  });

  test('debería mostrar el combobox de zonas/municipios con opciones', async ({ page }) => {
    // Navegar a la sección de Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Verificar combobox de zona
    const zonaCombobox = page.getByRole('combobox', { name: 'Zona / Municipio' });
    await expect(zonaCombobox).toBeVisible();
    
    // Verificar que tiene opciones
    await expect(zonaCombobox).toContainText('Arismendi');
    await expect(zonaCombobox).toContainText('García');
    await expect(zonaCombobox).toContainText('Gómez');
  });

  test('debería permitir seleccionar una zona diferente', async ({ page }) => {
    // Navegar a la sección de Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Seleccionar una zona diferente
    await page.getByRole('combobox', { name: 'Zona / Municipio' }).selectOption('García');
    
    // Verificar que la selección cambió
    await expect(page.getByRole('combobox', { name: 'Zona / Municipio' })).toHaveValue('García');
  });

  test('debería tener campo para descripción del problema', async ({ page }) => {
    // Navegar a la sección de Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Verificar campo de descripción
    const descripcionField = page.getByRole('textbox', { name: 'Descripción del Problema' });
    await expect(descripcionField).toBeVisible();
    
    // Probar escribir en el campo
    await descripcionField.fill('Problema de prueba: No hay conexión');
    await expect(descripcionField).toHaveValue('Problema de prueba: No hay conexión');
  });

  test('debería mostrar botón para generar orden de servicio', async ({ page }) => {
    // Navegar a la sección de Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Verificar botón de generar orden
    await expect(page.getByRole('button', { name: 'Generar Órden de Servicio' })).toBeVisible();
    
    // El botón debería estar habilitado
    await expect(page.getByRole('button', { name: 'Generar Órden de Servicio' })).toBeEnabled();
  });

  test('debería permitir hacer clic en los botones de acción', async ({ page }) => {
    // Navegar a la sección de Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Probar botón Reportar Falla
    await page.getByRole('button', { name: 'Reportar Falla' }).click();
    
    // Probar botón Solicitar Instalación
    await page.getByRole('button', { name: 'Solicitar Instalación' }).click();
    
    // Ambos clics deberían ejecutarse sin error
    // (No hay verificación específica ya que no hay cambio visual observable)
  });

  test('debería mostrar historial de tickets en la sección', async ({ page }) => {
    // Navegar a la sección de Reporte/Instalación
    await page.getByRole('button', { name: 'Reporte / Instalación' }).click();
    
    // Verificar que se menciona el historial
    await expect(page.getByRole('heading', { name: 'Historial de Tickets' })).toBeVisible();
  });
});