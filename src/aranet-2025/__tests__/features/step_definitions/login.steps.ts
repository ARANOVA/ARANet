import { Given, When, Then, BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { expect } from 'expect';
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

Given("el usuario abre la página de login", async function () {
  await page.goto("http://localhost:3000/login");
});

When("el usuario introduce credenciales inválidas", async function () {
  await page.fill('input[name="username"]', "pablo");
  await page.fill('input[name="password"]', "1111");
});

When('el usuario introduce sus credenciales válidas', async function () {
  await page.fill('input[name="username"]', "pablo");
  await page.fill('input[name="password"]', "1234");
});

When("el usuario introduce su email y contraseña", async function () {
  await page.fill('input[name="username"]', "gracia");
  await page.fill('input[name="password"]', "1234");
});

When('el usuario {string} introduce credenciales válidas de un administrador', async function (nombre) {
  await page.fill('input[name="username"]', nombre);
  await page.fill('input[name="password"]', "1234");
});

When('presiona el botón {string}', async function (buttonText: string) {
  await page.click(`text=${buttonText}`);
});

// Then("debería ver su panel de control", async function () {
//   await page.waitForSelector("text=No autorizado");
//   await browser.close();
// });

Then("debería ver un mensaje de error", async function () {
  await page.waitForSelector("text=¡Algo fué mal!");
});

Then('debería ver el dashboard', async function () {
  await page.waitForURL('http://localhost:3000/');
  const currentUrl = page.url();
  expect(currentUrl).toBe('http://localhost:3000/');
  await page.waitForSelector("text=Hola");
});

Then('debería ver el acceso a la sección de {string}', async function (seccion) {
  if (seccion === 'Administración') {
    const xpathSeccion = `/html/body/div[2]/header/div[2]/nav/div[2]/div[6]/span/button/span[2]`;
    const seccionVisible = await page.locator(`xpath=${xpathSeccion}`).isVisible();
    // Realizamos la aserción
    expect(seccionVisible).toBe(true);
  }
});

Then('debería ver {string} en la parte superior derecha', async function (nombre) {
  const xpathSeccion = `/html/body/div[2]/header/div[2]/nav/div[4]/span[2]/button/span[3]`;
  const nombreWeb = await page.locator(`xpath=${xpathSeccion}`).innerText();
  expect(nombreWeb.trim()).toBe(nombre);
});