import { test, expect } from '../../fixtures/fixtures';
import {
  interactions,
  selectedCounter,
} from '../../../src/constants/interactions';

test.skip();

test.describe('Sortable table', () => {
  test.beforeEach(async ({ interactionsPage }) => {
    await interactionsPage.open();
  });

  test('checkbox counter increases and decreases', async ({
    interactionsPage,
  }) => {
    const { selectedCount } = interactionsPage.locators;
    const rowIds = [1, 4, 3, 2];

    for (const [index, id] of rowIds.entries()) {
      await interactionsPage.selectRow(id);
      await expect(selectedCount).toContainText(selectedCounter(index + 1));
    }

    for (const id of [2, 3, 4]) {
      await interactionsPage.unselectRow(id);
    }
    await expect(selectedCount).toContainText(selectedCounter(1));
  });

  test('sorting by status', async ({ interactionsPage }) => {
    const { titles, statuses } = interactionsPage.locators;
    await expect(titles).toHaveText(interactions.defaultOrder);

    await interactionsPage.sortByStatus();
    await expect(titles).toHaveText(interactions.byStatus.titles);
    await expect(statuses).toHaveText(interactions.byStatus.statuses);
  });

  test('sorting by duration', async ({ interactionsPage }) => {
    const { titles, durations } = interactionsPage.locators;
    await expect(titles).toHaveText(interactions.defaultOrder);

    await interactionsPage.sortByDuration();
    await expect(titles).toHaveText(interactions.byDurationAsc.titles);
    await expect(durations).toHaveText(interactions.byDurationAsc.durations);

    await interactionsPage.sortByDuration();
    await expect(titles).toHaveText(interactions.byDurationDesc.titles);
    await expect(durations).toHaveText(interactions.byDurationDesc.durations);
  });
});
