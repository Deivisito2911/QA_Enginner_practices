# Estrategia de Pruebas — EventHub

## 1. Objetivo

Definir la estrategia de pruebas para EventHub, cubriendo los flujos críticos de la interfaz web y de la API REST. La estrategia prioriza las reglas de negocio y asigna cada validación a la capa más baja capaz de probarla adecuadamente.

El alcance incluye:

- Registro e inicio de sesión.
- Consulta de eventos.
- Creación, modificación y eliminación de eventos.
- Reserva de entradas.
- Consulta y gestión de reservas.
- Autorización, aislamiento de datos y control de acceso.
- Validaciones de negocio.
- Integridad de precios, cupos y relaciones entre entidades.
- Estados de carga, vacío y error en la UI.
- Contratos HTTP documentados en Swagger UI (`/api/docs`).

---

## 2. Referencias

- Reglas de negocio: `.kiro/skills/eventhub-domain/business-rules.md`
- Referencia de API: `.kiro/skills/eventhub-domain/api-reference.md`
- Documentación interactiva: `GET /api/docs`
- Modelo de datos: `backend/prisma/schema.prisma`
- Rutas backend: `backend/src/routes/`
- Controladores: `backend/src/controllers/`
- Servicios: `backend/src/services/`
- Validadores: `backend/src/validators/`
- Middleware de autenticación y errores: `backend/src/middleware/`
- Pantallas UI:
  - `frontend/app/page.tsx`
  - `frontend/app/login/`
  - `frontend/app/register/`
  - `frontend/app/events/`
  - `frontend/app/bookings/`
  - `frontend/app/admin/`

> Las rutas y esquemas exactos deben verificarse contra `api-reference.md` y Swagger antes de automatizar las pruebas.

---

## 3. Riesgo y priorización

### P0 — Crítico

Un fallo puede provocar pérdida de dinero, reservas inválidas, exposición de datos o bloqueo del sistema:

- Autenticación y autorización.
- Creación de reservas.
- Validación de cupos disponibles.
- Cálculo de `totalPrice`.
- Aislamiento de datos entre usuarios.
- Inmutabilidad de eventos estáticos.
- Integridad de reservas y eventos eliminados.
- Contratos HTTP de los endpoints principales.

### P1 — Alto

Afecta directamente los flujos principales, aunque existe una alternativa:

- Registro.
- Login y expiración del JWT.
- Consulta de eventos.
- CRUD de eventos propios.
- Consulta de reservas propias.
- Validaciones de campos.
- Manejo de errores HTTP.
- Estados de loading, empty y error.

### P2 — Medio

- Mensajes de validación.
- Navegación secundaria.
- Formato de fechas y precios.
- Compatibilidad visual en Chromium.
- Estados de eventos sin resultados.

### P3 — Bajo

- Detalles cosméticos.
- Textos no funcionales.
- Ajustes menores de espaciado o estilos.

---

## 4. Distribución recomendada por capa

| Capa | Distribución objetivo | Tiempo relativo | Cobertura principal |
|---|---:|---:|---|
| Unit | 45% | Muy rápida | Validadores, cálculo de precios, generación de referencias, reglas puras |
| API/Integration | 35% | Rápida/media | Contratos HTTP, autenticación, autorización, persistencia y reglas de negocio |
| Component | 10% | Media | Formularios, estados visuales, mensajes y componentes aislados |
| E2E UI | 10% | Lenta | Viajes críticos completos en navegador |

La pirámide debe ser amplia en Unit y API, y limitada en E2E. Las reglas críticas se prueban en más de una capa para obtener defensa en profundidad.

---

## 5. Flujos críticos de UI

### UI-001 — Registro de usuario

**Prioridad:** P1
**Capa:** E2E + API

**Precondiciones:**

- El correo no existe.
- La aplicación está disponible.

**Flujo:**

1. Abrir la pantalla de registro.
2. Completar nombre o datos solicitados por la UI.
3. Introducir un correo válido.
4. Introducir una contraseña válida.
5. Enviar el formulario.
6. Verificar la respuesta visual y la navegación posterior.

**Validaciones:**

- El usuario se crea correctamente.
- La contraseña no se almacena en texto plano.
- El correo queda asociado a una única cuenta.
- Se muestra un mensaje de éxito o se redirige a login/home según el contrato funcional.
- Un correo duplicado muestra un error controlado.
- El formulario no realiza una solicitud si faltan campos obligatorios.

**API asociada:**

