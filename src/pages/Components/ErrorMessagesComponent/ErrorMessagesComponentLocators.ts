import { Locator } from '@playwright/test';
import { BaseLocator } from '../../BaseLocator';

export class ErrorMessagesComponentLocators extends BaseLocator {
  readonly container: Locator = this.page.getByTestId('error-messages');
  readonly messages: Locator = this.container.getByRole('paragraph');

  readonly getMessageByText = (text: string) => this.container.getByText(text);
}
