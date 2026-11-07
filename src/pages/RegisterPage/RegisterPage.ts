import { paths } from '../../constants/paths';
import { BasePage } from '../BasePage';
import { RegisterPageLocators } from './RegisterPageLocators';

export class RegisterPage extends BasePage {
  readonly locators: RegisterPageLocators = new RegisterPageLocators(this.page);

  async open() {
    await this.page.goto(paths.register);
  }

  async fillUserData({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    await this.locators.username.fill(username);
    await this.locators.email.fill(email);
    await this.locators.password.fill(password);
    await this.locators.confirmPassword.fill(password);
  }

  async acceptTerms() {
    await this.locators.termsCheckbox.check();
  }

  async submit() {
    await this.locators.submitButton.click();
  }

  async register(user: { username: string; email: string; password: string }) {
    await this.fillUserData(user);
    await this.acceptTerms();
    await this.submit();
  }
}
