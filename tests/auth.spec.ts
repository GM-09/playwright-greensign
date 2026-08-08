import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PreparePage } from '../pages/PreparePage';
import { SignPage } from '../pages/SignPage';

test.describe('GreenSign Authentication Flow', () => {

  // FIX: Grant geolocation permission to bypass the browser popup
  test.use({ permissions: ['geolocation'] });

  test('Should handle multi-step routing and login successfully', async ({ page }) => {
    // FIX: Increased the overall test timeout to 90 seconds (90000ms) 
    // to accommodate the 60s locator waits for slow loading screens.
    test.setTimeout(90000);

    // --- Setup Robots ---
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const preparePage = new PreparePage(page);
    const signPage = new SignPage(page);

    // --- Login Steps ---
    await loginPage.navigateToRoot();
    
    // Handle the cookie banner before interacting with the page
    await loginPage.acceptCookies(); 

    await loginPage.enterEmailAndNext(process.env.USER_EMAIL!);
    await expect(page).toHaveURL(/.*login.*/);
    await loginPage.enterPasswordAndSignIn(process.env.USER_PASSWORD!);
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(/.*test-4\.greensign\.ai.*/, { timeout: 17000 });
    
    // Custom 15-second timeout to allow the welcome message to render
    await expect(page.locator('#dashboard-welcome-message')).toBeVisible({ timeout: 15000 });

    // --- Dashboard Steps ---
    await dashboardPage.uploadDocument('blank.pdf');
    
    // --- Document Preparation Steps ---
    await preparePage.setSelfSignAndSubmit();

    // --- Signing Steps ---
    // 3. New Step: Check the agreement and click Continue
    await signPage.acceptAgreementAndContinue();

    // 4. Drag the signature onto the document
    await signPage.dragSignatureToDocument();
    
    // Finish signing
    await signPage.finishSigning();

    // Assert that the final success screen appears instead of sleeping
    await expect(page.getByRole('heading', { name: "You're All Done!" })).toBeVisible();

  });

});