import _ from 'lodash';

const normalize = (value) => {
  const res = _.isPlainObject(value) ? '[complex value]' : value;
  return typeof value === 'string' ? `'${res}'` : `${res}`;
};
const createPropertyName = (obj, parents) => {
  const res = obj.key;
  if (parents === 'root' || !parents) { return `${res}`; }
  return `${parents}.${res}`;
};
const addedFormatter = (node, parent) => `Property '${createPropertyName(node, parent)}' was added with value: ${normalize(node.value)}`;
const excludedFormatter = (node, parent) => `Property '${createPropertyName(node, parent)}' was removed`;
const updatedFormatter = (node, parent) => `Property '${createPropertyName(node, parent)}' was updated. From ${normalize(node.value[0])} to ${normalize(node.value[1])}`;
const formatterDispatcher = (node, parent) => {
  switch (node.status) {
    case 'added':
      return addedFormatter(node, parent);
    case 'excluded':
      return excludedFormatter(node, parent);
    case 'updated':
      return updatedFormatter(node, parent);
    default: return 'unknown status';
  }
};
const plain = (obj, parent = undefined) => {
  const keys = obj.children.filter((value) => value.status !== 'unchanged');
  const res = keys.flatMap((value) => {
    if (value.status === 'diff') {
      const parentPath = createPropertyName(value, parent);
      return plain(value, parentPath);
    }
    return formatterDispatcher(value, parent);
  });
  return res.join('\n');
};
export default plain;
