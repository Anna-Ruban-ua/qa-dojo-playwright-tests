import { BaseComponent } from '../BaseComponent';
import { HeaderComponentLocators } from './HeaderComponentLocators';

export class HeaderComponent extends BaseComponent {
  readonly locators: HeaderComponentLocators = new HeaderComponentLocators(
    this.page,
  );

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
