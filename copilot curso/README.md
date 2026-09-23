# Registro de estudiantes

Aplicación estática y framework de pruebas para el caso de uso de registro de estudiantes.

## Estructura

- [`src/student-registration/`](src/student-registration/) contiene el sitio estático local.
- [`src/functions/`](src/functions/) contiene las funciones introductorias.
- [`tests/unit/`](tests/unit/) contiene exclusivamente pruebas unitarias con `node:test`.
- [`cypress/pages/`](cypress/pages/) contiene los Page Objects reutilizables.
- [`cypress/e2e/`](cypress/e2e/) contiene las pruebas funcionales contra el sitio remoto.
- [`docs/`](docs/) contiene la historia de usuario.

## Ejecución

```powershell
npm ci
npm run test:unit
npm run test:e2e
```

Para abrir Cypress en modo interactivo:

```powershell
npm run test:e2e:open
```

La suite funcional usa como `baseUrl` [`https://admisions.geekqa.net/`](https://admisions.geekqa.net/), configurable en [`cypress.config.js`](cypress.config.js).
