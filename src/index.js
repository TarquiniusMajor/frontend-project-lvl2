import * as path from 'path';
import _ from 'lodash';
import { readFileSync } from 'fs';

const getPath = (filepath) => {
  const curPath = path.isAbsolute(filepath) ? filepath : path.resolve(filepath);
  return curPath;
};
const getObj = (filepath) => JSON.parse(readFileSync(getPath(filepath)));
const genDiff = (file1, file2) => {
  const obj1 = getObj(file1);
  const obj2 = getObj(file2);
  const resKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const res = resKeys
    .reduce((acc, value) => {
      if (obj1[value] === obj2[value]) { return [...acc, [' ', value, obj1[value]]]; }
      if (obj1[value] === undefined) { return [...acc, ['+', value, obj2[value]]]; }
      if (obj2[value] === undefined) { return [...acc, ['-', value, obj1[value]]]; }
      return [...acc, ['-', value, obj1[value]], ['+', value, obj2[value]]];
    }, []).map((value) => `  ${value[0]} ${value[1]}: ${value[2]}`)
    .join('\n');
  return `{\n${res}\n}`;
};

export { getPath, getObj, genDiff };
