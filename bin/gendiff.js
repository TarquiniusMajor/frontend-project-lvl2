#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<file1> <file2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2) => console.log(genDiff(file1, file2, program.opts().format)));
program.parse(process.argv);
