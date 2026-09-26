# Datos y Combinaciones para Pruebas Unitarias - TC_CU_001 (Registro de Usuario)

Este documento detalla los valores de entrada y las matrices de combinación necesarias para lograr una cobertura completa en las pruebas unitarias (y de integración de componentes) para el registro de usuarios.

---

## 1. Pruebas Aisladas por Función (Particiones y Valores Límite)

### 1.1. Función `validarEmail(email)`
El objetivo es comprobar que el validador acepte formatos correctos y rechace cadenas mal formadas.

| Tipo de Prueba | Entrada (Input) | Resultado Esperado | Justificación |
| :--- | :--- | :--- | :--- |
| **Positivo (Estándar)** | `"juan.perez@example.com"` | `true` | Formato normal y común. |
| **Positivo (Símbolo +)** | `"juan+test@example.com"` | `true` | Muchos proveedores permiten el signo `+` para alias. |
| **Positivo (Subdominio)** | `"juan@mail.example.co.uk"` | `true` | Dominio compuesto válido. |
| **Negativo (Sin @)** | `"juan.perezexample.com"` | `false` | Falta el carácter obligatorio `@`. |
| **Negativo (Sin dominio)** | `"juan.perez@"` | `false` | Falta todo el texto posterior a la arroba. |
| **Negativo (Sin usuario)** | `"@example.com"` | `false` | Falta todo el texto previo a la arroba. |
| **Negativo (Espacios)** | `"juan perez@example.com"` | `false` | Los espacios no están permitidos en un correo. |
| **Negativo (Múltiples @)**| `"juan@perez@example.com"` | `false` | Solo debe existir un `@`. |

### 1.2. Función `validarContrasena(password)`
*Políticas: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.*

| Tipo de Prueba | Entrada (Input) | Resultado Esperado | Justificación |
| :--- | :--- | :--- | :--- |
| **Positivo (Fuerte)** | `"P@ssw0rd2026!"` | `true` | Cumple todas las reglas ampliamente. |
| **Positivo (Límite)** | `"A1!bcdEf"` | `true` | Cumple las reglas y tiene exactamente 8 caracteres. |
| **Negativo (Muy corta)** | `"A1!bcde"` | `false` | Falla por longitud (7 caracteres). |
| **Negativo (Sin Mayúsc.)**| `"a1!bcdefg"` | `false` | Falla por no tener letra mayúscula. |
| **Negativo (Sin Minúsc.)**| `"A1!BCDEFG"` | `false` | Falla por no tener letra minúscula. |
| **Negativo (Sin Números)**| `"A!bcdefgh"` | `false` | Falla por no contener al menos un dígito. |
| **Negativo (Sin Símbolos)**| `"A1bcdefgh"` | `false` | Falla por no tener un carácter especial. |
| **Negativo (Vacío)** | `""` | `false` | Falla por campo vacío / nulo. |

---

## 2. Matriz de Combinaciones (Tabla de Decisión: Email + Contraseña)

Cuando las validaciones individuales se integran en el servicio o controlador de registro, se deben evaluar en conjunto. Esta tabla muestra las 9 combinaciones posibles (Válido, Inválido, Vacío) y la salida esperada del sistema.

| Caso | Estado del Email | Estado de la Contraseña | Entrada de Ejemplo (Email, Password) | Salida Esperada (Resultado del Sistema) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | ✅ Válido | ✅ Válida | `("juan@test.com", "P@ssw0rd2026!")` | **Éxito (True/200).** Pasa la validación. |
| **2** | ✅ Válido | ❌ Inválida | `("juan@test.com", "A1!bcde")` | **Falla.** Error: "La contraseña no cumple las políticas". |
| **3** | ✅ Válido | ⚠️ Vacía | `("juan@test.com", "")` | **Falla.** Error: "La contraseña es obligatoria". |
| **4** | ❌ Inválido | ✅ Válida | `("juan.perez@", "P@ssw0rd2026!")` | **Falla.** Error: "Formato de email incorrecto". |
| **5** | ❌ Inválido | ❌ Inválida | `("juan.perez@", "A1!bcde")` | **Falla Múltiple.** Errores: "Email incorrecto" y "Contraseña inválida". |
| **6** | ❌ Inválido | ⚠️ Vacía | `("juan.perez@", "")` | **Falla Múltiple.** Errores: "Email incorrecto" y "Contraseña obligatoria". |
| **7** | ⚠️ Vacío | ✅ Válida | `("", "P@ssw0rd2026!")` | **Falla.** Error: "El email es obligatorio". |
| **8** | ⚠️ Vacío | ❌ Inválida | `("", "A1!bcde")` | **Falla Múltiple.** Errores: "Email obligatorio" y "Contraseña inválida". |
| **9** | ⚠️ Vacío | ⚠️ Vacía | `("", "")` | **Falla Total.** Error: "Todos los campos son obligatorios". |

> **Nota para el equipo de Desarrollo/QA:** 
> La Matriz de Combinaciones (Casos 4 al 9) es crítica para asegurar que la API o el frontend no detengan la validación en el primer error encontrado (ej. si el email falla, igual debe notificar al usuario que la contraseña también está vacía para evitar una mala experiencia de usuario).
