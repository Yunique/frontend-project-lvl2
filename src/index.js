import formatAST from './formatters';
import makeAST from './makeAST';
import parse from './parsers';
import getInfo from './getInfoAboutConfig';

export default (path1, path2, format) => {
  const firstConfigInfo = getInfo(path1);
  const secondConfigInfo = getInfo(path2);
  const ast = makeAST(parse(firstConfigInfo), parse(secondConfigInfo));
  return formatAST(ast, format);
};
