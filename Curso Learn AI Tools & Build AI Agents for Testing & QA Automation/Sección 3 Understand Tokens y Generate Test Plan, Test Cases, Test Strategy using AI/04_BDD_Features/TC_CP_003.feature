# language: es
Característica: Catálogo de Productos - Detalles del Producto
  Como cliente de Style Haven
  Quiero ver los detalles completos de un producto
  Para poder decidir si deseo agregarlo a mi carrito de compras

  Antecedentes: Usuario logueado en la plataforma
    Dado que un usuario registrado navega a la página de "Login"
    Y ingresa su correo y contraseña válidos
    Y hace clic en el botón "Iniciar Sesión"
    Entonces el sistema autentica al usuario correctamente

  Escenario: Visualización correcta de la información detallada de un producto
    Dado que existe el producto "Zapatillas Adidas Ultraboost" con SKU "AD-UB-001"
    Y el producto tiene configuradas múltiples imágenes, tallas y reseñas
    Cuando el usuario navega al catálogo de productos
    Y hace clic en la imagen del producto "Zapatillas Adidas Ultraboost"
    Entonces el sistema debe cargar la página de detalles del producto
    Y debe mostrar el título completo y el precio actual
    Y debe cargar el carrusel con imágenes de alta resolución
    Y debe estar visible el selector de la guía de tallas
    Y la sección de reseñas de usuarios debe mostrarse correctamente en la parte inferior

  Escenario: Verificación de producto sin stock
    Dado que el producto "Zapatillas Adidas Ultraboost" se encuentra "Agotado"
    Cuando el usuario navega al catálogo de productos
    Y hace clic en la imagen del producto "Zapatillas Adidas Ultraboost"
    Entonces el sistema debe cargar la página de detalles del producto
    Y el botón "Añadir al carrito" debe estar deshabilitado
    Y debe mostrarse una etiqueta indicando "Sin Stock"
