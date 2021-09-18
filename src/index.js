import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import comparator from './comparator.js';
import formatter from './formaters/index.js';

const getPath = (filepath) => {
  const curPath = path.isAbsolute(filepath) ? filepath : path.resolve(filepath);
  return curPath;
};

export default (filepath1, filepath2, format) => {
  const file1 = readFileSync(getPath(filepath1));
  const file2 = readFileSync(getPath(filepath2));
  const obj1 = parse(file1, path.extname(filepath1));
  const obj2 = parse(file2, path.extname(filepath2));
  const diffObj = comparator(obj1, obj2);
  return formatter(diffObj, format);
};
