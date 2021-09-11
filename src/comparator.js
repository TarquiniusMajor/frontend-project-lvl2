import _ from 'lodash';

const cloneValue = (value) => {
  if (_.isObject(value)) { return _.cloneDeep(value); }
  return value;
};
const comparator = (obj1, obj2, key = 'root') => {
  const resKeys = _.union(_.keys(obj1), _.keys(obj2));
  const res = _.sortBy(resKeys).flatMap((value) => {
    if (_.isObject(obj1[value]) && _.isObject(obj2[value])) {
      const resObj = comparator(obj1[value], obj2[value], value);
      return resObj;
    }
    if (obj1[value] === obj2[value]) {
      const resObj = {
        key: value, type: 'value', status: 'unchanged', value: cloneValue(obj1[value]),
      };
      return resObj;
    }
    if (obj1[value] === undefined) {
      const resObj = {
        key: value, type: 'value', status: 'added', value: cloneValue(obj2[value]),
      };
      return resObj;
    }
    if (obj2[value] === undefined) {
      const resObj = {
        key: value, type: 'value', status: 'excluded', value: cloneValue(obj1[value]),
      };
      return resObj;
    }
    const resObj = {
      key: value, type: 'value', status: 'updated', value: [cloneValue(obj1[value]), cloneValue(obj2[value])],
    };
    return resObj;
  });
  return {
    key,
    type: 'diffed',
    status: 'diff',
    children: res,
  };
};
export default comparator;
