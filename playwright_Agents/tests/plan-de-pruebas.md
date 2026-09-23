# Plan de Pruebas Integral para la Aplicación EliteFootball Champions League

## Application Overview

Este plan de pruebas cubre la aplicación EliteFootball Champions League, una plataforma web para explorar clubes de fútbol, sus estadísticas y permitir a los usuarios votar/apoyar a sus clubes favoritos a través de un sistema de muro de fans. La aplicación incluye navegación de clubes, funcionalidad de búsqueda/filtrado, páginas de información detallada de clubes e interacción de fans mediante votación/mensajes.

## Test Scenarios

### 1. Suite de Navegación de Página Principal

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verificar que la página principal carga correctamente con todos los elementos

**File:** `tests/pagina-principal/verificar-carga-pagina.spec.ts`

**Steps:**
  1. Navegar a la URL de la aplicación
    - expect: La página debe cargar exitosamente con el título 'ChampionsLeague Europa'
    - expect: El encabezado 'EliteFootball' debe ser visible
    - expect: El subtítulo 'Champions & Libertadores World Explorer' debe ser visible
    - expect: Las estadísticas '60 Gigantes • 304 Votos Totales' deben ser visibles
  2. Verificar la sección de actividad global
    - expect: La sección 'Actividad Global:' debe ser visible
    - expect: Al menos una entrada de actividad reciente debe mostrarse
  3. Verificar el gráfico de favoritos de la comunidad
    - expect: El encabezado 'Favoritos de la Comunidad (Top Votos)' debe ser visible
    - expect: El gráfico debe mostrar nombres de clubes y conteos de votos
    - expect: El gráfico debe incluir al menos Real Madrid CF y FC Barcelona
  4. Verificar controles de búsqueda y filtrado
    - expect: La caja de búsqueda con placeholder 'Busca un club, jugador o país...' debe ser visible
    - expect: El dropdown de filtro de liga con 'Todas Ligas' seleccionado debe ser visible
    - expect: El dropdown de filtro de país con 'Todos Países' seleccionado debe ser visible
  5. Verificar la visualización de tarjetas de clubes
    - expect: Múltiples tarjetas de clubes deben ser visibles (al menos 20)
    - expect: Cada tarjeta de club debe mostrar: logo del club, indicador de liga, conteo de trofeos, nombre del club, bandera del país, conteo de ediciones, conteo de votos
  6. Verificar controles de paginación
    - expect: Los botones de paginación deben ser visibles en la parte inferior
    - expect: El botón de página 1 debe estar resaltado/activo
    - expect: El botón anterior debe estar deshabilitado en la primera página
  7. Verificar el contenido del pie de página
    - expect: El texto del pie 'Champions & Libertadores World Experience' debe ser visible
    - expect: La información de copyright debe estar presente

#### 1.2. Probar interacción con tarjetas de clubes y navegación

**File:** `tests/pagina-principal/navegacion-tarjetas-clubes.spec.ts`

**Steps:**
  1. Hacer clic en la tarjeta del Real Madrid CF
    - expect: Debe navegar a la página de detalles del Real Madrid CF
    - expect: El nombre del club 'Real Madrid CF' debe mostrarse prominentemente
    - expect: El botón 'Volver' debe ser visible
    - expect: El botón 'Votar por este club' debe ser visible
  2. Verificar la estructura de la página de detalles del club
    - expect: Las estadísticas del club (15 Champions, 54 Ediciones, 1902 Fundación) deben ser visibles
    - expect: La sección de información del estadio debe estar presente
    - expect: La sección 'Referentes' (jugadores clave) debe ser visible
    - expect: La sección 'Vitrina de Trofeos' debe estar presente
    - expect: La sección 'Legado' debe estar presente
    - expect: La sección 'Comunidad de Fans' debe estar presente
  3. Verificar la sección del muro de fans
    - expect: El encabezado 'Muro de Fans: Real Madrid CF' debe ser visible
    - expect: El formulario para dejar un mensaje debe estar presente con todos los campos
    - expect: Deben mostrarse mensajes de fans existentes
  4. Hacer clic en el botón volver para regresar a la página principal
    - expect: Debe regresar a la página principal exitosamente
    - expect: Todos los elementos de la página principal deben ser visibles nuevamente
  5. Hacer clic en la tarjeta del FC Barcelona
    - expect: Debe navegar a la página de detalles del FC Barcelona
    - expect: La información específica del club debe mostrarse correctamente
  6. Hacer clic en el botón volver nuevamente
    - expect: Debe regresar a la página principal exitosamente

