import _ from 'lodash';

const INTENDATION_COUNT = 4;
const STATUSES = {
  added: '+',
  excluded: '-',
  updated: ' ',
  unchanged: ' ',
  diffed: ' ',
};
const normalize = (data, depth) => {
  if (!_.isObject(data)) { return `${data}`; }
  const res = _.toPairs(data)
    .map((value) => `${' '.repeat(depth * INTENDATION_COUNT)}${value[0]}: ${normalize(value[1], depth + 1)}`)
    .join('\n');
  return `{\n${res}\n${' '.repeat((depth - 1) * INTENDATION_COUNT)}}`;
};
const createStatusPart = (currentStatus, depth) => `${STATUSES[currentStatus]} `.padStart(depth * INTENDATION_COUNT, ' ');
const stylish = (obj) => {
  const diffParser = (diff, depth = 0) => {
    if (diff.status === 'updated') {
      return [`${createStatusPart('excluded', depth)}${diff.key}: ${normalize(diff.value[0], depth + 1)}`, `${createStatusPart('added', depth)}${diff.key}: ${normalize(diff.value[1], depth + 1)}`];
    }
    if (diff.type === 'value') {
      return `${createStatusPart(diff.status, depth)}${diff.key}: ${normalize(diff.value, depth + 1)}`;
    }
    const res = diff.children.flatMap((value) => diffParser(value, depth + 1)).join('\n');
    if (depth === 0) { return `{\n${res}\n${' '.repeat(depth * INTENDATION_COUNT)}}`; }
    return `${createStatusPart('diffed', depth)}${diff.key}: {\n${res}\n${' '.repeat(depth * INTENDATION_COUNT)}}`;
  };
  return diffParser(obj);
};

export default stylish;
