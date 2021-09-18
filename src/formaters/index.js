import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (obj, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(obj);
  }
  if (format === 'plain') {
    return plain(obj);
  }
  if (format === 'json') {
    return json(obj);
  }
  return `Неизвестный формат: ${format}`;
};

export default formatter;
