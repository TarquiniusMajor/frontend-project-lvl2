import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index';
import stylishObj from '../__fixtures__/formated/stylishFixture.js';
import plainObj from '../__fixtures__/formated/plainFixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('basic test', () => {
  const res = stylishObj;
  expect(genDiff(getFixturePath('/objFixtures/file1.json'), getFixturePath('/objFixtures/file2.json'))).toEqual(res);
  expect(genDiff(getFixturePath('/objFixtures/file1.yaml'), getFixturePath('/objFixtures/file2.yml'))).toEqual(res);
});
test('json formatter test', () => {
  const res = stylishObj;
  expect(genDiff(getFixturePath('/objFixtures/file1.json'), getFixturePath('/objFixtures/file2.json'), 'stylish')).toEqual(res);
  expect(genDiff(getFixturePath('/objFixtures/file1.yaml'), getFixturePath('/objFixtures/file2.yml'), 'stylish')).toEqual(res);
});
test('plain formatter test', () => {
  const res = plainObj;
  expect(genDiff(getFixturePath('/objFixtures/file1.json'), getFixturePath('/objFixtures/file2.json'), 'plain')).toEqual(res);
  expect(genDiff(getFixturePath('/objFixtures/file1.yaml'), getFixturePath('/objFixtures/file2.yml'), 'plain')).toEqual(res);
});
test('json formatter test', () => {
  const res = JSON.stringify(JSON.parse(readFileSync(getFixturePath('/formated/JSONObj.json'))));
  expect(genDiff(getFixturePath('/objFixtures/file1.json'), getFixturePath('/objFixtures/file2.json'), 'json')).toEqual(res);
  expect(genDiff(getFixturePath('/objFixtures/file1.yaml'), getFixturePath('/objFixtures/file2.yml'), 'json')).toEqual(res);
});
