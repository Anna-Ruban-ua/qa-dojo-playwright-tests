import type { Page } from '@playwright/test';
export const validUsername = () => `student-${Date.now()}-${Math.random()}`;

export const uniqueEmail = () =>
  `student-${Date.now()}-${Math.random()}@example.com`;

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
