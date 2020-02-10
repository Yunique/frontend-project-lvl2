import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('genDiffJSON', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  const comparsion = gendiff(before, after);

  expect(comparsion).toEqual(result);
});

test('genDiffYAML', () => {
  const before = getFixturePath('before.yml');
  const after = getFixturePath('after.yml');

  const comparsion = gendiff(before, after);

  expect(comparsion).toEqual(result);
});
