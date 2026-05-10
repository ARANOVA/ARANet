import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from 'expect';
import { CustomWorld } from '../world/world'; // Asegúrate de que la ruta a world.ts sea correcta

Given("el usuario abre la página de login", async function (this: CustomWorld) {
  await this.page.goto("http://localhost:3000/login");
});

When("el usuario introduce credenciales inválidas", async function (this: CustomWorld) {
  await this.page.fill('input[name="username"]', "pablo");
  await this.page.fill('input[name="password"]', "1111");
});

When('el usuario {string} introduce la contraseña {string}', async function (this: CustomWorld, nombre: string, pass: string) {
  await this.page.fill('input[name="username"]', nombre);
  await this.page.fill('input[name="password"]', pass);
});

When('presiona el botón {string}', async function (this: CustomWorld, buttonText: string) {
  await this.page.click(`text=${buttonText}`);
});

// Then("debería ver su panel de control", async function (this: CustomWorld) {
//   await this.page.waitForSelector("text=No autorizado");
//   await browser.close();
// });

Then("debería ver un mensaje de error", async function (this: CustomWorld) {
  await this.page.waitForSelector("text=¡Algo fué mal!");
});

Then('debería ver el dashboard', async function (this: CustomWorld) {
  await this.page.waitForURL('http://localhost:3000/');
  const currentUrl = this.page.url();
  expect(currentUrl).toBe('http://localhost:3000/');
  await this.page.waitForSelector("text=Hola");
});

Then('debería ver el acceso a la sección de {string}', async function (this: CustomWorld, seccion: string) {
  if (seccion === 'Administración') {
    const xpathSeccion = `/html/body/div[2]/header/div[2]/nav/div[2]/div[6]/span/button/span[2]`;
    const seccionVisible = await this.page.locator(`xpath=${xpathSeccion}`).isVisible();
    // Realizamos la aserción
    expect(seccionVisible).toBe(true);
  }
});

Then('debería ver {string} en la parte superior derecha', async function (this: CustomWorld, nombre: string) {
  const xpathSeccion = `/html/body/div[2]/header/div[2]/nav/div[4]/span[2]/button/span[3]`;
  const nombreWeb = await this.page.locator(`xpath=${xpathSeccion}`).innerText();
  expect(nombreWeb.trim()).toBe(nombre);
});

Then('no debería ver el acceso a la sección de {string}', async function (this: CustomWorld, seccion: string) {
  if (seccion === 'Administración') {
    const xpathSeccion = `/html/body/div[2]/header/div[2]/nav/div[2]/div[6]/span/button/span[2]`;
    const seccionVisible = await this.page.locator(`xpath=${xpathSeccion}`).isVisible();
    // Realizamos la aserción
    expect(seccionVisible).toBe(false);
  }
});