import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { expect } from '@playwright/test';


Given("el usuario abre la página de Verifactu de la AEAT con certificado válido", async function (this: CustomWorld) {
  await this.page.goto("https://www1.agenciatributaria.gob.es/wlpl/TIKE-CONT/MenuAplicacionFacturacion");
});

When('pulsa el enlace {string}', async function (this: CustomWorld, linkText: string) {
  await this.page.click(`a:text("${linkText}")`);
});


Then('rellena los datos del formulario de nuevo cliente con:', async function (this: CustomWorld, dataTable: any) {
  const rows = dataTable.hashes();
  for (const row of rows) {
    const id = row.id;
    const valor = row.valor;

    const input = this.page.locator(`#${id}`);
    await input.waitFor({ state: 'visible' });
    await input.fill(valor);
  }
});

Then('debería ver el mensaje {string}', async function (this: CustomWorld, message: string) {
    await expect(this.page.getByText(message)).toBeVisible({ timeout: 5000 });
});