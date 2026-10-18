import { expect, type Page } from '@playwright/test';
import { paths } from './page-constants';

export function getLocators(page: Page) {
  return {
    nameInput: () => page.getByTestId('contact-name'),
    emailInput: () => page.getByTestId('contact-email'),
    messageTextArea: () => page.getByTestId('contact-message'),
    subjectSelect: () => page.getByTestId('contact-subject'),
    priorityInput: (label: string) => page.getByRole('radio', { name: label }),
    attachmentsInput: () => page.getByTestId('contact-attachments'),
    copyCheckbox: () => page.getByTestId('contact-copy-me'),
    submitButton: () => page.getByTestId('contact-submit'),
    errorsContainer: () => page.getByTestId('error-messages'),
    errorMessages: (error: string) =>
      page.getByTestId('error-messages').getByText(error),
    successMessage: () => page.getByTestId('contact-success'),
  };
}

export type RequiredFields = {
  name: string;
  email: string;
  message: string;
};

export type OptionalFields = {
  subject: string;
  priority: string;
  attachment: { name: string; mimeType: string; buffer: Buffer };
};

export async function openFeedBackPage(page: Page) {
  const { nameInput, emailInput, messageTextArea } = getLocators(page);
  await page.goto(paths.feedbackPage);
  await expect(nameInput()).toBeVisible();
  await expect(emailInput()).toBeVisible();
  await expect(messageTextArea()).toBeVisible();
}

export async function fillRequiredFields(page: Page, data: RequiredFields) {
  const { nameInput, emailInput, messageTextArea } = getLocators(page);
  await nameInput().fill(data.name);
  await emailInput().fill(data.email);
  await messageTextArea().fill(data.message);
}

export async function fillOptionalFields(page: Page, data: OptionalFields) {
  const { subjectSelect, priorityInput, attachmentsInput, copyCheckbox } =
    getLocators(page);
  await subjectSelect().selectOption({ label: data.subject });
  await priorityInput(data.priority).check();
  await attachmentsInput().setInputFiles(data.attachment);
  await copyCheckbox().check();
}

export async function fillAllFields(
  page: Page,
  data: RequiredFields & OptionalFields,
) {
  await fillRequiredFields(page, data);
  await fillOptionalFields(page, data);
}