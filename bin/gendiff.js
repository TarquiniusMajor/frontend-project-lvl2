import { Command } from 'commander/esm.mjs';
import * as path from 'path';
import _ from 'lodash';
import { readFileSync } from 'fs';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const getPath = (filepath) => {
      const curPath = path.isAbsolute(filepath) ? filepath : path.resolve(filepath);
      return curPath;
    };
    const getObj = (filepath) => JSON.parse(readFileSync(getPath(filepath)));
    const obj1 = getObj(filepath1);
    const obj2 = getObj(filepath2);
    const resKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();
    const res = resKeys
      .reduce((acc, value) => {
        if (obj1[value] === obj2[value]) { return [...acc, [' ', value, obj1[value]]]; }
        if (obj1[value] === undefined) { return [...acc, ['+', value, obj2[value]]]; }
        if (obj2[value] === undefined) { return [...acc, ['-', value, obj1[value]]]; }
        return [...acc, ['-', value, obj1[value]], ['+', value, obj2[value]]];
      }, []).map((value) => `${value[0]} ${value[1]}: ${value[2]}`)
      .join('\n ');
    console.log(`{\n ${res}\n}`);
    return `{\n ${res}\n}`;
  })
  .option('-f, --format [type]', 'output format');
program.parse(process.argv);
