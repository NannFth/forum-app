const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      EMAIL: 'testuser_e2e@example.com',
      PASSWORD: 'testuser_e2e_password',
    },
  },
});
