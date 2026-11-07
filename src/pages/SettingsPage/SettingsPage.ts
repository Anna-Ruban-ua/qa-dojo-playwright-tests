import { paths } from '../../constants/paths';
import { BasePage } from '../BasePage';
import { SettingsPageLocators } from './SettingsPageLocators';

export class SettingsPage extends BasePage {
  readonly locators: SettingsPageLocators = new SettingsPageLocators(this.page);

  async open() {
    await this.page.goto(paths.articles);
    await this.locators.profileLink.click();
    await this.locators.editProfileLink.click();
  }

  async setAvatar(url: string) {
    await this.locators.avatarUrlInput.fill(url);
    await this.locators.saveButton.click();
  }
}
