import parser from './utils/parsers';
import compareColls from './utils/compareColls';

const getDifference = (path1, path2) => {
  const comparsion = compareColls(parser(path1), parser(path2));
  const mapped = comparsion.map(([key, [value, cond]]) => `  ${cond} ${key}: ${value}`);
  const result = `{\n${mapped.join('\n')}\n}`;
  return result;
};

export default getDifference;
