# Bitácora del Curso: Generative AI in Software Testing
## Sección 5: Intro to Model Context Protocol (MCP) Servers & Build Agents with MCP

Este documento servirá como bitácora para registrar los aprendizajes, prácticas y notas importantes de cada clase de esta sección.

### 20. What is MCP? How this MCP help an LLM to be super powerful
- **Notas:** (Por completar)

### 21. Resources to download
- **Notas:** (Por completar)

### 22. Build Agent which automates web browser using Playwright/Selenium MCP Servers
- **Notas:** (Por completar)
- **Prácticas/Código:** 
  - [x] Navegación automatizada a `https://rahulshettyacademy.com/client/#/auth/login` mediante el MCP de Playwright (`browser_navigate`).
  - [x] Interacción con elementos de la interfaz: clic en "Register here" utilizando selectores de texto con Playwright (`browser_click`).
  - [x] Creación del archivo de reglas del agente (`GEMINI.md`) para forzar que el agente actualice continuamente esta bitácora, funcionando como un manifiesto.

### 23. Debugging steps when there are failures in configuring MCP servers
- **Notas:** (Por completar)

### Role play 3: Justifying the Use of MCP to Your Project Manager
- **Notas:** (Por completar)

### 24. Resource
- **Notas:** (Por completar)

### 25. Build Agent which can extract data from SQL database by framing complex queries
- **Notas:** 
  - Se invirtió tiempo (~30 min) resolviendo la confusión entre la configuración del MCP global de Kiro IDE y la configuración local por proyecto (`.agents`) de Gemini Antigravity.
  - Se aprendió cómo se sincronizan y configuran correctamente las credenciales (password, database) adaptando además los comandos de ejecución según el sistema operativo (de macOS a Windows usando `uvx`).
- **Prácticas/Código:**
  - [x] Análisis del repositorio `mysql_mcp_server` y documentación oficial.
  - [x] Configuración del servidor MCP de MySQL en el IDE Kiro mediante el archivo `mcp_config.json`.
  - [x] Creación del script SQL `rahulshettyacademy.sql` localmente para inicializar la base de datos.
  - [x] Creación de `.agents/mcp_config.json` en el workspace actual para integrar Playwright y MySQL MCP servers con Gemini Antigravity, corrigiendo la compatibilidad para Windows (`uvx`).

### 26. Hands-On Practice Resources for Testing Skills
- **Notas:** (Por completar)

### 27. Build Agent which can perform API Testing & talk to local File systems for data
- **Notas:** (Por completar)
- **Prácticas/Código:** (Por completar)

### 28. Build Agent which can read/write to excel file for...
- **Notas:** (Por completar)
- **Prácticas/Código:** (Por completar)
