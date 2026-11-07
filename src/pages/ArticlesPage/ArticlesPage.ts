import { paths } from '../../constants/paths';
import { BasePage } from '../BasePage';
import { ArticlesPageLocators } from './ArticlesPageLocators';

export class ArticlesPage extends BasePage {
  readonly locators: ArticlesPageLocators = new ArticlesPageLocators(this.page);

  async open() {
    await this.page.goto(paths.articles);
  }

  async search(query: string) {
    await this.locators.searchInput.fill(query);
    await this.locators.applyButton.click();
  }
}
