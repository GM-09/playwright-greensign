import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { NormalSignPreparePage } from '../pages/NormalSignPreparePage';
import { AddRecipientsPage } from '../pages/AddRecipientsPage';
import { ReviewPage } from '../pages/ReviewPage'; 

test.describe('GreenSign Normal Envelope Flow', () => {

  test.use({ permissions: ['geolocation'] });

  test('Should upload document and proceed to Add Recipients screen', async ({ page }) => {
    // FIX 1: Increase overall timeout just like in the working test
    test.setTimeout(90000);

    // --- Setup Robots ---
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const preparePage = new NormalSignPreparePage(page);
    const addRecipientsPage = new AddRecipientsPage(page); 
    const reviewPage = new ReviewPage(page); 

    // --- Login Steps ---
    await loginPage.navigateToRoot();
    await loginPage.acceptCookies(); 
    await loginPage.enterEmailAndNext(process.env.USER_EMAIL!);
    await loginPage.enterPasswordAndSignIn(process.env.USER_PASSWORD!);
    
    // FIX 2: Add the longer timeouts and explicit waits for the dashboard to load
    await expect(page).toHaveURL(/.*test-4\.greensign\.ai.*/, { timeout: 17000 });
    await expect(page.locator('#dashboard-welcome-message')).toBeVisible({ timeout: 15000 });

    // --- Dashboard Steps ---
    await dashboardPage.uploadDocument('blank.pdf');
    
    // --- Document Preparation Steps ---
    await preparePage.clickNextToAssignRecipients();

    // --- Verification ---
    await expect(page.getByRole('heading', { name: 'Add Recipients', exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('Enter Full Name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter Recipient Email')).toBeVisible();
    await expect(page).toHaveURL(/.*\/add-recipients/);

    // --- Add Recipients Steps ---
    await addRecipientsPage.addRecipientAndProceed('Imran ', 'imran_gs@proton.me');

    // --- Assign Fields Steps ---
    // Drag the signature onto the document
    await preparePage.dragSignatureToDocument();
    
    // Click Next to proceed to the Final Review screen
    await preparePage.clickNextToReview();
    
    // --- Review and Send Steps ---
    // 1. Assert we successfully navigated to the Review screen
    await expect(page.getByRole('heading', { name: 'Review and Send', exact: true })).toBeVisible();
    
    // 2. Click the final Send button
    await reviewPage.clickSend();

    // 3. Assert the final success state 
    // (Note: Update 'Envelope Sent!' to match the exact success text/heading of your application)
    await expect(page.getByRole('heading', { name: 'Envelope Sent!' })).toBeVisible({ timeout: 15000 });
  });

});