# Memoria del Producto - GeekRetail QA

**Última actualización:** 2026-09-23 21:48  
**Historias Evaluadas:** US-002 (Gestión de incorporación de nuevos empleados)

---

## 1. Módulos y Funcionalidades del Producto

### Módulo: Incorporación de Nuevos Empleados (US-002)
- **URL Base:** `https://testing1.geekqa.net/`
- **Propósito:** Registro de datos personales, laborales y contractuales de empleados de nuevo ingreso por parte del Administrador de Recursos Humanos.
- **Entidades Principales:**
  - Formulario de Registro (`#employeeForm`)
  - Tabla de Empleados Registrados (`#employeeTable`, `#tableBody`)

---

## 2. Áreas Inestables y Defectos Críticos Conocidos

### A. Integridad de Datos y Lógica de Negocio
- **Sobrescritura Crítica de Salario (`salary = 0`):**
  - **Ubicación:** `script` en cliente `testing1.geekqa.net`.
  - **Comportamiento:** La sentencia de validación utiliza el operador de asignación (`=`) en lugar de comparación (`<=`), provocando que la variable `salary` sea forzada a `0` antes de insertarse en la tabla `#employeeTable`.
  - **Impacto:** Ningún empleado registrado conserva su salario real; se guardan con salario $0.
  - **Bug ID:** `BUG-US-002-03` / `BUG-US-002-04`.

- **Inconsistencia Lógica en Validación de Edad:**
  - **Ubicación:** `if (age < 5 || age > 60)`.
  - **Comportamiento:** Permite el registro de menores de edad (16 años pasa sin error) y bloquea a adultos mayores entre 61 y 65 años (ej. 62 años es rechazado con mensaje que indica que el rango permitido es 18 a 65).
  - **Bug ID:** `BUG-US-002-01` / `BUG-US-002-02`.

- **Fuga en Validación de Género:**
  - **Ubicación:** `if (!gender) { ... hasError = false; }`.
  - **Comportamiento:** El flag de error se desactiva explícitamente a `false`, permitiendo registrar empleados sin género (`gender: undefined`).
  - **Bug ID:** `BUG-US-002-05`.

- **Discrepancias de Longitud de Campos:**
  - `address`: La condición valida `< 2`, pero el mensaje de error exige al menos 10 caracteres.
  - `phone`: La condición valida `< 5`, pero el mensaje exige al menos 10 dígitos.

- **Discrepancia en Mensaje de Confirmación:**
  - El criterio de aceptación exige: `"¡Empleado registrado con éxito!"`.
  - La UI entrega: `"Empleado registrado exitosamente!"`.
  - **Bug ID:** `BUG-US-002-06`.

---

## 3. Accesibilidad y Estándares WCAG 2.2 AA
- **Puntaje Global:** 76/100 (No Conforme).
- **Problemas Detectados:**
  1. Radio buttons de género sin agrupación formal (`<fieldset>` y `<legend>`).
  2. Elemento Checkbox `#contractStatus` sin etiqueta accesible vinculada.
  3. Contraste de color insuficiente en textos de estado y mensajes de alerta.

---

## 4. Rendimiento Técnico (Lighthouse)
- **Rendimiento:** 98/100 (Excelente, DOM ligero y carga ultra rápida).
- **Mejores Prácticas:** 92/100.
- **SEO:** 90/100.
- **Accesibilidad:** 76/100 (Requiere remediación).
