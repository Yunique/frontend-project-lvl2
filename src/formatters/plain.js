/* eslint-disable object-curly-newline */
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex Value]';
  }
  return (_.isString(value) ? `${value.slice(0)}` : value);
};

const iter = (item, nodePath, acc) => {
  const { type, nodeName, oldValue, newValue, children } = item;

  const stringifiedNewValue = stringify(newValue);
  const stringifiedOldValue = stringify(oldValue);
  const newNodePath = _.isEmpty(nodePath) ? nodeName : `${nodePath}.${nodeName}`;

  switch (type) {
    case 'parent':
      return [...acc,
        ...children.reduce((subAcc, subItem) => iter(subItem, newNodePath, subAcc), [])];
    case 'added':
      return [...acc, `Property ${newNodePath} was added with value: ${stringifiedNewValue}`];
    case 'changed':
      return [...acc, `Property ${newNodePath} was changed from ${stringifiedOldValue} to ${stringifiedNewValue}`];
    case 'deleted':
      return [...acc, `Property ${newNodePath} was deleted`];
    case 'unchanged':
      return acc;
    default:
      throw new Error('Wrong type');
  }
};

const getTreeOutput = (ast) => {
  const reduced = ast.reduce((acc, item) => iter(item, '', acc), []);
  const result = reduced.join('\n');
  return result;
};

export default getTreeOutput;
