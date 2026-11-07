import { paths } from '../../constants/paths';
import { BasePage } from '../BasePage';
import { InteractionsPageLocators } from './InteractionsPageLocators';

export class InteractionsPage extends BasePage {
  readonly locators: InteractionsPageLocators = new InteractionsPageLocators(
    this.page,
  );

  async open() {
    await this.page.goto(paths.interactions);
  }

  async selectRow(id: number) {
    await this.locators.getRowCheckboxById(id).check();
  }

  async unselectRow(id: number) {
    await this.locators.getRowCheckboxById(id).uncheck();
  }

  async sortByStatus() {
    await this.locators.sortByStatusButton.click();
  }

  async sortByDuration() {
    await this.locators.sortByDurationButton.click();
  }
}
