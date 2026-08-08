import { Page, Locator } from '@playwright/test';
import path from 'path';

export class DashboardPage {
  private page: Page;
  private desktopUploadLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Targeting the green "Desktop" text link from your screenshot
    this.desktopUploadLink = page.locator('text=Desktop');
  }

  async uploadDocument(fileName: string) {
    // 1. Tell Playwright to wait for the file pop-up to trigger
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    
    // 2. Click the "Desktop" link
    await this.desktopUploadLink.click();
    
    // 3. Catch the pop-up
    const fileChooser = await fileChooserPromise;
    
    
  // 4. Inject the file from your test-data folder
    const filePath = path.resolve(__dirname, `../tests/test-data/${fileName}`);
    await fileChooser.setFiles(filePath);

    
  }
}