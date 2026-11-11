import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class ProfilePageLocators extends BaseLocator {
  readonly username: Locator = this.page.getByTestId('profile-username');
  readonly articleList: Locator = this.page.getByTestId('article-list');
}
