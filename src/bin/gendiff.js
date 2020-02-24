#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('[type] <firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, type) => (
    console.log(genDiff(firstConfig, secondConfig, type))))
  .parse(process.argv);
