---
name: generador-casos-prueba
description: >-
  Genera casos de prueba accionables, reproducibles y estructurados únicamente a partir
  de una Historia de Usuario (HU), sus criterios de aceptación y los documentos o artefactos
  adjuntos. Analiza minuciosamente todas las entradas requeridas, valida límites y no asume
  lógica de negocio no especificada. Usar cuando el usuario pida diseñar, redactar o generar
  casos de prueba (QA/testing) basados en requerimientos o HU.
---

# Generador de Casos de Prueba (HU & Adjuntos)

Esta skill guía al agente en el análisis exhaustivo de Historias de Usuario (HU) y sus adjuntos para generar casos de prueba accionables, con estricta adherencia al **Principio de Cero Suposición**.

---

## Regla Fundamental: Cero Suposición

1. **Fidelidad Absoluta a las Fuentes**: Los casos de prueba deben originarse **exclusivamente** de la información explícita provista en la Historia de Usuario, sus Criterios de Aceptación (AC) y sus adjuntos (wireframes, contratos OpenAPI, diagramas de flujo, reglas de negocio).
2. **Prohibido Inventar Comportamiento**: Si un flujo alternativo, mensaje de error, límite de caracteres o respuesta ante fallo no está documentado en las entradas, **no inventes la solución**. Regístralo en la sección obligatoria: `Preguntas / Ambigüedades para el Product Owner (PO)`.
3. **Casos Accionables**: Cada caso de prueba debe indicar datos concretos (no valores genéricos como "ingresar datos válidos"), pasos secuenciales exactos y un resultado esperado unívoco y verificable.

---

## Flujo de Trabajo en 4 Pasos

### Paso 1: Análisis Minucioso de Entradas Requeridas

Antes de escribir los casos de prueba, descompón y audita las entradas provistas:

1. **Elementos de la Historia de Usuario**:
   - **Rol / Actor**: Permisos y nivel de acceso del actor principal.
   - **Acción / Funcionalidad**: Qué operación ejecuta el actor.
   - **Propósito / Valor de Negocio**: Objetivo funcional esperado.
2. **Criterios de Aceptación (AC)**:
   - Identificar cada criterio de forma unívoca (`AC-1`, `AC-2`, etc.).
   - Mapear las condiciones de éxito y los mensajes textuales requeridos.
3. **Adjuntos y Especificaciones Técnicas**:
   - **Diseños UI / Wireframes**: Textos exactos, etiquetas, estados de botones (activo, inactivo, deshabilitado) y campos visibles.
   - **APIs / Contratos (OpenAPI/Swagger)**: Métodos HTTP, rutas, campos requeridos vs. opcionales, tipos de datos, códigos de estado (200, 400, 401, 403, 404, 500) y payloads.
   - **Reglas de Negocio / Validaciones**: Formatos (regex), rangos numéricos, límites de caracteres (mínimo y máximo).

> [!TIP]
> Consulta la [Guía de Análisis de Entradas](./references/guia-analisis-entradas.md) para profundizar en las técnicas de partición de equivalencia y análisis de valores límite.

---

### Paso 2: Clasificación y Cobertura de Pruebas

Para cada Criterio de Aceptación y regla identificada en las entradas, define casos que cubran las siguientes dimensiones según aplique:

1. **Casos Positivos (Camino Feliz / Happy Path)**:
   - Verifican que el flujo transcurra con éxito utilizando combinaciones de datos válidos.
2. **Casos Negativos (Manejo de Errores)**:
   - Verifican que los errores estipulados en la HU o en los adjuntos se muestren adecuadamente cuando se violan las reglas (ej. campos vacíos obligatorios, credenciales erróneas).
3. **Casos de Límite y Borde (BVA)**:
   - Verifican valores en los extremos permitidos y no permitidos (ej. longitud mínima - 1, longitud mínima exacta, longitud máxima exacta, longitud máxima + 1).
4. **Casos de Seguridad / Permisos (si está en la HU)**:
   - Verifican accesos restringidos para usuarios con roles no autorizados o sesiones inválidas.

---

### Paso 3: Redacción del Caso de Prueba Accionable

Cada caso de prueba debe redactarse siguiendo la [Plantilla Estándar](./resources/plantilla-casos-prueba.md) con los siguientes campos:

*   **ID**: Identificador único y secuencial (ej. `CP-001`, `CP-002`).
*   **Título**: Descripción concisa de la acción y el resultado esperado (ej. *"Validar mensaje de error cuando el campo correo está vacío"*).
*   **Criterio de Aceptación Asociado**: Referencia explícita al criterio o regla (ej. `AC-1`, `BR-02`).
*   **Tipo de Prueba**: `Positivo`, `Negativo`, `Límite`, `Seguridad` o `UI`.
*   **Prioridad**: `Alta`, `Media` o `Baja`.
*   **Precondiciones**: Estado necesario previo a la ejecución (sesión activa, rol asignado, existencia previa de datos).
*   **Datos de Prueba**: Valores específicos y tangibles (ej. `"usuario@empresa.com"`, `"Clave1234"`).
*   **Pasos de Ejecución**: Pasos numerados, reproducibles y sin ambigüedades.
*   **Resultado Esperado**: Comportamiento exacto y observable (mensaje textual, redirección de URL, código HTTP).

---

### Paso 4: Detección de Vacíos y Preguntas al Product Owner

Al finalizar la entrega de casos de prueba, añade **siempre** la sección de preguntas y ambigüedades detectadas:

- **Casos no especificados**: Indicar claramente qué situaciones no están definidas en la HU (ej. tiempo de expiración de token, bloqueo por reintentos fallidos, caracteres especiales admitidos).
- **Riesgos potenciales**: Señalar inconsistencias entre los criterios de aceptación y los adjuntos (ej. el wireframe muestra un campo que no está en la HU o viceversa).

---

## Recursos y Referencias Incluidos

- [Plantilla de Casos de Prueba](./resources/plantilla-casos-prueba.md): Formato detallado y formato tabular para exportación.
- [Guía de Análisis de Entradas](./references/guia-analisis-entradas.md): Metodología de análisis de contratos, UI y valores límite.
- [Ejemplo Completo de Generación](./examples/ejemplo-generacion.md): Demostración práctica de una HU con adjunto procesada según este estándar.
