export const validUsername = () => `student-${Date.now()}-${Math.random()}`;

export const uniqueEmail = () =>
  `student-${Date.now()}-${Math.random()}@example.com`;

export const passwords = {
  validPass: 'qwerty12345',
  invalidPass: 'qwerty12345invalid',
};
