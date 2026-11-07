import { test, expect } from '../../fixtures/fixtures';
import { articleData } from '../../../src/constants/articles';
import { registeredUser } from '../../../src/constants/userData';
import { articleTitle } from '../../../src/utils/dataGenerator';

test.skip();

test.describe('Registered user', () => {
  test.use({ userToLogin: registeredUser });

  test('Creation of 10 articles', async ({
    uiLogin,
    headerPage,
    editorPage,
    articlePage,
    articlePreviewComponent,
  }) => {
    const titles = Array.from({ length: 10 }, () => articleTitle());

    for (const title of titles) {
      await headerPage.openNewArticle();
      await editorPage.publishArticle({ title, ...articleData });
      await expect(articlePage.locators.articleContainer).toBeVisible();
    }

    await headerPage.openProfile();
    for (const title of titles) {
      await expect(
        articlePreviewComponent.locators.getTitleByText(title),
      ).toBeVisible();
    }
  });
});
