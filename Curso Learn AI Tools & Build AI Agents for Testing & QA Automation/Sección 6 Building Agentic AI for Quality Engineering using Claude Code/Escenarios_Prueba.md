markdown

# Escenarios de Prueba — EventHub

## 1. Alcance

Este documento contiene escenarios funcionales para validar los flujos críticos de EventHub en UI y API:

- Registro e inicio de sesión.
- Consulta de eventos.
- Creación, modificación y eliminación de eventos.
- Reserva de entradas.
- Consulta de reservas.
- Autenticación y autorización.
- Aislamiento de información entre usuarios.
- Validaciones de negocio.
- Control de disponibilidad y prevención de sobreventa.
- Estados de carga, vacío y error en la interfaz.

## 2. Datos de prueba

| Identificador | Descripción |
|---|---|
| `USER_A` | Usuario normal sin reservas |
| `USER_B` | Usuario normal con eventos propios |
| `USER_C` | Usuario normal utilizado para validar acceso no autorizado |
| `ADMIN_USER` | Usuario administrativo, si existe soporte de roles |
| `STATIC_EVENT` | Evento estático con `isStatic = true` |
| `USER_EVENT` | Evento creado por `USER_B` |
| `SINGLE_SEAT_EVENT` | Evento con un único asiento disponible |
| `SOLD_OUT_EVENT` | Evento con `availableSeats = 0` |
| `FREE_EVENT` | Evento con precio `0` |
| `FUTURE_EVENT` | Evento con fecha futura |
| `PAST_EVENT` | Evento con fecha pasada, usado para validaciones negativas |

---

# 3. Escenarios de camino feliz

## TC-001 — Registro exitoso de un usuario

**Categoría:** Happy Path
**Prioridad:** P1
**Capa sugerida:** API + E2E

### Precondiciones

- El correo utilizado no existe.
- La aplicación y la API están disponibles.

### Pasos

1. Abrir la pantalla de registro.
2. Introducir un correo válido.
3. Introducir una contraseña válida.
4. Completar los campos obligatorios.
5. Enviar el formulario.
6. Consultar el resultado de la operación.

### Resultados esperados

- El usuario se crea correctamente.
- La API responde con el código de éxito definido en Swagger.
- La contraseña no se devuelve en la respuesta.
- La contraseña se almacena cifrada.
- La UI muestra un mensaje de confirmación o redirige al flujo definido.
- El usuario puede iniciar sesión con las credenciales creadas.

### Regla relacionada

El correo del usuario debe ser único y la contraseña debe almacenarse mediante hashing.

---

## TC-002 — Inicio de sesión exitoso

**Categoría:** Happy Path
**Prioridad:** P0
**Capa sugerida:** API + E2E

### Precondiciones

- Existe un usuario registrado.

### Pasos

1. Abrir la pantalla de login.
2. Introducir un correo válido.
3. Introducir la contraseña correcta.
4. Enviar el formulario.
5. Navegar a una página protegida.
6. Recargar la página.

### Resultados esperados

- La autenticación es exitosa.
- La respuesta contiene el token JWT definido por el API.
- El usuario puede acceder a recursos protegidos.
- La sesión se mantiene durante la navegación y recarga.
- La UI muestra el estado autenticado.

### Regla relacionada

El JWT tiene una vigencia definida de siete días.

---

## TC-003 — Consulta del listado de eventos

**Categoría:** Happy Path
**Prioridad:** P0
**Capa sugerida:** API + E2E

### Precondiciones

- Existen eventos estáticos y/o eventos creados por usuarios.

### Pasos

1. Abrir la página de eventos.
2. Esperar a que finalice la carga.
3. Revisar las tarjetas o filas de eventos.
4. Seleccionar un evento.
5. Abrir su detalle.

### Resultados esperados

- La API devuelve los eventos disponibles.
- Cada evento muestra:
  - Título.
  - Categoría.
  - Venue.
  - Ciudad.
  - Fecha.
  - Precio.
  - Asientos disponibles.
- El detalle corresponde al evento seleccionado.
- La UI no muestra datos internos que no correspondan al usuario.

---

## TC-004 — Consulta de detalle de evento

**Categoría:** Happy Path
**Prioridad:** P0
**Capa sugerida:** API + E2E

### Precondiciones

- Existe un evento válido.

### Pasos

