import { test, expect, type Page } from '@playwright/test';
import { subjects, priorities, errors } from './page-constants';
import {
  getLocators,
  openFeedBackPage,
  fillRequiredFields,
  fillOptionalFields,
  fillAllFields,
} from './feedbackPage-actions';

export const testData = {
  test1: {
    testName: 'all',
    name: 'Anna',
    email: 'anna.ruban@gmail.com',
    message: 'This is the TEST message',
    subject: subjects[0],
    priority: priorities[0],
    attachment: {
      name: 'test-attachment.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is a test file content'),
    },
    fillForm: fillAllFields,
    verify: async function (page: Page) {
      const { successMessage } = getLocators(page);
      await expect(successMessage()).toBeVisible();
    },
  },
  test2: {
    testName: 'required',
    name: 'Anna',
    email: 'anna.ruban@gmail.com',
    message: 'This is the TEST message',
    fillForm: fillRequiredFields,
    verify: async function (page: Page) {
      const { successMessage } = getLocators(page);
      await expect(successMessage()).toBeVisible();
    },
  },
  test3: {
    testName: 'optional',
    message: 'This is the TEST message',
    subject: subjects[1],
    priority: priorities[1],
    attachment: {
      name: 'test-attachment.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is a test file content'),
    },
    fillForm: fillOptionalFields,
    verify: async function (page: Page) {
      const { errorMessages } = getLocators(page);
      await expect(errorMessages(errors.nameError)).toBeVisible();
      await expect(errorMessages(errors.emailError)).toBeVisible();
      await expect(errorMessages(errors.messageError)).toBeVisible();
    },
  },
};

for (const data of Object.values(testData)) {
  test(`Feedback form ${data.testName} fields validation`, async ({ page }) => {
    const { submitButton } = getLocators(page);

    await openFeedBackPage(page);
    await data.fillForm(page, data);
    await submitButton().click();
    await data.verify(page);
  });
}
