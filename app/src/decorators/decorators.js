const not = predicate => (...args) => !predicate(...args);

const picking = (prop, f) => arg => f(arg[prop]);

const setting = (prop, f) => arg => arg[prop] = f(arg);

const compose = (...functions) => (...args) =>
  functions
    .reverse()
    .reduce((composed, f) => f(composed), ...args);

export default {
  not,
  picking,
  compose,
  setting
};
