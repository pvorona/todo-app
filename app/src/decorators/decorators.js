const not = predicate => (...args) => !predicate(...args);
const picking = (prop, f) => arg => f(arg[prop]);

export default {
  not,
  picking
};
