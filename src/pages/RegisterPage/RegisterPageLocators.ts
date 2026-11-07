import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class RegisterPageLocators extends BaseLocator {
  readonly header: Locator = this.page.getByText('Join the paperCreate an');
  readonly demoCredentials: Locator = this.page.getByText(
    'Demo credentialsEmailolena@',
  );
  readonly username: Locator = this.page.getByTestId('auth-username');
  readonly email: Locator = this.page.getByTestId('auth-email');
  readonly password: Locator = this.page.getByTestId('auth-password');
  readonly confirmPassword: Locator = this.page.getByTestId(
    'register-confirm-password',
  );
  readonly termsCheckbox: Locator = this.page.getByTestId('register-terms');
  readonly submitButton: Locator = this.page.getByTestId('auth-submit');
}
