import _ from 'lodash';
import fs from 'fs';

const getFile = (path) => fs.readFileSync(path);

const fileToObj = (file) => JSON.parse(file);

const compareColls = (firstColl, secondColl) => {
  const keys = _.uniq([..._.keys(firstColl), ..._.keys(secondColl)]);
  return _.reduce(
    keys, (result, key) => {
      if (!_.has(firstColl, key)) {
        return [...result, `  + ${key}: ${secondColl[key]}`];
      }
      if (_.has(secondColl, key)) {
        return (firstColl[key] === secondColl[key])
          ? [...result, `    ${key}: ${secondColl[key]}`]
          : [...result, `  + ${key}: ${firstColl[key]}`, `  + ${key}: ${secondColl[key]}`];
      }
      return [...result, `  - ${key}: ${firstColl[key]}`];
    }, [],
  );
};
const getDifference = (path1, path2) => {
  const comparsion = compareColls(fileToObj(getFile(path1)), fileToObj(getFile(path2)));
  return comparsion.join('\n');
};

export default getDifference;
