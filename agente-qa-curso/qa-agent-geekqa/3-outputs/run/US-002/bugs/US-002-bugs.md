# Reporte de Bugs Identificados - US-002

**Historia de Usuario:** US-002 - Gestión de incorporación de nuevos empleados  
**Fecha:** 23/9/2026, 9:46:32 p.m.  
**Total de Bugs Encontrados:** 6

---

## BUG-US-002-01: Permite el registro de empleados menores de 18 años debido a validación incorrecta de edad

- **Severidad:** Alta
- **Prioridad:** Alta
- **Categoría:** Lógica Funcional / Regla de Negocio

### Pasos para Reproducir:
1. Navegar a https://testing1.geekqa.net/.
2. Completar todos los campos con valores válidos.
3. En el campo "Edad", ingresar un valor menor a 18 (ejemplo: 16).
4. Presionar el botón "Registrar Empleado".

### Resultado Esperado:
El sistema debe rechazar el registro, mostrar el mensaje de error "La edad debe estar entre 18 y 65 años" y no agregar el empleado a la tabla.

### Resultado Actual:
El empleado de 16 años es registrado exitosamente en la tabla sin mostrar error alguno, debido a que la condición en código verifica `age < 5` en vez de `age < 18`.

### Evidencia:
![Captura de Evidencia](bugs/evidence/BUG-US-002-01.png)

---

## BUG-US-002-02: Bloquea el registro de empleados con edades válidas entre 61 y 65 años

- **Severidad:** Alta
- **Prioridad:** Alta
- **Categoría:** Lógica Funcional / Criterio de Aceptación

### Pasos para Reproducir:
1. Navegar a https://testing1.geekqa.net/.
2. Completar todos los campos con valores válidos.
3. En el campo "Edad", ingresar un valor entre 61 y 65 años (ejemplo: 62).
4. Presionar el botón "Registrar Empleado".

### Resultado Esperado:
El sistema debe permitir el registro exitoso del empleado según el AC 1 (rango permitido: 18 a 65 años).

### Resultado Actual:
El sistema bloquea el registro mostrando el error "La edad debe estar entre 18 y 65 años", debido a que la condición evalúa `age > 60`.

### Evidencia:
![Captura de Evidencia](bugs/evidence/BUG-US-002-02.png)

---

## BUG-US-002-03: Falta de validación para salarios iguales o menores a cero debido a operador de asignación

- **Severidad:** Crítica
- **Prioridad:** Alta
- **Categoría:** Lógica Funcional / Validación de Datos

### Pasos para Reproducir:
1. Navegar a https://testing1.geekqa.net/.
2. Ingresar datos válidos en todos los campos.
3. En "Salario Esperado", ingresar 0 o un número negativo.
4. Hacer clic en "Registrar Empleado".

### Resultado Esperado:
El sistema debe mostrar el mensaje de error "El salario debe ser mayor a 0" y detener el registro.

### Resultado Actual:
El formulario se envía con éxito y no muestra error alguno, ya que la condición está escrita como asignación `if (salary = 0)` la cual evalúa a falsy.

### Evidencia:
![Captura de Evidencia](bugs/evidence/BUG-US-002-03.png)

---

## BUG-US-002-04: El valor del salario se sobrescribe a 0 en la tabla de empleados registrados

- **Severidad:** Crítica
- **Prioridad:** Crítica
- **Categoría:** Integridad de Datos / Base de Datos de UI

### Pasos para Reproducir:
1. Navegar a https://testing1.geekqa.net/.
2. Completar todos los campos válidos e ingresar un salario positivo (ejemplo: 4500).
3. Hacer clic en "Registrar Empleado".
4. Inspeccionar la fila generada en la tabla "Empleados Registrados".

### Resultado Esperado:
La columna "Salario" debe mostrar el valor ingresado por el usuario (4500).

### Resultado Actual:
La columna "Salario" muestra siempre "0", debido a que la sentencia `if (salary = 0)` reasigna la variable a 0 antes de insertarla en el DOM.

### Evidencia:
![Captura de Evidencia](bugs/evidence/BUG-US-002-04.png)

---

## BUG-US-002-05: Omisión del bloqueo de registro cuando no se selecciona género

- **Severidad:** Media
- **Prioridad:** Media
- **Categoría:** Validación de Formulario / Flujo de Control

### Pasos para Reproducir:
1. Navegar a https://testing1.geekqa.net/.
2. Completar todos los campos excepto la opción de "Género".
3. Presionar "Registrar Empleado".

### Resultado Esperado:
El sistema debe mostrar el error "Seleccione un género" y bloquear la inserción en la tabla.

### Resultado Actual:
Se muestra el texto de error pero el empleado es insertado en la tabla con valor "undefined", porque el código ejecuta `hasError = false;` anulando el bloqueo.

### Evidencia:
![Captura de Evidencia](bugs/evidence/BUG-US-002-05.png)

---

## BUG-US-002-06: Discrepancia en el texto del mensaje de confirmación de registro

- **Severidad:** Baja
- **Prioridad:** Baja
- **Categoría:** UI / Mensajes de Usuario

### Pasos para Reproducir:
1. Registrar un empleado con datos válidos.
2. Verificar el texto del mensaje verde de confirmación.

### Resultado Esperado:
El mensaje debe ser exactamente: "¡Empleado registrado con éxito!" (según AC 1).

### Resultado Actual:
El sistema muestra: "Empleado registrado exitosamente!".

### Evidencia:
![Captura de Evidencia](bugs/evidence/BUG-US-002-06.png)

---
