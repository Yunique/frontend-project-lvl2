import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const prepareTestData = (extension, format) => {
  const beforeFilePath = path.join(__dirname, `/__fixtures__/beforeMulti.${extension}`);
  const afterFilePath = path.join(__dirname, `/__fixtures__/afterMulti.${extension}`);
  const resultFilePath = path.join(__dirname, `/__fixtures__/result${format}`);
  return { beforeFilePath, afterFilePath, resultFilePath };
};

const extensions = ['json', 'yml', 'ini'];

describe.each(extensions)(
  'generate difference between %s files',
  (extension) => {
    test('operanded output', () => {
      const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(extension, 'operanded');
      expect(genDiff(beforeFilePath, afterFilePath, 'operanded'))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });

    test('plain output', () => {
      const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(extension, 'plain');
      expect(genDiff(beforeFilePath, afterFilePath, 'plain'))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });

    test('JSON output', () => {
      const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(extension, 'JSON');
      expect(genDiff(beforeFilePath, afterFilePath, 'JSON'))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });
  },
);
