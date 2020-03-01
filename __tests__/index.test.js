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
      const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(extension, 'Operanded');
      expect(genDiff(beforeFilePath, afterFilePath, 'Operanded'))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });

    test('plain output', () => {
      const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(extension, 'Plain');
      expect(genDiff(beforeFilePath, afterFilePath, 'Plain'))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });

    test('JSON output', () => {
      const { beforeFilePath, afterFilePath, resultFilePath } = prepareTestData(extension, 'JSON');
      expect(genDiff(beforeFilePath, afterFilePath, 'JSON'))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });
  },
);
