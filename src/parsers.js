import yaml from 'js-yaml';

const parse = (file, extname) => {
  let res;
  if (extname === '.yaml' || extname === '.yml') {
    res = yaml.load(file);
  } else if (extname === '.json') {
    res = JSON.parse(file);
  }
  return res;
};
export default parse;
