import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex Value]';
  }
  return (_.isString(value) ? `${value.slice(0)}` : value);
};

const makePropertyPlain = (property, nodePath, getPlainOutput) => {
  const {
    type,
    nodeName,
    oldValue,
    newValue,
    children,
  } = property;

  const stringifiedNewValue = stringify(newValue);
  const stringifiedOldValue = stringify(oldValue);
  const newNodePath = _.isEmpty(nodePath) ? nodeName : `${nodePath}.${nodeName}`;

  switch (type) {
    case 'parent':
      return getPlainOutput(children, newNodePath);
    case 'added':
      return `Property ${newNodePath} was added with value: ${stringifiedNewValue}`;
    case 'changed':
      return `Property ${newNodePath} was changed from ${stringifiedOldValue} to ${stringifiedNewValue}`;
    case 'deleted':
      return `Property ${newNodePath} was deleted`;
    case 'unchanged':
      return null;
    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

const getPlainOutput = (ast, nodePath = '') => {
  const mapped = ast.map((property) => makePropertyPlain(property, nodePath, getPlainOutput));
  const filtered = mapped.filter((property) => property);
  const result = filtered.join('\n');
  return result;
};

export default getPlainOutput;
