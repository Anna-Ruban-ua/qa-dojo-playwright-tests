import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ProfilePageLocators } from './ProfilePageLocators';
import { ArticlePreviewComponent } from '../Components/ArticlePreviewComponent/ArticlePreviewComponent';
import { PaginationComponent } from '../Components/PaginationComponent/PaginationComponent';

export class ProfilePage extends BasePage {
  readonly locators: ProfilePageLocators = new ProfilePageLocators(this.page);
  readonly articlePreview = new ArticlePreviewComponent(this.page);
  readonly pagination = new PaginationComponent(this.page);

  // Reads article titles from every pagination page, starting from page 1.
  async getAllArticleTitles() {
    const { titles } = this.articlePreview.locators;
    await expect(titles.first()).toBeVisible();

    const allTitles = await this.articlePreview.getAllTitles();

    for (
      let pageNumber = 2;
      await this.pagination.hasPage(pageNumber);
      pageNumber++
    ) {
      const previousFirstTitle = await titles.first().textContent();
      await this.pagination.openPage(pageNumber);
      await expect(titles.first()).not.toHaveText(previousFirstTitle ?? '');
      allTitles.push(...(await this.articlePreview.getAllTitles()));
    }

    return allTitles;
  }
}
