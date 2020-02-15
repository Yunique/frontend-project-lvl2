import _ from 'lodash';
import parser from './utils/parsers';
import compareColls from './utils/compareColls';


const stringify = (value) => `${value.slice(0)}`;

const getDifference = (path1, path2) => {
  const iter = (item, acc) => {
    if (_.isObject(item)) {
      return _.map(item, (subItem) => iter(subItem));
    }
    return stringify(item);
  };


  const comparsion = compareColls(parser(path1), parser(path2));
  console.log(comparsion);
  const mapped = comparsion.map(({keyj}) => `  ${cond} ${key}: ${value}`);
  const result = `{\n${mapped.join('\n')}\n}`;
  return result;
};

export default getDifference;
