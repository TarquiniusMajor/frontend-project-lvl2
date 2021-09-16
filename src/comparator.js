import _ from 'lodash';

const comparator = (obj1, obj2, key = 'root') => {
  const resKeys = _.union(_.keys(obj1), _.keys(obj2));
  const res = _.sortBy(resKeys).flatMap((value) => {
    if (_.isEqual(obj1[value], obj2[value])) {
      return {
        key: value, type: 'value', status: 'unchanged', value: obj1[value],
      };
    }
    if (_.isObject(obj1[value]) && _.isObject(obj2[value])) {
      return comparator(obj1[value], obj2[value], value);
    }
    if (obj1[value] === undefined) {
      return {
        key: value, type: 'value', status: 'added', value: obj2[value],
      };
    }
    if (obj2[value] === undefined) {
      return {
        key: value, type: 'value', status: 'excluded', value: obj1[value],
      };
    }
    return {
      key: value, type: 'value', status: 'updated', value: [obj1[value], obj2[value]],
    };
  });
  return {
    key,
    type: 'diffed',
    status: 'diff',
    children: res,
  };
};
export default comparator;