#### 1.3. Probar funcionalidad de búsqueda con entradas válidas

**File:** `tests/pagina-principal/funcionalidad-busqueda.spec.ts`

**Steps:**
  1. Escribir 'Barcelona' en la caja de búsqueda
    - expect: La caja de búsqueda debe aceptar la entrada
    - expect: Los resultados deben filtrarse para mostrar solo clubes que coincidan con 'Barcelona'
    - expect: El FC Barcelona debe ser visible en los resultados
  2. Escribir 'Real' en la caja de búsqueda
    - expect: Los resultados deben filtrarse para mostrar clubes que contengan 'Real'
    - expect: El Real Madrid CF debe ser visible en los resultados
  3. Escribir 'River' en la caja de búsqueda
    - expect: Los resultados deben filtrarse para mostrar clubes que contengan 'River'
    - expect: River Plate debe ser visible en los resultados
  4. Limpiar la caja de búsqueda borrando todo el texto
    - expect: Todos los clubes deben mostrarse nuevamente
    - expect: No debe aplicarse ningún filtro

#### 1.4. Probar funcionalidad de filtro por liga

**File:** `tests/pagina-principal/filtro-liga.spec.ts`

**Steps:**
  1. Seleccionar 'UCL Europa' del filtro de liga
    - expect: El filtro debe aplicarse exitosamente
    - expect: Solo deben mostrarse clubes de UCL Europa
    - expect: Clubes como Real Madrid, Barcelona, Bayern Munich deben ser visibles
    - expect: Los clubes de Libertadores no deben ser visibles
  2. Seleccionar 'Lib. América' del filtro de liga
    - expect: El filtro debe aplicarse exitosamente
    - expect: Solo deben mostrarse clubes de Libertadores
    - expect: Clubes como Boca Juniors, River Plate, Independiente deben ser visibles
    - expect: Los clubes de UCL Europa no deben ser visibles
  3. Restablecer a 'Todas Ligas'
    - expect: Todos los clubes de ambas ligas deben mostrarse nuevamente

#### 1.5. Probar funcionalidad de filtro por país

**File:** `tests/pagina-principal/filtro-pais.spec.ts`

**Steps:**
  1. Seleccionar 'Argentina' del filtro de país
    - expect: El filtro debe aplicarse exitosamente
    - expect: Solo deben mostrarse clubes argentinos
    - expect: Clubes como Boca Juniors, River Plate, Independiente deben ser visibles
    - expect: Los clubes no argentinos no deben ser visibles
  2. Seleccionar 'Brazil' del filtro de país
    - expect: El filtro debe aplicarse exitosamente
    - expect: Solo deben mostrarse clubes brasileños
    - expect: Clubes como Palmeiras, São Paulo, Flamengo deben ser visibles
  3. Seleccionar 'Spain' del filtro de país
    - expect: El filtro debe aplicarse exitosamente
    - expect: Solo deben mostrarse clubes españoles
    - expect: Real Madrid CF y FC Barcelona deben ser visibles
  4. Restablecer a 'Todos Países'
    - expect: Todos los clubes de todos los países deben mostrarse nuevamente

#### 1.6. Probar funcionalidad combinada de búsqueda y filtrado

**File:** `tests/pagina-principal/busqueda-filtro-combinados.spec.ts`

**Steps:**
  1. Seleccionar filtro de liga 'UCL Europa' y escribir 'Barcelona' en la búsqueda
    - expect: Solo el FC Barcelona debe ser visible (coincide con ambos criterios)
  2. Seleccionar filtro de país 'Argentina' y escribir 'River' en la búsqueda
    - expect: Solo River Plate debe ser visible (coincide con ambos criterios)
  3. Seleccionar filtro de liga 'Lib. América' y filtro de país 'Brazil'
    - expect: Solo los clubes brasileños de Libertadores deben ser visibles
  4. Limpiar todos los filtros y búsqueda
    - expect: Todos los clubes deben mostrarse nuevamente

#### 1.7. Probar funcionalidad de paginación

**File:** `tests/pagina-principal/paginacion.spec.ts`

