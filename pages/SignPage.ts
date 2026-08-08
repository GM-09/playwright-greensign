import { Page, Locator } from '@playwright/test';

export class SignPage {
    private page: Page;
    private agreementCheckboxLabel: Locator;
    private continueButton: Locator;
    private signatureField: Locator;
    private documentCanvas: Locator;
    
    // NEW: Locator for the Finish button
    private finishButton: Locator;

    constructor(page: Page) {
      this.page = page;
      this.agreementCheckboxLabel = page.locator('#signing-page-agreement-checkbox-label');
      this.continueButton = page.locator('button:has-text("CONTINUE")'); 
      this.signatureField = page.locator('#signature-starting-box');
      this.documentCanvas = page.locator('#document-page-0 canvas');
      
      // Map the ID found in the DevTools snapshot
      this.finishButton = page.locator('#signing-page-finish-btn');
    }

    async acceptAgreementAndContinue() {
      await this.agreementCheckboxLabel.waitFor({ state: 'visible', timeout: 60000 });
      await this.agreementCheckboxLabel.click();
      await this.continueButton.click();
    }

    async dragSignatureToDocument() {
      await this.signatureField.waitFor({ state: 'visible' });
      await this.documentCanvas.waitFor({ state: 'visible', timeout: 60000 });
      await this.signatureField.dragTo(this.documentCanvas);
    }

    // NEW: Action to complete the signing process
    async finishSigning() {
      // Playwright will automatically wait for the button to become enabled before clicking
      await this.finishButton.click();
    }
}