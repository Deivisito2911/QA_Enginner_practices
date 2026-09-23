# Guía de Ejecución de Casos de Prueba con Playwright MCP

Esta guía describe el procedimiento técnico estándar para interpretar casos de prueba en `results/`, ejecutarlos mediante el servidor MCP de Playwright y capturar evidencias visuales.

---

## 1. Mapeo de Acciones del Caso de Prueba a Herramientas MCP

| Acción del Caso de Prueba | Herramienta Playwright MCP | Parámetros Clave |
| :--- | :--- | :--- |
| **Navegar a la página** | `browser_navigate` | `{ "url": "https://..." }` |
| **Inspeccionar estado / selectores** | `browser_snapshot` | `{}` (obtiene el árbol de accesibilidad y referencias `ref`) |
| **Escribir en inputs / formularios** | `browser_type` | `{ "target": "<ref>", "text": "...", "submit": false }` |
| **Hacer clic en botones o enlaces** | `browser_click` | `{ "target": "<ref>" }` |
| **Esperar texto o respuesta** | `browser_wait_for` | `{ "text": "...", "time": 2 }` |
| **Capturar evidencia visual** | `browser_take_screenshot` | `{ "scale": "css", "filename": "results/screenshots/<ID>.png", "fullPage": true }` |
| **Cerrar sesión al finalizar** | `browser_close` | `{}` |

---

## 2. Flujo de Ejecución por Caso de Prueba

1. **Lectura y Precondición**:
   - Leer el caso de prueba (`CP-xxx`).
   - Identificar la URL base, los datos de entrada específicos y el resultado esperado.
   - Navegar a la URL con `browser_navigate` si es una prueba inicial o requiere refresco.

2. **Inspección de la Página**:
   - Tomar un `browser_snapshot` para identificar las referencias exactas de los elementos (`ref` de botones, campos de texto, tablas).

3. **Interacción Paso a Paso**:
   - Llenar los campos con `browser_type`.
   - Disparar acciones con `browser_click`.
   - Esperar la carga de datos o aparición de mensajes con `browser_wait_for`.

4. **Captura de Evidencia (Screenshot Obligatorio)**:
   - Guardar la captura usando `browser_take_screenshot`:
     ```json
     {
       "scale": "css",
       "filename": "results/screenshots/<ID_CASO>.png",
       "fullPage": true
     }
     ```
   - Las rutas relativas de las capturas se guardan en `results/screenshots/`.

5. **Determinación del Estado**:
   - **Exitoso (PASS)**: El comportamiento observado, mensajes visibles o estados de la interfaz coinciden con el resultado esperado documentado.
   - **Fallido (FAIL)**: Ocurrió un error no contemplado, el elemento no respondió, o el resultado observado contradice el resultado esperado.
   - **Bloqueado (BLOCKED)**: No se pudo ejecutar debido a que un paso previo o dependencia técnica impidió interactuar con el sistema.

---

## 3. Generación del Reporte HTML

- El reporte se consolida en `results/reporte de ejecucion <ID_O_TITULO>.html`.
- Debe vincular de forma relativa las capturas almacenadas en `./screenshots/<ID_CASO>.png`.
- Debe incluir métricas (total, exitosos, fallidos, tasa de éxito) y el detalle de cada prueba en español.
- Al terminar la suite completa, siempre invocar `browser_close`.
