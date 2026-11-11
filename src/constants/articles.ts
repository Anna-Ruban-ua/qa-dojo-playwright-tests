import {
  articleTitle,
  articleDescription,
  articleBody,
  articleDate,
  authorUsername,
} from '../utils/articleDataGenerator';
import { avatarUrl } from '../utils/userDataGenerator';

export const articleData = {
  description: 'This is description',
  body: 'This is text',
};

export const search = {
  noMatchQuery: 'zzzxqq',
  noArticlesCounter: '0 articles',
  emptyStateText: 'No articles here yet.',
};

export const mockArticle = () => {
  const date = articleDate();

  return {
    slug: 'playwright-route-mock',
    title: articleTitle(),
    description: articleDescription(),
    body: articleBody(),
    tagList: ['playwright', 'mocks'],
    category: 'general',
    visibility: 'public',
    allowComments: true,
    cover: '',
    createdAt: date,
    updatedAt: date,
    favorited: false,
    favoritesCount: 7,
    author: {
      username: authorUsername(),
      bio: '',
      image: avatarUrl,
      following: false,
    },
  };
};
