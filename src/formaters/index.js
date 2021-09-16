import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (obj, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(obj);
  }
  if (format === 'plain') {
    return plain(obj);
  }
  return `Неизвестный формат: ${format}`;
};

export default formatter;