- Endpoint de registro documentado en Swagger.
- Respuesta de éxito.
- Respuesta de correo duplicado.
- Respuestas de validación `4xx`.

---

### UI-002 — Inicio de sesión

**Prioridad:** P0
**Capa:** E2E + API

**Flujo:**

1. Abrir `/login`.
2. Introducir credenciales válidas.
3. Enviar el formulario.
4. Navegar a una página protegida.
5. Recargar el navegador.
6. Cerrar sesión.

**Validaciones:**

- Las credenciales válidas generan un JWT.
- El usuario accede a las páginas protegidas.
- El token se conserva durante la navegación.
- El token tiene una expiración esperada de siete días.
- Las credenciales inválidas no permiten acceso.
- Después de cerrar sesión no se puede acceder a recursos protegidos.
- La UI muestra mensajes de error sin exponer información sensible.

**Casos API:**

- Usuario válido.
- Contraseña incorrecta.
- Usuario inexistente.
- Campos ausentes.
- Token ausente.
- Token malformado.
- Token expirado.

---

### UI-003 — Consulta de eventos

**Prioridad:** P0
**Capa:** E2E + API

**Flujo:**

1. Abrir la página de eventos.
2. Esperar la carga de datos.
3. Verificar las tarjetas o filas de eventos.
4. Abrir el detalle de un evento.
5. Volver al listado.

**Validaciones:**

- Se muestran eventos estáticos y eventos creados por usuarios cuando corresponda.
- Cada evento muestra título, categoría, ciudad, fecha, precio y disponibilidad.
- El detalle corresponde al identificador seleccionado.
- Los eventos con `availableSeats = 0` se muestran como no disponibles.
- Un evento inexistente produce una pantalla o mensaje 404 controlado.
- La UI muestra estado de carga.
- La UI muestra estado vacío cuando no existen eventos.
- La UI muestra un estado de error si la API no responde.

**API asociada:**

- Listado de eventos.
- Consulta de evento por ID.
- Consulta de identificador inexistente o inválido.
- Verificación de esquema y tipos de respuesta.

---

### UI-004 — Crear evento propio

**Prioridad:** P1
**Capa:** E2E + API

**Precondiciones:**

- Usuario autenticado.
- Usuario dentro de los límites de eventos permitidos por su sandbox.

**Flujo:**

1. Abrir el formulario de creación.
2. Introducir título.
3. Introducir descripción opcional.
4. Seleccionar categoría.
5. Introducir venue.
6. Seleccionar ciudad.
7. Seleccionar una fecha futura.
8. Introducir precio.
9. Introducir número total de asientos.
10. Enviar el formulario.
11. Abrir el detalle del evento creado.

**Validaciones:**

- Se crea un evento asociado al usuario autenticado.
- `availableSeats` se inicializa correctamente a partir de `totalSeats`.
- `isStatic` es `false`.
- La fecha debe ser futura.
- El precio debe ser mayor o igual a cero.
- `totalSeats` debe ser mayor o igual a uno.
- Categoría y ciudad deben pertenecer a los valores permitidos.
- Los campos obligatorios no pueden estar vacíos.
- La UI muestra errores de validación sin enviar datos inválidos.

**Casos límite:**

- Precio igual a `0`.
- `totalSeats` igual a `1`.
- Fecha exactamente en el límite permitido.
- Título mínimo y máximo permitido.
- Descripción vacía.

---

### UI-005 — Modificar evento propio

**Prioridad:** P1
**Capa:** E2E + API

**Precondiciones:**

- Usuario autenticado.
- Existe un evento creado por el usuario.

**Validaciones:**

- El propietario puede modificar los campos permitidos.
- La modificación no cambia accidentalmente el propietario.
- La modificación respeta las reglas de fecha, precio, categoría, ciudad y asientos.
- No se permite modificar un evento estático.
- Un usuario distinto no puede modificar el evento.
- La UI actualiza los valores después de guardar.
- Se maneja correctamente un evento eliminado durante la edición.

---

### UI-006 — Eliminar evento propio

**Prioridad:** P1
**Capa:** E2E + API

**Precondiciones:**

- Usuario autenticado.
- Existe un evento propio.

**Validaciones:**

- El propietario puede eliminar su evento.
- Se solicita confirmación cuando corresponda.
- El evento desaparece del listado.
- El detalle deja de estar disponible.
- Las reservas relacionadas se comportan según la regla de cascada definida.
- Un usuario no propietario no puede eliminarlo.
- Un evento estático no puede eliminarse.

---

### UI-007 — Crear reserva

