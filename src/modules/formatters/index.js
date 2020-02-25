import getTreeOutput from './default';
import getPlainOutput from './plain';
import getJSONOutput from './json';

const choseFormatter = (ast, format) => {
  switch (format) {
    case ('plain'):
      return getPlainOutput(ast);
    case ('JSON'):
      return getJSONOutput(ast);
    default:
      return getTreeOutput(ast);
  }
};
export default choseFormatter;
