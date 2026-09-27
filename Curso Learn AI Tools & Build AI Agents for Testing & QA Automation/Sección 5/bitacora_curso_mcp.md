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
  - [x] Ejecución de consulta SQL analítica: Agrupación de la tabla `Orders` para encontrar empresas con más de un pedido realizado (`Tech Solutions Inc.`).
  - [x] Interacción cruzada: Creación de tabla `registerdetails` en SQL, unión con `Customers`, e inyección de dichos datos en el navegador usando Playwright MCP para registrar 2 usuarios automáticamente.

### 26. Hands-On Practice Resources for Testing Skills
- **Notas:** 
  - Se recomienda encarecidamente utilizar el **Practice Hub** de Rahul Shetty Academy (`rahulshettyacademy.com` -> Practice Apps) para fortalecer las habilidades de automatización en aplicaciones reales.
  - El hub incluye entornos de práctica para: aplicaciones Web (UI), APIs, aplicaciones Móviles y aplicaciones modernas de IA (LLM/RAG).
  - Para objetivos profesionales en la industria, se sugiere revisar el portal de oportunidades laborales en `rahulshettyacademy.com` -> QA Jobs.
  - El enfoque principal es que la práctica consistente en sistemas reales mejorará significativamente la confianza y comprensión práctica.

### 27. Build Agent which can perform API Testing & talk to local File systems for data
- **Notas:** (Por completar)
- **Prácticas/Código:** (Por completar)

### 28. Build Agent which can read/write to excel file for...
- **Notas:** (Por completar)
- **Prácticas/Código:** (Por completar)

### 27. Build Agent which can perform API Testing & talk to local File systems for data
- **Notas:** 
  - Se verific� en el historial de logs y base de datos las credenciales de los usuarios reci�n creados (Alice Smith: alice.smith.test99@example.com).
- **Pr�cticas/C�digo:** 
  - [x] Actualizaci�n del archivo EcomBasic.postman_collection.json con el usuario y contrase�a creados para probar en Postman.

- [x] Instalaci�n y configuraci�n del MCP REST API Tester (dkmaker-mcp-rest-api) en el archivo de agentes locales.

- [x] Sincronizaci�n del repositorio local con el remoto (commit y push) para respaldar los cambios de la colecci�n de Postman, la instalaci�n de REST API MCP y la bit�cora.

- [x] Extracci�n de datos del usuario Charlie Brown desde la base de datos (tablas customers y registerdetails).
- [x] Automatizaci�n del registro de usuario en 'https://rahulshettyacademy.com/client' mediante Playwright MCP.
- [x] Validaci�n del contrato de API bas�ndose en Postman y ejecuci�n de login a '/api/ecom/auth/login' con el servidor MCP rest_api obteniendo un status 200 OK y el token respectivo.

### 28. Build Agent which can read/write to excel file for...
- **Notas:**
  - Se instal� globalmente y se configur� localmente el servidor MCP para manejo de archivos Excel (@negokaz/excel-mcp-server).
- **Pr�cticas/C�digo:**
  - [x] Configuraci�n del servidor MCP en '.agents/mcp_config.json'.

- [x] Sincronizaci�n del repositorio (pull y push) previo al reinicio de la sesi�n de Antigravity para cargar las nuevas herramientas MCP.
