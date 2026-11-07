import { test, expect, type Page } from '@playwright/test';

const validUsername = () => `student-${Date.now()}-${Math.random()}`;
const uniqueEmail = () => `student-${Date.now()}-${Math.random()}@example.com`;
const password = 'qwerty12345';
const invalidPassword = 'qwerty12345invalid';
const articlesPage = '/articles';
const registerPage = '/register';
const loginPage = '/login';

test.describe('Registration', { tag: '@auth' }, () => {
  test('Success registration with valid data', async ({ page }) => {
    const signUpButton = page.getByTestId('nav-sign-up');
    const headerParagraph = page.getByText('Join the paperCreate an');
    const demoCredentialsParagraph = page.getByText('Demo credentialsEmailolena@');
    const createAccountButton = page.getByTestId('auth-submit');
    const usernameInput = page.getByTestId('auth-username');
    const emailInput = page.getByTestId('auth-email');
    const passwordInput = page.getByTestId('auth-password');
    const confirmPasswordInput = page.getByTestId('register-confirm-password');
    const termsCheckbox = page.getByTestId('register-terms');
    const profileNav = page.getByTestId('nav-profile');
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto(articlesPage);
    await signUpButton.click();
    await expect(headerParagraph).toBeVisible();
    await expect(demoCredentialsParagraph).toBeVisible();
    await expect(createAccountButton).toBeDisabled();
    
    await usernameInput.fill(username);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await confirmPasswordInput.fill(password);

    await termsCheckbox.check();
    await expect(createAccountButton).toBeEnabled();

    await createAccountButton.click();
    await expect(profileNav).toContainText(username);
  });

  test('Error message when trying to register with an existing email', async ({ page, context, browser }) => {
    const registerForm = (page: Page) => ({
      createAccountButton: page.getByTestId('auth-submit'),
      usernameInput: page.getByTestId('auth-username'),
      emailInput: page.getByTestId('auth-email'),
      passwordInput: page.getByTestId('auth-password'),
      confirmPasswordInput: page.getByTestId('register-confirm-password'),
      termsCheckbox: page.getByTestId('register-terms'),
      signUpButton: page.getByTestId('nav-sign-up'),
      signInButton: page.getByTestId('nav-sign-in'),
      errorMessageContainer: page.getByTestId('error-messages'),
      errorMessageText: page.getByTestId('error-messages').getByRole('paragraph'),
    });

    const username = validUsername();
    const email = uniqueEmail();
    const form = registerForm(page);

    await page.goto(registerPage);
    await form.usernameInput.fill(username);
    await form.emailInput.fill(email);
    await form.passwordInput.fill(password);
    await form.confirmPasswordInput.fill(password);
    await form.termsCheckbox.check();
    await form.createAccountButton.click();
    await context.close();

    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    const newForm = registerForm(newPage);
    await newPage.goto(registerPage);
    await newForm.usernameInput.fill(username);
    await newForm.emailInput.fill(email);
    await newForm.passwordInput.fill(password);
    await newForm.confirmPasswordInput.fill(password);
    await newForm.termsCheckbox.check();
    await newForm.createAccountButton.click();
    await expect(newForm.signInButton).toContainText('Sign in');
    await expect(newForm.signUpButton).toContainText('Register');
    await expect(newForm.errorMessageContainer).toBeVisible();
    await expect(newForm.errorMessageText).toContainText('body email або username вже зайняті');
  });

  test('Registration empty fields validation', async ({ page }) => {
    const createAccountButton = page.getByTestId('auth-submit');
    const usernameInput = page.getByTestId('auth-username');
    const emailInput = page.getByTestId('auth-email');
    const passwordInput = page.getByTestId('auth-password');
    const confirmPasswordInput = page.getByTestId('register-confirm-password');
    const termsCheckbox = page.getByTestId('register-terms');
    const errorMessageContainer = page.getByTestId('error-messages');
    const errorMessageText = page.getByTestId('error-messages').getByRole('paragraph');
    const email = uniqueEmail();
    const username = validUsername();

    await page.goto(registerPage);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await confirmPasswordInput.fill(password);
    await termsCheckbox.check();
    await createAccountButton.click();
    await expect(errorMessageContainer).toBeVisible();
    await expect(errorMessageText).toContainText('username ім\'я має містити щонайменше 3 символи');

    await usernameInput.fill(username);
    await emailInput.clear();
    await createAccountButton.click();
    await expect(errorMessageContainer).toBeVisible();
    await expect(errorMessageText).toContainText('email некоректний email');

    await emailInput.fill(email);
    await passwordInput.clear();
    await confirmPasswordInput.clear();
    await createAccountButton.click();
    await expect(errorMessageContainer).toBeVisible();
    await expect(errorMessageText).toContainText('password пароль має містити щонайменше 6 символів');

    await page.reload();
    await termsCheckbox.check();
    await createAccountButton.click();
    await expect(errorMessageContainer).toBeVisible();
    await expect(errorMessageContainer).toContainText('username ім\'я має містити щонайменше 3 символиemail некоректний emailpassword пароль має містити щонайменше 6 символів');
  });
});

