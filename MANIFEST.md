# Manifiesto del Repositorio: Reglas de Mantenimiento y Actualización

Este documento establece las directrices para mantener el repositorio limpio, organizado y con una documentación (`README.md`) coherente a medida que el entorno y los conocimientos evolucionan. 

Como QA Engineer, la calidad del código, la organización y la documentación de nuestro propio trabajo es un reflejo de nuestras prácticas profesionales.

## 1. Principios de Organización (El Monorepo)

*   **Aislamiento:** Cada nuevo curso, PoC (Prueba de Concepto) o práctica debe tener su propio directorio raíz dentro del repositorio.
*   **Independencia de Entorno:** Archivos de configuración locales (`.vscode`, `.kiro`, `.agents`, `node_modules`, `playwright-report`) deben permanecer aislados en su respectivo subdirectorio para evitar colisiones.
*   **Nombrado:** Usa nombres descriptivos, preferiblemente en minúsculas y separados por guiones (kebab-case) para los nuevos directorios (ej. `nuevo-curso-api-testing`), a menos que sea el nombre oficial estricto de un curso.

## 2. Protocolo de Actualización del `README.md`

El `README.md` principal (en la raíz) sirve como el mapa o índice de todo el ecosistema. Cada vez que se agregue una nueva carpeta o se logre un hito importante, el `README.md` debe ser actualizado siguiendo esta estructura:

### Criterios para agregar nuevas secciones:
1.  **Clasificación:** Decide en qué sección encaja mejor el nuevo contenido (ej. *Inteligencia Artificial & Agentes*, *Automatización E2E*, *Recursos Transversales*, etc.). Si se requiere una nueva categoría, agrégala con su respectivo emoji representativo.
2.  **Formato de Entrada:** Agrega un *bullet point* siguiendo el formato:
    `*   **`/nombre-de-la-carpeta`**: Breve descripción profesional de su propósito, stack utilizado y el valor que aporta al ecosistema QA.`
3.  **Actualización del Stack:** Si el nuevo proyecto introduce una nueva herramienta (ej. *Appium*, *JMeter*, *Selenium*, *RestAssured*), asegúrate de agregarla en la sección "🛠️ Stack Tecnológico & Herramientas".
4.  **Limpieza:** Si un directorio es deprecado o movido, elimínalo de la lista activa y colócalo en una sección de "Archivo" o elimínalo del índice si ya no es relevante.

## 3. Manejo de Archivos Ignorados
Asegúrate de que el `.gitignore` raíz contemple reglas globales como:
*   `node_modules/`
*   `playwright-report/`
*   `test-results/`
*   `.env`
*   Directorios virtuales de Python (`.venv/`)
*   Caché y logs del sistema.

Cualquier configuración específica que requiera omisiones diferentes debe ir en un `.gitignore` ubicado en el subdirectorio correspondiente.

## 4. Evolución del Profesional
El tono de la documentación debe mantenerse profesional, reflejando siempre una mentalidad de *Continuous Learning* y automatización orientada a la ingeniería de calidad y la inteligencia artificial.

---
*Este manifiesto es un documento vivo. Mantén la disciplina de actualizarlo si las reglas de la arquitectura cambian.*
