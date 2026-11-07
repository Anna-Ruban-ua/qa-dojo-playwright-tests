import { BasePage } from '../BasePage';
import { EditorPageLocators } from './EditorPageLocators';

export class EditorPage extends BasePage {
  readonly locators: EditorPageLocators = new EditorPageLocators(this.page);

  async publishArticle({
    title,
    description,
    body,
  }: {
    title: string;
    description: string;
    body: string;
  }) {
    await this.locators.title.fill(title);
    await this.locators.description.fill(description);
    await this.locators.body.fill(body);
    await this.locators.publishButton.click();
  }
}
