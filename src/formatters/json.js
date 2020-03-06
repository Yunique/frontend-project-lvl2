import _ from 'lodash';

const makeNumberValuesUncaged = (key, value) => (
  (Number(value) && !_.isBoolean(value))
    ? Number(value)
    : value
);

export default (ast) => JSON.stringify(ast, makeNumberValuesUncaged, ' ');
