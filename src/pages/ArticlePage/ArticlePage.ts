import { BasePage } from '../BasePage';
import { ArticlePageLocators } from './ArticlePageLocators';

export class ArticlePage extends BasePage {
  readonly locators: ArticlePageLocators = new ArticlePageLocators(this.page);
}
