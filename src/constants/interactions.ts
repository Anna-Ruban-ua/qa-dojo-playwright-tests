export const interactions = {
  defaultOrder: [
    'Авторизація',
    'Завантаження файлу',
    'Пошук за тегом',
    'Створення статті',
  ],
  byStatus: {
    titles: [
      'Створення статті',
      'Авторизація',
      'Пошук за тегом',
      'Завантаження файлу',
    ],
    statuses: ['Failed', 'Passed', 'Passed', 'Skipped'],
  },
  byDurationAsc: {
    titles: [
      'Завантаження файлу',
      'Пошук за тегом',
      'Авторизація',
      'Створення статті',
    ],
    durations: ['0.0 s', '5.7 s', '8.4 s', '12.1 s'],
  },
  byDurationDesc: {
    titles: [
      'Створення статті',
      'Авторизація',
      'Пошук за тегом',
      'Завантаження файлу',
    ],
    durations: ['12.1 s', '8.4 s', '5.7 s', '0.0 s'],
  },
};

export const selectedCounter = (count: number) => `Вибрано: ${count}`;
