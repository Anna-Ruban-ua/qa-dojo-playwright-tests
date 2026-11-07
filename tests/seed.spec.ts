import { test } from './fixtures/fixtures';

test.skip();

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('/');
  });
});
