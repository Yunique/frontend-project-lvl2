import _ from 'lodash';

export default (firstColl, secondColl) => {
  const keys = _.uniq([..._.keys(firstColl), ..._.keys(secondColl)]);
  return _.reduce(
    keys, (result, key) => {
      if (!_.has(firstColl, key)) {
        return [...result, `  + ${key}: ${secondColl[key]}`];
      }
      if (_.has(secondColl, key)) {
        return (firstColl[key] === secondColl[key])
          ? [...result, `    ${key}: ${secondColl[key]}`]
          : [...result, `  - ${key}: ${firstColl[key]}`, `  + ${key}: ${secondColl[key]}`];
      }
      return [...result, `  - ${key}: ${firstColl[key]}`];
    }, [],
  );
};
