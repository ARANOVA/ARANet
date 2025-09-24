import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Este hook se ejecuta una vez antes de todos los escenarios
BeforeAll(async function () {
  browser = await chromium.launch();
});

// Este hook se ejecuta antes de cada escenario
Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
});

// Este hook se ejecuta después de cada escenario
After(async function () {
  await page.close();
  await context.close();
});

// Este hook se ejecuta una vez al final de todos los escenarios
AfterAll(async function () {
  await browser.close();
});

// Exporta las variables para que puedan ser usadas en otros step definitions.
export { page, browser };