**Prioridad:** P0
**Capa:** E2E + API

**Precondiciones:**

- Usuario autenticado.
- Existe un evento futuro con disponibilidad suficiente.

**Flujo:**

1. Abrir el detalle del evento.
2. Seleccionar cantidad de entradas.
3. Completar `customerName`.
4. Completar `customerEmail`.
5. Completar `customerPhone`.
6. Confirmar la reserva.
7. Verificar la pantalla de confirmación.
8. Abrir el detalle de la reserva.

**Validaciones:**

- La cantidad permitida está entre 1 y 10.
- No se puede reservar más que `availableSeats`.
- `customerName` tiene al menos dos caracteres.
- `customerEmail` tiene formato válido.
- `customerPhone` tiene al menos diez dígitos.
- `totalPrice = event.price × quantity`.
- El estado de la reserva es siempre `confirmed`.
- Se genera un `bookingRef` único con formato `[FIRST_LETTER]-[6_RANDOM]`.
- Los asientos disponibles disminuyen exactamente en la cantidad reservada.
- La reserva queda asociada al usuario autenticado.
- La UI evita dobles envíos durante el procesamiento.

**Casos críticos:**

- Último asiento disponible.
- Reserva de exactamente diez entradas.
- Reserva de más de diez entradas.
- Reserva de cero, número negativo o valor decimal.
- Cantidad superior a los asientos disponibles.
- Dos reservas simultáneas que compiten por los últimos asientos.
- Evento eliminado antes de confirmar.
- Precio igual a cero.

---

### UI-008 — Consultar reservas propias

**Prioridad:** P0
**Capa:** E2E + API

**Validaciones:**

- El usuario solo ve sus propias reservas.
- Cada reserva muestra referencia, evento, cantidad, precio total, estado y datos relevantes.
- Una cuenta sin reservas muestra estado vacío.
- El detalle de una reserva inexistente muestra error controlado.
- Un usuario no puede consultar una reserva de otro usuario modificando el ID en la URL.

---

### UI-009 — Gestión administrativa

**Prioridad:** P1
**Capa:** E2E + API

**Precondiciones:**

- Usuario con permisos administrativos, si el producto implementa roles administrativos.

**Validaciones:**

- El área administrativa requiere autenticación y autorización.
- El usuario no autorizado no puede acceder mediante navegación ni URL directa.
- El listado administrativo presenta eventos y reservas según el contrato.
- Las operaciones administrativas no permiten saltarse las reglas de integridad.
- Las respuestas de autorización son consistentes entre UI y API.

---

## 6. Flujos críticos de API

Las rutas concretas deben tomarse de `api-reference.md` y validarse contra `/api/docs`. La siguiente matriz identifica las operaciones contractuales que deben cubrirse.

| Dominio | Operación | Prioridad | Validaciones |
|---|---|---:|---|
| Auth | Registro | P1 | Esquema, duplicados, hash, errores 4xx |
| Auth | Login | P0 | JWT, credenciales, expiración, errores |
| Events | Listado | P0 | Respuesta, paginación/filtros si existen, datos visibles |
| Events | Detalle | P0 | ID válido, inexistente, autorización si aplica |
| Events | Crear | P1 | Campos, enums, fecha, precio, cupos, propietario |
| Events | Actualizar | P1 | Propietario, estáticos, validaciones, concurrencia |
| Events | Eliminar | P1 | Propietario, estáticos, cascada |
| Bookings | Crear | P0 | Disponibilidad, cantidad, precio, referencia, atomicidad |
| Bookings | Listar propias | P0 | Aislamiento por usuario |
| Bookings | Detalle | P0 | Propiedad, 404, autorización |
| Admin | Operaciones administrativas | P1 | Rol, autorización y contrato |

### 6.1 Contrato HTTP

Para cada endpoint se debe comprobar:

- Método HTTP correcto.
- Ruta y parámetros.
- Headers requeridos.
- Esquema JSON de entrada.
- Esquema JSON de salida.
- Códigos `2xx`.
- Códigos `4xx` para validación, autenticación y autorización.
- Código `404` para recursos inexistentes.
- Código `409` cuando exista conflicto de unicidad o disponibilidad, si así lo define el API.
- Código `5xx` sin filtrar stack traces ni datos sensibles.
- Formato consistente de errores.
- Content-Type.
- Compatibilidad con el esquema Swagger.

### 6.2 Autenticación y autorización API

Cubrir cada endpoint protegido con:

