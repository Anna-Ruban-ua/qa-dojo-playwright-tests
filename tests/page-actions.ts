import { expect, type Page } from '@playwright/test';
import { paths } from './page-constants';

export const validUsername = () => `student-${Date.now()}-${Math.random()}`;

export const uniqueEmail = () =>
  `student-${Date.now()}-${Math.random()}@example.com`;

export const title = () => `Test Title ${Date.now().toString(36)}`;

export function getLocators(page: Page) {
  const signUpButton = page.getByTestId('nav-sign-up');
  const signInContainer = page.getByText('MembersSign inNo account yet');
  const headerParagraph = page.getByText('Join the paperCreate an');
  const demoCredentialsParagraph = page.getByText(
    'Demo credentialsEmailolena@',
  );
  const demoCredentialsContainer = page.getByText(
    'Demo credentialsEmailolena@',
  );
  const authSubmitButton = page.getByTestId('auth-submit');
  const usernameInput = page.getByTestId('auth-username');
  const emailInput = page.getByTestId('auth-email');
  const passwordInput = page.getByTestId('auth-password');
  const confirmPasswordInput = page.getByTestId('register-confirm-password');
  const termsCheckbox = page.getByTestId('register-terms');
  const profileNav = page.getByTestId('nav-profile');
  const newArticleButton = page.getByTestId('nav-new-article');
  const titleInput = page.getByTestId('editor-title');
  const descriptionInput = page.getByTestId('editor-description');
  const bodyTextArea = page.getByTestId('editor-body');
  const publishButton = page.getByTestId('editor-submit');
  const articlesTitle = page.getByTestId('preview-title');
  const articlePageContainer = page.getByTestId('article-page');
  const profilePageContainer = page.getByTestId('profile-page');

  return {
    signUpButton,
    signInContainer,
    headerParagraph,
    demoCredentialsParagraph,
    demoCredentialsContainer,
    authSubmitButton,
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    termsCheckbox,
    profileNav,
    newArticleButton,
    titleInput,
    descriptionInput,
    bodyTextArea,
    publishButton,
    articlesTitle,
    articlePageContainer,
    profilePageContainer,
  };
}

export async function clickSignUpButton(page: Page) {
  const { signUpButton } = getLocators(page);
  await signUpButton.click();
}

export async function fillUserRegisterData(
  page: Page,
  username: string,
  email: string,
  password: string,
) {
  const { usernameInput, emailInput, passwordInput, confirmPasswordInput } =
    getLocators(page);
  await usernameInput.fill(username);
  await emailInput.fill(email);
  await passwordInput.fill(password);
  await confirmPasswordInput.fill(password);
}

export async function fillUserLoginData(
  page: Page,
  email: string,
  password: string,
) {
  const { emailInput, passwordInput } = getLocators(page);
  await emailInput.fill(email);
  await passwordInput.fill(password);
}

export async function checkTermsCheckbox(page: Page) {
  const { termsCheckbox } = getLocators(page);
  await termsCheckbox.check();
}

export async function clickAuthSubmitButton(page: Page) {
  const { authSubmitButton } = getLocators(page);
  await authSubmitButton.click();
}

export async function loginWithRegisteredUser(
  page: Page,
  email: string,
  password: string,
) {
  const { signInContainer, demoCredentialsContainer } = getLocators(page);
  await page.goto(paths.loginPage);
  await expect(signInContainer).toBeVisible();
  await expect(demoCredentialsContainer).toBeVisible();
  await fillUserLoginData(page, email, password);
  await clickAuthSubmitButton(page);
}

export async function createArticle(
  page: Page,
  title: string,
  description: string,
  body: string,
) {
  const {
    newArticleButton,
    titleInput,
    descriptionInput,
    bodyTextArea,
    publishButton,
    articlePageContainer,
  } = getLocators(page);
  await newArticleButton.click();
  await titleInput.fill(title);
  await descriptionInput.fill(description);
  await bodyTextArea.fill(body);
  await publishButton.click();
  await expect(articlePageContainer).toBeVisible();
}

export async function openProfileFeed(page: Page) {
  const { profileNav, articlesTitle } = getLocators(page);
  await profileNav.click();
  await expect(articlesTitle.nth(9)).toBeVisible();
}

export async function getAllTitles(page: Page) {
  const { articlesTitle } = getLocators(page);
  return articlesTitle.allTextContents();
}
