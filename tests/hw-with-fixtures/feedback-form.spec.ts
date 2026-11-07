import { test, expect } from '../fixtures/fixtures';
import { errors } from '../../src/constants/errors';
import { priorities, screenshot, subjects } from '../../src/constants/feedback';
import { feedbackData } from '../../src/utils/dataGenerator';

test.skip();

test.describe('Feedback form', () => {
  test.beforeEach(async ({ feedbackPage }) => {
    await feedbackPage.open();
  });

  test('all fields filled: message is sent', async ({
    feedbackPage,
    errorMessagesComponent,
  }) => {
    await feedbackPage.fillAllFields({
      ...feedbackData(),
      subject: subjects[0],
      priority: priorities[0],
      attachment: screenshot,
    });
    await feedbackPage.submit();

    await expect(feedbackPage.locators.successMessage).toBeVisible();
    await expect(errorMessagesComponent.locators.container).toBeHidden();
  });

  test('only required fields filled: message is sent', async ({
    feedbackPage,
    errorMessagesComponent,
  }) => {
    await feedbackPage.fillRequiredFields(feedbackData());
    await feedbackPage.submit();

    await expect(feedbackPage.locators.successMessage).toBeVisible();
    await expect(errorMessagesComponent.locators.container).toBeHidden();
  });

  test('only optional fields filled: required fields errors', async ({
    feedbackPage,
    errorMessagesComponent,
  }) => {
    await feedbackPage.fillOptionalFields({
      subject: subjects[1],
      priority: priorities[1],
      attachment: screenshot,
    });
    await feedbackPage.submit();

    await expect(feedbackPage.locators.successMessage).toBeHidden();
    for (const error of [
      errors.nameRequired,
      errors.invalidEmail,
      errors.messageRequired,
    ]) {
      await expect(
        errorMessagesComponent.locators.getMessageByText(error),
      ).toBeVisible();
    }
  });
});
