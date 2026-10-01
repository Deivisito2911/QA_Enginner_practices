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
