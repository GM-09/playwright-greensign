import { Page } from '@playwright/test';

export class ReviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks the final Send button to dispatch the envelope
   */
  async clickSend() {
    // We use exact: true so we don't accidentally click the dropdown toggle next to it
    await this.page.getByRole('button', { name: 'Send', exact: true }).click();
  }
}