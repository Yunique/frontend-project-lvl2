import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const prepareTestData = (format) => {
  const beforeFilePath = path.join(__dirname, `/__fixtures__/beforeMulti.${format}`);
  const afterFilePath = path.join(__dirname, `/__fixtures__/afterMulti.${format}`);
  const resultFilePath = path.join(__dirname, '/__fixtures__/genDiffResultMulti');
  return { beforeFilePath, afterFilePath, resultFilePath };
};

const formats = ['json', 'yml', 'ini'];

test.each(formats)(
  'gendiff multilevel %s files',
  (format) => {
    const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(format);
    expect(genDiff(beforeFilePath, afterFilePath))
      .toBe(fs.readFileSync(resultFilePath, 'utf8'));
  },
);
