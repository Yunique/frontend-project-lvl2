import choseFormatter from './formatters';
import makeAST from './makeAST';
import parse from './parsers';
import getInfo from './getInfoAboutFile';

export default (path1, path2, format) => {
  const firstFileInfo = getInfo(path1);
  const secondFileInfo = getInfo(path2);
  const ast = makeAST(parse(firstFileInfo), parse(secondFileInfo));
  return choseFormatter(ast, format);
};
