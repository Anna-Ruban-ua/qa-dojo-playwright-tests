import { test as base, expect } from '@playwright/test';
import { HeaderPage } from '../../src/pages/HeaderPage/HeaderPage';
import { RegisterPage } from '../../src/pages/RegisterPage/RegisterPage';
import { LoginPage } from '../../src/pages/LoginPage/LoginPage';
import { ArticlesPage } from '../../src/pages/ArticlesPage/ArticlesPage';
import { EditorPage } from '../../src/pages/EditorPage/EditorPage';
import { ArticlePage } from '../../src/pages/ArticlePage/ArticlePage';
import { FeedbackPage } from '../../src/pages/FeedbackPage/FeedbackPage';
import { InteractionsPage } from '../../src/pages/InteractionsPage/InteractionsPage';
import { ArticlePreviewComponent } from '../../src/pages/Components/ArticlePreviewComponentPage';
import { ErrorMessagesComponent } from '../../src/pages/Components/ErrorMessagesComponentPage';

type Fixtures = {
  headerPage: HeaderPage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  articlesPage: ArticlesPage;
  editorPage: EditorPage;
  articlePage: ArticlePage;
  feedbackPage: FeedbackPage;
  interactionsPage: InteractionsPage;
  articlePreviewComponent: ArticlePreviewComponent;
  errorMessagesComponent: ErrorMessagesComponent;
  userToLogin: { email: string; password: string } | null;
  login: void;
};

const test = base.extend<Fixtures>({
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  articlesPage: async ({ page }, use) => {
    await use(new ArticlesPage(page));
  },

  editorPage: async ({ page }, use) => {
    await use(new EditorPage(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },

  feedbackPage: async ({ page }, use) => {
    await use(new FeedbackPage(page));
  },

  interactionsPage: async ({ page }, use) => {
    await use(new InteractionsPage(page));
  },

  articlePreviewComponent: async ({ page }, use) => {
    await use(new ArticlePreviewComponent(page));
  },

  errorMessagesComponent: async ({ page }, use) => {
    await use(new ErrorMessagesComponent(page));
  },

  userToLogin: [null, { option: true }],

  login: [
    async ({ loginPage, headerPage, userToLogin }, use) => {
      if (userToLogin) {
        await loginPage.open();
        await loginPage.login(userToLogin);
        await expect(headerPage.locators.profileButton).toBeVisible();
      }
      await use();
    },
    { auto: true },
  ],
});

export { test, expect };
