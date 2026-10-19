import { test, expect, type Page } from '@playwright/test';
import { subjects, priorities, errors, screenshot } from './page-constants';
import {
  getLocators,
  openFeedBackPage,
  fillRequiredFields,
  fillOptionalFields,
  fillAllFields,
} from './feedbackPage-actions';

export const testData = [
  {
    testName: 'all',
    name: 'Anna',
    email: 'anna.ruban@gmail.com',
    message: 'This is the TEST message',
    subject: subjects[0],
    priority: priorities[0],
    attachment: screenshot,
    fillForm: fillAllFields,
    verify: async function (page: Page) {
      const { successMessage, errorsContainer } = getLocators(page);
      await expect(successMessage()).toBeVisible();
      await expect(errorsContainer()).toBeHidden();
    },
  },
  {
    testName: 'required',
    name: 'Anna',
    email: 'anna.ruban@gmail.com',
    message: 'This is the TEST message',
    fillForm: fillRequiredFields,
    verify: async function (page: Page) {
      const { successMessage, errorsContainer } = getLocators(page);
      await expect(successMessage()).toBeVisible();
      await expect(errorsContainer()).toBeHidden();
    },
  },
  {
    testName: 'optional',
    subject: subjects[1],
    priority: priorities[1],
    attachment: screenshot,
    fillForm: fillOptionalFields,
    verify: async function (page: Page) {
      const { successMessage, errorMessages } = getLocators(page);
      await expect(successMessage()).toBeHidden();
      await expect(errorMessages(errors.nameError)).toBeVisible();
      await expect(errorMessages(errors.emailError)).toBeVisible();
      await expect(errorMessages(errors.messageError)).toBeVisible();
    },
  },
];

for (const data of testData) {
  test(`Feedback form ${data.testName} fields validation`, async ({ page }) => {
    const { submitButton } = getLocators(page);

    await openFeedBackPage(page);
    await data.fillForm(page, data);
    await submitButton().click();
    await data.verify(page);
  });
}
