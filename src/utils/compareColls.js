import _ from 'lodash';

const makeElem = (key, value, cond = ' ') => ({ key, value, cond });

const getType = (key, firstColl, secondColl) => {
  if (!_.has(firstColl, key)) {
    return makeElem(key, secondColl[key], '+');
  }
  if (_.has(secondColl, key)) {
    return (firstColl[key] === secondColl[key])
      ? makeElem(key, secondColl[key], ' ')
      : [makeElem(key, firstColl[key], '-'), makeElem(key, secondColl[key], '+')];
  }
  return makeElem(key, firstColl[key], '-');
};

const genDiff = (firstColl, secondColl) => {
  const keys = _.uniq([..._.keys(firstColl), ..._.keys(secondColl)]);

  return _.reduce(
    keys, (acc, key) => {
      if (_.isObject(firstColl[key]) && _.isObject(secondColl[key])) {
        return [...acc, makeElem(key, genDiff(firstColl[key], secondColl[key])), ' '];
      }
      if (_.isObject(secondColl[key])) {
        return (_.has(firstColl, key))
          ? [...acc, makeElem(key, firstColl[key], '-'), makeElem(key, secondColl[key], '+')]
          : [...acc, makeElem(key, secondColl[key], '+')];
      }
      if (_.isObject(firstColl[key])) {
        return (_.has(secondColl, key))
          ? [...acc, makeElem(key, firstColl[key], '-'), makeElem(key, secondColl[key], '+')]
          : [...acc, makeElem(key, firstColl[key], '-')];
      }

      return [...acc, getType(key, firstColl, secondColl)];
    }, [],
  );
};

export default genDiff;
