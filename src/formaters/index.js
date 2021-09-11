import stylish from './stylish.js';

const formatter = (obj, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(obj);
  }
  return `Неизвестный формат: ${format}`;
};

export default formatter;
