# Feature File: TC_CU_001 - Registro de Usuario

```gherkin
# language: es
Característica: Gestión de Cuentas de Usuario - Registro
  Como visitante de Style Haven
  Quiero poder crear una cuenta usando mi correo electrónico
  Para poder realizar compras y guardar mis preferencias

  # Caso TC_CU_001 Original (Happy Path)
  Escenario: Registro exitoso de un nuevo usuario
    Dado que un visitante se encuentra en la página de "Registro"
    Y no existe una cuenta registrada con el correo "juan.perez@example.com"
    Cuando el visitante ingresa su nombre "Juan Pérez"
    Y ingresa el correo electrónico "juan.perez@example.com"
    Y ingresa la contraseña válida "P@ssw0rd2026!"
    Y hace clic en el botón "Registrarse"
    Entonces el sistema debe crear la cuenta exitosamente
    Y el sistema debe enviar un correo de bienvenida a "juan.perez@example.com"
    Y debe redirigir al usuario a la página principal con su sesión iniciada

  # Integración de la Matriz de Pruebas Unitarias (Data-Driven)
  Esquema del escenario: Validaciones de campos en el formulario de registro
    Dado que un visitante se encuentra en la página de "Registro"
    Cuando ingresa el correo electrónico "<email>"
    Y ingresa la contraseña "<password>"
    Y hace clic en el botón "Registrarse"
    Entonces el sistema debe mostrar el mensaje de error "<mensaje_esperado>"
    Y la cuenta no debe ser creada

    Ejemplos:
      | email                   | password      | mensaje_esperado                                     |
      | juan.perez@example.com  | A1!bcde       | La contraseña no cumple las políticas                |
      | juan.perez@example.com  |               | La contraseña es obligatoria                         |
      | juan.perez@             | P@ssw0rd2026! | Formato de email incorrecto                          |
      | juan.perez@             | A1!bcde       | Email incorrecto y Contraseña inválida               |
      |                         | P@ssw0rd2026! | El email es obligatorio                              |
      |                         |               | Todos los campos son obligatorios                    |
```
