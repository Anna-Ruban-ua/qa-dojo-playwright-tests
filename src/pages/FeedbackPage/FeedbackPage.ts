import { paths } from '../../constants/paths';
import { BasePage } from '../BasePage';
import { FeedbackPageLocators } from './FeedbackPageLocators';

export type RequiredFields = {
  name: string;
  email: string;
  message: string;
};

export type OptionalFields = {
  subject: string;
  priority: string;
  attachment: { name: string; mimeType: string; buffer: Buffer };
};

export class FeedbackPage extends BasePage {
  readonly locators: FeedbackPageLocators = new FeedbackPageLocators(this.page);

  async open() {
    await this.page.goto(paths.feedback);
  }

  async fillRequiredFields({ name, email, message }: RequiredFields) {
    await this.locators.name.fill(name);
    await this.locators.email.fill(email);
    await this.locators.message.fill(message);
  }

  async fillOptionalFields({ subject, priority, attachment }: OptionalFields) {
    await this.locators.subjectSelect.selectOption({ label: subject });
    await this.locators.getPriorityByLabel(priority).check();
    await this.locators.attachments.setInputFiles(attachment);
    await this.locators.copyMeCheckbox.check();
  }

  async fillAllFields(data: RequiredFields & OptionalFields) {
    await this.fillRequiredFields(data);
    await this.fillOptionalFields(data);
  }

  async submit() {
    await this.locators.submitButton.click();
  }
}
