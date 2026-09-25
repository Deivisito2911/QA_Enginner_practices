# Plan de Pruebas y Estrategia - "Style Haven"

## 1. Información General
* **Proyecto:** Style Haven (Plataforma E-commerce de Moda)
* **Duración del Ciclo de Pruebas:** 40 días
* **Equipo de QA:** 3 Testers
* **Base de Requisitos:** `requisitos_ai_espanol.md`

## 2. Entornos de Prueba
Las pruebas deben garantizar el correcto funcionamiento en las combinaciones de los siguientes Sistemas Operativos y Navegadores:
* **Sistemas Operativos:** Windows, Linux.
* **Navegadores:** Google Chrome, Brave, Navegador nativo/genérico de Linux (ej. Mozilla Firefox o GNOME Web).

## 3. Estrategia de Pruebas
Dado el tiempo y los recursos, el enfoque principal será asegurar los flujos críticos de negocio de la plataforma:
1. **Pruebas Funcionales:** Validar cada módulo descrito en los requisitos (Cuentas, Catálogo, Carrito, Pago, Panel de Vendedor, Soporte).
2. **Pruebas de Compatibilidad (Cross-Browser / Cross-OS):** Asegurar que la UI y las funcionalidades no se rompan entre Windows/Linux y los distintos navegadores.
3. **Pruebas No Funcionales (Básicas):** Pruebas de carga ligera (Rendimiento) y verificaciones básicas de Seguridad (ej. en el Checkout y Login).

## 4. Asignación de Recursos y Módulos
Para optimizar el esfuerzo de los 3 Testers, se dividirán los módulos de la siguiente manera, asegurando la rotación de entornos:

* **Tester 1:** 
  * **Módulos:** Cuentas de Usuario, Catálogo de Productos, Características Opcionales (Listas de deseos).
  * **Enfoque de Entorno Principal:** Windows (Chrome) y Linux (Navegador Genérico).
* **Tester 2:** 
  * **Módulos:** Carrito de Compras y Pago (Checkout - *Flujo Crítico*).
  * **Enfoque de Entorno Principal:** Windows (Brave) y Linux (Chrome).
* **Tester 3:** 
  * **Módulos:** Panel de Vendedor y Soporte al Cliente.
  * **Enfoque de Entorno Principal:** Linux (Brave) y Windows (Chrome).

*Nota: Durante la fase de regresión, los testers intercambiarán módulos para evitar la ceguera de taller (sesgo del tester).*

## 5. Cronograma de Pruebas (40 Días)

| Fase | Días | Actividades Principales |
| :--- | :--- | :--- |
| **Fase 1: Planificación y Diseño** | Día 1 - Día 7 | Análisis profundo de los requisitos. Diseño y redacción de Casos de Prueba. Preparación de entornos de prueba y datos. |
| **Fase 2: Ejecución de Pruebas Funcionales** | Día 8 - Día 24 | Ejecución del primer ciclo de pruebas. Reporte de bugs (Defect Logging) al equipo de desarrollo. |
| **Fase 3: Pruebas de Compatibilidad** | Día 25 - Día 30 | Ejecución de escenarios clave en todas las combinaciones de OS (Windows/Linux) y navegadores (Chrome, Brave, Genérico). |
| **Fase 4: Retesting y Regresión** | Día 31 - Día 36 | Validación de los bugs corregidos por desarrollo. Ejecución de la suite de regresión intercambiando módulos entre testers. |
| **Fase 5: Cierre y Reportes** | Día 37 - Día 40 | Elaboración del informe final de métricas. Aprobación (Sign-off) para liberación (Go-Live). |

## 6. Entregables Esperados
1. Documento de Plan de Pruebas (este documento).
2. Suite de Casos de Prueba.
3. Matriz de Trazabilidad de Requisitos (RTM).
4. Reportes de Defectos (Bugs).
5. Informe Resumen de Cierre de Pruebas.
