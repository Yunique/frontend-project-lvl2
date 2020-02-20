import _ from 'lodash';
import parser from './modules/parsers';
import makeAST from './modules/makeAST';
import makeIndent from './utils/makeIndent'

const stringify = (value, indentValue, acc = []) => {
  if (_.isObject(value)) {
    return {
      _.reduce(value, (subAcc, val, key) => (
      [...subAcc, '{', `${' '.repeat(indentValue + 2)}  ${key}: ${stringify(val, indentValue, subAcc)}`, `${' '.repeat(indentValue)}}`]
    ), acc).join('\n')
      };
  }
  return (_.isString(value) ? `${value.slice(0)}` : value);
};

const iter = (item, indentValue, acc) => {
  const indent = makeIndent(indentValue);

  const stringifiedNewValue = stringify(newValue, indentValue);
  const stringifiedOldValue = stringify(oldValue, indentValue);

  switch (type) {
    case 'added':
      return [...acc, `${indent}+ ${nodeName}: ${stringifiedNewValue}`];
    case 'parent':
      return [...acc, `${indent}  ${nodeName}: {`,
        children.reduce((subAcc, subItem) => iter(subItem, indentValue + 2, subAcc), []).join('\n'),
        `${indent}  }`];
    case 'changed':
      return [...acc, `${indent}- ${nodeName}: ${stringifiedOldValue}`,
        `${indent}+ ${nodeName}: ${stringifiedNewValue}`];
    case 'unchanged':
      return [...acc, `${indent}  ${nodeName}: ${stringifiedOldValue}`];
    default:
      return [...acc, `${indent}- ${nodeName}: ${stringifiedOldValue}`];
  }
};

const getDifference = (path1, path2) => {
  const ast = makeAST(parser(path1), parser(path2));
  console.log(ast);
  const indentNum = 4;
  const reduced = ast.reduce((acc, item) => iter(item, indentNum, acc), []);
  const result = `{\n${reduced.join('\n')}\n}`;
  return result;
};

export default getDifference;
