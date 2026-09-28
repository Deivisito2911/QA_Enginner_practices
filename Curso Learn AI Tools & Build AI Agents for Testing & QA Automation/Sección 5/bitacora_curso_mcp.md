# BitÃ¡cora del Curso: Generative AI in Software Testing
## SecciÃ³n 5: Intro to Model Context Protocol (MCP) Servers & Build Agents with MCP

Este documento servirÃ¡ como bitÃ¡cora para registrar los aprendizajes, prÃ¡cticas y notas importantes de cada clase de esta secciÃ³n.

### 20. What is MCP? How this MCP help an LLM to be super powerful
- **Notas:** (Por completar)

### 21. Resources to download
- **Notas:** (Por completar)

### 22. Build Agent which automates web browser using Playwright/Selenium MCP Servers
- **Notas:** (Por completar)
- **PrÃ¡cticas/CÃ³digo:** 
  - [x] NavegaciÃ³n automatizada a `https://rahulshettyacademy.com/client/#/auth/login` mediante el MCP de Playwright (`browser_navigate`).
  - [x] InteracciÃ³n con elementos de la interfaz: clic en "Register here" utilizando selectores de texto con Playwright (`browser_click`).
  - [x] CreaciÃ³n del archivo de reglas del agente (`GEMINI.md`) para forzar que el agente actualice continuamente esta bitÃ¡cora, funcionando como un manifiesto.

### 23. Debugging steps when there are failures in configuring MCP servers
- **Notas:** (Por completar)

### Role play 3: Justifying the Use of MCP to Your Project Manager
- **Notas:** (Por completar)

### 24. Resource
- **Notas:** (Por completar)

### 25. Build Agent which can extract data from SQL database by framing complex queries
- **Notas:** 
  - Se invirtiÃ³ tiempo (~30 min) resolviendo la confusiÃ³n entre la configuraciÃ³n del MCP global de Kiro IDE y la configuraciÃ³n local por proyecto (`.agents`) de Gemini Antigravity.
  - Se aprendiÃ³ cÃ³mo se sincronizan y configuran correctamente las credenciales (password, database) adaptando ademÃ¡s los comandos de ejecuciÃ³n segÃºn el sistema operativo (de macOS a Windows usando `uvx`).
- **PrÃ¡cticas/CÃ³digo:**
  - [x] AnÃ¡lisis del repositorio `mysql_mcp_server` y documentaciÃ³n oficial.
  - [x] ConfiguraciÃ³n del servidor MCP de MySQL en el IDE Kiro mediante el archivo `mcp_config.json`.
  - [x] CreaciÃ³n del script SQL `rahulshettyacademy.sql` localmente para inicializar la base de datos.
  - [x] CreaciÃ³n de `.agents/mcp_config.json` en el workspace actual para integrar Playwright y MySQL MCP servers con Gemini Antigravity, corrigiendo la compatibilidad para Windows (`uvx`).
  - [x] EjecuciÃ³n de consulta SQL analÃ­tica: AgrupaciÃ³n de la tabla `Orders` para encontrar empresas con mÃ¡s de un pedido realizado (`Tech Solutions Inc.`).
  - [x] InteracciÃ³n cruzada: CreaciÃ³n de tabla `registerdetails` en SQL, uniÃ³n con `Customers`, e inyecciÃ³n de dichos datos en el navegador usando Playwright MCP para registrar 2 usuarios automÃ¡ticamente.

### 26. Hands-On Practice Resources for Testing Skills
- **Notas:** 
  - Se recomienda encarecidamente utilizar el **Practice Hub** de Rahul Shetty Academy (`rahulshettyacademy.com` -> Practice Apps) para fortalecer las habilidades de automatizaciÃ³n en aplicaciones reales.
  - El hub incluye entornos de prÃ¡ctica para: aplicaciones Web (UI), APIs, aplicaciones MÃ³viles y aplicaciones modernas de IA (LLM/RAG).
  - Para objetivos profesionales en la industria, se sugiere revisar el portal de oportunidades laborales en `rahulshettyacademy.com` -> QA Jobs.
  - El enfoque principal es que la prÃ¡ctica consistente en sistemas reales mejorarÃ¡ significativamente la confianza y comprensiÃ³n prÃ¡ctica.

