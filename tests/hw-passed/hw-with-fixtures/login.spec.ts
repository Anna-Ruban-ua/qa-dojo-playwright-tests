import { test, expect } from '../../fixtures/fixtures';
import { errors } from '../../../src/constants/errors';
import { passwords } from '../../../src/constants/userData';
import { newUserData } from '../../../src/utils/dataGenerator';

test.skip();

test.describe('Login', { tag: '@auth' }, () => {
  test('Successful login with valid data', async ({
    page,
    registerPage,
    loginPage,
    headerPage,
  }) => {
    const user = newUserData();

    await registerPage.open();
    await registerPage.register(user);
    await expect(headerPage.locators.profileButton).toContainText(user.username);
    await page.context().clearCookies();

    await loginPage.open();
    await expect(loginPage.locators.signInContainer).toBeVisible();
    await expect(loginPage.locators.demoCredentials).toBeVisible();

    await loginPage.login(user);
    await expect(headerPage.locators.profileButton).toContainText(user.username);
  });

  test('Login with invalid password', async ({
    page,
    registerPage,
    loginPage,
    headerPage,
    errorMessagesComponent,
  }) => {
    const user = newUserData();

    await registerPage.open();
    await registerPage.register(user);
    await expect(headerPage.locators.profileButton).toContainText(user.username);
    await page.context().clearCookies();

    await loginPage.open();
    await loginPage.login({ email: user.email, password: passwords.invalid });
    await expect(errorMessagesComponent.locators.messages).toContainText(
      errors.wrongCredentials,
    );
  });

  test('Login with not existing user', async ({
    loginPage,
    errorMessagesComponent,
  }) => {
    const user = newUserData();

    await loginPage.open();
    await loginPage.login({ email: user.email, password: passwords.invalid });
    await expect(errorMessagesComponent.locators.messages).toContainText(
      errors.wrongCredentials,
    );
  });
});
