import _ from 'lodash';

const makeIndent = (depth) => ' '.repeat(depth * 2);

const stringify = (value, depth) => {
  const stringifyObject = (obj, subDepth) => {
    const indent = makeIndent(subDepth);
    const mappedProperties = _.map(obj, (val, key) => (
      `${makeIndent(subDepth + 1)}  ${key}: ${stringify(val, subDepth + 1)}`));
    const stringifiedObject = ['{', ...mappedProperties, `${indent}}`];
    return stringifiedObject.join('\n');
  };

  if (_.isObject(value)) {
    return stringifyObject(value, depth + 1);
  }
  return (_.isString(value) ? `${value.slice(0)}` : value);
};

const makePropertyOperanded = (item, depth, turnASTToStrings) => {
  const indent = makeIndent(depth);
  const {
    type,
    nodeName,
    oldValue,
    newValue,
    children,
  } = item;
  const stringifiedNewValue = stringify(newValue, depth);
  const stringifiedOldValue = stringify(oldValue, depth);

  switch (type) {
    case 'parent':
      return [`${indent}  ${nodeName}: {`,
        turnASTToStrings(children, depth + 2),
        `${makeIndent(depth + 1)}}`];
    case 'added':
      return `${indent}+ ${nodeName}: ${stringifiedNewValue}`;
    case 'changed':
      return [`${indent}- ${nodeName}: ${stringifiedOldValue}`,
        `${indent}+ ${nodeName}: ${stringifiedNewValue}`];
    case 'unchanged':
      return `${indent}  ${nodeName}: ${stringifiedOldValue}`;
    case 'deleted':
      return `${indent}- ${nodeName}: ${stringifiedOldValue}`;
    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

const turnASTToStrings = (ast, depth = 1) => {
  const mapped = ast.map((item) => makePropertyOperanded(item, depth, turnASTToStrings));
  const flattened = _.flatten(mapped);
  return flattened.join('\n');
};

const getOperandedOutput = (ast) => {
  const stringifiedAST = turnASTToStrings(ast);
  return ['{', stringifiedAST, '}'].join('\n');
};

export default getOperandedOutput;
