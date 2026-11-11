import { faker } from '@faker-js/faker';

export const articleTitle = () =>
  `${faker.lorem.words(3)} ${Date.now().toString(36)}`;

export const articleDescription = () => faker.lorem.sentence();

export const articleBody = () => faker.lorem.sentence();

export const articleDate = () => faker.date.recent().toISOString();

export const authorUsername = () => faker.internet.username();
