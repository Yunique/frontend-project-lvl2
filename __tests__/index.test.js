import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const resultFlatFilePath = path.join(__dirname, '/__fixtures__/genDiffResult');

const testDataFlat = [
  [
    'json',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/before.json'),
      afterFilePath: path.join(__dirname, '/__fixtures__/after.json'),
    },
  ],
  [
    'YAML',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/before.yml'),
      afterFilePath: path.join(__dirname, '/__fixtures__/after.yml'),
    },
  ],
  [
    'ini',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/before.ini'),
      afterFilePath: path.join(__dirname, '/__fixtures__/after.ini'),
    },
  ],
];

const resultMultilevelFilePath = path.join(__dirname, '/__fixtures__/genDiffResultMulti');

const testDataMultilevel = [
  [
    'json',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/beforeMulti.json'),
      afterFilePath: path.join(__dirname, '/__fixtures__/afterMulti.json'),
    },
  ],
  [
    'YAML',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/beforeMulti.yml'),
      afterFilePath: path.join(__dirname, '/__fixtures__/afterMulti.yml'),
    },
  ],
  [
    'ini',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/beforeMulti.ini'),
      afterFilePath: path.join(__dirname, '/__fixtures__/afterMulti.ini'),
    },
  ],
];

test.each(testDataFlat)(
  'gendiff flat %s files',
  (format, { beforeFilePath, afterFilePath }) => {
    expect(genDiff(beforeFilePath, afterFilePath))
      .toBe(fs.readFileSync(resultFlatFilePath, 'utf8'));
  },
);

test.each(testDataMultilevel)(
  'gendiff multilevel %s files',
  (format, { beforeFilePath, afterFilePath }) => {
    expect(genDiff(beforeFilePath, afterFilePath))
      .toBe(fs.readFileSync(resultMultilevelFilePath, 'utf8'));
  },
);
