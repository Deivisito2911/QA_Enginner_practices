---
name: ejecutor-casos-prueba
description: >-
  Ejecuta de forma automatizada los casos de prueba web que se encuentren en la carpeta
  'results/' utilizando las herramientas del MCP de Playwright. Interactúa con la interfaz,
  verifica resultados esperados, toma screenshots de evidencia de cada caso y genera
  un reporte completo en formato HTML en español guardado en 'results/reporte de ejecucion <ID>.html'.
  Usar cuando el usuario solicite ejecutar, correr o validar casos de prueba web con Playwright.
---

# Ejecutor de Casos de Prueba con Playwright MCP

Esta skill permite al agente ejecutar de extremo a extremo casos de prueba web previamente documentados en la carpeta `results/`, utilizando las herramientas MCP de **Playwright**, capturando evidencias gráficas (screenshots) y compilando un reporte visual consolidado en formato HTML en español.

---

## Flujo de Trabajo en 5 Pasos

### Paso 1: Lectura y Análisis de Casos de Prueba en `results/`
1. Revisa los archivos de casos de prueba dentro de `results/` (archivos `.html` o `.md` generados previamente, ej. `results/caso de prueba UniWebPro Estudiantes.html`).
2. Extrae para cada caso de prueba (`CP-xxx`):
   - **URL objetivo / Módulo**.
   - **Precondiciones**.
   - **Datos de prueba**.
   - **Pasos secuenciales de ejecución**.
   - **Resultado esperado**.

---

### Paso 2: Ejecución Automatizada con Playwright MCP
Para cada caso de prueba identificado, utiliza las herramientas del servidor MCP `playwright`:

1. **Navegación**:
   - `call_mcp_tool` con `ServerName: "playwright"`, `ToolName: "browser_navigate"` hacia la URL base.
2. **Inspección de la Página**:
   - `browser_snapshot` para obtener el árbol de accesibilidad y las referencias de destino (`target`).
3. **Acciones e Interacción**:
   - `browser_type`: Ingresar los datos de prueba en los campos de formulario indicados.
   - `browser_click`: Pulsar botones de acción, pestañas o enlaces.
   - `browser_wait_for`: Esperar la renderización de elementos o respuestas en pantalla.
4. **Verificación**:
   - Comparar el estado visual y los textos obtenidos frente al resultado esperado documentado. Determinar si el caso es **Exitoso (PASS)** o **Fallido (FAIL)**.

---

### Paso 3: Captura de Evidencias (Screenshots)
1. Inmediatamente tras validar el resultado de cada caso de prueba, toma una captura de pantalla:
   - Utiliza `call_mcp_tool` con `ToolName: "browser_take_screenshot"`.
   - Parámetros:
     ```json
     {
       "scale": "css",
       "filename": "results/screenshots/<ID_CASO>.png",
       "fullPage": true
     }
     ```
2. Asegura que la imagen quede guardada en `results/screenshots/` con el nombre unívoco del caso (ej. `results/screenshots/CP-EST-001.png`).

---

### Paso 4: Generación del Reporte HTML Consolidado
1. Con base en la [Plantilla de Reporte de Ejecución](./resources/plantilla-reporte-ejecucion.html), genera el archivo de reporte en:
   ```text
   results/reporte de ejecucion <ID_O_TITULO>.html
   ```
2. El reporte debe estar completamente en **español** y contener:
   - **Encabezado con Metadatos**: Fecha, hora, URL base, suite analizada.
   - **Panel de Métricas**: Total de pruebas, exitosas, fallidas, bloqueadas y tasa de éxito (%).
   - **Barra de Progreso**: Visualización gráfica del porcentaje de éxito.
   - **Matriz Resumen**: Tabla con ID, título, estado (badge verde/rojo) y enlace a la evidencia.
   - **Detalle por Caso**: Pasos ejecutados, comparación (Resultado Esperado vs. Obtenido) y la imagen de la captura incrustada como evidencia.
3. Asegura que las rutas a las imágenes en el HTML sean relativas (`./screenshots/<ID_CASO>.png`) para que el archivo HTML sea portable.

---

### Paso 5: Limpieza y Cierre del Navegador
1. Llama a `call_mcp_tool` con `ToolName: "browser_close"` para liberar los recursos del navegador.
2. Presenta al usuario en el chat:
   - Resumen ejecutivo de los resultados (Total, Exitosos, Fallidos).
   - Enlace directo al archivo del reporte HTML generado en `results/` utilizando el esquema `file:///`.

---

## Recursos y Referencias

- [Plantilla de Reporte HTML](./resources/plantilla-reporte-ejecucion.html): Estructura visual moderna con soporte para métricas y screenshots integrados.
- [Guía de Ejecución con Playwright](./references/guia-ejecucion-playwright.md): Tabla de mapeo de comandos MCP y criterios de evaluación.
