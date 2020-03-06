import ini from 'ini';
import yaml from 'js-yaml';

export default (fileinfo) => {
  const { extension, data } = fileinfo;
  switch (extension) {
    case ('.json'):
      return JSON.parse(data);
    case ('.yml' || '.yaml'):
      return yaml.safeLoad(data);
    case ('.ini'):
      return ini.parse(data);
    default:
      throw new Error(`Unknown extension: '${extension}'!`);
  }
};
