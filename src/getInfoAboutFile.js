import fs from 'fs';
import path from 'path';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return { format, data };
};
