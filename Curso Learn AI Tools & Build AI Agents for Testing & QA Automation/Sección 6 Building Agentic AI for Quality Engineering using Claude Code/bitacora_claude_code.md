# Bitácora del Curso: Generative AI in Software Testing
## Sección 6: Building Agentic AI for Quality Engineering using Claude Code

Este documento servirá como bitácora para registrar los aprendizajes, prácticas y notas importantes de cada clase de esta sección.

**Aplicación Bajo Pruebas (AUT):** [EventHub - Rahul Shetty Academy](https://eventhub.rahulshettyacademy.com/login)
**Documentación de la API (Swagger):** [API Docs](https://api.eventhub.rahulshettyacademy.com/api/docs)
**Credenciales de Prueba (creadas vía MCP):** 
- **Email:** `testqa_claude_2026@example.com`
- **Password:** `TestPassword123!`

### 30. Introduction to Agentic AI - What problems we are solving here? - Action Plan
- **Notas:** Introducción y plan de acción sobre qué problemas resuelve la IA Agéntica.

### 31. Introduction to Claude Code Skill System - Problem statement
- **Notas:** Introducción al sistema de habilidades (Skill System) de Claude Code y definición del problema.
- **Comandos / Skills abordados:**
  - `/create-scenarios`
  - `/teststrategy`
  - `/generate-tests`
  - `/review-tests`

### 32. Download the code base & Skill files used in this section
- **Notas:** (Por completar)

### 33. Install Claude code & Claude for Chrome and get started with /init file
- **Notas:** En nuestro ecosistema actual usamos **Gemini Antigravity**, el cual es un agente IA mucho más robusto. No es necesario instalar Claude Code ni su extensión, ya que Antigravity suple (y supera) sus funcionalidades. En lugar del comando `/init` de Claude, nosotros usamos nuestro archivo manifiesto `GEMINI.md` (y la carpeta `.agents/`) para inicializar el contexto y las reglas del agente.

### 34. Tip - Good to know
- **Notas:** Todo el conocimiento de configuración y el sistema de Skills que enseña el curso para Claude Code es perfectamente adaptable al "Customization System" de Antigravity.
  - **Adaptación Realizada:** Identificamos que el curso provee archivos de configuración y skills (en la carpeta descargada `eventhub/.claude/skills`). Para adaptarlos a nuestro entorno, hemos movido todo el contenido a `/.agents/skills/`. De esta forma, KIRO IDE y Antigravity los detectan de forma nativa.
  - **Comparativa:** Se generó el archivo `comparativa_claude_vs_antigravity.html` que documenta la justificación técnica de usar Antigravity frente al CLI original `claude` (ej. el uso de `GEMINI.md` en lugar de `/init`).

### 35. Understand Knowledge Skills & Agent Skills - When to use with demo example
- **Notas:** Entendido el concepto. "Knowledge Skills" brindan contexto pasivo (documentación, directrices) y "Agent Skills" son capacidades activas (subagentes o procedimientos que ejecutan tareas). A lo largo del curso, crearemos distintos agentes para abordar diferentes capas (UI, API, etc.), implementándolos a través de KIRO IDE o usando los subagentes nativos de Antigravity.
  - **Corrección de Configuración para KIRO IDE:** KIRO IDE requiere una estructura específica para mostrar los agentes en el chat. Los agentes deben definirse como archivos `.md` individuales dentro de `.kiro/agents/` (ej. `qa-planner.md`) conteniendo un Frontmatter YAML. Asimismo, los Skills deben alojarse en `.kiro/skills/<nombre>/SKILL.md` con su respectivo YAML. Hemos migrado la carpeta `.agents/` a `.kiro/` para cumplir con esta especificación y habilitar los agentes `@qa-planner`, `@qa-automation` y `@qa-reviewer` en la interfaz.

### 36. Create Skill docs for EventHub Application & Understand how they are designed
- **Notas:** Sección completada. Se entendió el diseño y creación de Skills para la aplicación EventHub.

### 37. Avoid Context Bloat: Use Smart References for Accurate AI Responses
- **Notas:** Sección completada. Se aplicaron estrategias para evitar la sobrecarga de contexto mediante el uso de referencias inteligentes.

### 38. The Magic of Agent creating Test Scenarios by reading the Project domain doc
- **Notas:** Sección completada. Generación de escenarios de prueba exitosa a partir del documento de dominio del proyecto.

### 39. The Magic of Agent Creating Test Strategy to push tests into different layers
- **Notas:** Sección completada. Estrategia de pruebas definida y distribuida en distintas capas.

### 40. Create Skills for Playwright best Practices and then build Agent to write Tests
- **Notas:** Sección completada. Creación de Skills de buenas prácticas para Playwright y construcción del agente automatizador.

### 41. Demo: Agent Running Tests and Fixing Failed Tests by Referring to Domain Docs
- **Notas:** Sección completada. Demostración exitosa de la ejecución y corrección autónoma de pruebas utilizando la documentación de dominio.

### 42. Tip - Good to know
- **Notas:** Sección completada. Revisión de tips adicionales finalizada.

### 43. Demo : Goal oriented Agentic Solution for the Test coverage anaylsis with report
- **Notas:** Sección completada. Análisis de cobertura de pruebas y generación de reportes finalizados con éxito.

---
**🏆 Estado Final de la Sección 6:** ¡Completada con éxito! El usuario ha finalizado todas las lecciones de la sección.

### Tarea Pendiente: Automatización de Escenarios UI (Login y Registro) con POM
- **Notas:** (Continuación tras agotamiento de créditos en Kiro IDE). El agente AI (Gemini Antigravity) asumió el rol de QA Engineer Senior. 
  - Se movió correctamente la carpeta `tests/` dentro del directorio del proyecto `eventhub/` para utilizar la configuración nativa de Playwright existente en `playwright.config.ts`.
  - Se utilizaron las herramientas MCP de `playwrightmcp` (`browser_navigate`, `browser_snapshot`, `browser_evaluate`, `browser_fill_form`, `browser_click`) para interactuar con la aplicación en vivo (`https://eventhub.rahulshettyacademy.com/login` y `/register`) y extraer los locators reales (usando `data-testid`, IDs estables y `getByPlaceholder`).
  - Se implementaron los Page Objects (`LoginPage.js` y `RegisterPage.js`) siguiendo las mejores prácticas y priorizando selectores semánticos y seguros.
  - Se implementaron los scripts de prueba (`login.spec.js` y `registration.spec.js`) con assertions visuales y asíncronas (`toBeVisible`, `toHaveURL`) descartando por completo el uso de `waitForTimeout`.
  - La tarea técnica solicitada quedó finalizada y lista para ejecución (a la espera de los procesos de CI/CD).

### Tarea Pendiente: CI/CD Pipeline (Sección 8)
- **Notas:** Se tomó el archivo `.github/workflows/playwright.yml` existente dentro de `eventhub` y se alineó con la estructura real del repositorio.
  - Se movió/creó la carpeta `.github/workflows` en la raíz real del repositorio de Git (`D:/carconnec/`).
  - Se configuró la variable de entorno `WORKDIR` para apuntar a la ruta profunda de `eventhub` (`Curso Learn AI Tools & Build AI Agents for Testing & QA Automation/Sección 6 Building Agentic AI for Quality Engineering using Claude Code/eventhub`).
  - Se añadieron `defaults.run.working-directory` para que `npm ci` y `npx playwright test` se ejecuten en el directorio correcto.
  - Se ajustó el path del `cache-dependency-path` y el upload artifact para que funcionen con esta ruta anidada.

### Corrección de Pruebas y Troubleshooting en CI
- **Notas:** Durante la primera ejecución en GitHub Actions, los tests fallaron debido a aserciones (assertions) incorrectas.
  - Se descubrió mediante Playwright MCP que, tras un login o registro exitoso, la aplicación redirige a la ruta raíz `/` (y no a `/dashboard` o `/login` como se esperaba) y loguea automáticamente al usuario.
  - Se actualizaron los scripts `login.spec.js` y `registration.spec.js` para esperar la URL correcta (`/.*\/$/`) y validar la presencia del botón "Logout" (`page.getByRole('button', { name: 'Logout' })`).
  - Se hizo push del parche y el pipeline de GitHub Actions (Playwright E2E Tests) se ejecutó exitosamente (verde).

### Paso 49: Dockerización del Entorno de Pruebas
- **Notas:** Se revisó y ajustó la configuración de contenedores para permitir ejecutar Playwright de forma aislada, sin necesidad de dependencias locales.
  - **Dockerfile**: Se usa la imagen oficial `mcr.microsoft.com/playwright:v1.58.2-noble`. Se ajustó el `CMD` final para que emita reportes tanto en consola (`line`) como en archivo (`html`).
  - **docker-compose.yml**: Se agregó la bandera `ipc: host` (crucial para evitar que Chromium haga "crash" por límites de memoria compartida en contenedores). Además, se configuran los volúmenes para extraer los reportes y capturas hacia el Host.
  - **Uso**: Ahora cualquier desarrollador puede descargar el proyecto y correr `docker compose up --build` dentro de `eventhub` para correr todas las pruebas y obtener su reporte HTML limpio.

### ¿Cómo funciona la contenerización detrás de escena? (Explicación de Archivos Docker)
Para lograr que cualquier desarrollador pueda ejecutar las pruebas sin instalar Node.js ni navegadores, se configuraron tres archivos clave que trabajan en conjunto:

1. **`Dockerfile` (La Receta / El Molde)**
   - Define el paso a paso para construir la "máquina" (imagen) que correrá las pruebas.
   - Utiliza una imagen base oficial de Microsoft (`mcr.microsoft.com/playwright...`) que **ya tiene preinstalados** todos los navegadores y librerías del sistema operativo.
   - Su trabajo es copiar nuestro código fuente (`package.json`, `tests/`, `playwright.config.ts`), instalar las dependencias con `npm ci` y establecer el comando de arranque que se ejecutará por defecto: `npx playwright test`.

2. **`.dockerignore` (El Filtro de Limpieza)**
   - Funciona exactamente igual que un `.gitignore`, pero le dice a Docker qué archivos de tu máquina local **no** debe copiar hacia el interior del contenedor.
   - Ignoramos conscientemente la carpeta `node_modules` local. De esta forma, obligamos al contenedor a descargar las dependencias por sí mismo. Esto garantiza un entorno limpio e idéntico para todos los usuarios.

3. **`docker-compose.yml` (El Director de Orquesta)**
   - Automatiza la ejecución para que no tengas que memorizar comandos largos de Docker. Todo se resume a correr `docker compose up`.
   - **Mapeo de Volúmenes (`volumes`):** Configura un "túnel" entre la carpeta del contenedor y tu máquina física. Así, cuando el test termina, los reportes (`playwright-report/`) y videos/capturas de errores se exportan automáticamente a tu computadora para que los revises, a pesar de que se generaron en un contenedor aislado.
   - **`ipc: host`**: Permite al contenedor compartir el espacio de memoria principal de tu computadora. Los navegadores web consumen mucha memoria; sin esto, Playwright suele congelarse o fallar en Docker por límites de "memoria compartida" (shared memory).
