import { expect } from '@playwright/test';
import { test as pagesTest } from './pagesFixtures';
import {
  UserController,
  UserResponse,
} from '../../src/controllers/UserController';
import { newUserData } from '../../src/utils/userDataGenerator';
import { createLocalStorage } from '../../src/utils/storageState';

type Fixtures = {
  userController: UserController;
  userToLogin: { email: string; password: string } | null;
  uiLogin: void;
  user: UserResponse['user'];
  apiLogin: void;
};

const test = pagesTest.extend<Fixtures>({
  userController: async ({ request }, use) => {
    await use(new UserController(request));
  },

  userToLogin: [null, { option: true }],

  user: async ({ userController }, use) => {
    const userData = newUserData();
    const { user } = await userController.createUser({ user: userData });

    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.token).toEqual(expect.any(String));
    expect(user.token).not.toHaveLength(0);

    await use(user);
  },

  uiLogin: async ({ loginPage, headerComponent, userToLogin }, use) => {
    if (userToLogin) {
      await loginPage.open();
      await loginPage.login(userToLogin);
      await expect(headerComponent.locators.profileButton).toBeVisible();
    }
    await use();
  },

  apiLogin: async ({ context, baseURL, user }, use) => {
    await context.setStorageState(createLocalStorage(baseURL!, user.token));
    await use();
  },
});

export { test, expect };
