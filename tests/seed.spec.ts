import { test } from './fixtures/fixtures';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('/');
  });
});
