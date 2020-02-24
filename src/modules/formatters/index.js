import getTreeOutput from './default';
import getPlainOutput from './plain';

const choseFormatter = (ast, format) => {
  switch (format) {
    case ('plain'):
      return getPlainOutput(ast);
    default:
      return getTreeOutput(ast);
  }
};
export default choseFormatter;
