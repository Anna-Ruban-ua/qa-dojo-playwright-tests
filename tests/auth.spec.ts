import { test, expect } from '@playwright/test';

const validUsername = () => `student-${Date.now()}-${Math.random()}`;
const uniqueEmail = () => `student-${Date.now()}-${Math.random()}@example.com`;

test.describe('Registration', { tag: '@auth' }, () => {
  test('Success registration with valid data', async ({ page }) => {
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto('');
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByText('Join the paperCreate an')).toBeVisible();
    await expect(page.getByText('Demo credentialsEmailolena@')).toBeVisible();
    await expect(page.getByTestId('auth-submit')).toBeDisabled();
    
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345');
    await page.getByTestId('register-confirm-password').fill('qwerty12345');

    await page.getByTestId('register-terms').check();
    await expect(page.getByTestId('auth-submit')).toBeEnabled();

    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toContainText(username);
  });

  test('Error message when trying to register with an existing email', async ({ page, context, browser }) => {
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto('/register');
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345');
    await page.getByTestId('register-confirm-password').fill('qwerty12345');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await context.close();

    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    
    await newPage.goto('/register');
    await newPage.getByTestId('auth-username').fill(username);
    await newPage.getByTestId('auth-email').fill(email);
    await newPage.getByTestId('auth-password').fill('qwerty12345');
    await newPage.getByTestId('register-confirm-password').fill('qwerty12345');
    await newPage.getByTestId('register-terms').check();

    await newPage.getByTestId('auth-submit').click();
    await expect(newPage.getByTestId('nav-sign-in')).toContainText('Sign in');
    await expect(newPage.getByTestId('nav-sign-up')).toContainText('Register');
    await expect(newPage.getByText('body email або username')).toBeVisible();
    await expect(newPage.getByTestId('error-messages').getByRole('paragraph')).toContainText('body email або username вже зайняті');

  });

  test('Registration empty fields validation', async ({ page }) => {
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto('/register');
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345');
    await page.getByTestId('register-confirm-password').fill('qwerty12345');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toBeVisible();
    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('username ім\'я має містити щонайменше 3 символи');

    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').clear();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toBeVisible();
    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('email некоректний email');

    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').clear();
    await page.getByTestId('register-confirm-password').clear();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toBeVisible();
    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('password пароль має містити щонайменше 6 символів');

    await page.reload();
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toBeVisible();
    await expect(page.getByTestId('error-messages')).toContainText('username ім\'я має містити щонайменше 3 символиemail некоректний emailpassword пароль має містити щонайменше 6 символів');
  });
});

test.describe('Login', { tag: '@auth' }, () => {
  test('Successful login with valid data', async ({ page }) => {
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto('/register');
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345');
    await page.getByTestId('register-confirm-password').fill('qwerty12345');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await page.context().clearCookies();
    
    await page.goto('/login');
    await expect(page.getByText('MembersSign inNo account yet')).toBeVisible();
    await expect(page.getByText('Demo credentialsEmailolena@')).toBeVisible();

    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345');
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toContainText(username);
  });

  test('Login with invalid password', async ({ page }) => {
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto('/register');
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345');
    await page.getByTestId('register-confirm-password').fill('qwerty12345');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await page.context().clearCookies();

    await page.goto('/login');
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345invalid');
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toBeVisible();
    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('email or password неправильні');
  });

    test('Login with not existing user', async ({ page }) => {
    const email = uniqueEmail();

    await page.goto('/login');
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill('qwerty12345invalid');
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toBeVisible();
    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('email or password неправильні');
  });
});