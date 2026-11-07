import { test, expect } from '../fixtures/fixtures';
import { search } from '../../src/constants/articles';

test.skip();

test.describe('Article Search', () => {
  test('should show empty state when nothing matches', async ({
    articlesPage,
    articlePreviewComponent,
  }) => {
    await articlesPage.open();
    await expect(articlesPage.locators.articlesCounter).toBeVisible();

    await articlesPage.search(search.noMatchQuery);

    await expect(articlesPage.locators.articlesCounter).toHaveText(
      search.noArticlesCounter,
    );
    await expect(articlesPage.locators.emptyState).toHaveText(
      search.emptyStateText,
    );
    await expect(articlePreviewComponent.locators.titles).toHaveCount(0);
  });
});
