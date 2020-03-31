import formatAST from './formatters';
import makeAST from './makeAST';
import parse from './parsers';
import getInfo from './getInfoAboutFile';

export default (path1, path2, format) => {
  const firstDataAndExtension = getInfo(path1);
  const secondDataEndExtension = getInfo(path2);
  const ast = makeAST(parse(firstDataAndExtension), parse(secondDataEndExtension));
  return formatAST(ast, format);
};
