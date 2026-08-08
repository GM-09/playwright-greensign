import { Page, Locator } from '@playwright/test';

export class NormalSignPreparePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 1. Removed "static", added "async"
  // 2. Replaced the thrown error with the actual click action
  async clickNextToAssignRecipients() {
    // Note: Update the exact name or locator if your button is labeled differently
    await this.page.getByRole('button', { name: 'NEXT' }).click(); 
  }

  async dragSignatureToDocument() {
    // 1. Locate the Source: The "Signature" text in the left sidebar
    const signatureField = this.page.getByText('Signature', { exact: true });

    // 2. Locate the Target: The document page where you want to drop it
    const documentCanvas = this.page.locator('.react-pdf__Page__canvas, canvas').first();

    // 3. Execute the Drag and Drop
    await signatureField.dragTo(documentCanvas);
  }

  async clickNextToReview() {
    // Click the green NEXT button at the bottom right
    await this.page.getByRole('button', { name: 'NEXT' }).click();
  }
}