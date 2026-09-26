# Flujo de Prueba Funcional E2E
**Módulos Involucrados:** Cuentas de Usuario ➡️ Catálogo de Productos
**Objetivo:** Validar la experiencia completa ("End-to-End") de un usuario nuevo desde que se registra y configura su cuenta, hasta que busca, filtra e interactúa con un producto específico, terminando con la validación del motor de recomendaciones.

## 1. Datos de Prueba para el Escenario
* **Usuario:** María López
* **Email:** maria.lopez.e2e@example.com
* **Contraseña:** Segura1234!
* **Dirección de Envío:** Calle Falsa 123, Ciudad Capital, CP: 50001
* **Término de búsqueda:** "zapatillas deportivas"
* **Filtros a aplicar:** Marca = "Nike", Categoría = "Mujer"
* **Producto objetivo:** Zapatillas Nike Air Zoom (SKU: NK-AZ-002)

## 2. Pasos del Flujo E2E

| Paso | Acción del Tester / Usuario | Resultado Esperado del Sistema |
| :--- | :--- | :--- |
| **1. Registro de Cuenta** | Ingresar a la plataforma, ir a "Registro" y crear una nueva cuenta utilizando los datos de María. | La cuenta se crea con éxito. El sistema inicia sesión automáticamente, muestra un mensaje de bienvenida y redirige al inicio. |
| **2. Configuración de Perfil** | Navegar a "Mi Perfil" ➡️ "Direcciones de envío". Ingresar la dirección de prueba y guardar. | La dirección "Calle Falsa 123" se guarda correctamente en la base de datos y aparece marcada como dirección predeterminada. |
| **3. Exploración y Búsqueda** | Desde el inicio, ir a la barra de búsqueda superior e ingresar "zapatillas deportivas" y presionar Enter. | El catálogo carga una lista de resultados relevantes que coinciden con el término de búsqueda, mostrando varios modelos y marcas. |
| **4. Filtrado del Catálogo** | En la barra lateral de opciones del catálogo, aplicar los filtros: Categoría "Mujer" y Marca "Nike". | La grilla de productos se actualiza sin recargar toda la página (comportamiento asíncrono esperado) mostrando *únicamente* zapatillas Nike para mujer. |
| **5. Validación de Vista Detalle**| Identificar el producto "Zapatillas Nike Air Zoom" en los resultados filtrados y hacer clic en él. | Se abre la página de detalle del producto. Se verifican imágenes de alta resolución, descripción completa y la carga de reseñas previas de otros clientes. |
| **6. Interacción de Producto** | Dentro de la página del producto, abrir la guía de tallas y luego seleccionar la talla "38". | La guía de tallas se muestra correctamente. Al seleccionar la talla, el sistema valida el inventario y habilita el botón "Añadir al Carrito". |
| **7. Motor de Recomendaciones**| Hacer clic en el logo de "Style Haven" para volver a la página principal (Home). | El sistema analiza el historial de la sesión actual y muestra en el Home un carrusel de **"Recomendado para ti"** con ropa deportiva y zapatillas similares. |

## 3. Criterio de Éxito del Flujo (Pass/Fail)
El flujo E2E se considera **Exitoso (PASS)** si la sesión del usuario se mantiene activa y sin cortes de seguridad a lo largo de todas las transiciones entre su perfil y el catálogo, los filtros funcionan con precisión milimétrica y el algoritmo de recomendación reacciona a la navegación en tiempo real.