1. Header `Authorization` ausente.
2. Token vacío.
3. Token malformado.
4. Token expirado.
5. Token válido de otro usuario.
6. Token válido del propietario.
7. Token de usuario sin permisos administrativos.
8. Intento de cambiar `userId` desde el payload.
9. Intento de acceder a IDs de otro usuario.
10. Repetición de una solicitud con token válido.

Resultado esperado:

- Los recursos protegidos no deben responder con información privada.
- La identidad se obtiene del token, no de un campo controlado por el cliente.
- Los errores de autorización no deben revelar si un recurso privado existe, cuando la política del API indique respuestas indistinguibles.

---

## 7. Reglas de negocio que requieren cobertura

### Eventos

- `title` es obligatorio.
- `description` es opcional.
- `category` debe pertenecer a:
  - `Conference`
  - `Concert`
  - `Sports`
  - `Workshop`
  - `Festival`
- `venue` es obligatorio.
- `city` debe pertenecer a:
  - `Bangalore`
  - `Mumbai`
  - `Hyderabad`
  - `Delhi`
  - `Chennai`
- `eventDate` debe ser futura.
- `price >= 0`.
- `totalSeats >= 1`.
- `availableSeats` es dinámico.
- Los eventos estáticos (`isStatic = true`) son inmutables.
- Los eventos creados por usuarios deben quedar asociados a `userId`.
- Deben respetarse los límites de eventos definidos para cada sandbox.

### Reservas

- `customerName` debe tener al menos dos caracteres.
- `customerEmail` debe tener formato válido.
- `customerPhone` debe tener al menos diez dígitos.
- `quantity` debe estar entre 1 y 10.
- No se puede superar `availableSeats`.
- `totalPrice` debe calcularse en servidor.
- El estado es siempre `confirmed`.
- `bookingRef` es único.
- El formato de `bookingRef` es `[FIRST_LETTER]-[6_RANDOM]`.
- Los límites de reservas por usuario/sandbox deben validarse.
- La actualización de cupos debe ser atómica para evitar sobreventa.
- La eliminación de entidades debe respetar las relaciones con reservas mediante la política de cascada definida.

---

## 8. Casos de límite y negativos prioritarios

### Eventos

- Título ausente.
- Título vacío o compuesto solo por espacios.
- Categoría desconocida.
- Ciudad desconocida.
- Venue ausente.
- Fecha pasada.
- Fecha actual.
- Precio negativo.
- Precio cero.
- `totalSeats` igual a cero.
- `totalSeats` negativo.
- Tipos incorrectos: string en precio, decimal en asientos, booleano en título.
- Campos inesperados en el payload.
- Usuario intentando fijar `isStatic = true`.
- Usuario intentando asignar el evento a otro `userId`.
- Modificación de evento estático.
- Eliminación de evento estático.
- Operación sobre evento inexistente.

### Reservas

- Nombre vacío.
- Nombre de un carácter.
- Email inválido.
- Teléfono con menos de diez dígitos.
- Teléfono con letras, si el contrato solo acepta dígitos.
- Cantidad cero.
- Cantidad negativa.
- Cantidad decimal.
- Cantidad once.
- Cantidad superior a disponibilidad.
- Precio o totalPrice manipulado desde el cliente.
- Evento inexistente.
- Evento sin disponibilidad.
- Usuario intentando reservar en nombre de otro usuario.
- Reenvío de la misma solicitud.
- Solicitudes concurrentes sobre los últimos asientos.

---

## 9. Estrategia de datos de prueba

Se deben preparar como mínimo:

| Dato | Características |
|---|---|
| Usuario A | Cuenta normal, sin reservas |
| Usuario B | Cuenta normal, con eventos propios |
| Usuario C | Usuario no propietario para pruebas de autorización |
| Usuario admin | Solo si existe soporte de rol administrativo |
| Evento estático | `isStatic = true`, no modificable |
| Evento propio | `isStatic = false`, con disponibilidad alta |
| Evento con un asiento | Para probar límite y última unidad |
| Evento agotado | `availableSeats = 0` |
| Evento con precio cero | Validar cálculo total |
| Evento futuro | Elegible para reserva |
| Evento pasado | Debe rechazarse o no permitir reserva |
| Reserva válida | Estado `confirmed` |
| Reserva límite | Cantidad 10 |
| Reserva agotada | Sin disponibilidad |

Los datos deben aislarse por prueba y limpiarse mediante API o fixtures. No se debe depender de IDs fijos salvo que sean datos estáticos documentados.

---

