import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class FeedbackPageLocators extends BaseLocator {
  readonly name: Locator = this.page.getByTestId('contact-name');
  readonly email: Locator = this.page.getByTestId('contact-email');
  readonly message: Locator = this.page.getByTestId('contact-message');
  readonly subjectSelect: Locator = this.page.getByTestId('contact-subject');
  readonly attachments: Locator = this.page.getByTestId('contact-attachments');
  readonly copyMeCheckbox: Locator = this.page.getByTestId('contact-copy-me');
  readonly submitButton: Locator = this.page.getByTestId('contact-submit');
  readonly successMessage: Locator = this.page.getByTestId('contact-success');

  readonly getPriorityByLabel = (label: string) =>
    this.page.getByRole('radio', { name: label });
}
