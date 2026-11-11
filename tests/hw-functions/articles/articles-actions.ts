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
    paginationPage: (pageNumber: number) =>
      page.getByTestId(`pagination-page-${pageNumber}`),
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

export async function getAllTitlesOnAllPages(page: Page) {
  const { articleTitles, paginationPage } = getLocators(page);
  await expect(articleTitles().first()).toBeVisible();
  const allTitles = await getAllTitles(page);

  for (
    let pageNumber = 2;
    (await paginationPage(pageNumber).count()) > 0;
    pageNumber++
  ) {
    const previousFirstTitle = await articleTitles().first().textContent();
    await paginationPage(pageNumber).click();
    await expect(paginationPage(pageNumber)).toHaveAttribute(
      'aria-current',
      'true',
    );
    await expect(articleTitles().first()).not.toHaveText(
      previousFirstTitle ?? '',
    );
    allTitles.push(...(await getAllTitles(page)));
  }

  return allTitles;
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
