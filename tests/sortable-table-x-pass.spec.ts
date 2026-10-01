import { test, expect } from '@playwright/test';

test('Sortable table checkbox counter increase and decrease', async ({ page }) => {
    await page.goto('/laboratory/interactions');

    await page.locator("//*[@data-testid='interactions-row-select-1']").check();
    await expect(page.locator("//*[@data-testid='interactions-selected-count']")).toContainText('Вибрано: 1');

    await page.locator("//*[@data-testid='interactions-row-select-4']").check();
    await expect(page.locator("//*[@data-testid='interactions-selected-count']")).toContainText('Вибрано: 2');

    await page.locator("//*[@data-testid='interactions-row-select-3']").check();
    await expect(page.locator("//*[@data-testid='interactions-selected-count']")).toContainText('Вибрано: 3');

    await page.locator("//*[@data-testid='interactions-row-select-2']").check();
    await expect(page.locator("//*[@data-testid='interactions-selected-count']")).toContainText('Вибрано: 4');

    await page.locator("//*[@data-testid='interactions-row-select-2']").uncheck();
    await page.locator("//*[@data-testid='interactions-row-select-3']").uncheck();
    await page.locator("//*[@data-testid='interactions-row-select-4']").uncheck();
    await expect(page.locator("//*[@data-testid='interactions-selected-count']")).toContainText('Вибрано: 1');
});

test('Sortable table status sorting', async ({ page }) => {
    await page.goto('/laboratory/interactions');
    const titles = page.locator("//*[@data-testid='interactions-table']//*[contains(@data-testid,'interactions-row-select')]/parent::td/following-sibling::td[1]");
    const statuses = page.locator("//*[@data-testid='interactions-table']//*[contains(@data-testid,'interactions-row-select')]/parent::td/following-sibling::td/child::span");
    await expect(titles).toHaveText([
        'Авторизація',
        'Завантаження файлу',
        'Пошук за тегом',
        'Створення статті',
    ]);

    await page.locator("//*[@data-testid='interactions-sort-status']").click();
    await expect(titles).toHaveText([
        'Створення статті',
        'Авторизація',
        'Пошук за тегом',
        'Завантаження файлу',
    ]);
    await expect(statuses).toHaveText([
        'Failed',
        'Passed',
        'Passed',
        'Skipped',
    ]);
});

test('Sortable table duration sorting', async ({ page }) => {
    await page.goto('/laboratory/interactions');
    const titles = page.locator("//*[@data-testid='interactions-table']//*[contains(@data-testid,'interactions-row-select')]/parent::td/following-sibling::td[1]");
    const durations = page.locator("//*[@data-testid='interactions-table']//*[contains(@class,'tabular-nums')]");
    await expect(titles).toHaveText([
        'Авторизація',
        'Завантаження файлу',
        'Пошук за тегом',
        'Створення статті',
    ]);

    await page.locator("//*[@data-testid='interactions-sort-duration']").click();
    await expect(titles).toHaveText([
        'Завантаження файлу',
        'Пошук за тегом',
        'Авторизація',
        'Створення статті',
    ]);
    await expect(durations).toHaveText([
        '0.0 s',
        '5.7 s',
        '8.4 s',
        '12.1 s',
    ]);
    
    await page.locator("//*[@data-testid='interactions-sort-duration']").click();
    await expect(titles).toHaveText([
        'Створення статті',
        'Авторизація',
        'Пошук за тегом',
        'Завантаження файлу',
    ]);
    await expect(durations).toHaveText([
        '12.1 s',
        '8.4 s',
        '5.7 s',
        '0.0 s',
    ]);
});