#!/usr/bin/env node.

const program = require('commander');

program
    .version('0.0.1', '-v, --vers', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
    .option('-h, --help', 'output usage information')