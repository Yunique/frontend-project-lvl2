import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getDifference', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  const result = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  const comparsion = gendiff(before, after);

  expect(comparsion).toEqual(result);
});
