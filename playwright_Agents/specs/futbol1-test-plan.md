# Plan de pruebas de Fútbol 1 — caracterización inicial

## Application Overview

Aplicación bajo prueba: https://futbol1.geekqa.net/. Estado inicial asumido para todos los casos: navegador nuevo, sin cookies, caché, localStorage, sessionStorage ni autenticación previa. La exploración automatizada no pudo comenzar porque el workspace no contiene package.json ni la dependencia @playwright/test requerida por seed.spec.ts; por ello, este documento no atribuye a la aplicación controles o flujos que no hayan podido verificarse. El plan cubre pruebas independientes de acceso, seguridad de transporte, caracterización de la interfaz, navegación, persistencia, accesibilidad, adaptación visual y fallos de red. Criterio global de éxito: la aplicación carga sin errores bloqueantes, todos los controles descubiertos son operables y producen resultados consistentes, y los fallos se comunican de forma recuperable. Criterio global de fallo: pantalla en blanco, errores JavaScript no controlados, navegación rota, pérdida inesperada de estado, contenido inaccesible o ausencia de recuperación ante errores. Para cerrar la cobertura funcional específica se debe instalar una versión fijada de @playwright/test, ejecutar nuevamente la exploración y sustituir los pasos de caracterización por nombres y rutas exactos de los controles observados.

## Test Scenarios

### 1. Acceso, caracterización y navegación

**Seed:** `seed.spec.ts`

#### 1.1. Carga inicial segura desde un estado completamente nuevo

**File:** `tests/futbol1/home-load.spec.ts`

**Steps:**
  1. Abrir un contexto de navegador nuevo, confirmar que no contiene cookies ni datos de almacenamiento y navegar a https://futbol1.geekqa.net/.
    - expect: La conexión utiliza HTTPS y no presenta advertencias de certificado.
    - expect: La navegación finaliza sin bucles de redirección.
    - expect: Se muestra contenido de aplicación en lugar de una pantalla en blanco, listado de directorio o error del servidor.
  2. Esperar a que finalice la actividad de red inicial y observar el documento.
    - expect: Existe un título de página no vacío y contenido principal identificable.
    - expect: No aparecen errores no controlados, trazas técnicas ni indicadores de carga permanentes.
    - expect: No hay errores JavaScript bloqueantes en la consola.
  3. Recargar la página una vez.
    - expect: La aplicación vuelve a cargar correctamente y mantiene una presentación inicial coherente.
    - expect: No se duplican controles, mensajes ni datos como consecuencia de la recarga.

#### 1.2. Inventario y operabilidad de todos los controles visibles

**File:** `tests/futbol1/interface-inventory.spec.ts`

**Steps:**
  1. Desde un contexto nuevo, abrir la URL raíz y registrar por sección todos los enlaces, botones, campos, selectores, pestañas, tarjetas interactivas, menús y controles sin etiqueta que aparezcan en el primer viewport.
    - expect: Cada control posee una finalidad comprensible por su texto, etiqueta accesible o contexto.
    - expect: No existen controles superpuestos, cortados o visualmente deshabilitados que respondan como habilitados.
  2. Recorrer la página completa hasta el final y ampliar el inventario con los controles que aparezcan durante el desplazamiento.
    - expect: Todo el contenido termina de renderizarse sin saltos continuos ni carga infinita accidental.
    - expect: No aparecen duplicados inesperados o elementos fuera del contenedor visible.
  3. En ejecuciones independientes, activar una sola vez cada control descubierto y registrar URL, cambio de estado, contenido o mensaje resultante; volver a un contexto nuevo antes de probar el siguiente.
    - expect: Cada control genera una respuesta observable y coherente con su etiqueta.
    - expect: Los controles que abren rutas, paneles o diálogos permiten regresar o cerrarlos.
    - expect: Ninguna acción simple provoca una excepción, pantalla en blanco o estado irrecuperable.

#### 1.3. Integridad de rutas y enlaces internos descubiertos

**File:** `tests/futbol1/internal-navigation.spec.ts`

