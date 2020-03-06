import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const getTestDataPaths = (extension, format) => {
  const beforeFilePath = getFixturePath(`before.${extension}`);
  const afterFilePath = getFixturePath(`after.${extension}`);
  const resultFilePath = getFixturePath(`result${format}`);
  return { beforeFilePath, afterFilePath, resultFilePath };
};

const extensions = ['json', 'yml', 'ini'];
const formats = ['Operanded', 'Plain', 'JSON'];

describe.each(extensions)(
  'generate difference between %s files',
  (extension) => {
    test.each(formats)('%s output', (format) => {
      const { beforeFilePath, afterFilePath, resultFilePath } = getTestDataPaths(extension, format);
      expect(genDiff(beforeFilePath, afterFilePath, format))
        .toBe(fs.readFileSync(resultFilePath, 'utf8'));
    });
  },
);