1. Obtener el identificador del evento.
2. Consultar el detalle mediante API.
3. Abrir el detalle desde la UI.
4. Comparar los datos mostrados.

### Resultados esperados

- La API devuelve el evento correcto.
- El identificador, título, categoría, ciudad, fecha, precio y disponibilidad son consistentes.
- La UI muestra la información recibida.
- El evento permite iniciar una reserva si es elegible.

---

## TC-005 — Creación de un evento propio

**Categoría:** Happy Path
**Prioridad:** P1
**Capa sugerida:** API + E2E

### Precondiciones

- `USER_B` está autenticado.
- No se ha superado el límite de eventos del sandbox.

### Datos

```json
{
  "title": "Conferencia de Tecnología",
  "description": "Evento de prueba",
  "category": "Conference",
  "venue": "Centro de Convenciones",
  "city": "Delhi",
  "eventDate": "fecha futura",
  "price": 100,
  "totalSeats": 50
}
Pasos
Iniciar sesión como USER_B.
Abrir el formulario de creación.
Completar los campos válidos.
Enviar el formulario.
Consultar el evento creado.
Revisar su disponibilidad.
Resultados esperados
El evento se crea correctamente.
El evento queda asociado a USER_B.
isStatic es false.
availableSeats se inicializa con el valor de totalSeats.
El evento aparece en el listado.
La UI muestra confirmación de creación.
Reglas relacionadas
title y venue son obligatorios.
La fecha debe ser futura.
price >= 0.
totalSeats >= 1.
TC-006 — Modificación de un evento propio
Categoría: Happy Path Prioridad: P1 Capa sugerida: API + E2E

Precondiciones
USER_B es propietario de USER_EVENT.
El evento no es estático.
Pasos
Iniciar sesión como USER_B.
Abrir el detalle o formulario de edición.
Cambiar el título y la descripción.
Guardar los cambios.
Consultar nuevamente el evento.
Resultados esperados
La modificación es exitosa.
Los campos actualizados muestran los nuevos valores.
El propietario no cambia.
isStatic continúa siendo false.
La UI actualiza el evento sin requerir datos inconsistentes.
TC-007 — Eliminación de un evento propio
Categoría: Happy Path Prioridad: P1 Capa sugerida: API + E2E

Precondiciones
USER_B es propietario de USER_EVENT.
Pasos
Iniciar sesión como USER_B.
Abrir el evento.
Seleccionar eliminar.
Confirmar la operación.
Consultar el listado.
Intentar abrir el evento eliminado.
Resultados esperados
El evento se elimina correctamente.
El evento deja de aparecer en el listado.
El detalle devuelve el comportamiento 404 definido.
Las reservas relacionadas siguen la política de cascada definida por el dominio.
La UI muestra confirmación de eliminación.
TC-008 — Creación de una reserva válida
Categoría: Happy Path Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
El usuario está autenticado.
Existe FUTURE_EVENT con disponibilidad suficiente.
Datos
json

{
  "customerName": "Ana Pérez",
  "customerEmail": "ana@example.test",
  "customerPhone": "9876543210",
  "quantity": 2
}
Pasos
Abrir el detalle de FUTURE_EVENT.
Seleccionar dos entradas.
Completar los datos del cliente.
Confirmar la reserva.
Consultar la respuesta.
Consultar el listado de reservas.
Consultar el detalle de la reserva.
Resultados esperados
La reserva se crea correctamente.
El estado es confirmed.
totalPrice equivale a price × quantity.
Se genera un bookingRef único.
El formato de la referencia es [FIRST_LETTER]-[6_RANDOM].
availableSeats disminuye en dos.
La reserva queda asociada al usuario autenticado.
La UI muestra la confirmación y la referencia.
TC-009 — Consulta de reservas propias
Categoría: Happy Path Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
El usuario tiene al menos una reserva.
Pasos
Iniciar sesión.
Abrir la página de reservas.
Seleccionar una reserva.
Abrir su detalle.
Resultados esperados
Se muestran las reservas del usuario autenticado.
Cada reserva muestra referencia, evento, cantidad, total y estado.
El detalle corresponde a la reserva seleccionada.
No se muestran reservas de otros usuarios.
4. Escenarios de reglas de negocio
TC-100 — Validación de categoría permitida
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API

Pasos
Enviar un evento con categoría Conference.
Repetir con Concert, Sports, Workshop y Festival.
Enviar un evento con una categoría no permitida.
Resultados esperados
Las categorías permitidas son aceptadas.
La categoría desconocida es rechazada.
La API devuelve un error de validación.
El evento inválido no se persiste.
TC-101 — Validación de ciudad permitida
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API

Valores permitidos
Bangalore
Mumbai
Hyderabad
Delhi
Chennai
Resultados esperados
Las ciudades permitidas son aceptadas.
Una ciudad fuera del catálogo es rechazada.
No se crea el evento inválido.
TC-102 — Fecha futura obligatoria
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API

Pasos
Crear un evento con fecha futura.
Crear un evento con fecha actual.
Crear un evento con fecha pasada.
Resultados esperados
La fecha futura es aceptada.
La fecha actual se comporta según la regla documentada.
La fecha pasada es rechazada.
La API devuelve un error de validación.
La UI muestra el mensaje junto al campo correspondiente.
TC-103 — Precio válido y precio cero
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API

Pasos
Crear un evento con precio 100.
Crear un evento con precio 0.
Crear un evento con precio negativo.
Resultados esperados
Los precios positivos son aceptados.
El precio cero es aceptado.
El precio negativo es rechazado.
El cálculo de reserva para un evento gratuito produce un total igual a cero.
TC-104 — Número válido de asientos
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API

Pasos
Crear un evento con totalSeats = 1.
Crear un evento con totalSeats = 50.
Crear un evento con totalSeats = 0.
Crear un evento con totalSeats = -1.
Resultados esperados
Los valores mayores o iguales a uno son aceptados.
Cero y valores negativos son rechazados.
availableSeats se inicializa correctamente.
TC-105 — Cantidad mínima y máxima de entradas
Categoría: Business Rule Prioridad: P0 Capa sugerida: Unit + API

Valores a probar
0
1
2
10
11
-1
1.5
Resultados esperados
Las cantidades entre 1 y 10 son aceptadas.
Cero, negativos, decimales y valores mayores que 10 son rechazados.
El error se devuelve antes de crear la reserva.
TC-106 — Validación de datos del cliente
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API + Component

Casos
customerName con dos caracteres.
customerName con un carácter.
Email válido.
Email inválido.
Teléfono con diez dígitos.
Teléfono con menos de diez dígitos.
Resultados esperados
El nombre con al menos dos caracteres es válido.
El nombre de un carácter es inválido.
Solo se aceptan emails con formato válido.
El teléfono debe cumplir la longitud mínima.
La UI muestra errores específicos por campo.
TC-107 — Cálculo del precio total en servidor
Categoría: Business Rule Prioridad: P0 Capa sugerida: Unit + API

Pasos
Crear o identificar un evento con precio 100.
Enviar una reserva con cantidad 3.
Incluir un totalPrice manipulado en el payload, por ejemplo 1.
Consultar la reserva creada.
Resultados esperados
El servidor calcula totalPrice = 300.
El valor enviado por el cliente se ignora.
La respuesta y la base de datos contienen el total calculado por servidor.
TC-108 — Generación de referencia de reserva
Categoría: Business Rule Prioridad: P1 Capa sugerida: Unit + API

Pasos
Crear varias reservas válidas.
Obtener el bookingRef de cada una.
Comparar formato y unicidad.
Resultados esperados
Cada referencia sigue el formato [FIRST_LETTER]-[6_RANDOM].
Las referencias no se repiten.
La primera letra corresponde a la regla documentada.
Una colisión se resuelve sin crear duplicados.
TC-109 — Evento estático inmutable
Categoría: Business Rule Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
Existe STATIC_EVENT.
Pasos
Autenticar un usuario normal.
Intentar modificar el evento estático.
Intentar eliminarlo.
Intentar cambiar isStatic.
Consultar el evento original.
Resultados esperados
Las operaciones de modificación y eliminación son rechazadas.
isStatic no puede ser cambiado desde el cliente.
Los datos originales permanecen intactos.
La respuesta utiliza el código de autorización o validación definido.
5. Escenarios de seguridad y autorización
TC-200 — Acceso a endpoint protegido sin token
Categoría: Security Prioridad: P0 Capa sugerida: API

Pasos
Eliminar el header Authorization.
Solicitar una operación protegida.
Repetir con un header vacío.
Resultados esperados
La API rechaza la solicitud.
No se devuelve información privada.
La respuesta utiliza el código de autenticación definido en Swagger.
TC-201 — Token inválido o expirado
Categoría: Security Prioridad: P0 Capa sugerida: API

Pasos
Enviar un token malformado.
Enviar un token firmado con una clave incorrecta.
Enviar un token expirado.
Intentar consultar eventos o reservas protegidas.
Resultados esperados
Todas las solicitudes no autorizadas son rechazadas.
No se filtra información interna.
La UI redirige al login cuando corresponde.
TC-202 — Usuario intenta consultar una reserva ajena
Categoría: Security Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
USER_A tiene una reserva.
USER_B está autenticado.
Pasos
Obtener el ID de la reserva de USER_A.
Autenticar como USER_B.
Consultar el detalle usando el ID de USER_A.
Intentar acceder modificando directamente la URL en la UI.
Resultados esperados
USER_B no puede acceder a la reserva.
No se exponen datos del cliente, email, teléfono o total.
La UI muestra acceso denegado o recurso no disponible.
TC-203 — Usuario intenta modificar un evento ajeno
Categoría: Security Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
USER_A es propietario de un evento.
USER_B está autenticado.
Pasos
Autenticar como USER_B.
Enviar una solicitud de actualización sobre el evento de USER_A.
Intentar la misma operación desde la UI.
Resultados esperados
La API rechaza la operación.
El evento permanece sin cambios.
No se acepta un userId enviado por el cliente para cambiar la propiedad.
TC-204 — Manipulación de identidad en payload
Categoría: Security Prioridad: P0 Capa sugerida: API

Pasos
Autenticar como USER_A.
Crear un evento enviando userId de USER_B.
Crear una reserva enviando un userId distinto.
Consultar los registros creados.
Resultados esperados
La identidad se obtiene del JWT.
Los valores manipulados son ignorados o rechazados.
Los registros pertenecen exclusivamente al usuario autenticado.
TC-205 — Acceso no autorizado al área administrativa
Categoría: Security Prioridad: P1 Capa sugerida: API + E2E

Pasos
Autenticar como usuario normal.
Navegar directamente a la ruta administrativa.
Invocar directamente los endpoints administrativos.
Repetir la prueba sin autenticación.
Resultados esperados
El usuario normal no puede acceder.
Los endpoints devuelven un error de autorización.
La UI no permite saltarse la restricción usando una URL directa.
6. Escenarios negativos
TC-300 — Registro con correo duplicado
Categoría: Negative Prioridad: P1 Capa sugerida: API + E2E

Pasos
Registrar un usuario con un correo válido.
Intentar registrarlo nuevamente con el mismo correo.
Resultados esperados
La segunda operación es rechazada.
No se crea un segundo usuario.
La respuesta utiliza el código de conflicto o validación definido.
La UI muestra un mensaje comprensible.
TC-301 — Login con credenciales incorrectas
Categoría: Negative Prioridad: P1 Capa sugerida: API + E2E

Casos
Correo inexistente.
Contraseña incorrecta.
Correo vacío.
Contraseña vacía.
Resultados esperados
No se emite un JWT.
El usuario permanece sin autenticar.
La UI muestra un error sin revelar información sensible.
TC-302 — Creación de evento con campos obligatorios ausentes
Categoría: Negative Prioridad: P1 Capa sugerida: API + Component

Pasos
Enviar un evento sin título.
Enviar un evento sin venue.
Enviar un evento sin fecha.
Enviar un evento sin categoría.
Repetir desde el formulario UI.
Resultados esperados
Cada payload inválido es rechazado.
La API devuelve errores por campo.
La UI marca los campos obligatorios.
No se crea ningún evento incompleto.
TC-303 — Reserva de evento inexistente
Categoría: Negative Prioridad: P0 Capa sugerida: API + E2E

Pasos
Enviar una solicitud de reserva con un eventId inexistente.
Intentar abrir el mismo ID desde la UI.
Resultados esperados
La API devuelve 404 o el código definido.
No se crea la reserva.
La UI muestra un estado de recurso no encontrado.
TC-304 — Reserva sin disponibilidad
Categoría: Negative Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
SOLD_OUT_EVENT tiene availableSeats = 0.
Pasos
Intentar reservar una entrada.
Repetir modificando el payload para enviar una cantidad válida.
Intentar la operación desde la UI.
Resultados esperados
La reserva es rechazada.
No se modifica availableSeats.
No se crea una reserva parcial.
La UI deshabilita o informa que el evento está agotado.
TC-305 — Reserva superior a la disponibilidad
Categoría: Negative Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
El evento tiene cinco asientos disponibles.
Pasos
Intentar reservar seis entradas.
Repetir con una cantidad válida menor o igual a diez, pero superior a la disponibilidad.
Resultados esperados
La operación es rechazada.
La disponibilidad no se vuelve negativa.
No se crea ninguna reserva.
Se informa claramente que no hay suficientes asientos.
TC-306 — Doble envío de reserva
Categoría: Negative Prioridad: P0 Capa sugerida: API + E2E

Pasos
Completar el formulario de reserva.
Hacer doble clic rápidamente en el botón de confirmación.
Enviar solicitudes repetidas a nivel API.
Resultados esperados
La UI deshabilita el botón durante el envío o evita la duplicación.
No se crean reservas duplicadas accidentalmente.
Las respuestas son consistentes.
La referencia de reserva es única.
7. Escenarios de casos límite
TC-400 — Reserva del último asiento
Categoría: Edge Case Prioridad: P0 Capa sugerida: API + E2E

Precondiciones
SINGLE_SEAT_EVENT tiene exactamente un asiento disponible.
Pasos
Reservar una entrada.
Consultar la reserva.
Consultar el evento.
Intentar una segunda reserva.
Resultados esperados
La primera reserva es exitosa.
availableSeats pasa a cero.
La segunda reserva es rechazada.
No se generan valores negativos.
TC-401 — Reserva de exactamente diez entradas
Categoría: Edge Case Prioridad: P1 Capa sugerida: Unit + API + E2E

Precondiciones
El evento tiene al menos diez asientos disponibles.
Resultados esperados
La reserva con cantidad diez es aceptada.
El total se calcula correctamente.
La disponibilidad disminuye en diez.
TC-402 — Precio cero
Categoría: Edge Case Prioridad: P1 Capa sugerida: Unit + API + E2E

Precondiciones
Existe FREE_EVENT.
Pasos
Abrir el evento.
Reservar una entrada.
Consultar la confirmación.
Resultados esperados
La reserva se crea correctamente.
totalPrice es cero.
El estado continúa siendo confirmed.
La UI no muestra errores por tratarse de un evento gratuito.
TC-403 — Evento con un asiento total
Categoría: Edge Case Prioridad: P1 Capa sugerida: API

Pasos
Crear un evento con totalSeats = 1.
Consultar su disponibilidad.
Reservar una entrada.
Intentar reservar otra.
Resultados esperados
El evento se crea con un asiento disponible.
Una reserva consume la totalidad.
La segunda reserva es rechazada.
TC-404 — Solicitudes concurrentes por los últimos asientos
Categoría: Edge Case Prioridad: P0 Capa sugerida: API/Integration

Precondiciones
El evento tiene dos asientos disponibles.
Pasos
Preparar dos solicitudes simultáneas de dos entradas cada una.
Enviarlas con usuarios diferentes.
Consultar reservas y disponibilidad.
Resultados esperados
Como máximo se confirman reservas por dos asientos.
Una de las solicitudes debe fallar o ajustarse según el contrato.
availableSeats nunca es negativo.
El total reservado nunca supera totalSeats.
No existen reservas parcialmente persistidas.
TC-405 — Reintento después de timeout
Categoría: Edge Case Prioridad: P1 Capa sugerida: API/Integration

Pasos
Enviar una reserva.
Simular timeout en el cliente.
Reintentar la misma operación.
Consultar las reservas creadas.
Resultados esperados
El sistema no crea duplicados si existe mecanismo de idempotencia.
Si no existe idempotencia, el comportamiento debe estar documentado.
La disponibilidad debe reflejar únicamente las reservas realmente confirmadas.
8. Escenarios de estado de UI
TC-500 — Estado de carga del listado de eventos
Categoría: UI State Prioridad: P1 Capa sugerida: Component + E2E

Pasos
Interceptar o ralentizar la respuesta del listado.
Abrir la página de eventos.
Resultados esperados
Se muestra un indicador de carga.
No se presentan datos incompletos como si fueran definitivos.
El indicador desaparece al recibir la respuesta.
TC-501 — Estado vacío de eventos
Categoría: UI State Prioridad: P2 Capa sugerida: Component + E2E

Precondiciones
La API devuelve un listado vacío.
Resultados esperados
La UI muestra un mensaje de estado vacío.
No se muestran tarjetas antiguas.
Se ofrece una acción útil si corresponde, como crear un evento o volver al inicio.
TC-502 — Error al cargar eventos
Categoría: UI State Prioridad: P1 Capa sugerida: Component + E2E

Pasos
Simular una respuesta 500 o un error de red.
Abrir la página de eventos.
Resultados esperados
La UI muestra un mensaje de error controlado.
No se muestra un stack trace.
Existe una opción de reintento cuando corresponda.
La aplicación no queda bloqueada.
TC-503 — Estado vacío de reservas
Categoría: UI State Prioridad: P1 Capa sugerida: Component + E2E

Precondiciones
El usuario autenticado no tiene reservas.
Resultados esperados
Se muestra un mensaje indicando que no existen reservas.
No se presentan filas o tarjetas vacías.
Se ofrece una acción para consultar eventos.
TC-504 — Error al crear una reserva
Categoría: UI State Prioridad: P0 Capa sugerida: Component + E2E

Pasos
Abrir el formulario de reserva.
Simular una respuesta de disponibilidad insuficiente.
Confirmar la reserva.
Resultados esperados
El error se muestra al usuario.
El botón vuelve a estar habilitado.
Los datos introducidos no se pierden innecesariamente.
La UI no muestra confirmación falsa.
La disponibilidad se actualiza si el error corresponde a concurrencia.
TC-505 — Prevención de doble envío en formularios
Categoría: UI State Prioridad: P0 Capa sugerida: Component + E2E

Pasos
Completar el formulario de evento.
Hacer clic repetidamente en guardar.
Repetir con el formulario de reserva.
Resultados esperados
El botón se deshabilita durante la solicitud.
Se muestra un estado de procesamiento.
Solo se procesa una operación válida.
Al finalizar, el botón recupera su estado.
TC-506 — Redirección de usuario no autenticado
Categoría: UI State Prioridad: P0 Capa sugerida: E2E + API

Pasos
Abrir directamente la página de reservas sin iniciar sesión.
Abrir la página de creación de eventos sin iniciar sesión.
Intentar llamar a la API sin token.
Resultados esperados
La UI redirige al login o muestra acceso restringido.
La API rechaza la solicitud.
No se renderizan datos privados.
Después del login, el usuario puede continuar según el flujo definido.
9. Matriz de trazabilidad
Regla o flujo	Escenarios
Registro de usuario	TC-001, TC-300
Login y JWT	TC-002, TC-201, TC-301
Listado de eventos	TC-003, TC-004, TC-500, TC-501, TC-502
Crear evento	TC-005, TC-102, TC-103, TC-104, TC-302
Editar evento	TC-006, TC-203
Eliminar evento	TC-007
Evento estático inmutable	TC-109
Crear reserva	TC-008, TC-107, TC-108
Cantidad de entradas	TC-105, TC-401
Disponibilidad	TC-304, TC-305, TC-400, TC-404
Datos del cliente	TC-106
Consultar reservas	TC-009, TC-202, TC-503
Aislamiento de usuarios	TC-202, TC-203, TC-204
Administración	TC-205
Estados UI	TC-500 a TC-506
Integridad y concurrencia	TC-306, TC-404, TC-405
10. Criterios de aceptación
Los escenarios P0 deben ejecutarse y aprobarse antes de liberar cambios relacionados con autenticación, eventos o reservas.

No deben existir defectos críticos o altos en:

Acceso no autorizado.
Exposición de reservas o datos personales.
Cálculo de precios.
Disponibilidad de asientos.
Sobreventa.
Generación de referencias.
Inmutabilidad de eventos estáticos.
Creación duplicada de reservas.
Los escenarios E2E mínimos obligatorios son:

TC-002 — Inicio de sesión.
TC-003 — Consulta de eventos.
TC-008 — Reserva válida.
TC-400 — Reserva del último asiento.
TC-005 a TC-007 — Ciclo de vida de un evento.
TC-202 — Acceso a reserva ajena.
TC-503 — Estado vacío de reservas.