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