## 10. Asignación de capas

| ID | Escenario | Capa principal | Capa secundaria |
|---|---|---|---|
| TC-001 | Validación de email | Unit | API |
| TC-002 | Validación de teléfono | Unit | API |
| TC-003 | Validación de cantidad 1–10 | Unit | API |
| TC-004 | Cálculo `price × quantity` | Unit | API |
| TC-005 | Generación de `bookingRef` | Unit | API |
| TC-006 | Validación de fecha futura | Unit | API |
| TC-007 | Registro exitoso | API | E2E |
| TC-008 | Login y emisión de JWT | API | E2E |
| TC-009 | Acceso sin token | API | E2E |
| TC-010 | Listado de eventos | API | E2E |
| TC-011 | Detalle de evento | API | E2E |
| TC-012 | Creación de evento propio | API | E2E |
| TC-013 | Modificación por propietario | API | E2E |
| TC-014 | Modificación por no propietario | API | E2E |
| TC-015 | Inmutabilidad de evento estático | API | E2E |
| TC-016 | Eliminación y cascada | API/Integration | E2E |
| TC-017 | Reserva válida | API/Integration | E2E |
| TC-018 | Reserva sin cupos | API/Integration | E2E |
| TC-019 | Reserva concurrente | API/Integration | E2E |
| TC-020 | Aislamiento de reservas | API | E2E |
| TC-021 | Formulario de creación de evento | Component | E2E |
| TC-022 | Formulario de reserva | Component | E2E |
| TC-023 | Estado de carga de eventos | Component | E2E |
| TC-024 | Estado vacío de reservas | Component | E2E |
| TC-025 | Viaje completo login → evento → reserva | E2E | API |
| TC-026 | Viaje completo crear evento → editar → eliminar | E2E | API |
| TC-027 | Viaje completo consulta de reservas | E2E | API |

### Justificación

- Las validaciones simples y cálculos deben estar en Unit porque no requieren HTTP ni base de datos.
- Las reglas de negocio y persistencia deben probarse principalmente mediante API/Integration.
- La UI debe verificar integración, navegación, renderizado y estados visuales, no repetir exhaustivamente todas las combinaciones de validación.
- Los viajes completos deben mantenerse limitados a los escenarios P0/P1.
- Los errores HTTP se validan en API, no exclusivamente en E2E.
- La autorización se valida en API para evitar que una prueba visual oculte una vulnerabilidad del backend.
- Los cambios de cupos y cascadas requieren integración con base de datos.

---

## 11. Flujos E2E mínimos obligatorios

### E2E-001 — Usuario nuevo reserva una entrada

1. Registrar usuario.
2. Iniciar sesión.
3. Consultar eventos.
4. Abrir un evento futuro.
5. Crear una reserva válida.
6. Confirmar `bookingRef`.
7. Verificar la disminución de disponibilidad.
8. Consultar la reserva desde el listado del usuario.

**Motivo:** representa el principal valor de negocio de EventHub.

### E2E-002 — Propietario administra su evento

1. Iniciar sesión.
2. Crear evento válido.
3. Verificarlo en el listado.
4. Modificarlo.
5. Verificar los cambios.
6. Eliminarlo.
7. Confirmar que ya no aparece.

**Motivo:** cubre el ciclo de vida de los eventos creados por usuarios.

### E2E-003 — Usuario no autorizado intenta acceder a datos ajenos

1. Autenticar usuario A.
2. Obtener o identificar un evento/reserva de usuario B.
3. Intentar acceder al recurso desde UI o URL directa.
4. Confirmar que el recurso no se expone.
5. Repetir la verificación directamente contra API.

**Motivo:** protege el aislamiento entre sandboxes.

### E2E-004 — Reserva del último asiento

1. Preparar un evento con un asiento.
2. Iniciar sesión.
3. Reservar una entrada.
4. Verificar disponibilidad cero.
5. Intentar una segunda reserva.
6. Confirmar que la segunda operación es rechazada.

**Motivo:** protege inventario y evita sobreventa.

---

## 12. Pruebas de concurrencia e integridad

Estas pruebas deben ejecutarse en API/Integration, no exclusivamente en UI:

- Dos solicitudes reservan simultáneamente el último asiento.
- Varias solicitudes reservan cantidades que sumadas superan la disponibilidad.
- Una solicitud falla después de iniciar la actualización de cupos.
- Se reintenta una solicitud de reserva después de un timeout.
- Se elimina un evento con reservas existentes.
- Se consulta una reserva durante la eliminación de su evento.
- Se verifica que nunca exista `availableSeats < 0`.
- Se verifica que el total de reservas no exceda `totalSeats`.
- Se verifica que `totalPrice` no dependa del valor enviado por el cliente.

