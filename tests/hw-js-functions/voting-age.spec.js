import { test, expect } from '@playwright/test';

const errors = {
  notNumber: 'Введіть число.',
  lessThan0: 'Вік має бути більше 0',
  lessThan18: 'Ви ще не можете голосувати.',
  tooOld: 'Застарий, щоб голосувати, дорогу молоді!',
};

const successMessage = 'Ви можете голосувати.';

function isVotingAge(age) {
  if (typeof age === 'number') {
    if (age > 0) {
      if (age < 18) {
        return errors.lessThan18;
      } else if (age >= 18 && age < 150) {
        return successMessage;
      } else {
        return errors.tooOld;
      }
    }
    return errors.lessThan0;
  }
  return errors.notNumber;
}

test(`Text value returns ERROR: ${errors.notNumber}`, () => {
  expect(isVotingAge('Anna')).toBe(errors.notNumber);
});

test(`Space returns ERROR: ${errors.notNumber}`, () => {
  expect(isVotingAge(' ')).toBe(errors.notNumber);
});

test(`Empty string returns ERROR: ${errors.notNumber}`, () => {
  expect(isVotingAge('')).toBe(errors.notNumber);
});

test(`Boolean value returns ERROR: ${errors.notNumber}`, () => {
  expect(isVotingAge(true)).toBe(errors.notNumber);
});

test(`Negative number returns ERROR: ${errors.lessThan0}`, () => {
  expect(isVotingAge(-1)).toBe(errors.lessThan0);
});

test(`Zero number returns ERROR: ${errors.lessThan0}`, () => {
  expect(isVotingAge(0)).toBe(errors.lessThan0);
});

test(`Age 0.1 returns ERROR: ${errors.lessThan18}`, () => {
  expect(isVotingAge(0.1)).toBe(errors.lessThan18);
});

test(`Age 17 returns ERROR: ${errors.lessThan18}`, () => {
  expect(isVotingAge(17)).toBe(errors.lessThan18);
});

test(`Age 17.9 returns ERROR: ${errors.lessThan18}`, () => {
  expect(isVotingAge(17.9)).toBe(errors.lessThan18);
});

test(`Age 18 returns SUCCESS: ${successMessage}`, () => {
  expect(isVotingAge(18)).toBe(successMessage);
});

test(`Age 19 returns SUCCESS: ${successMessage}`, () => {
  expect(isVotingAge(19)).toBe(successMessage);
});

test(`Age 149 returns SUCCESS: ${successMessage}`, () => {
  expect(isVotingAge(149)).toBe(successMessage);
});

test(`Age 149.9 returns SUCCESS: ${successMessage}`, () => {
  expect(isVotingAge(149.9)).toBe(successMessage);
});

test(`Age 150 returns SUCCESS: ${errors.tooOld}`, () => {
  expect(isVotingAge(150)).toBe(errors.tooOld);
});

test(`Age 300 returns SUCCESS: ${errors.tooOld}`, () => {
  expect(isVotingAge(300)).toBe(errors.tooOld);
});
