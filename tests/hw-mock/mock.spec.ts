import { test, expect } from '../fixtures/fixtures';
import {
  articleTitle,
  articleDescription,
  articleBody,
} from '../../src/utils/articleDataGenerator';
import { mockArticle } from '../../src/constants/articles';

test('Mock request for article title', async ({
  page,
  apiLogin,
  articlesPage,
  articlePage,
  headerPage,
  editorPage,
}) => {
  const formTitle = `Form-Title-${articleTitle()}`;
  const mockedTitle = `Mocked-Title-${articleTitle()}`;

  await page.route(
    (url) => url.pathname === '/api/articles',
    async (route, request) => {
      if (request.method() !== 'POST') {
        return route.continue();
      }

      const body = request.postDataJSON();
      body.article.title = mockedTitle;

      await route.continue({ postData: JSON.stringify(body) });
    },
  );

  await articlesPage.open();
  await headerPage.openNewArticle();
  await editorPage.publishArticle({
    title: formTitle,
    description: articleDescription(),
    body: articleBody(),
  });

  await expect(articlePage.locators.title).toHaveText(mockedTitle);
});

test('Mock response for articles list', async ({
  page,
  apiLogin,
  articlesPage,
  articlePreviewComponent,
}) => {
  const mocked = mockArticle();

  await page.route('**/api/articles?**', async (route) => {
    await route.fulfill({
      json: { articles: [mocked], articlesCount: 1 },
      status: 200,
    });
  });

  await articlesPage.open();
  await expect(articlePreviewComponent.locators.titles).toHaveCount(1);
  await expect(articlePreviewComponent.locators.titles).toHaveText(
    mocked.title,
  );
});
