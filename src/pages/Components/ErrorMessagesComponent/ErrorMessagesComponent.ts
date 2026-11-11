import { BaseComponent } from '../BaseComponent';
import { ErrorMessagesComponentLocators } from './ErrorMessagesComponentLocators';

export class ErrorMessagesComponent extends BaseComponent {
  readonly locators: ErrorMessagesComponentLocators =
    new ErrorMessagesComponentLocators(this.page);
}
