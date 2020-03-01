import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getTestDataPaths = (extension, format) => {
  const beforeFilePath = path.join(__dirname, '/__fixtures__/', `before.${extension}`);
  const afterFilePath = path.join(__dirname, '/__fixtures__/', `after.${extension}`);
  const resultFilePath = path.join(__dirname, '/__fixtures__/', `result${format}`);
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
