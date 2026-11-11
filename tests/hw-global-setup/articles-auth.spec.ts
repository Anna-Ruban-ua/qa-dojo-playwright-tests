import { test, expect } from '../fixtures/fixtures';
import { registeredUser } from '../../src/constants/userData';

test.skip(
  true,
  'Needs globalSetup and storageState, which are commented out in playwright.config.ts',
);

test('Successful login with valid data', async ({
  articlesPage,
  headerComponent,
}) => {
  await articlesPage.open();
  await expect(headerComponent.locators.profileButton).toContainText(
    registeredUser.name,
  );
});

test.describe('Empty storage state', { tag: '@auth' }, () => {
  test.use({
    storageState: { cookies: [], origins: [] },
  });
  test('User not logged in with empty storage state', async ({
    articlesPage,
    headerComponent,
  }) => {
    await articlesPage.open();
    await expect(headerComponent.locators.profileButton).not.toBeVisible();
  });
});
