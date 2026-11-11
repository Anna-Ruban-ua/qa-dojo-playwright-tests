import { mkdir } from 'node:fs/promises';
import { chromium, expect, type FullConfig } from '@playwright/test';
import { registeredUser } from '../constants/userData';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { HeaderComponent } from '../pages/Components/HeaderComponent/HeaderComponent';

export default async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const email = registeredUser.email;
  const password = registeredUser.password;

  if (!baseURL || typeof storageState !== 'string') {
    throw new Error('Потрібні baseURL і шлях до storageState у конфігурації');
  }

  if (!email || !password) {
    throw new Error('Задай user email та password');
  }

  await mkdir('playwright/.auth', { recursive: true });
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const headerComponent = new HeaderComponent(page);

    await loginPage.open();
    await loginPage.login({ email, password });
    await expect(headerComponent.locators.profileButton).toBeVisible();

    await context.storageState({ path: storageState });
  } finally {
    await browser.close();
  }
}
