import _ from 'lodash';

const config = {
  added: 'added',
  changed: 'changed',
  unchanged: 'unchanged',
  deleted: 'deleted',
  parent: 'parent',
};

const makeAST = (firstColl, secondColl) => {
  const keys = _.uniq([..._.keys(firstColl), ..._.keys(secondColl)]);

  return _.reduce(
    keys, (acc, key) => [...acc, {
      type: config,
      nodeName: key,
      oldValue: firstColl[key],
      newValue: secondColl[key],
      children: ((_.isObject(firstColl[key]) && _.isObject(secondColl[key]))
        ? makeAST(firstColl[key], secondColl[key])
        : null),
    }], [],
  );
};

export default makeAST;
