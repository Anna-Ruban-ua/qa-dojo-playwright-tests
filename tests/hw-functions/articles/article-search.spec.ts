import { test, expect } from '@playwright/test';
import { search } from './articles-data';
import {
  getLocators,
  openArticlesPage,
  searchArticles,
} from './articles-actions';

test.describe('Article Search', () => {
  test('should show empty state when nothing matches', async ({ page }) => {
    const { articlesCounter, emptyState, articleTitles } = getLocators(page);

    await openArticlesPage(page);
    await searchArticles(page, search.noMatchQuery);

    await expect(articlesCounter()).toHaveText(search.noArticlesCounter);
    await expect(emptyState()).toHaveText(search.emptyStateText);
    await expect(articleTitles()).toHaveCount(0);
  });
});
