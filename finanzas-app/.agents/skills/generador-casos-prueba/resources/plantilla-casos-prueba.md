# Plantilla Estándar para Casos de Prueba

Utiliza esta estructura para documentar los casos de prueba generados. Cada caso debe ser auto-contenido, ejecutable y directamente trazable a la Historia de Usuario y sus adjuntos.

> [!IMPORTANT]
> El entregable final debe generarse como archivo HTML autocontenido en la carpeta `results/` bajo el nombre `caso de prueba <ID_HU>.html`, utilizando la [Plantilla HTML](./plantilla-caso-prueba.html).

---

## Formato Detallado por Caso de Prueba

```markdown
### [ID-CASO] - [Título claro, conciso y accionable]

- **Criterio de Aceptación / Regla**: [AC-X / Regla de negocio que valida]
- **Tipo de Prueba**: [Positivo (Camino Feliz) | Negativo | Límite / Borde | Seguridad / Permisos]
- **Prioridad**: [Alta | Media | Baja]
- **Precondiciones**:
  - [Precondición 1: Rol de usuario, estado de la sesión, configuración previa]
  - [Precondición 2: Estado inicial de los datos o de la entidad en el sistema]
- **Datos de Prueba**:
  - `[nombre_campo_1]`: "[valor_específico_de_prueba]"
  - `[nombre_campo_2]`: "[valor_específico_de_prueba]"
- **Pasos de Ejecución**:
  1. [Paso 1 detallado: Navegar a / Seleccionar / Hacer clic en...]
  2. [Paso 2 detallado: Ingresar los datos de prueba en los campos...]
  3. [Paso 3 detallado: Confirmar la acción pulsando...]
- **Resultado Esperado**:
  - [Comportamiento exacto del sistema: mensaje visible, código HTTP, cambio de estado o redirección según lo documentado en la HU/adjuntos]
- **Postcondiciones** (opcional):
  - [Estado final en el que queda la entidad o el sistema tras la prueba]
```

---

## Formato Tabular Resumen (Matriz de Ejecución Rápida)

Para revisiones ejecutivas o importación a herramientas de gestión (Jira, Zephyr, TestRail, Azure DevOps):

| ID Caso | Criterio (AC) | Tipo | Título / Objetivo | Datos Clave | Resultado Esperado | Prioridad |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CP-001` | AC-01 | Positivo | Registro exitoso con datos válidos obligatorios | Correo válido, password 8 car. | Mensaje de éxito "Registro completado" y redirección al Dashboard | Alta |
| `CP-002` | AC-02 | Negativo | Validación de campo obligatorio vacío | Email vacío | Mensaje de error visible "El correo es obligatorio" debajo del campo | Alta |
| `CP-003` | AC-03 | Límite | Longitud máxima permitida en campo nombre | Cadena de exactamente 50 caracteres | Se permite el guardado sin truncamiento ni error | Media |
