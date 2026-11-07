import { BasePage } from '../BasePage';
import { HeaderPageLocators } from './HeaderPageLocators';

export class HeaderPage extends BasePage {
  readonly locators: HeaderPageLocators = new HeaderPageLocators(this.page);

  async openSignUp() {
    await this.locators.signUpButton.click();
  }

  async openNewArticle() {
    await this.locators.newArticleButton.click();
  }

  async openProfile() {
    await this.locators.profileButton.click();
  }
}
