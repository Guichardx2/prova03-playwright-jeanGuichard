import { test } from '@playwright/test';
import TicketboxFormPage from '../support/pages/TicketboxFormPage';

test.describe('TicketboxFormPage - Ticket Purchase', () => {
  test('should fill and submit ticketbox form successfully', async ({ page }) => {
    const ticketboxPage = new TicketboxFormPage(page);

    await ticketboxPage.goto();
    await ticketboxPage.fillFormWithValidData();
    await ticketboxPage.submitForm();
    await ticketboxPage.validateSuccess();
  });
});
