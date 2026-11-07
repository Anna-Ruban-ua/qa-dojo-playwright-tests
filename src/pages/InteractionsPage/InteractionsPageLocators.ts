import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class InteractionsPageLocators extends BaseLocator {
  readonly selectedCount: Locator = this.page.getByTestId(
    'interactions-selected-count',
  );
  readonly sortByStatusButton: Locator = this.page.getByTestId(
    'interactions-sort-status',
  );
  readonly sortByDurationButton: Locator = this.page.getByTestId(
    'interactions-sort-duration',
  );
  readonly rows: Locator = this.page
    .getByTestId('interactions-table')
    .getByTestId(/^interactions-table-row-/);
  readonly titles: Locator = this.rows.locator('td:nth-child(2)');
  readonly statuses: Locator = this.rows.locator('td:nth-child(3)');
  readonly durations: Locator = this.rows.locator('td:nth-child(4)');

  readonly getRowCheckboxById = (id: number) =>
    this.page.getByTestId(`interactions-row-select-${id}`);
}
