import _ from 'lodash';
import fs from 'fs';

const getFile = (path) => fs.readFileSync(path);

const fileToObj = (file) => JSON.parse(file);

const compareObjects = (firstColl, secondColl) => _.reduce(
  firstColl, (result, value, key) => {
    if (_.has(secondColl, key)) {
      return (value === secondColl[key])
        ? [...result, `${key}: ${value}`]
        : [...result, `+ ${key}: ${value}`, `+ ${key}: ${secondColl[key]}`];
    }
    return [...result, `- ${key}: ${value}`];
  }, [],
);

const getDifference = (path1, path2) => {
  const comparsion = compareObjects(fileToObj(getFile(path1)), fileToObj(getFile(path2)));
  return comparsion.join('\n');
};

export default getDifference;
