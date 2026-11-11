import { test, expect } from '@playwright/test';
import { registerAndLoginViaApi } from '../auth/auth-actions';
import { articlesData, title } from './articles-data';
import {
  createArticle,
  openProfileFeed,
  getAllTitlesOnAllPages,
} from './articles-actions';

test('Creation of 10 articles by new user', async ({
  page,
  request,
  baseURL,
}) => {
  const titles = [];

  await registerAndLoginViaApi(page, request, baseURL!);

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
  const allTitles = await getAllTitlesOnAllPages(page);

  expect([...allTitles].sort()).toEqual([...titles].sort());
});
