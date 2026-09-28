# QA Engineer Practices & AI-Driven Automation Workspace 🚀

> **🚧 Estado del Repositorio: Activo y Evolutivo (WIP)**
> *Este repositorio es el espacio centralizado de mi evolución como QA Engineer hacia la adopción de Inteligencia Artificial. Documenta mis prácticas, configuraciones de entorno, automatización de pruebas y el proceso de aprendizaje continuo con frameworks como AI-DLC y herramientas agenticas.*

Este monorepo centraliza todas las prácticas, cursos y configuraciones de entorno desarrolladas como parte de mi especialización técnica y plan de adopción de IA, incluyendo el framework **AI-DLC (v2.9.0)**, **Kiro IDE**, **Playwright**, y **Agentes IA**.

## 📂 Estructura del Ecosistema de Aprendizaje

El proyecto está diseñado como un monorepo donde cada directorio funciona como un espacio de trabajo aislado, garantizando que configuraciones específicas y dependencias no generen conflictos.

### 🤖 Inteligencia Artificial & Agentes en QA
*   **`/Curso Learn AI Tools & Build AI Agents for Testing & QA Automation`**: Base de conocimiento sobre el uso de herramientas IA en QA. Incluye la comprensión de tokens, generación de *Test Plans*, *Test Cases* y *Test Strategy* apoyados por IA, y la construcción de Agentic AI usando Claude Code.
*   **`/agente-qa-curso/qa-agent-geekqa`**: Resolución práctica de historias de usuario (ej. US-002, US-003, US-004) guiadas por IA. Contiene las entradas (criterios de aceptación, mockups) y las salidas generadas por los agentes.
*   **`/poc-aidlc-robotica` & `/prueba`**: Entornos de prueba para la configuración del framework AI-DLC integrados con **Kiro IDE**. Contiene las políticas de los agentes, los *hooks* nativos del sistema y el conocimiento base para los perfiles de QA, Arquitectura y Producto.

### ⚙️ Automatización E2E & Herramientas Avanzadas
*   **`/playwright_Agents` & `/Antigravity`**: Implementaciones avanzadas de automatización usando **Playwright** integradas con agentes. Incluye flujos de prueba, *exploration tests*, captura de evidencias y la integración de herramientas mediante el protocolo MCP (Model Context Protocol).
*   **`/copilot curso`**: Prácticas de automatización y asistencia con GitHub Copilot. Contiene pruebas E2E configuradas con **Cypress**, reportes de accesibilidad (axe-core) y aplicaciones de prueba.
*   **`/finanzas-app`**: Proyecto práctico de aplicación frontend integrando una suite completa de pruebas con Playwright y configuraciones de agentes.
*   **`/postman-agent`**: Espacio dedicado a la automatización de pruebas de API, incluyendo colecciones (ej. *Geek product*) para ser orquestadas mediante agentes.

### 📚 Recursos Transversales
*   **`_AI-powered QA_ Prompts usados en el curso.pdf`**: Material de referencia centralizado con técnicas avanzadas de ingeniería de prompts aplicadas al ciclo de vida de QA.
*   **`Curso_QA_Agent.html`**: Exportación y apuntes clave del curso de agentes de QA.

## 🛡️ Políticas de Git y Exclusiones (.gitignore)

Para mantener el monorepo limpio y evitar subir archivos generados automáticamente o sensibles, se ha configurado un `.gitignore` en la raíz del repositorio que aplica recursivamente a todos los proyectos y cursos. Las exclusiones principales cubren:

*   **Entornos de Node y UI Testing:** `node_modules/`, `playwright-report/`, `test-results/`, evidencias de Cypress.
*   **Archivos de Agentes e IA:** Configuración y logs locales de herramientas como `.playwright-mcp/`, `.agents/`, `.kiro/` y lockfiles de transacciones.
*   **Python y Entornos Virtuales:** `.venv/`, `__pycache__/`, y archivos compilados `.pyc`.
*   **Configuración y Secretos:** Variables de entorno y credenciales en archivos `.env`.
*   **Logs y Sistema:** Cualquier archivo `.log` general, además de archivos nativos del SO (`.DS_Store`, `Thumbs.db`).

## 🛠️ Stack Tecnológico & Herramientas

*   **Frameworks de Agentes:** AI-DLC v2.9.0, Kiro IDE, Claude Code, Antigravity.
*   **Modelos de Lenguaje:** GPT 5.6 Luna / GPT 5.6 Terra / Claude Opus.
*   **Automatización de Pruebas UI/API:** Playwright, Cypress, Postman.
*   **Calidad & Accesibilidad:** Axe-core, Lighthouse.
*   **Integración Continua:** GitHub Actions (CI/CD workflows).

## 📌 Próximos Pasos & Roadmap
*   Integración continua de los conceptos de Claude Code para orquestación de pruebas.
*   Evolución del framework de pruebas en `finanzas-app` utilizando capacidades agenticas.
*   Aplicación práctica de *Scopes*, revisión de *Gates* (puertas de aprobación) y lineamientos del Quality Agent.

---
*Desarrollado y mantenido por Deivith Zanella | QA Engineer*
