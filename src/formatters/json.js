import _ from 'lodash';

export default (ast) => JSON.stringify(ast, (key, value) => {
  if (Number(value) && !_.isBoolean(value)) {
    return Number(value);
  }
  return value;
}, ' ');
