import yaml from 'js-yaml';

const parse = (file, extname) => {
  if (extname === '.yaml' || extname === '.yml') {
    return yaml.load(file);
  }
  if (extname === '.json') {
    return JSON.parse(file);
  }
  return 'unknown input format';
};
export default parse;
