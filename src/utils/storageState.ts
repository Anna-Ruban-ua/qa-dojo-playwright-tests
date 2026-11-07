export function createLocalStorage(baseUrl: string, token: string) {
  return {
    cookies: [],
    origins: [
      {
        origin: new URL(baseUrl).origin,
        localStorage: [{ name: 'qa-dojo.token', value: token }],
      },
    ],
  };
}