**Steps:**
  1. Hacer clic en el botón de página 2
    - expect: Debe navegar a la página 2
    - expect: Debe mostrarse un conjunto diferente de clubes
    - expect: El botón de página 2 debe estar resaltado/activo
    - expect: El botón anterior debe estar habilitado
  2. Hacer clic en el botón de página 3
    - expect: Debe navegar a la página 3
    - expect: Debe mostrarse un conjunto diferente de clubes
    - expect: El botón de página 3 debe estar resaltado/activo
  3. Hacer clic en el botón anterior
    - expect: Debe navegar de regreso a la página 2
    - expect: El botón de página 2 debe estar resaltado/activo
  4. Hacer clic en el botón siguiente
    - expect: Debe navegar hacia adelante a la página 3
    - expect: El botón de página 3 debe estar resaltado/activo
  5. Regresar a la página 1
    - expect: Debe mostrar la primera página de resultados
    - expect: El botón anterior debe estar deshabilitado nuevamente

### 2. Suite de Página de Detalles de Club

**Seed:** `tests/seed.spec.ts`

#### 2.1. Probar formulario de votación de fans con datos válidos

**File:** `tests/detalles-club/envio-voto-valido.spec.ts`

**Steps:**
  1. Navegar a la página de detalles del Real Madrid CF
    - expect: La página de detalles del club debe cargar exitosamente
  2. Llenar el campo de nombre con 'Usuario de Prueba QA'
    - expect: El campo de nombre debe aceptar la entrada
  3. Llenar el campo de país con 'País de Prueba'
    - expect: El campo de país debe aceptar la entrada
  4. Hacer clic en la 4ta estrella para la calificación
    - expect: Las primeras 4 estrellas deben estar resaltadas/seleccionadas
  5. Llenar el campo de mensaje con '¡Excelente equipo! Mensaje de prueba del equipo QA.'
    - expect: El campo de mensaje debe aceptar la entrada
  6. Hacer clic en el botón 'Publicar Voto'
    - expect: El formulario debe enviarse exitosamente
    - expect: Debe aparecer un nuevo mensaje en el muro de fans
    - expect: Los campos del formulario deben limpiarse/reiniciarse

#### 2.2. Probar validación del formulario de votación - campos requeridos

**File:** `tests/detalles-club/validacion-campos-requeridos.spec.ts`

**Steps:**
  1. Navegar a la página de detalles del FC Barcelona
    - expect: La página de detalles del club debe cargar exitosamente
  2. Dejar todos los campos vacíos y hacer clic en enviar
    - expect: El formulario no debe enviarse
    - expect: Debe ocurrir la validación apropiada (puede ser del lado del cliente o servidor)
  3. Llenar solo el campo de nombre, dejar los otros vacíos, hacer clic en enviar
    - expect: El formulario no debe enviarse
  4. Llenar nombre y país, dejar calificación y mensaje vacíos, hacer clic en enviar
    - expect: El formulario no debe enviarse o debe usar valores predeterminados
  5. Llenar todos los campos correctamente y enviar
    - expect: El formulario debe enviarse exitosamente con datos válidos

#### 2.3. Probar formulario de votación - valores límite

**File:** `tests/detalles-club/valores-limite-voto.spec.ts`

**Steps:**
  1. Navegar a una página de detalles de club
    - expect: La página de detalles del club debe cargar exitosamente
  2. Probar longitud mínima del nombre (1 carácter)
    - expect: Debe aceptar nombre de un solo carácter
  3. Probar longitud máxima del nombre (nombre muy largo)
    - expect: Debe aceptar nombres largos o truncarlos apropiadamente
  4. Probar caracteres especiales en los campos de nombre y país
    - expect: Debe aceptar caracteres especiales o manejarlos apropiadamente
  5. Probar etiquetas HTML/script en el campo de mensaje
    - expect: Debe sanear o mostrar apropiadamente el contenido HTML
  6. Probar contenido de mensaje muy largo
    - expect: Debe aceptar mensajes largos o manejar apropiadamente los límites de longitud

#### 2.4. Probar selección de estrellas de calificación

**File:** `tests/detalles-club/seleccion-estrellas-calificacion.spec.ts`

**Steps:**
  1. Navegar a una página de detalles de club
    - expect: La página de detalles del club debe cargar exitosamente
  2. Hacer clic en la 1ra estrella
    - expect: La primera estrella debe estar seleccionada
  3. Hacer clic en la 3ra estrella
    - expect: Las primeras tres estrellas deben estar seleccionadas
  4. Hacer clic en la 5ta estrella
    - expect: Todas las cinco estrellas deben estar seleccionadas
  5. Hacer clic en la 2da estrella después de seleccionar la 5ta
    - expect: Solo las primeras dos estrellas deben estar seleccionadas
  6. Enviar formulario con calificación de 5 estrellas
    - expect: El formulario debe enviarse exitosamente con calificación de 5 estrellas

