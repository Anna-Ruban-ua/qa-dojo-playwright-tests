import { test, expect, type Page } from '@playwright/test';
import { passwords, paths } from './page-constants';
import {
  uniqueEmail,
  validUsername,
  getLocators,
  clickSignUpButton,
  fillUserRegisterData,
  fillUserLoginData,
  checkTermsCheckbox,
  clickAuthSubmitButton,
} from './page-actions';

test('Success registration with valid data', async ({ page }) => {
  const {
    headerParagraph,
    demoCredentialsParagraph,
    authSubmitButton,
    profileNav,
  } = getLocators(page);
  const username = validUsername();
  const email = uniqueEmail();

  await page.goto(paths.articlesPage);
  await clickSignUpButton(page);
  await expect(headerParagraph).toBeVisible();
  await expect(demoCredentialsParagraph).toBeVisible();
  await expect(authSubmitButton).toBeDisabled();
  await fillUserRegisterData(page, username, email, passwords.validPass);
  await checkTermsCheckbox(page);
  await expect(authSubmitButton).toBeEnabled();
  await clickAuthSubmitButton(page);
  await expect(profileNav).toContainText(username);
});

test('Successful login with valid data', async ({ page }) => {
  const { signInContainer, demoCredentialsContainer, profileNav } =
    getLocators(page);
  const username = validUsername();
  const email = uniqueEmail();

  await page.goto(paths.registerPage);
  await fillUserRegisterData(page, username, email, passwords.validPass);
  await checkTermsCheckbox(page);
  await clickAuthSubmitButton(page);
  await page.context().clearCookies();

  await page.goto(paths.loginPage);
  await expect(signInContainer).toBeVisible();
  await expect(demoCredentialsContainer).toBeVisible();

  await fillUserLoginData(page, email, passwords.validPass);
  await clickAuthSubmitButton(page);
  await expect(profileNav).toContainText(username);
});
