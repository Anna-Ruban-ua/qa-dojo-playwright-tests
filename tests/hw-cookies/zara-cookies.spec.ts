import { test, expect } from '@playwright/test';

test.use({
  storageState: { cookies: [], origins: [] },
  channel: 'chrome',
  headless: false,
});

test('прийняття та зміна cookies', async ({ page, context }) => {
  await page.goto('https://www.zara.com/es/en/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await expect(
    page.getByRole('button', { name: 'Accept All Cookies' }),
  ).toBeHidden();

  const cookies = await context.cookies();
  expect(cookies.length).toBeGreaterThan(0);

  const cookieName = 'rid';
  const cookieDomain = '.www.zara.com';
  const cookiePath = '/';
  const originalCookie = cookies.find((cookie) => cookie.name === cookieName);
  expect(originalCookie).toBeDefined();
  expect(originalCookie).toMatchObject({ domain: cookieDomain, path: cookiePath });


  const newValue = 'zara-changed';
  expect(newValue).not.toBe(originalCookie!.value);

  const updatedCookies = cookies.map((cookie) =>
    cookie === originalCookie ? { ...cookie, value: newValue } : cookie,
  );

  await context.clearCookies();
  await context.addCookies(updatedCookies);

  const newCookies = await context.cookies();
  const updatedCookie = newCookies.find(
    (cookie) =>
      cookie.name === cookieName &&
      cookie.domain === cookieDomain &&
      cookie.path === cookiePath,
  );

  expect(updatedCookie).toBeDefined();
  expect(updatedCookie).toMatchObject({
    name: cookieName,
    domain: cookieDomain,
    path: cookiePath,
    value: newValue,
  });
});
