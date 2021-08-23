import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { genDiff } from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('basic test', () => {
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.json')))
    .toEqual('{\n    host: hexlet.io\n}');
});
test('difference test', () => {
  expect(genDiff(getFixturePath('test12.json'), getFixturePath('test22.json')))
    .toEqual('{\n  - a: c\n  + a: b\n  + c: d\n  - e: f\n    n: n\n}');
});
test('difference test 2', () => {
  expect(genDiff(getFixturePath('test22.json'), getFixturePath('test12.json')))
    .toEqual('{\n  - a: b\n  + a: c\n  - c: d\n  + e: f\n    n: n\n}');
});
