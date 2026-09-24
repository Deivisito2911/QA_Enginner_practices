# Reporte de Accesibilidad WCAG 2.2 AA - US-002

- **URL Auditada:** https://testing1.geekqa.net/
- **Fecha:** 23/9/2026, 9:46:28 p.m.
- **Estándar:** WCAG 2.2 Nivel AA (motor axe-core 4.9.1)

## Resumen por Breakpoints
- **Mobile (375x667):** 1 violaciones
- **Tablet (768x1024):** 1 violaciones
- **Desktop (1440x900):** 1 violaciones

## Violaciones Críticas y Moderadas Encontradas
### 1. [SERIOUS] color-contrast: Elements must meet minimum color contrast ratio thresholds
- **Descripción:** Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Impacto:** serious
- **Elementos Afectados:** `button`
- **Guía de Solución:** [Documentación Axe](https://dequeuniversity.com/rules/axe/4.9/color-contrast?application=axeAPI)


## Recomendaciones de Accesibilidad
1. Agrupar los radio buttons de género en un elemento `<fieldset>` con una etiqueta descriptiva `<legend>`.
2. Asociar el checkbox de 'Estado del Contrato' con su respectivo `<label for="contractStatus">`.
3. Validar el ratio de contraste de color en los mensajes de confirmación verdes y rojos de error.
