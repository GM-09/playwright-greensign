import { Page, Locator, expect } from '@playwright/test';

export class PreparePage {
   private page: Page;
   private onlySignerLabel: Locator;
   private signButton: Locator;
   // NEW: Locator for the NEXT button
   private nextButton: Locator;

   constructor(page: Page) {
     this.page = page;
     this.onlySignerLabel = page.locator('#envelope-self-sign-label');
     this.signButton = page.locator('#envelope-workflow-footer-sign-btn'); 
     
     // NEW: Targeting the green NEXT button exactly as it appears
     this.nextButton = page.getByRole('button', { name: 'Next', exact: true });
   }

   // Your existing Self-Sign method remains untouched
   async setSelfSignAndSubmit() {
     await this.onlySignerLabel.waitFor({ state: 'visible', timeout: 60000 });
     await this.onlySignerLabel.click();
     await this.signButton.click();
   }

   // NEW: Method for the Normal Envelope flow
   async clickNextToAssignRecipients() {
     // We still wait for this label just to guarantee the heavy PDF page has fully loaded
     await this.onlySignerLabel.waitFor({ state: 'visible', timeout: 60000 });
     
     // Ensure the NEXT button is visible and clickable, then click it
     await expect(this.nextButton).toBeVisible();
     await expect(this.nextButton).toBeEnabled();
     await this.nextButton.click();
   }
}