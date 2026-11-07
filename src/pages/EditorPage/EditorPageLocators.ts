import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class EditorPageLocators extends BaseLocator {
  readonly title: Locator = this.page.getByTestId('editor-title');
  readonly description: Locator = this.page.getByTestId('editor-description');
  readonly body: Locator = this.page.getByTestId('editor-body');
  readonly publishButton: Locator = this.page.getByTestId('editor-submit');
}
