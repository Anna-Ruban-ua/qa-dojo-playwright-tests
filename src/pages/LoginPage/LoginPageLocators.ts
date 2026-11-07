import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class LoginPageLocators extends BaseLocator {
  readonly signInContainer: Locator = this.page.getByText(
    'MembersSign inNo account yet',
  );
  readonly demoCredentials: Locator = this.page.getByText(
    'Demo credentialsEmailolena@',
  );
  readonly email: Locator = this.page.getByTestId('auth-email');
  readonly password: Locator = this.page.getByTestId('auth-password');
  readonly submitButton: Locator = this.page.getByTestId('auth-submit');
}
