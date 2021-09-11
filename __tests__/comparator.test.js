import { expect, test } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import comparator from '../src/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('basic functionality, json', () => {
  const filepath1 = getFixturePath('/objFixtures/file1.json');
  const filepath2 = getFixturePath('/objFixtures/file2.json');
  const file1 = fs.readFileSync(filepath1);
  const file2 = fs.readFileSync(filepath2);

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const resObj = JSON.parse(fs.readFileSync(getFixturePath('/compared/objFixture.json')));
  expect(comparator(obj1, obj2)).toEqual(resObj);
});
