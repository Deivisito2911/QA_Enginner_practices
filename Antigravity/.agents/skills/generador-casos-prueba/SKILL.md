---
name: generador-casos-prueba
description: >-
  Genera casos de prueba accionables, reproducibles y estructurados únicamente a partir
  de una Historia de Usuario (HU), sus criterios de aceptación y los documentos o artefactos
  adjuntos. Analiza minuciosamente todas las entradas requeridas, valida límites y no asume
  lógica de negocio no especificada. Guarda automáticamente los resultados en un archivo HTML
  claro y estilizado dentro de la carpeta 'results/' del proyecto, bajo el nombre
  'caso de prueba <ID_O_TITULO>.html'. Usar cuando el usuario pida diseñar, redactar o generar
  casos de prueba (QA/testing) basados en requerimientos o HU.
---

# Generador de Casos de Prueba (HU & Adjuntos)

Esta skill guía al agente en el análisis exhaustivo de Historias de Usuario (HU) y sus adjuntos para generar casos de prueba accionables, con estricta adherencia al **Principio de Cero Suposición**, y guardar los resultados formateados en un archivo HTML limpio y visual dentro de la carpeta `results/`.

---

## Reglas Fundamentales

1. **Ubicación y Formato del Output (Obligatorio)**:
   - Todo resultado generado debe escribirse en un archivo **HTML (.html / .htm)**.
   - Ruta de destino: `results/caso de prueba <ID_O_TITULO>.html` (creando la carpeta `results/` en la raíz del repositorio si no existe).
   - Estilo visual claro: HTML autocontenido con CSS moderno, tarjetas ordenadas, insignias (badges) de color por tipo y prioridad, tabla resumen y sección de dudas para el PO.
2. **Fidelidad Absoluta a las Fuentes (Cero Suposición)**:
   - Los casos de prueba deben originarse **exclusivamente** de la información explícita provista en la Historia de Usuario, sus Criterios de Aceptación (AC) y sus adjuntos (wireframes, contratos OpenAPI, diagramas de flujo, reglas de negocio).
3. **Prohibido Inventar Comportamiento**:
   - Si un flujo alternativo, mensaje de error, límite de caracteres o respuesta ante fallo no está documentado en las entradas, **no inventes la solución**. Regístralo en la sección: `Preguntas / Ambigüedades para el Product Owner (PO)`.
4. **Casos Accionables**:
   - Cada caso debe indicar datos concretos (no valores genéricos como "ingresar datos válidos"), pasos secuenciales exactos y un resultado esperado unívoco y verificable.

---

## Flujo de Trabajo

### Paso 1: Análisis Minucioso de Entradas Requeridas
Desglosa y audita las entradas provistas:
1. **Elementos de la HU**: Rol/Actor, Acción/Funcionalidad, Propósito/Valor.
2. **Criterios de Aceptación (AC)**: Condiciones de éxito, mensajes exactos y reglas de negocio.
3. **Adjuntos Técnicos**:
   - **UI / Wireframes**: Etiquetas, botones, estados visuales (activo/deshabilitado).
   - **APIs / Contratos (OpenAPI/Swagger)**: Rutas, verbos, tipos de datos, códigos HTTP, payloads.
   - **Reglas de Validación**: Longitud mínima/máxima, campos obligatorios, formatos regex.

---

### Paso 2: Clasificación y Cobertura de Pruebas
Para cada Criterio de Aceptación y regla de negocio:
- **Casos Positivos (Camino Feliz)**: Flujos con datos correctos que alcanzan el objetivo.
- **Casos Negativos (Manejo de Errores)**: Pruebas con entradas inválidas o precondiciones violadas.
- **Casos de Límite y Borde (BVA)**: Extremos mínimos y máximos según las reglas explícitas.
- **Casos de Seguridad / Permisos**: Acceso no autorizado (solo si la HU o adjunto lo especifican).

---

### Paso 3: Redacción Estructurada del Caso de Prueba
Cada caso debe contener:
- **ID**: Ej. `CP-001`.
- **Título**: Acción y resultado esperado claro.
- **Criterio Relacionado**: Referencia directa (`AC-1`, `BR-02`).
- **Tipo de Prueba**: `Positivo`, `Negativo`, `Límite`, `Seguridad` o `UI`.
- **Prioridad**: `Alta`, `Media` o `Baja`.
- **Precondiciones**: Estado necesario previo.
- **Datos de Prueba**: Valores concretos y específicos.
- **Pasos de Ejecución**: Pasos numerados secuenciales y reproducibles.
- **Resultado Esperado**: Comportamiento exacto y observable.

---

### Paso 4: Detección de Vacíos y Preguntas al Product Owner (PO)
Identifica y lista expresamente:
- Casos no especificados en los requerimientos.
- Ambigüedades o contradicciones entre la HU y los adjuntos.

---

### Paso 5: Generación del Archivo HTML en `results/`
1. Toma como base la [Plantilla HTML](./resources/plantilla-caso-prueba.html).
2. Genera el archivo HTML autocontenido con:
   - Encabezado con ID de la HU, título, descripción y metadatos.
   - Matriz resumen en tabla con columnas: ID, Criterio, Tipo, Prioridad, Objetivo y Resultado Esperado.
   - Tarjetas (Cards) individuales para cada caso de prueba con diseño moderno y badges.
   - Caja de advertencia para las preguntas/ambigüedades dirigidas al PO.
3. Guarda el archivo en la ruta:
   ```text
   results/caso de prueba <ID_HU>.html
   ```
   *(Ejemplo: `results/caso de prueba HU-AUTH-101.html`)*.
4. Muestra al usuario en el chat un breve resumen del análisis y el enlace directo al archivo HTML generado.

---

## Recursos y Referencias

- [Plantilla HTML de Casos de Prueba](./resources/plantilla-caso-prueba.html): Estructura visual clara con CSS integrado para los outputs en `results/`.
- [Plantilla Markdown](./resources/plantilla-casos-prueba.md): Formato de texto base.
- [Guía de Análisis de Entradas](./references/guia-analisis-entradas.md): Técnicas de cobertura (EP, BVA, transiciones).
- [Ejemplo Completo](./examples/ejemplo-generacion.md): Caso práctico de referencia.
