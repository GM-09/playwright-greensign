import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private acceptCookiesButton: Locator; // <-- Added
  private emailInput: Locator;
  private nextButton: Locator;
  private passwordInput: Locator;
  private signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // --- New Cookie Banner Locator ---
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All' });
    
    // --- Existing Locators ---
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    
    // Best Practice Update: Changed from :has-text to getByRole for better resilience
    this.nextButton = page.getByRole('button', { name: 'Next', exact: true }); 
    this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true }); 
  }

  async navigateToRoot() {
    // Step 1: Start at the root domain
    await this.page.goto('/');
  }

  // --- New Cookie Banner Method ---
  async acceptCookies() {
    try {
      // Waits up to 5 seconds for the banner to appear, then clicks it
      await this.acceptCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.acceptCookiesButton.click();
      console.log('Cookie banner accepted successfully.');
    } catch (error) {
      // Fails silently if the banner isn't there (e.g., cached or already dismissed)
      console.log('Cookie banner did not appear within timeout, continuing...');
    }
  }

  async enterEmailAndNext(email: string) {
    // Step 2: Fill email and hit NEXT
    await this.emailInput.fill(email);
    await this.nextButton.click();
  }

  async enterPasswordAndSignIn(password: string) {
    // Step 3: Wait for the password input to load on the /login redirect page
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}