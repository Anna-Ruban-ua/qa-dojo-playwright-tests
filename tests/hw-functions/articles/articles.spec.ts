import { test, expect, type Page } from '@playwright/test';
import { registeredUser } from '../auth/auth-data';
import { loginWithRegisteredUser } from '../auth/auth-actions';
import { articlesData, title } from './articles-data';
import {
  createArticle,
  openProfileFeed,
  getAllTitles,
} from './articles-actions';

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
