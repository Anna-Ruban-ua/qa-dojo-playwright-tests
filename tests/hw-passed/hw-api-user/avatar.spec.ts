import { test, expect } from '../../fixtures/fixtures';
import { paths } from '../../../src/constants/paths';
import { avatarUrl } from '../../../src/utils/userDataGenerator';

test.skip('Change avatar by new user', async ({
  apiLogin,
  user,
  page,
  settingsPage,
  headerPage,
}) => {
  await settingsPage.open();
  await expect(settingsPage.locators.usernameInput).toHaveValue(user.username);
  await expect(settingsPage.locators.emailInput).toHaveValue(user.email);

  await settingsPage.setAvatar(avatarUrl);

  await expect(page).toHaveURL(`${paths.profile}/${user.username}`);
  await expect(headerPage.locators.profileAvatar).toHaveAttribute(
    'src',
    avatarUrl,
  );

  await settingsPage.open();

  await expect(settingsPage.locators.avatarUrlInput).toHaveValue(avatarUrl);
  await expect(settingsPage.locators.avatarImage).toHaveAttribute(
    'src',
    avatarUrl,
  );
});
