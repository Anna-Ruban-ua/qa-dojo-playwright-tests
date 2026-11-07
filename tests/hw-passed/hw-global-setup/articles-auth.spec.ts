import { test, expect } from '../../fixtures/fixtures';
import { registeredUser } from '../../../src/constants/userData';

test.skip();

test('Successful login with valid data', async ({
  articlesPage,
  headerPage,
}) => {
  await articlesPage.open();
  await expect(headerPage.locators.profileButton).toContainText(
    registeredUser.name,
  );
});

test.describe('Empty storage state', { tag: '@auth' }, () => {
  test.use({
    storageState: { cookies: [], origins: [] },
  });
  test('User not logged in with empty storage state', async ({
    articlesPage,
    headerPage,
  }) => {
    await articlesPage.open();
    await expect(headerPage.locators.profileButton).not.toBeVisible();
  });
});
