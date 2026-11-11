import { test as base } from '@playwright/test';
import { RegisterPage } from '../../src/pages/RegisterPage/RegisterPage';
import { LoginPage } from '../../src/pages/LoginPage/LoginPage';
import { ArticlesPage } from '../../src/pages/ArticlesPage/ArticlesPage';
import { EditorPage } from '../../src/pages/EditorPage/EditorPage';
import { ArticlePage } from '../../src/pages/ArticlePage/ArticlePage';
import { FeedbackPage } from '../../src/pages/FeedbackPage/FeedbackPage';
import { InteractionsPage } from '../../src/pages/InteractionsPage/InteractionsPage';
import { SettingsPage } from '../../src/pages/SettingsPage/SettingsPage';
import { ProfilePage } from '../../src/pages/ProfilePage/ProfilePage';
import { ArticlePreviewComponent } from '../../src/pages/Components/ArticlePreviewComponent/ArticlePreviewComponent';
import { ErrorMessagesComponent } from '../../src/pages/Components/ErrorMessagesComponent/ErrorMessagesComponent';
import { HeaderComponent } from '../../src/pages/Components/HeaderComponent/HeaderComponent';

type PagesFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  articlesPage: ArticlesPage;
  editorPage: EditorPage;
  articlePage: ArticlePage;
  feedbackPage: FeedbackPage;
  interactionsPage: InteractionsPage;
  settingsPage: SettingsPage;
  profilePage: ProfilePage;
  articlePreviewComponent: ArticlePreviewComponent;
  errorMessagesComponent: ErrorMessagesComponent;
  headerComponent: HeaderComponent;
};

export const test = base.extend<PagesFixtures>({
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

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  articlePreviewComponent: async ({ page }, use) => {
    await use(new ArticlePreviewComponent(page));
  },

  errorMessagesComponent: async ({ page }, use) => {
    await use(new ErrorMessagesComponent(page));
  },

  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});
