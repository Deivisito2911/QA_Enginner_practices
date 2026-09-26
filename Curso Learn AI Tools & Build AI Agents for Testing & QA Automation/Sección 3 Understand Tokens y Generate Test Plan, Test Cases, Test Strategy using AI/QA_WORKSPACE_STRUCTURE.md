# Estructura del Espacio de Trabajo de QA (QA Workspace Structure)

Este documento define la jerarquía de directorios y reglas de organización para los artefactos de Calidad (QA). 

**Instrucción para el Asistente/CLI:** Al generar nuevos archivos a partir de ahora, analiza su naturaleza y ubícalos obligatoriamente en la carpeta correspondiente según las reglas descritas a continuación.

## Jerarquía de Carpetas

### `01_Requirements/`
*   **Propósito:** Almacenar documentos de especificación, historias de usuario, requerimientos funcionales y no funcionales que sirven como base para las pruebas.
*   **Archivos esperados:** `.docx`, `.pdf`, `.md` de historias de usuario.

### `02_Strategy_and_Plan/`
*   **Propósito:** Contener la planificación estratégica, el alcance de las pruebas, los planes maestros (Test Plan) y el enfoque de automatización.
*   **Archivos esperados:** `plan_de_pruebas_estrategia.md`, matrices de riesgo.

### `03_Test_Cases/`
*   **Propósito:** Casos de prueba clásicos (manuales y funcionales), matrices de trazabilidad y flujos end-to-end descritos paso a paso.
*   **Archivos esperados:** `casos_de_prueba_*.md`, `flujo_e2e_*.md`.

### `04_BDD_Features/`
*   **Propósito:** Archivos fuente para Behavior-Driven Development (BDD). Aquí viven las definiciones Gherkin (`Given/When/Then`).
*   **Archivos esperados:** Archivos con extensión `.feature` o `.feature.md`.

### `05_Test_Data/`
*   **Propósito:** Conjuntos de datos, diccionarios, particiones de equivalencia y matrices combinatorias necesarias para ejecutar las pruebas (unitarias, API o E2E).
*   **Archivos esperados:** `.csv`, `.json`, `datos_unitarios_*.md`.

### `06_Guides_and_Training/`
*   **Propósito:** Material de capacitación, guías teóricas, reglas de automatización (como la Pirámide de Pruebas o la Guía de Cucumber) y buenas prácticas para el equipo.
*   **Archivos esperados:** `.html`, `.md`, recursos gráficos.

---

## 🤖 Instrucciones para Futuras Peticiones (System Instructions)
1. **Nunca crees archivos en la raíz del proyecto** (a excepción de este documento `QA_WORKSPACE_STRUCTURE.md` o archivos de configuración global como `.gitignore`).
2. Cuando el usuario solicite un **"Caso de Prueba"**, créalo automáticamente en `03_Test_Cases/`.
3. Cuando el usuario solicite un **"Feature File" o "Gherkin"**, créalo automáticamente en `04_BDD_Features/`.
4. Cuando el usuario solicite **"Datos de Prueba o Matrices"**, guárdalos en `05_Test_Data/`.
5. Si el usuario hace una pregunta conceptual o pide una guía, guárdala en `06_Guides_and_Training/`.
6. Mantén la consistencia en el formato de los nombres de archivo.
7. **REGLA ESTRICTA DE GIT:** Jamás debes realizar un `git commit` ni un `git push` por tu cuenta. Siempre debes pedir autorización explícita al usuario antes de ejecutar comandos que alteren el repositorio remoto o el historial de Git.
