import parser from './utils/parsers';
import compareColls from './utils/compareColls';

const getDifference = (path1, path2) => {
  const comparsion = compareColls(parser(path1), parser(path2)).join('\n');
  const result = `{\n${comparsion}\n}`;
  return result;
};

export default getDifference;
