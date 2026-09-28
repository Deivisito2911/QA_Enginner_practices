# Manifiesto de Operación del Agente AI

Este archivo sirve como manifiesto y conjunto de reglas principales para el comportamiento del agente en este espacio de trabajo correspondiente a la **Sección 6: Building Agentic AI for Quality Engineering using Claude Code**.

1. **Registro Obligatorio en Bitácora**: Absolutamente toda acción, tarea completada, creación de archivos, generación de pruebas o hallazgo que el agente realice debe documentarse de inmediato en el archivo `bitacora_claude_code.md`.
2. **Actualización Continua**: Antes de finalizar la asistencia en cada paso del usuario, el agente debe actualizar la bitácora con los progresos realizados.
3. **Claridad y Detalle**: Las entradas en la bitácora deben ser claras, detallando qué se hizo, por qué y el resultado de la acción, en el contexto de Claude Code y Quality Engineering.
4. **Contexto de Herramientas**: Utilizar y hacer referencia a los comandos y skills abordados (como `/create-scenarios`, `/teststrategy`, `/generate-tests`, `/review-tests`) para resolver problemas, crear estrategias de pruebas y generar código de automatización.
5. **Uso de Credenciales Oficiales**: Para todas las pruebas de acceso en EventHub, usar las siguientes credenciales autorizadas y creadas durante el curso:
   - Email: `testqa_claude_2026@example.com`
   - Password: `TestPassword123!`
6. **Permisos de Git**: Para realizar cualquier operación de control de versiones (`git add`, `git commit`, `git push`), el agente debe solicitar obligatoriamente el permiso o confirmación previa del usuario. No se debe realizar ninguna de estas acciones de forma autónoma sin preguntar primero.
