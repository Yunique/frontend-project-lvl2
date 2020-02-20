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
    keys, (acc, key) => {
      if (_.isObject(firstColl[key]) && _.isObject(secondColl[key])) {
        return [...acc, {
          type: config.parent,
          nodeName: key,
          children: makeAST(firstColl[key], secondColl[key]),
        }];
      }
      if (!_.has(firstColl, key)) {
        return [...acc, {
          type: config.added,
          nodeName: key,
          newValue: secondColl[key],
        }];
      }
      if ((_.has(secondColl, key)) && (firstColl[key] === secondColl[key])) {
        return [...acc, {
          type: config.unchanged,
          nodeName: key,
          oldValue: secondColl[key],
        }];
      }
      if ((_.has(secondColl, key)) && (firstColl[key] !== secondColl[key])) {
        return [...acc, {
          type: config.changed,
          nodeName: key,
          oldValue: firstColl[key],
          newValue: secondColl[key],
        }];
      }
      return [...acc, {
        type: config.deleted,
        nodeName: key,
        oldValue: firstColl[key],
      }];
    }, [],
  );
};

export default makeAST;
