import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Este hook se ejecuta una vez antes de todos los escenarios
BeforeAll(async function () {
  browser = await chromium.launch({headless: false, slowMo: 3000});
});

// Este hook se ejecuta antes de cada escenario
Before({tags: "@simple" }, async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

Before({tags: "@aeat" }, async function () {
  this.context = await browser.newContext({
    locale: 'es-ES',
    timezoneId: 'Europe/Madrid',
    clientCertificates: [
      {
        origin: 'https://www1.agenciatributaria.gob.es',
        certPath: 'certificados/aranova.crt',
        keyPath: 'certificados/aranova.key'
      }
    ]
  });
  this.page = await this.context.newPage();
});

// Este hook se ejecuta después de cada escenario
After(async function () {
  await this.page.close();
  await this.context.close();
});

// Este hook se ejecuta una vez al final de todos los escenarios
AfterAll(async function () {
  await browser.close();
});

// Exporta las variables para que puedan ser usadas en otros step definitions.
export { page, browser };