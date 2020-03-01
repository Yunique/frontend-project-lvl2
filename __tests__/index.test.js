import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getOriginalFilesPaths = (extension) => {
  const beforeFilePath = path.join(__dirname, `/__fixtures__/beforeMulti.${extension}`);
  const afterFilePath = path.join(__dirname, `/__fixtures__/afterMulti.${extension}`);
  return { beforeFilePath, afterFilePath };
};

const getResultFilePath = (format) => path.join(__dirname, `/__fixtures__/result${format}`);

const extensions = ['json', 'yml', 'ini'];

describe.each(extensions)(
  'generate difference between %s files',
  (extension) => {
    const { beforeFilePath, afterFilePath } = getOriginalFilesPaths(extension);

    test('operanded output', () => {
      const result = getResultFilePath('Operanded');
      expect(genDiff(beforeFilePath, afterFilePath, 'Operanded'))
        .toBe(fs.readFileSync(result, 'utf8'));
    });

    test('plain output', () => {
      const result = getResultFilePath('Plain');
      expect(genDiff(beforeFilePath, afterFilePath, 'Plain'))
        .toBe(fs.readFileSync(result, 'utf8'));
    });

    test('JSON output', () => {
      const result = getResultFilePath('JSON');
      expect(genDiff(beforeFilePath, afterFilePath, 'JSON'))
        .toBe(fs.readFileSync(result, 'utf8'));
    });
  },
);
