import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const makeNumberValueUncaged = (value) => {
  if (_.isObject(value)) return _.mapValues(value, makeNumberValueUncaged);
  return (Number(value) && _.isString(value))
    ? Number(value)
    : value;
};

const getParsedObj = (type, data) => {
  switch (type) {
    case 'json':
      return _.mapValues(JSON.parse(data), makeNumberValueUncaged);
    case 'yml' || 'yaml':
      return _.mapValues(yaml.safeLoad(data), makeNumberValueUncaged);
    case 'ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

export default (configInfo) => {
  const { type, data } = configInfo;
  const parsedObj = getParsedObj(type, data);
  return parsedObj;
};