test.describe('Login', { tag: '@auth' }, () => {
  test('Successful login with valid data', async ({ page }) => {
    const authSubmitButton = page.getByTestId('auth-submit');
    const usernameInput = page.getByTestId('auth-username');
    const emailInput = page.getByTestId('auth-email');
    const passwordInput = page.getByTestId('auth-password');
    const confirmPasswordInput = page.getByTestId('register-confirm-password');
    const termsCheckbox = page.getByTestId('register-terms');
    const signInContainer = page.getByText('MembersSign inNo account yet');
    const demoCredentialsContainer = page.getByText('Demo credentialsEmailolena@');
    const profileNav = page.getByTestId('nav-profile');
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto(registerPage);
    await usernameInput.fill(username);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await confirmPasswordInput.fill(password);
    await termsCheckbox.check();
    await authSubmitButton.click();
    await page.context().clearCookies();
    
    await page.goto(loginPage);
    await expect(signInContainer).toBeVisible();
    await expect(demoCredentialsContainer).toBeVisible();

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await authSubmitButton.click();
    await expect(profileNav).toContainText(username);
  });

  test('Login with invalid password', async ({ page }) => {
    const authSubmitButton = page.getByTestId('auth-submit');
    const usernameInput = page.getByTestId('auth-username');
    const emailInput = page.getByTestId('auth-email');
    const passwordInput = page.getByTestId('auth-password');
    const confirmPasswordInput = page.getByTestId('register-confirm-password');
    const termsCheckbox = page.getByTestId('register-terms');
    const errorMessageContainer = page.getByTestId('error-messages');
    const errorMessageText = page.getByTestId('error-messages').getByRole('paragraph');
    const username = validUsername();
    const email = uniqueEmail();

    await page.goto(registerPage);
    await usernameInput.fill(username);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await confirmPasswordInput.fill(password);
    await termsCheckbox.check();
    await authSubmitButton.click();
    await page.context().clearCookies();

    await page.goto(loginPage);
    await emailInput.fill(email);
    await passwordInput.fill(invalidPassword);
    await authSubmitButton.click();
    await expect(errorMessageContainer).toBeVisible();
    await expect(errorMessageText).toContainText('email or password неправильні');
  });

    test('Login with not existing user', async ({ page }) => {
    const authSubmitButton = page.getByTestId('auth-submit');
    const emailInput = page.getByTestId('auth-email');
    const passwordInput = page.getByTestId('auth-password');
    const errorMessageContainer = page.getByTestId('error-messages');
    const errorMessageText = page.getByTestId('error-messages').getByRole('paragraph');
    const email = uniqueEmail();

    await page.goto(loginPage);
    await emailInput.fill(email);
    await passwordInput.fill(invalidPassword);
    await authSubmitButton.click();
    await expect(errorMessageContainer).toBeVisible();
    await expect(errorMessageText).toContainText('email or password неправильні');
  });
});