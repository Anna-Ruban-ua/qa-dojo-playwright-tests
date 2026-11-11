import { BaseComponent } from '../BaseComponent';
import { ArticlePreviewComponentLocators } from './ArticlePreviewComponentLocators';

export class ArticlePreviewComponent extends BaseComponent {
  readonly locators: ArticlePreviewComponentLocators =
    new ArticlePreviewComponentLocators(this.page);

  async getAllTitles() {
    return this.locators.titles.allTextContents();
  }
}
