import { test, expect } from '../fixtures/fixtures';
import { articleData } from '../../src/constants/articles';
import { articleTitle } from '../../src/utils/articleDataGenerator';

test.describe('New user', () => {
  test('Creation of 10 articles', async ({
    apiLogin,
    articlesPage,
    headerComponent,
    editorPage,
    articlePage,
    profilePage,
  }) => {
    const titles = Array.from({ length: 10 }, () => articleTitle());

    await articlesPage.open();
    for (const title of titles) {
      await headerComponent.openNewArticle();
      await editorPage.publishArticle({ title, ...articleData });
      await expect(articlePage.locators.articleContainer).toBeVisible();
    }

    await headerComponent.openProfile();
    const allTitles = await profilePage.getAllArticleTitles();

    expect([...allTitles].sort()).toEqual([...titles].sort());
  });
});
