import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('extractLinks', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('before.json');

  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`;

  const comparsion = gendiff(before, after);

  expect(comparsion).toEqual(result);
});
