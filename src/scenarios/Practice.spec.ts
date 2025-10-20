import { test, expect, Page } from '@playwright/test';
import ContactFormPage from '../support/pages/Practice';
import { faker } from '@faker-js/faker';

test.describe('ContactFormPage - Contact Form Flow', () => {
    test('should fill and submit contact form successfully', async ({ page }) => {
        const contactFormPage = new ContactFormPage(page);

        await page.goto('https://practicesoftwaretesting.com/contact');

        await page.waitForLoadState('networkidle');

        await contactFormPage.fillContactFormWithValidData();

        await contactFormPage.submitContactForm();

        await contactFormPage.validateSuccessMessage();
    });

    test('should navigate to contact page and verify form elements', async ({ page }) => {
        const contactFormPage = new ContactFormPage(page);

        await page.goto('https://practicesoftwaretesting.com/contact');

        await page.waitForLoadState('networkidle');

        await expect(page.locator('[data-test="first-name"]')).toBeVisible();
        await expect(page.locator('[data-test="last-name"]')).toBeVisible();
        await expect(page.locator('[data-test="email"]')).toBeVisible();
        await expect(page.locator('[data-test="subject"]')).toBeVisible();
        await expect(page.locator('[data-test="message"]')).toBeVisible();
        await expect(page.locator('[data-test="contact-submit"]')).toBeVisible();
    });

    test('should fill all fields including subject options', async ({ page }) => {
        const contactFormPage = new ContactFormPage(page);

        await page.goto('https://practicesoftwaretesting.com/contact');
        await page.waitForLoadState('networkidle');

        // Test different subject options
        const subjects = ['customer-service', 'webmaster', 'return', 'payments', 'warranty', 'status-of-order'];
        
        for (const subject of subjects) {
            await page.fill('[data-test="first-name"]', faker.person.firstName());
            await page.fill('[data-test="last-name"]', faker.person.lastName());
            await page.fill('[data-test="email"]', faker.internet.email());
            await page.selectOption('[data-test="subject"]', subject);
            await page.fill('[data-test="message"]', faker.lorem.paragraph());
            
            const selectedValue = await page.locator('[data-test="subject"]').inputValue();
            expect(selectedValue).toBe(subject);
            
            await page.reload();
            await page.waitForLoadState('networkidle');
        }
    });
});