#### 2.5. Verificar visualización y ordenamiento de mensajes de fans

**File:** `tests/detalles-club/visualizacion-mensajes-fans.spec.ts`

**Steps:**
  1. Navegar a una página de detalles de club con votos existentes
    - expect: La página de detalles del club debe cargar exitosamente
  2. Verificar la sección de mensajes de fans existentes
    - expect: Deben mostrarse múltiples mensajes de fans
    - expect: Cada mensaje debe mostrar: inicial/avatar del usuario, nombre, país, estrellas de calificación, fecha, contenido del mensaje
  3. Verificar el ordenamiento de mensajes
    - expect: Los mensajes deben ordenarse por fecha (más recientes primero)
  4. Enviar un nuevo voto
    - expect: El nuevo mensaje debe aparecer en la parte superior de la lista
    - expect: El mensaje debe mostrar toda la información ingresada correctamente

#### 2.6. Probar funcionalidad del botón 'Votar por este club'

**File:** `tests/detalles-club/boton-votar.spec.ts`

**Steps:**
  1. Navegar a una página de detalles de club
    - expect: La página de detalles del club debe cargar exitosamente
  2. Hacer clic en el botón 'Votar por este club'
    - expect: Debe desplazarse a la sección del muro de fans
    - expect: El formulario del muro de fans debe estar en foco o resaltado
  3. Llenar y enviar un voto
    - expect: El voto debe registrarse exitosamente

### 3. Suite de Pruebas Negativas

**Seed:** `tests/seed.spec.ts`

#### 3.1. Probar búsqueda con términos inválidos/no existentes

**File:** `tests/pruebas-negativas/busqueda-invalida.spec.ts`

**Steps:**
  1. Escribir 'ClubInexistenteXYZ123' en la caja de búsqueda
    - expect: No deben mostrarse tarjetas de clubes
    - expect: Debe aparecer un mensaje apropiado de 'sin resultados' o mostrarse un estado vacío
  2. Escribir solo caracteres especiales '!@#$%^&*()' en la caja de búsqueda
    - expect: No debe haber resultados o debe manejarse apropiadamente
  3. Escribir un término de búsqueda extremadamente largo
    - expect: Debe manejar apropiadamente la entrada larga
  4. Limpiar la búsqueda
    - expect: Todos los clubes deben mostrarse nuevamente

#### 3.2. Probar combinaciones de filtros sin resultados

**File:** `tests/pruebas-negativas/filtros-sin-resultados.spec.ts`

**Steps:**
  1. Seleccionar liga 'UCL Europa' y país 'Paraguay'
    - expect: No deben mostrarse resultados (Paraguay solo tiene clubes de Libertadores)
    - expect: Debe mostrarse un estado vacío apropiado
  2. Seleccionar liga 'Lib. América' y país 'Germany'
    - expect: No deben mostrarse resultados
    - expect: Debe mostrarse un estado vacío apropiado
  3. Restablecer filtros
    - expect: Todos los clubes deben mostrarse nuevamente

#### 3.3. Probar envío de formulario con entrada maliciosa

**File:** `tests/pruebas-negativas/entrada-maliciosa.spec.ts`

**Steps:**
  1. Navegar a una página de detalles de club
    - expect: La página de detalles del club debe cargar exitosamente
  2. Intentar inyección SQL en el campo de nombre
    - expect: La entrada debe sanearse o rechazarse
  3. Intentar ataque XSS en el campo de mensaje
    - expect: La entrada debe sanearse, las etiquetas de script no deben ejecutarse
  4. Intentar enviar un payload extremadamente grande
    - expect: Debe manejarse apropiadamente con límites de tamaño

#### 3.4. Probar envíos concurrentes de formulario

**File:** `tests/pruebas-negativas/envios-concurrentes.spec.ts`

**Steps:**
  1. Navegar a una página de detalles de club
    - expect: La página de detalles del club debe cargar exitosamente
  2. Hacer clic rápidamente en el botón de enviar múltiples veces
    - expect: Debe prevenir envíos duplicados
    - expect: Solo debe registrarse un voto
  3. Enviar formulario, luego intentar enviar inmediatamente nuevamente con los mismos datos
    - expect: Debe manejar apropiadamente la prevención de duplicados

### 4. Suite de Flujos de Usuario

**Seed:** `tests/seed.spec.ts`

#### 4.1. Recorrido completo de usuario: Buscar, filtrar, ver detalles, votar

**File:** `tests/flujos-usuario/recorrido-completo.spec.ts`

