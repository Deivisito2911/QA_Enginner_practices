# Casos de Prueba Funcionales

**Proyecto:** Style Haven
**Módulos:** Cuentas de Usuario, Catálogo de Productos
**Tipo de Pruebas:** Funcionales

---

## 1. Módulo: Cuentas de Usuario

| ID | Título del Caso de Prueba | Precondiciones | Datos de Prueba | Pasos de Ejecución | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_CU_001** | Registro de nuevo usuario con email | El usuario se encuentra en la página web y no tiene cuenta con el email a usar. | **Nombre:** Juan Pérez<br>**Email:** juan.perez@example.com<br>**Clave:** P@ssw0rd2026! | 1. Ir a la página de Registro.<br>2. Ingresar nombre, email válido y una contraseña que cumpla las políticas.<br>3. Hacer clic en "Registrarse". | El sistema crea la cuenta exitosamente, envía correo de bienvenida y redirige a la pantalla principal logueado. |
| **TC_CU_002** | Inicio de sesión mediante Redes Sociales | El usuario tiene una cuenta activa en la red social seleccionada (ej. Google/Facebook). | **Red Social:** Google<br>**Cuenta de prueba:** qa.test.user@gmail.com | 1. Navegar a la página de Login.<br>2. Hacer clic en "Continuar con Google".<br>3. Ingresar credenciales en el popup de la red social y autorizar. | El sistema autentica al usuario y lo redirige a la página principal con su sesión iniciada. |
| **TC_CU_003** | Actualización de dirección de envío | El usuario ha iniciado sesión. | **Calle:** Av. Siempreviva 742<br>**Ciudad:** Springfield<br>**Código Postal:** 12345 | 1. Navegar a "Mi Perfil" / "Ajustes de cuenta".<br>2. Ir a la sección "Direcciones de Envío".<br>3. Ingresar nueva dirección y guardar. | Los datos se actualizan en la base de datos y se muestra un mensaje de éxito ("Dirección actualizada"). |
| **TC_CU_004** | Visualización del historial y estado de un pedido | El usuario ha iniciado sesión y tiene al menos un pedido previo registrado. | **ID Pedido esperado:** #SH-99882<br>**Estado esperado:** En tránsito | 1. Navegar a "Mi Perfil".<br>2. Seleccionar "Historial de Pedidos".<br>3. Clic en el pedido más reciente. | Se muestra una lista de pedidos. Al hacer clic en uno, se detalla el costo, artículos y el estado actual de entrega (ej. "En tránsito"). |

---

## 2. Módulo: Catálogo de Productos

| ID | Título del Caso de Prueba | Precondiciones | Datos de Prueba | Pasos de Ejecución | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_CP_001** | Búsqueda de productos por palabra clave | Existen productos en la base de datos cuyo nombre/descripción coinciden con la palabra a buscar. | **Palabra Clave:** "chaqueta de cuero" | 1. Localizar la barra de búsqueda superior.<br>2. Escribir "chaqueta de cuero" y presionar la tecla Enter o ícono de lupa. | La grilla se actualiza mostrando únicamente productos relacionados con "chaqueta de cuero". |
| **TC_CP_002** | Navegación y filtrado múltiple (Categoría y Marca) | Existen varios productos clasificados por categorías y marcas. | **Categoría:** Zapatos<br>**Marca:** Adidas | 1. Abrir menú de catálogo y seleccionar la categoría "Zapatos".<br>2. En la barra lateral de filtros, marcar la marca "Adidas". | La lista de productos se filtra mostrando exclusivamente zapatos de la marca Adidas. |
| **TC_CP_003** | Verificación de los detalles en la página de un producto | Existe un producto configurado con diferentes imágenes, tallas, y comentarios. | **Producto de prueba:** Zapatillas Adidas Ultraboost (SKU: AD-UB-001) | 1. Desde el catálogo, hacer clic en la imagen o nombre de un producto cualquiera. | Se carga la vista detalle mostrando: Título, precio, imágenes de alta resolución, guía de tallas, y la sección de reseñas de usuarios. |
| **TC_CP_004** | Validar recomendaciones personalizadas | El usuario ha iniciado sesión y tiene un historial previo de navegación/compras. | **Historial simulado:** Búsquedas previas de "Relojes deportivos" | 1. Iniciar sesión.<br>2. Navegar a la página principal (Home) o a la vista de detalle de un producto. | Aparece un carrusel o sección "Recomendado para ti" sugiriendo productos similares a las compras/visitas anteriores. |

---

## 3. Distribución en la Pirámide de Pruebas (Enfoque Shift-Left)

Para optimizar la automatización y detectar errores de forma temprana, los casos de prueba anteriores se categorizan y distribuyen en las siguientes capas de ejecución:

### 3.1. Base: Pruebas Unitarias (Lógica Aislada)
*Estas pruebas se enfocan en verificar el código y las reglas de negocio aisladas. Se ejecutan muy rápido y no requieren infraestructura (bases de datos o UI).*

*   **De TC_CU_001 (Registro):** 
    *   Validación de políticas de contraseña (ej. función `validarContrasena("P@ssw0rd2026!")`).
    *   Validación del formato del correo electrónico.
*   **De TC_CP_004 (Recomendaciones Personalizadas):** 
    *   Probar el algoritmo de recomendación enviándole datos de historial estáticos y validando la lógica de retorno.

### 3.2. Medio: Pruebas de API e Integración (Servicios Backend)
*Estas pruebas verifican que los endpoints funcionen correctamente con la base de datos y servicios de terceros, sin depender del frontend.*

*   **De TC_CU_001 (Registro):** Automatizar `POST /api/register` para verificar la creación en la base de datos y la llamada al servicio de email.
*   **De TC_CU_002 (Login con Redes):** Probar el intercambio OAuth con los endpoints de Google/Facebook.
*   **De TC_CU_003 (Actualizar Dirección):** Enviar `PUT /api/users/address` y consultar que el cambio impacte correctamente en la base de datos.
*   **De TC_CU_004 (Historial de Pedido):** Verificar que `GET /api/orders/user` retorne el JSON con la estructura correcta y el estado esperado.
*   **De TC_CP_001 y TC_CP_002 (Búsqueda y Filtro):** Hacer peticiones a `GET /api/products` usando parámetros de búsqueda/filtros, comprobando rendimiento (tiempos de respuesta) y la exactitud del JSON.

### 3.3. Cima: Pruebas UI / End-to-End (Flujos Visuales)
*Estas pruebas interactúan con la interfaz real a través de navegadores (usando Cypress, Playwright o Selenium). Se reservan para validar la integración visual y los caminos críticos (Happy Paths).*

*   **TC_CU_001 / TC_CU_002 (UI de Autenticación):** Simular la escritura en formularios, clics en botones de registro/login, validar notificaciones en pantalla y que ocurran las redirecciones esperadas.
*   **TC_CP_001 / TC_CP_002 (UI de Catálogo):** Validar que la cuadrícula de productos en el navegador se actualice correctamente sin romper el diseño general tras aplicar un filtro o buscar.
*   **TC_CP_003 (Detalles del Producto):** Validar de forma E2E la experiencia visual completa: existencia del carrusel de imágenes, botón "Añadir al carrito" interactivo y correcta visualización de las reseñas.
