const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://admisions.geekqa.net",
        specPattern: "cypress/e2e/student-registration.cy.js",
        supportFile: "cypress/support/e2e.js",
        video: false,
        viewportWidth: 1280,
        viewportHeight: 900,
        defaultCommandTimeout: 10000
    }
});
