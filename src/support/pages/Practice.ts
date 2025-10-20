import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from './BasePage';

export default class ContactFormPage extends BasePage {

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  async fillContactFormWithValidData(): Promise<void> {
    await this.page.fill('[data-test="first-name"]', faker.person.firstName());
    await this.page.fill('[data-test="last-name"]', faker.person.lastName());
    await this.page.fill('[data-test="email"]', faker.internet.email());
    await this.page.selectOption('[data-test="subject"]', 'customer-service');
    await this.page.fill('[data-test="message"]', faker.lorem.paragraph());
  }

  async submitContactForm(): Promise<void> {
    await this.page.click('[data-test="contact-submit"]');
  }

  async validateSuccessMessage(): Promise<void> {
    await expect(this.page.locator('.alert-success, .success-message')).toBeVisible();
  }

  async uploadAttachment(filePath: string): Promise<void> {
    await this.page.setInputFiles('[data-test="attachment"]', filePath);
  }
}