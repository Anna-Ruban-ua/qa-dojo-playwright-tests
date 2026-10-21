import { expect, type Page } from '@playwright/test';
import { paths } from '../shared/paths';

export function getLocators(page: Page) {
  return {
    newArticleButton: () => page.getByTestId('nav-new-article'),
    titleInput: () => page.getByTestId('editor-title'),
    descriptionInput: () => page.getByTestId('editor-description'),
    bodyTextArea: () => page.getByTestId('editor-body'),
    publishButton: () => page.getByTestId('editor-submit'),
    articlePageContainer: () => page.getByTestId('article-page'),
    profileNav: () => page.getByTestId('nav-profile'),
    articleTitles: () => page.getByTestId('preview-title'),
    searchInput: () => page.getByTestId('home-search-input'),
    applyButton: () => page.getByTestId('home-filter-apply'),
    resetButton: () => page.getByTestId('home-filter-reset'),
    articlesCounter: () => page.getByTestId('feed-article-count'),
    emptyState: () => page.getByTestId('article-list-empty'),
  };
}

export async function createArticle(
  page: Page,
  title: string,
  description: string,
  body: string,
) {
  const {
    newArticleButton,
    titleInput,
    descriptionInput,
    bodyTextArea,
    publishButton,
    articlePageContainer,
  } = getLocators(page);
  await newArticleButton().click();
  await titleInput().fill(title);
  await descriptionInput().fill(description);
  await bodyTextArea().fill(body);
  await publishButton().click();
  await expect(articlePageContainer()).toBeVisible();
}

export async function openProfileFeed(page: Page) {
  const { profileNav, articleTitles } = getLocators(page);
  await profileNav().click();
  await expect(articleTitles().nth(9)).toBeVisible();
}

export async function getAllTitles(page: Page) {
  const { articleTitles } = getLocators(page);
  return articleTitles().allTextContents();
}

export async function openArticlesPage(page: Page) {
  const { searchInput, articlesCounter } = getLocators(page);
  await page.goto(paths.articlesPage);
  await expect(searchInput()).toBeVisible();
  await expect(articlesCounter()).toBeVisible();
}

export async function searchArticles(page: Page, query: string) {
  const { searchInput, applyButton } = getLocators(page);
  await searchInput().fill(query);
  await applyButton().click();
}
