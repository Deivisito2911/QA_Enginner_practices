# Guía de Análisis de Entradas Requeridas y Cobertura de Pruebas

Esta guía detalla el protocolo riguroso para examinar y descomponer las entradas provistas en una Historia de Usuario (HU) y sus adjuntos antes de redactar cualquier caso de prueba.

---

## 1. Principio de Cero Suposición (Zero-Assumption Rule)

Al diseñar casos de prueba a partir de especificaciones de negocio:
- **Solo lo documentado es verificable**: Cada precondición, paso y resultado esperado debe tener sustento directo en la HU, en sus criterios de aceptación o en los adjuntos provistos.
- **Si falta información, no se asume**: Si la HU no define qué sucede ante un timeout, qué error mostrar ante un formato inválido o cuál es la longitud máxima de un campo, **no se inventa el comportamiento**. Se formula una pregunta u observación en la sección de *Ambigüedades / Dudas para el Product Owner*.
- **Comportamiento por defecto explícito**: Si un criterio dice "el botón se deshabilita", el caso de prueba verifica exactamente ese estado. No se añade navegación extra no solicitada.

---

## 2. Tipos de Entradas Requeridas y su Tratamiento

### A. Historia de Usuario Estándar
- **Título e ID**: Identificador único de la HU (ej. `HU-042`).
- **Declaración de Valor**:
  - *Como* [Rol/Actor con permisos específicos].
  - *Quiero* [Acción o funcionalidad concreta].
  - *Para* [Beneficio o meta de negocio].
  *Impacto en pruebas*: Define el actor principal, los permisos base requeridos y el propósito final de la prueba.

### B. Criterios de Aceptación (AC)
- Pueden presentarse en formato:
  - **Gherkin**: `Dado que... Cuando... Entonces...`
  - **Listas de Verificación (Checklists)** o **Reglas de Negocio (BR-xxx)**.
  *Impacto en pruebas*: Cada criterio de aceptación debe tener al menos un caso de prueba positivo y, si aplica, los correspondientes casos negativos o de borde.

### C. Adjuntos y Artefactos
1. **Wireframes / Diseños UI (Figma, imágenes, bocetos)**:
   - Validar etiquetas exactas, visibilidad de elementos, estados de componentes (activo, inactivo, deshabilitado, cargando, error visual).
   - Validar mensajes de retroalimentación textuales visibles en el diseño.
2. **Especificaciones de API / Contratos (OpenAPI, Swagger, JSON Schema)**:
   - Nombres de campos, tipos (string, number, boolean, uuid), formatos (email, date-time, regex).
   - Códigos de estado HTTP esperados (200, 201, 400, 401, 403, 404, 422, 500).
   - Estructura exacta del payload de solicitud (Request Body) y respuesta (Response Body).
3. **Matrices de Permisos / Roles**:
   - Roles autorizados vs. no autorizados.
   - Comportamiento esperado ante intentos de acceso denegado (pantalla 403, redirección, botón oculto).
4. **Diccionarios de Datos / Reglas de Validación**:
   - Longitudes mínimas y máximas.
   - Caracteres permitidos y restringidos (inyección SQL, scripts XSS básicos si aplica según regla).
   - Campos obligatorios (required) vs. opcionales.

---

## 3. Técnicas de Diseño de Casos de Prueba a Aplicar

Para garantizar cobertura completa sin redundancia, aplica las siguientes técnicas sobre las entradas identificadas:

### 1. Partición de Equivalencia (Equivalence Partitioning - EP)
Divide las entradas en clases válidas e inválidas:
- **Clase Válida**: Valores aceptados que disparan el camino feliz.
- **Clase Inválida**: Valores rechazados que deben activar validaciones específicas y mensajes de error definidos.

### 2. Análisis de Valores Límite (Boundary Value Analysis - BVA)
Para cualquier campo con rango numérico, fecha o límite de caracteres (ej. longitud entre 8 y 20 caracteres):
- Probar justo en el límite inferior (`8`) y justo por debajo (`7`).
- Probar un valor intermedio (`14`).
- Probar justo en el límite superior (`20`) y justo por encima (`21`).

### 3. Pruebas de Transición de Estados
Cuando la entidad de negocio cambia de estado (ej. `Borrador` -> `Enviado` -> `Aprobado` / `Rechazado`):
- Probar transiciones permitidas según los criterios.
- Probar que transiciones no permitidas sean bloqueadas.

---

## 4. Clasificación de Pruebas

- **CP-POS (Positivos / Happy Path)**: Flujos donde el usuario ingresa datos correctos y se logra el resultado exitoso esperado.
- **CP-NEG (Negativos / Manejo de Errores)**: Flujos donde se ingresan datos erróneos o se violan precondiciones, comprobando que el sistema responda con el control y mensaje especificado.
- **CP-BOR (Límites y Casos de Borde)**: Entradas en extremos de rangos, caracteres especiales permitidos, campos opcionales vacíos.
- **CP-SEC (Seguridad y Control de Acceso)**: Ejecución de la acción con rol no autorizado o sesión expirada (únicamente si está especificado en la HU/adjuntos).