**Steps:**
  1. Navegar a la página principal
    - expect: La página principal carga exitosamente
  2. Buscar 'Barcelona'
    - expect: Aparece el FC Barcelona en los resultados
  3. Seleccionar filtro de liga 'UCL Europa'
    - expect: Solo el FC Barcelona permanece visible
  4. Hacer clic en la tarjeta del FC Barcelona
    - expect: Carga la página de detalles del FC Barcelona
  5. Llenar el formulario de votación de fans con datos válidos
    - expect: El formulario acepta todas las entradas
  6. Enviar el voto
    - expect: El voto se registra exitosamente, aparece en el muro de fans
  7. Hacer clic en el botón volver
    - expect: Regresa a la vista filtrada de la página principal
  8. Limpiar búsqueda y filtros
    - expect: Todos los clubes se muestran nuevamente

#### 4.2. Flujo de exploración de múltiples clubes

**File:** `tests/flujos-usuario/exploracion-multiples-clubes.spec.ts`

**Steps:**
  1. Navegar a la página principal
    - expect: La página principal carga exitosamente
  2. Hacer clic en la tarjeta del Real Madrid CF
    - expect: Carga la página de detalles del Real Madrid
  3. Hacer clic en el botón volver
    - expect: Regresa a la página principal
  4. Hacer clic en la tarjeta de Boca Juniors
    - expect: Carga la página de detalles de Boca Juniors
  5. Hacer clic en el botón volver
    - expect: Regresa a la página principal
  6. Hacer clic en la tarjeta del Bayern Munich
    - expect: Carga la página de detalles del Bayern Munich
  7. Hacer clic en el botón volver
    - expect: Regresa a la página principal

#### 4.3. Flujo de exploración de filtros

**File:** `tests/flujos-usuario/exploracion-filtros.spec.ts`

**Steps:**
  1. Navegar a la página principal
    - expect: La página principal carga exitosamente
  2. Seleccionar filtro de país 'Argentina'
    - expect: Solo se muestran clubes argentinos
  3. Seleccionar filtro de liga 'Lib. América'
    - expect: Solo se muestran clubes argentinos de Libertadores
  4. Hacer clic en uno de los clubes mostrados
    - expect: Carga la página de detalles del club
  5. Hacer clic en el botón volver
    - expect: Regresa a la vista filtrada
  6. Restablecer todos los filtros
    - expect: Todos los clubes se muestran nuevamente

### 5. Suite de Rendimiento y Responsividad

**Seed:** `tests/seed.spec.ts`

#### 5.1. Probar rendimiento de carga de página

**File:** `tests/rendimiento/carga-pagina.spec.ts`

**Steps:**
  1. Navegar a la página principal
    - expect: La página debe cargar en un tiempo aceptable (menos de 3 segundos)
    - expect: Todos los elementos deben ser visibles e interactivos
  2. Navegar a una página de detalles de club
    - expect: La página de detalles debe cargar en un tiempo aceptable
    - expect: Todo el contenido debe mostrarse rápidamente

#### 5.2. Probar responsividad en diferentes viewports

**File:** `tests/rendimiento/responsividad.spec.ts`

**Steps:**
  1. Establecer viewport a tamaño móvil (375x667)
    - expect: El diseño debe adaptarse al viewport móvil
    - expect: Todos los elementos deben ser accesibles y utilizables
    - expect: El texto debe ser legible sin desplazamiento horizontal
  2. Establecer viewport a tamaño tableta (768x1024)
    - expect: El diseño debe adaptarse al viewport de tableta
    - expect: Las tarjetas de clubes deben reorganizarse apropiadamente
  3. Establecer viewport a tamaño escritorio (1920x1080)
    - expect: El diseño debe usar el espacio disponible efectivamente
    - expect: Todos los elementos deben estar espaciados apropiadamente
  4. Probar interacción en diferentes viewports
    - expect: Todos los elementos interactivos deben funcionar correctamente en cada tamaño de viewport

#### 5.3. Probar rendimiento de paginación con grandes conjuntos de datos

**File:** `tests/rendimiento/rendimiento-paginacion.spec.ts`

**Steps:**
  1. Navegar a través de múltiples páginas de paginación
    - expect: Las transiciones de página deben ser suaves
    - expect: El contenido debe cargar rápidamente para cada página
  2. Probar combinaciones de filtros con paginación
    - expect: El filtrado debe funcionar correctamente con paginación
    - expect: Los conteos de página deben ajustarse basados en los resultados filtrados
