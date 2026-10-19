export const passwords = {
  validPass: 'qwerty12345',
  invalidPass: 'qwerty12345invalid',
};

export const paths = {
  articlesPage: '/articles',
  registerPage: '/register',
  loginPage: '/login',
  feedbackPage: '/articles/contact',
};

export const registeredUser = {
  email: 'olena@example.com',
  password: 'password',
};

export const articlesData = {
  description: 'This is description',
  text: 'This is text',
};

export const subjects = [
  'Загальне питання',
  'Повідомити про ваду',
  'Пропозиція функції',
  'Проблема з акаунтом',
];
export const priorities = ['Низький', 'Середній', 'Високий'];

export const errors = {
  nameError: "name обов'язкове поле",
  emailError: 'email некоректний email',
  messageError: "message обов'язкове поле",
};

export const screenshot = {
  name: 'screenshot.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  ),
};
