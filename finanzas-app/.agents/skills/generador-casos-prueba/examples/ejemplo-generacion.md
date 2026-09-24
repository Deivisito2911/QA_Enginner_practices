# Ejemplo Práctico: Generación de Casos de Prueba

Este ejemplo ilustra cómo aplicar la regla de **cero suposición** y el análisis exhaustivo de entradas al procesar una Historia de Usuario con adjuntos.

---

## 1. Entrada Provista por el Usuario

### Historia de Usuario
**ID**: `HU-AUTH-101`  
**Título**: Inicio de sesión de usuarios registrados  
**Descripción**:  
*Como* cliente registrado  
*Quiero* ingresar mis credenciales de acceso (correo y contraseña)  
*Para* acceder a mi panel personal y gestionar mis vehículos.

### Criterios de Aceptación (AC)
- **AC-1**: El formulario debe solicitar "Correo electrónico" y "Contraseña". Ambos son obligatorios.
- **AC-2**: La contraseña debe tener entre 8 y 16 caracteres.
- **AC-3**: Si las credenciales coinciden con un usuario activo en el sistema, debe redirigir a `/panel-usuario` y mostrar un mensaje emergente "Bienvenido de vuelta".
- **AC-4**: Si el usuario o contraseña no coinciden, debe mostrar el mensaje en color rojo: "Credenciales incorrectas. Intente nuevamente".
- **AC-5**: El botón "Iniciar Sesión" debe permanecer deshabilitado hasta que ambos campos contengan al menos un carácter.

### Adjunto 1: Especificación del Endpoint (OpenAPI fragment)
```json
POST /api/v1/auth/login
Content-Type: application/json
Body:
{
  "email": "string (format: email, required)",
  "password": "string (min: 8, max: 16, required)"
}
Responses:
200 OK: { "token": "string", "redirectUrl": "/panel-usuario" }
401 Unauthorized: { "error": "Credenciales incorrectas. Intente nuevamente" }
```

---

## 2. Análisis de Entradas Realizado por el Agente

1. **Campos identificados**:
   - `email`: Obligatorio, formato email.
   - `password`: Obligatorio, longitud mín. 8, máx. 16.
2. **Estados del botón**: Deshabilitado con campos vacíos; habilitado cuando ambos tienen texto.
3. **Flujos esperados explícitos**:
   - Éxito (200 OK): Redirección a `/panel-usuario`, toast "Bienvenido de vuelta".
   - Error 401: Mensaje rojo "Credenciales incorrectas. Intente nuevamente".
4. **Límites de prueba (BVA)**:
   - Contraseña de 7 caracteres (inválido).
   - Contraseña de 8 caracteres (límite inferior válido).
   - Contraseña de 16 caracteres (límite superior válido).
   - Contraseña de 17 caracteres (inválido).
5. **Ambigüedades detectadas (Preguntas al PO)**:
   - La HU no especifica límite de intentos fallidos antes de bloquear la cuenta.
   - La HU no especifica qué mensaje debe aparecer si el email tiene formato incorrecto (ej. sin `@`).

---

## 3. Casos de Prueba Accionables Generados

### CP-001: Inicio de sesión exitoso con credenciales válidas
- **Criterio**: AC-1, AC-3
- **Tipo**: Positivo (Camino Feliz)
- **Prioridad**: Alta
- **Precondiciones**: Existe un usuario activo registrado con email `usuario.prueba@dominio.com` y contraseña `Password123#`.
- **Datos de Prueba**:
  - `email`: "usuario.prueba@dominio.com"
  - `password`: "Password123#"
- **Pasos**:
  1. Navegar a la página de login `/login`.
  2. Escribir "usuario.prueba@dominio.com" en el campo "Correo electrónico".
  3. Escribir "Password123#" en el campo "Contraseña".
  4. Verificar que el botón "Iniciar Sesión" se encuentre habilitado.
  5. Hacer clic en "Iniciar Sesión".
- **Resultado Esperado**:
  - Se genera respuesta HTTP 200 con token.
  - El navegador redirige a `/panel-usuario`.
  - Se muestra el mensaje "Bienvenido de vuelta".

---

### CP-002: Estado del botón Iniciar Sesión con campos vacíos
- **Criterio**: AC-5
- **Tipo**: Negativo / UI
- **Prioridad**: Media
- **Precondiciones**: Usuario en `/login`.
- **Datos de Prueba**: Ambos campos vacíos `""`.
- **Pasos**:
  1. Cargar la página de login.
  2. Observar el estado del botón "Iniciar Sesión".
- **Resultado Esperado**:
  - El botón "Iniciar Sesión" se encuentra en estado deshabilitado (no cliqueable).

---

### CP-003: Contraseña en límite inferior válido (8 caracteres)
- **Criterio**: AC-2
- **Tipo**: Límite / BVA
- **Prioridad**: Media
- **Precondiciones**: Usuario activo con contraseña de 8 caracteres (`P@ssw0rd`).
- **Datos de Prueba**:
  - `email`: "usuario8@dominio.com"
  - `password`: "P@ssw0rd" (8 caracteres exactos)
- **Pasos**:
  1. Ingresar credenciales en el formulario.
  2. Hacer clic en "Iniciar Sesión".
- **Resultado Esperado**:
  - El sistema acepta la contraseña sin validaciones de longitud fallidas y redirige a `/panel-usuario`.

---

### CP-004: Credenciales erróneas / no coincidentes
- **Criterio**: AC-4
- **Tipo**: Negativo
- **Prioridad**: Alta
- **Precondiciones**: Usuario en `/login`.
- **Datos de Prueba**:
  - `email`: "usuario.inexistente@dominio.com"
  - `password`: "ClaveInvalida123"
- **Pasos**:
  1. Ingresar los datos de prueba.
  2. Hacer clic en "Iniciar Sesión".
- **Resultado Esperado**:
  - El sistema responde con HTTP 401 Unauthorized.
  - No se produce redirección.
  - Se visualiza el texto en color rojo: "Credenciales incorrectas. Intente nuevamente".

---

## 4. Observaciones y Dudas para el Product Owner (PO)

> [!NOTE] Cuestiones fuera del alcance de la HU que requieren definición:
> 1. **Políticas de bloqueo**: No se indica si tras N intentos fallidos se debe bloquear la cuenta o solicitar captcha.
> 2. **Formato de email inválido**: La especificación OpenAPI indica formato email, pero la HU no define el texto de error visible en pantalla cuando se ingresa una cadena no válida (ej. `correo_sin_arroba`).
