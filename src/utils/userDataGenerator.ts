import { faker } from '@faker-js/faker';
import { passwords } from '../constants/userData';

export const newUserData = () => {
  const suffix = `${Date.now()}${faker.string.alphanumeric(4)}`;
  return {
    username: `${faker.person.firstName()}-${suffix}`,
    email: `student-${suffix}@example.com`,
    password: passwords.valid,
  };
};

export const feedbackData = () => ({
  name: faker.person.firstName(),
  email: faker.internet.email({ provider: 'example.com' }),
  message: faker.lorem.sentence(),
});

export const avatarUrl = faker.image.avatar();