**Steps:**
  1. Abrir la raíz en un contexto nuevo e identificar todos los enlaces internos visibles, incluidos logotipo, navegación principal, tarjetas y pie de página.
    - expect: Los enlaces internos presentan destinos válidos y no usan marcadores vacíos sin comportamiento alternativo.
    - expect: El enlace activo, si existe navegación, se distingue de forma perceptible.
  2. Abrir cada destino interno de manera independiente en la misma pestaña.
    - expect: Cada destino responde sin error 4xx/5xx y muestra contenido correspondiente al enlace activado.
    - expect: La URL y el estado visible son coherentes; no se muestra contenido obsoleto de la ruta anterior.
  3. En cada destino, usar Atrás y luego Adelante del navegador.
    - expect: Atrás restaura la página previa sin dejarla en blanco.
    - expect: Adelante devuelve al destino posterior y no duplica datos ni eventos.
    - expect: El historial no contiene redirecciones inesperadas que obliguen a pulsar varias veces.
  4. Copiar cada URL interna resultante y abrirla directamente en un contexto nuevo.
    - expect: Las rutas profundas son accesibles mediante carga directa o redirigen de forma explícita a una ruta válida.
    - expect: No dependen exclusivamente de haber visitado antes la página raíz.

#### 1.4. Seguridad y comportamiento de enlaces externos

**File:** `tests/futbol1/external-links.spec.ts`

**Steps:**
  1. Desde un contexto nuevo, localizar los enlaces cuyo host sea distinto de futbol1.geekqa.net y registrar su texto y destino.
    - expect: El destino coincide con la expectativa creada por el texto o contexto del enlace.
    - expect: No hay enlaces con esquemas inseguros o destinos evidentemente malformados.
  2. Activar cada enlace externo de manera independiente.
    - expect: El recurso correcto se abre en la pestaña declarada por el diseño.
    - expect: Si se abre una pestaña nueva, la aplicación original permanece utilizable y el enlace aplica protecciones de aislamiento apropiadas.
    - expect: No se envían datos sensibles en la URL.

### 2. Estado, recuperación y condiciones adversas

**Seed:** `seed.spec.ts`

#### 2.1. Coherencia del estado después de recarga y nueva sesión

**File:** `tests/futbol1/state-refresh.spec.ts`

**Steps:**
  1. Abrir la raíz en un contexto nuevo, realizar una única selección o navegación no destructiva disponible y anotar el estado visible y la URL.
    - expect: La acción queda reflejada claramente en la interfaz, en la URL o en ambos.
    - expect: No se altera contenido no relacionado.
  2. Recargar la página en ese estado.
    - expect: El estado se conserva si está representado en URL o almacenamiento, o vuelve de forma clara al valor predeterminado si fue diseñado como temporal.
    - expect: No aparece una combinación parcial o contradictoria entre URL, control y contenido.
  3. Abrir la misma URL en un segundo contexto completamente nuevo.
    - expect: No se filtran datos del primer contexto.
    - expect: El segundo contexto muestra únicamente el estado codificado en la URL o el estado inicial público.

#### 2.2. Fallo de red durante la carga y recuperación posterior

**File:** `tests/futbol1/offline-recovery.spec.ts`

**Steps:**
  1. Crear un contexto nuevo, poner el navegador sin conexión y navegar a la URL raíz.
    - expect: El fallo no expone trazas internas ni información sensible.
    - expect: El navegador o la aplicación presenta un estado de error entendible; no queda un indicador de carga infinito.
  2. Restaurar la conexión y usar el mecanismo de reintento visible; si no existe, recargar la página.
    - expect: La aplicación recupera el contenido sin tener que borrar datos manualmente.
    - expect: El estado de error desaparece y los controles quedan operables.
    - expect: No se duplican solicitudes funcionales ni contenido tras la recuperación.
  3. Con la aplicación ya cargada, volver a desconectar la red y activar un control que requiera datos remotos, si existe.
    - expect: La interfaz comunica el fallo cerca del contexto afectado o mediante un aviso accesible.
    - expect: El contenido previamente válido no se corrompe.
    - expect: Tras reconectar y reintentar, la operación puede completarse.

#### 2.3. Respuesta de servidor fallida y datos inválidos

**File:** `tests/futbol1/server-error.spec.ts`

