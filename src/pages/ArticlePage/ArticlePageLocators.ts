import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class ArticlePageLocators extends BaseLocator {
  readonly articleContainer: Locator = this.page.getByTestId('article-page');
  readonly title: Locator = this.page.getByTestId('article-title');
}
