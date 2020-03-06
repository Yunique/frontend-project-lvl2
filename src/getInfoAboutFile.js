import fs from 'fs';
import path from 'path';

export default (pathToFile) => {
  const extension = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return { extension, data };
};
