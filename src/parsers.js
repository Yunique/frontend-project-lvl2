import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const makeNumberValueUncaged = (value) => {
  if (_.isObject(value)) return _.mapValues(value, makeNumberValueUncaged);
  return (Number(value) && _.isString(value))
    ? Number(value)
    : value;
};

const getParsedObj = (extension, data) => {
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

export default (dataAndExtension) => {
  const { extension, data } = dataAndExtension;
  const parsedObj = getParsedObj(extension, data);
  const objWithUncagedNumbers = _.mapValues(parsedObj, makeNumberValueUncaged);
  return objWithUncagedNumbers;
};
