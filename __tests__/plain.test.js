import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import * as path from 'path';
import stylish from '../src/formaters/plain.js';
import stylishObj from '../__fixtures__/formated/plainFixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('basic functionality', () => {
  const testSample = readFileSync(getFixturePath('/compared/objFixture.json'));
  const result = stylishObj;
  expect(stylish(JSON.parse(testSample))).toEqual(result);
});