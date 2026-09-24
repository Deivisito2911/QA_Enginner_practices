# QA Engineer Practices & AI-DLC Environment 🚀

> **🚧 Estado del Repositorio: En Construcción (WIP)**
> *Este repositorio documenta mi proceso de aprendizaje continuo. Las carpetas actuales reflejan los módulos iniciales completados; a medida que avance en el plan de formación, se irán agregando nuevos directorios, prácticas y proyectos de forma evolutiva.*

Este espacio centraliza todas las prácticas, cursos y configuraciones de entorno desarrolladas como parte del plan de adopción del framework **AI-DLC (v2.9.0)** para el rol de QA Engineer en CarConnect.

## 📂 Estructura Inicial del Monorepo

El proyecto está diseñado como un monorepo donde cada directorio funciona como un espacio de trabajo aislado, garantizando que los archivos ocultos `.kiro` y las configuraciones de los agentes no generen conflictos entre prácticas.

*   **`/copilot curso`**: Prácticas iniciales de automatización. Contiene pruebas E2E configuradas con **Cypress**, reportes de accesibilidad (axe-core) y documentación de historias de usuario.
*   **`/playwright_Agents` & `/Antigravity`**: Implementaciones avanzadas usando **Playwright**. Incluye flujos de prueba, captura de evidencias (screenshots), reportes HTML y la integración de herramientas a través del protocolo MCP (Model Context Protocol).
*   **`/prueba` & `/poc-aidlc-robotica`**: Entornos de prueba para la configuración del framework AI-DLC integrados con **Kiro IDE**. Contiene las políticas de los agentes, los *hooks* nativos del sistema y el conocimiento base (`.kiro/knowledge/`) para los perfiles de QA, Arquitectura y Producto.
*   **`/agente-qa-curso/qa-agent-geekqa`**: Resolución práctica de historias de usuario (ej. US-002, US-003, US-004) guiadas por IA. Contiene las entradas (criterios de aceptación, mockups) y las salidas generadas por los agentes (reportes de accesibilidad, bugs, Lighthouse y ejecución de pruebas).
*   **`_AI-powered QA_ Prompts usados en el curso.pdf`**: Material de referencia centralizado con las técnicas de ingeniería de prompts aplicadas durante la formación.
*   *(Nuevas carpetas por definir según el avance de los cursos)*...

## 🛠️ Stack Tecnológico Actual

*   **Framework de Agentes:** AI-DLC v2.9.0 (Modelos: GPT 5.6 Luna / GPT 5.6 Terra / Claude Opus)
*   **Entorno de Desarrollo:** Kiro IDE & PowerShell
*   **Automatización de Pruebas:** Cypress, Playwright
*   **Integración Continua:** GitHub Actions (CI/CD workflows)

## 📌 Próximos Pasos Inmediatos
*   Finalización de la revisión teórica y cursos de la documentación oficial de AI-DLC v2.
*   Creación del nuevo espacio aislado `carconnect-workshop` para el arranque oficial del proyecto (Miércoles 30 de septiembre).
*   Aplicación práctica de Scopes, revisión de Gates (puertas de aprobación) y lineamientos del Quality Agent.

---
*Desarrollado por Deivith Zanella*
