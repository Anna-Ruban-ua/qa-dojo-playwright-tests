import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class ArticlePreviewComponentLocators extends BaseLocator {
  readonly titles: Locator = this.page.getByTestId('preview-title');

  readonly getTitleByText = (title: string) =>
    this.titles.filter({ hasText: title });
}
