import { paths } from '../../constants/paths';
import { BasePage } from '../BasePage';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePage {
  readonly locators: LoginPageLocators = new LoginPageLocators(this.page);

  async open() {
    await this.page.goto(paths.login);
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.locators.email.fill(email);
    await this.locators.password.fill(password);
    await this.locators.submitButton.click();
  }
}
