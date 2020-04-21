import _ from 'lodash';

const makeIndent = (indentValue) => ' '.repeat(indentValue);

const stringify = (value, indentValue) => {
  const stringifyObject = (obj, subIndentValue) => {
    const indent = makeIndent(subIndentValue);
    const mappedProperties = _.map(obj, (val, key) => (
      `${makeIndent(subIndentValue + 2)}  ${key}: ${stringify(val, subIndentValue + 2)}`));
    const stringifiedObject = ['{', ...mappedProperties, `${indent}}`];
    return stringifiedObject.join('\n');
  };

  if (_.isObject(value)) {
    return stringifyObject(value, indentValue + 2);
  }
  return (_.isString(value) ? `${value.slice(0)}` : value);
};

const makePropertyOperanded = (item, indentValue, turnASTToStrings) => {
  const indent = makeIndent(indentValue);
  const {
    type,
    nodeName,
    oldValue,
    newValue,
    children,
  } = item;
  const stringifiedNewValue = stringify(newValue, indentValue);
  const stringifiedOldValue = stringify(oldValue, indentValue);

  switch (type) {
    case 'parent':
      return [`${indent}  ${nodeName}: {`,
        turnASTToStrings(children, indentValue + 4),
        `${makeIndent(indentValue + 2)}}`];
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

const turnASTToStrings = (ast, indentValue = 2) => {
  const mapped = ast.map((item) => makePropertyOperanded(item, indentValue, turnASTToStrings));
  const flattened = _.flatten(mapped);
  return flattened.join('\n');
};

const getOperandedOutput = (ast) => {
  const stringifiedAST = turnASTToStrings(ast);
  return ['{', stringifiedAST, '}'].join('\n');
};

export default getOperandedOutput;
