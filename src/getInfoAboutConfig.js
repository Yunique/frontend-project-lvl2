import fs from 'fs';
import path from 'path';

export default (pathToFile) => {
  const type = path.extname(pathToFile).slice(1);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return { type, data };
};