**Steps:**
  1. En una ejecución controlada, interceptar la principal solicitud de datos descubierta durante la carga y responder una vez con HTTP 500.
    - expect: La aplicación muestra un estado de error no técnico y recuperable.
    - expect: No representa el error como datos válidos ni queda bloqueada indefinidamente.
  2. Retirar la interceptación y activar reintento o recargar.
    - expect: Los datos válidos se muestran tras la recuperación.
    - expect: El mensaje de error desaparece y no quedan controles deshabilitados.
  3. En otra ejecución nueva, devolver HTTP 200 con cuerpo vacío o JSON con estructura inválida para esa misma solicitud.
    - expect: La aplicación maneja la respuesta inválida sin excepción JavaScript no controlada.
    - expect: Se distingue entre ausencia legítima de resultados y error de formato cuando corresponda.
    - expect: No se muestran valores undefined, null, NaN ni marcado sin procesar al usuario.

### 3. Accesibilidad y presentación adaptable

**Seed:** `seed.spec.ts`

#### 3.1. Recorrido completo y activación mediante teclado

**File:** `tests/futbol1/keyboard-accessibility.spec.ts`

**Steps:**
  1. Abrir la raíz en un contexto nuevo y, sin utilizar el ratón, pulsar Tab repetidamente hasta recorrer todos los controles visibles y el contenido completo.
    - expect: Cada elemento interactivo recibe foco en un orden lógico.
    - expect: El foco es visible y no queda atrapado fuera de un diálogo intencional.
    - expect: No se enfocan elementos ocultos, decorativos o deshabilitados.
  2. Activar enlaces y botones con Enter, y controles que lo requieran con Barra espaciadora; cerrar menús o diálogos con Escape.
    - expect: Las acciones de teclado producen el mismo resultado funcional que el ratón.
    - expect: Escape cierra únicamente la capa superior aplicable y devuelve el foco al elemento que la abrió.
  3. Inspeccionar semántica, nombre accesible y estado de los controles descubiertos.
    - expect: Cada control tiene rol, nombre y estado accesibles congruentes.
    - expect: Los encabezados mantienen una jerarquía lógica y existe una región de contenido principal.
    - expect: Los cambios y errores importantes pueden ser percibidos por tecnologías de asistencia.

#### 3.2. Adaptación de la interfaz en móvil, tableta y escritorio

**File:** `tests/futbol1/responsive-layout.spec.ts`

**Steps:**
  1. Abrir la raíz desde un estado nuevo con viewport móvil de 320 × 568 píxeles y recorrer toda la página.
    - expect: No existe desplazamiento horizontal causado por el contenido.
    - expect: Texto, controles y datos esenciales permanecen legibles y operables.
    - expect: Los controles táctiles no se solapan y los menús adaptables pueden abrirse y cerrarse.
  2. Repetir la inspección con 768 × 1024 píxeles.
    - expect: La distribución aprovecha el espacio sin ocultar funciones disponibles en móvil o escritorio.
    - expect: No aparecen cortes, superposiciones ni cambios de orden que alteren el significado.
  3. Repetir con 1440 × 900 píxeles y aumentar el zoom del navegador al 200 %.
    - expect: En escritorio no quedan bloques funcionales innecesariamente fuera del área visible.
    - expect: Con zoom al 200 %, el contenido sigue siendo accesible, refluye cuando corresponde y no requiere desplazamiento bidimensional para operar funciones principales.
  4. Cambiar la orientación móvil de vertical a horizontal durante el uso.
    - expect: El contenido se redistribuye sin perder el estado actual.
    - expect: No aparecen controles fuera de pantalla ni capas con dimensiones obsoletas.

#### 3.3. Legibilidad, consistencia y ausencia de contenido técnico expuesto

**File:** `tests/futbol1/content-quality.spec.ts`

**Steps:**
  1. Abrir la raíz en un contexto nuevo y revisar todos los textos visibles, estados vacíos, etiquetas, fechas, horas, marcadores y mensajes descubiertos.
    - expect: El idioma y la terminología son consistentes.
    - expect: No hay claves de traducción, texto de relleno, valores técnicos ni formatos ambiguos.
    - expect: Fechas, horas y cantidades incluyen contexto suficiente para interpretarlas.
  2. Forzar, cuando sea posible, estados de carga, vacío y error de cada región de datos.
    - expect: Cada estado se diferencia visual y semánticamente.
    - expect: El estado vacío explica que no hay resultados sin presentarlo como fallo.
    - expect: El estado de error ofrece una acción viable de recuperación cuando corresponda.
