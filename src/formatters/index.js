import getOperandedOutput from './operanded';
import getPlainOutput from './plain';
import getJSONOutput from './json';

const choseFormatter = (ast, format) => {
  switch (format) {
    case ('Plain'):
      return getPlainOutput(ast);
    case ('JSON'):
      return getJSONOutput(ast);
    case ('Operanded'):
      return getOperandedOutput(ast);
    default:
      throw new Error('wrong format');
  }
};
export default choseFormatter;