Resultado esperado:

- La operación ganadora actualiza los cupos correctamente.
- Las operaciones que exceden la disponibilidad fallan de forma controlada.
- No se crean reservas parciales.
- No se generan referencias duplicadas.
- La base de datos conserva relaciones válidas.

---

## 13. Validación de la UI

La automatización UI debe usar selectores estables definidos en `ui-selectors.md`, preferentemente:

1. `getByRole`.
2. `getByLabel`.
3. `getByText` cuando sea estable.
4. `data-testid` solo cuando no exista un selector semántico adecuado.

Debe verificarse:

- Estado de carga.
- Estado vacío.
- Estado de error.
- Deshabilitación del botón mientras se envía el formulario.
- Mensajes de validación junto al campo correspondiente.
- Navegación posterior a acciones exitosas.
- Persistencia de sesión al recargar.
- Redirección cuando el usuario no está autenticado.
- Prevención de doble submit.
- Actualización del cache después de crear, modificar o eliminar.
- Formato de fechas, precios y referencias.
- Accesibilidad básica mediante roles, labels y foco.

---

## 14. Pruebas de seguridad

### Autenticación

- No aceptar tokens vacíos o malformados.
- Rechazar tokens expirados.
- No devolver contraseñas en las respuestas.
- No revelar si un correo está registrado más allá de lo definido por el contrato.
- Verificar que la sesión se invalida correctamente en logout si existe revocación del lado servidor.

### Autorización

- Un usuario no puede modificar ni eliminar eventos ajenos.
- Un usuario no puede ver reservas ajenas.
- Un usuario no puede cambiar `userId` desde el payload.
- Un usuario no puede convertir un evento propio en estático.
- Un usuario normal no puede ejecutar operaciones administrativas.
- No confiar en controles de visibilidad de la UI como mecanismo de seguridad.

### Entrada de datos

- Rechazar payloads con tipos inválidos.
- Rechazar campos no permitidos si el API aplica whitelist.
- Evitar inyección mediante títulos, descripciones y campos de cliente.
- No devolver stack traces, SQL, secretos ni información interna.

---

## 15. Criterios de entrada

- Swagger/API Docs accesible.
- Base de datos de prueba disponible.
- Datos estáticos conocidos.
- Usuarios de prueba configurables.
- Ambiente frontend y backend levantado.
- Variables de entorno de prueba configuradas.
- Selectores UI documentados o identificados.
- Reglas de límites por sandbox confirmadas.

---

## 16. Criterios de salida

El alcance crítico se considera listo cuando:

- Todos los casos P0 pasan.
- No existen defectos abiertos de severidad crítica o alta en autenticación, autorización, reservas o cupos.
- Los contratos de los endpoints principales coinciden con Swagger.
- Las pruebas de aislamiento de usuarios pasan.
- Las pruebas de concurrencia no producen sobreventa.
- Los flujos E2E mínimos pasan en Chromium.
- Los estados de loading, empty y error están cubiertos.
- Los errores API tienen códigos y estructura consistentes.
- Los datos sensibles no aparecen en logs ni respuestas.

---

## 17. Riesgos residuales

Deben confirmarse antes de cerrar la estrategia:

1. Límites exactos de eventos y reservas por sandbox.
2. Rutas HTTP y nombres exactos de todos los endpoints.
3. Existencia y modelo de roles administrativos.
4. Política exacta de eliminación de eventos con reservas.
5. Política de cancelación de reservas, si existe.
6. Política de expiración y almacenamiento del JWT.
7. Soporte de filtros, paginación y ordenamiento en eventos.
8. Reglas de longitud máxima de campos.
9. Comportamiento esperado cuando un evento pasado permanece visible.
10. Estrategia de idempotencia para reintentos de reservas.

---

## 18. Recomendación final

La automatización debe comenzar por API/Integration para validar las reglas que protegen inventario, datos y autorización. Después deben automatizarse los componentes de formularios y estados de UI. Finalmente se deben implementar pocos flujos E2E de alto valor:

1. Login y consulta de eventos.
2. Reserva válida.
3. Reserva del último asiento.
4. Administración del ciclo de vida de un evento.
5. Aislamiento entre usuarios.

Esto reduce el tiempo de ejecución y evita una estrategia basada exclusivamente en E2E.