### 27. Build Agent which can perform API Testing & talk to local File systems for data
- **Notas:** (Por completar)
- **PrÃ¡cticas/CÃ³digo:** (Por completar)

### 28. Build Agent which can read/write to excel file for...
- **Notas:** (Por completar)
- **PrÃ¡cticas/CÃ³digo:** (Por completar)

### 27. Build Agent which can perform API Testing & talk to local File systems for data
- **Notas:** 
  - Se verificó en el historial de logs y base de datos las credenciales de los usuarios recién creados (Alice Smith: alice.smith.test99@example.com).
- **Prácticas/Código:** 
  - [x] Actualización del archivo EcomBasic.postman_collection.json con el usuario y contraseña creados para probar en Postman.

- [x] Instalación y configuración del MCP REST API Tester (dkmaker-mcp-rest-api) en el archivo de agentes locales.

- [x] Sincronización del repositorio local con el remoto (commit y push) para respaldar los cambios de la colección de Postman, la instalación de REST API MCP y la bitácora.

- [x] Extracción de datos del usuario Charlie Brown desde la base de datos (tablas customers y registerdetails).
- [x] Automatización del registro de usuario en 'https://rahulshettyacademy.com/client' mediante Playwright MCP.
- [x] Validación del contrato de API basándose en Postman y ejecución de login a '/api/ecom/auth/login' con el servidor MCP rest_api obteniendo un status 200 OK y el token respectivo.

### 28. Build Agent which can read/write to excel file for...
- **Notas:**
  - Se instaló globalmente y se configuró localmente el servidor MCP para manejo de archivos Excel (@negokaz/excel-mcp-server).
- **Prácticas/Código:**
  - [x] Configuración del servidor MCP en '.agents/mcp_config.json'.

- [x] Sincronización del repositorio (pull y push) previo al reinicio de la sesión de Antigravity para cargar las nuevas herramientas MCP.


## MCP Completo: UI, SQL, API Test y Excel
- Se obtuvo un registro de base de datos usando 'mysql_server' (Frank Miller).
- Se navegó a https://rahulshettyacademy.com/client y se completó el registro en UI mediante el MCP de Playwright, utilizando un correo único (frank.miller.1790528454774@example.com) y corrigiendo el formato del teléfono.
- Se verificó el contrato en Postman y se realizó una llamada de inicio de sesión (Login) con el MCP 'rest_api' (apitest), la cual fue exitosa (HTTP 200).
- Se guardaron las nuevas credenciales de registro en el archivo 'newdata.xlsx' mediante el MCP 'excel'.


## Mejoras en la Estabilidad de Pruebas (Validación Defensiva)
- Se implementó la regla de validar elementos con clase '.invalid-feedback' o atributos 'is-invalid' antes de ejecutar la acción de Submit ('#login').
- Esta buena práctica evita caer en bucles infinitos por Timeouts al esperar respuestas de red o navegación cuando el formulario está bloqueado por el frontend.
- El script de registro ahora cuenta con pre-condiciones que capturan mensajes de error como '*only numbers is allowed' antes de avanzar.


## Playwright con Patrón Page Object (POM)
- Navegación manual realizada mediante el MCP de Playwright hacia 'https://rahulshettyacademy.com/loginpagePractise/'.
- Se identificaron los localizadores reales del formulario: username ('#username'), password ('#password'), terms ('#terms'), y signInBtn ('#signInBtn').
- NOTA: Se detectó un cambio en el backend de la página de prueba. La contraseña antigua 'learning' arroja un error ('Old password learning is no longer valid. Please use the new password Learning@830'). Para que la prueba pase y llegue al /shop, la contraseña actualizada fue implementada.
- Se creó la estructura POM en TypeScript: rahulshettyacademy/pages/LoginPage.ts y rahulshettyacademy/pages/ShopPage.ts.
- Se diseñó el test 'loginShop.spec.ts' usando Playwright Test (@playwright/test) en rahulshettyacademy/tests para asertar la visibilidad de 'iphone X'.

