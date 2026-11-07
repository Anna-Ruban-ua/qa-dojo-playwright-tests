import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class HeaderPageLocators extends BaseLocator {
  readonly signInButton: Locator = this.page.getByTestId('nav-sign-in');
  readonly signUpButton: Locator = this.page.getByTestId('nav-sign-up');
  readonly newArticleButton: Locator = this.page.getByTestId('nav-new-article');
  readonly profileButton: Locator = this.page.getByTestId('nav-profile');
  readonly profileAvatar: Locator = this.page
    .getByTestId('nav-profile')
    .locator('img');
}
