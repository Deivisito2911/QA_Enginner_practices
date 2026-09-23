import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas de exploración de WaveLink
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: './reports/html-report' }],
    ['json', { outputFile: './reports/test-results.json' }],
    ['junit', { outputFile: './reports/junit-results.xml' }]
  ],
  
  use: {
    baseURL: 'https://wavelinkconexiondelfuturo.vercel.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],

  webServer: {
    command: 'echo "No se requiere servidor local para esta exploración"',
    port: 3000,
    reuseExistingServer: true,
  },
});