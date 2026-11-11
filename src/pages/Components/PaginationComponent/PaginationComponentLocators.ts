import { Locator } from '@playwright/test';
import { BaseLocator } from '../../BaseLocator';

export class PaginationComponentLocators extends BaseLocator {
  readonly container: Locator = this.page.getByTestId('pagination');

  readonly pageButton = (pageNumber: number) =>
    this.page.getByTestId(`pagination-page-${pageNumber}`);
}
