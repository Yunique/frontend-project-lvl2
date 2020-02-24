import choseFormatter from './modules/formatters';
import makeAST from './modules/makeAST';
import parser from './modules/parsers';

export default (path1, path2, format) => {
  const ast = makeAST(parser(path1), parser(path2));
  return choseFormatter(ast, format);
};
