import _ from 'lodash';

const config = {
  added: 'added',
  changed: 'changed',
  unchanged: 'unchanged',
  deleted: 'deleted',
  parent: 'parent',
};

const nodeFuncs = [
  {
    check: ({ key, firstColl, secondColl }) => (
      _.isObject(firstColl[key]) && _.isObject(secondColl[key])),
    makeNode: ({
      key,
      firstColl,
      secondColl,
      makeAST,
    }) => ({
      type: config.parent,
      nodeName: key,
      children: makeAST(firstColl[key], secondColl[key]),
    }),
  },
  {
    check: ({ key, firstColl }) => (!_.has(firstColl, key)),
    makeNode: ({ key, secondColl }) => ({
      type: config.added,
      nodeName: key,
      newValue: secondColl[key],
    }),
  },
  {
    check: ({ key, firstColl, secondColl }) => (
      (_.has(secondColl, key)) && (firstColl[key] !== secondColl[key])),
    makeNode: ({ key, firstColl, secondColl }) => ({
      type: config.changed,
      nodeName: key,
      oldValue: firstColl[key],
      newValue: secondColl[key],
    }),
  },
  {
    check: ({ key, firstColl, secondColl }) => (
      (_.has(secondColl, key)) && (firstColl[key] === secondColl[key])),
    makeNode: ({ key, secondColl }) => ({
      type: config.unchanged,
      nodeName: key,
      oldValue: secondColl[key],
    }),
  },
  {
    check: ({ key, secondColl }) => (!_.has(secondColl, key)),
    makeNode: ({ key, firstColl }) => ({
      type: config.deleted,
      nodeName: key,
      oldValue: firstColl[key],
    }),
  },
];

const getType = (element) => _.find(nodeFuncs, ({ check }) => check(element));

const makeAST = (firstColl, secondColl) => {
  const firstCollKeys = _.keys(firstColl);
  const secondCollKeys = _.keys(secondColl);
  const collsUnion = _.union(firstCollKeys, secondCollKeys);

  return collsUnion.map(
    (key) => {
      const args = {
        key,
        firstColl,
        secondColl,
        makeAST,
      };
      const type = getType(args);
      const node = type.makeNode(args);
      return node;
    },
  );
};

export default makeAST;
