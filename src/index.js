import fs from 'fs';
import path from 'path';
import formatAST from './formatters';
import makeAST from './makeAST';
import parse from './parsers';

const getInfo = (pathToFile) => {
  const type = path.extname(pathToFile).slice(1);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return { type, data };
};

export default (path1, path2, format) => {
  const firstConfigInfo = getInfo(path1);
  const secondConfigInfo = getInfo(path2);
  const ast = makeAST(parse(firstConfigInfo), parse(secondConfigInfo));
  return formatAST(ast, format);
};
