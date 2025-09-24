import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

Given("el usuario abre la página de login", async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/login");
});

When("el usuario introduce credenciales inválidas", async function () {
  await page.fill('input[name="username"]', "pablo");
  await page.fill('input[name="password"]', "1111");
});

When('el usuario introduce sus credenciales válidas', async function () {
  await page.fill('input[name="username"]', "pablo");
  await page.fill('input[name="password"]', "in4vw9");
});

When("el usuario introduce su email y contraseña", async function () {
  await page.fill('input[name="username"]', "pablo");
  await page.fill('input[name="password"]', "in4vw9");
});

When('presiona el botón {string}', async function (buttonText: string) {
  await page.click(`text=${buttonText}`);
});

Then("debería ver su panel de control", async function () {
  await page.waitForSelector("text=No autorizado");
  await browser.close();
});

Then("debería ver un mensaje de error", async function () {
  await page.waitForSelector("text=¡Algo fué mal!");
  await browser.close();
});
