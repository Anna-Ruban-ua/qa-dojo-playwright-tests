import { test, expect, type Page } from '@playwright/test';
import { registeredUser, articlesData } from './page-constants';
import {
  loginWithRegisteredUser,
  createArticle,
  openProfileFeed,
  getAllTitles,
  title,
} from './page-actions';

test('Creation of 10 articles by registered user', async ({ page }) => {
  const titles = [];

  await loginWithRegisteredUser(
    page,
    registeredUser.email,
    registeredUser.password,
  );

  for (let i = 0; i < 10; i++) {
    const articleTitle = title();
    await createArticle(
      page,
      articleTitle,
      articlesData.description,
      articlesData.text,
    );
    titles.push(articleTitle);
  }

  await openProfileFeed(page);
  const allTitles = await getAllTitles(page);

  for (const title of titles) {
    expect(allTitles).toContain(title);
  }
});
