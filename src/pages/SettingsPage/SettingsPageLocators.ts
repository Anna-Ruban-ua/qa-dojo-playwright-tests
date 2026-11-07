import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class SettingsPageLocators extends BaseLocator {
  readonly avatarUrlInput: Locator = this.page.getByTestId('settings-image');
  readonly avatarImage: Locator = this.page
    .getByTestId('settings-avatar-preview')
    .locator('img');
  readonly saveButton: Locator = this.page.getByTestId('settings-submit');
  readonly usernameInput: Locator = this.page.getByTestId('settings-username');
  readonly emailInput: Locator = this.page.getByTestId('settings-email');
  readonly profileLink: Locator = this.page.getByTestId('nav-profile');
  readonly editProfileLink: Locator = this.page.getByRole('link', {
    name: 'Edit profile',
  });
}
