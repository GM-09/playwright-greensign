import { Page, Locator } from '@playwright/test';

export class AddRecipientsPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locating elements using best practices
    this.fullNameInput = page.getByPlaceholder('Enter Full Name');
    this.emailInput = page.getByPlaceholder('Enter Recipient Email');
    this.nextButton = page.getByRole('button', { name: 'Next', exact: true });
  }

  /**
   * Fills the recipient details and clicks Next
   */
  async addRecipientAndProceed(name: string, email: string) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.nextButton.click();
  }
}