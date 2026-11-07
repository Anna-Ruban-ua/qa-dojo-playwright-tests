import { test, expect } from '../fixtures/fixtures';
import { errors } from '../../src/constants/errors';
import { newUserData } from '../../src/utils/dataGenerator';

test.describe('Registration', { tag: '@auth' }, () => {
  test('Success registration with valid data', async ({
    articlesPage,
    headerPage,
    registerPage,
  }) => {
    const user = newUserData();

    await articlesPage.open();
    await headerPage.openSignUp();
    await expect(registerPage.locators.header).toBeVisible();
    await expect(registerPage.locators.demoCredentials).toBeVisible();
    await expect(registerPage.locators.submitButton).toBeDisabled();

    await registerPage.fillUserData(user);
    await registerPage.acceptTerms();
    await expect(registerPage.locators.submitButton).toBeEnabled();

    await registerPage.submit();
    await expect(headerPage.locators.profileButton).toContainText(user.username);
  });

  test('Error message when trying to register with an existing email', async ({
    page,
    registerPage,
    headerPage,
    errorMessagesComponent,
  }) => {
    const user = newUserData();

    await registerPage.open();
    await registerPage.register(user);
    await expect(headerPage.locators.profileButton).toContainText(user.username);
    await page.context().clearCookies();

    await registerPage.open();
    await registerPage.register(user);
    await expect(headerPage.locators.signInButton).toContainText('Sign in');
    await expect(headerPage.locators.signUpButton).toContainText('Register');
    await expect(errorMessagesComponent.locators.messages).toContainText(
      errors.emailOrUsernameTaken,
    );
  });

  test('Registration empty fields validation', async ({
    page,
    registerPage,
    errorMessagesComponent,
  }) => {
    const user = newUserData();
    const { messages } = errorMessagesComponent.locators;

    await registerPage.open();
    await registerPage.fillUserData({ ...user, username: '' });
    await registerPage.acceptTerms();
    await registerPage.submit();
    await expect(messages).toHaveText([errors.usernameTooShort]);

    await registerPage.fillUserData({ ...user, email: '' });
    await registerPage.submit();
    await expect(messages).toHaveText([errors.invalidEmail]);

    await registerPage.fillUserData({ ...user, password: '' });
    await registerPage.submit();
    await expect(messages).toHaveText([errors.passwordTooShort]);

    await page.reload();
    await registerPage.acceptTerms();
    await registerPage.submit();
    await expect(messages).toHaveText([
      errors.usernameTooShort,
      errors.invalidEmail,
      errors.passwordTooShort,
    ]);
  });
});
