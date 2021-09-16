import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { genDiff } from '../src/index';
import stylishObj from '../__fixtures__/formated/stylishFixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('basic test', () => {
  const res = stylishObj;
  expect(genDiff(getFixturePath('/objFixtures/file1.json'), getFixturePath('/objFixtures/file2.json'))).toEqual(res);
  expect(genDiff(getFixturePath('/objFixtures/file1.yaml'), getFixturePath('/objFixtures/file2.yml'))).toEqual(res);
});
