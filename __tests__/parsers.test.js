import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import * as path from 'path';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('basic functionality', () => {
  const file1 = readFileSync(getFixturePath('yaml/yaml1.yml'));
  const file2 = readFileSync(getFixturePath('yaml/yaml2_2.yaml'));
  const file3 = readFileSync(getFixturePath('test1.json'));
  const file4 = readFileSync(getFixturePath('test12.json'));

  expect(parse(file1, '.yml')).toEqual({ test: 1, test2: 2 });
  expect(parse(file2, '.yaml')).toEqual({ test: 12, test2: 2, test3: 3 });
  expect(parse(file3, '.json')).toEqual({ host: 'hexlet.io' });
  expect(parse(file4, '.json')).toEqual({ n: 'n', a: 'c', e: 'f' });
});
