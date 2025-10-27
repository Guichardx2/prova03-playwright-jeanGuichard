import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export default class TicketboxFormPage {
  constructor(readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('https://ticketbox-backstopjs-tat.s3.eu-central-1.amazonaws.com/index.html');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillFormWithValidData(): Promise<void> {
    // Nome e Email
    await this.page.fill('#first-name', faker.person.firstName());
    await this.page.fill('#last-name', faker.person.lastName());
    await this.page.fill('#email', faker.internet.email());

    // Quantidade de ingressos
    await this.page.selectOption('#ticket-quantity', { label: '2' });

    // Tipo de ingresso
    await this.page.locator('#general').check();

    // Como ouviu falar do evento
    await this.page.locator('#friend').check();
    await this.page.locator('#social-media').check();

    // Pedido especial
    await this.page.fill('#requests', faker.lorem.sentence());

    // Aceitar o acordo
    await this.page.locator('#agree').check();

    // Assinatura
    await this.page.fill('#signature', faker.person.fullName());
  }

  async submitForm(): Promise<void> {
    // Habilitar o botão se necessário (simulando input obrigatório)
    await expect(this.page.locator('button[type="submit"]')).toBeEnabled();
    await this.page.click('button[type="submit"]');
  }

  async validateSuccess(): Promise<void> {
    // Validação após o envio (customize conforme comportamento real do site)
    // Exemplo: verificar se o botão ficou desabilitado após envio
    await expect(this.page.locator('button[type="submit"]')).toBeDisabled();
  }
}
