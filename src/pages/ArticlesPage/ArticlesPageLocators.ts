import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class ArticlesPageLocators extends BaseLocator {
  readonly searchInput: Locator = this.page.getByTestId('home-search-input');
  readonly applyButton: Locator = this.page.getByTestId('home-filter-apply');
  readonly resetButton: Locator = this.page.getByTestId('home-filter-reset');
  readonly articlesCounter: Locator = this.page.getByTestId('feed-article-count');
  readonly emptyState: Locator = this.page.getByTestId('article-list-empty');
}
