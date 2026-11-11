import { expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { PaginationComponentLocators } from './PaginationComponentLocators';

export class PaginationComponent extends BaseComponent {
  readonly locators: PaginationComponentLocators =
    new PaginationComponentLocators(this.page);

  async hasPage(pageNumber: number) {
    return (await this.locators.pageButton(pageNumber).count()) > 0;
  }

  async openPage(pageNumber: number) {
    const button = this.locators.pageButton(pageNumber);
    await button.click();
    await expect(button).toHaveAttribute('aria-current', 'true');
  }
}
