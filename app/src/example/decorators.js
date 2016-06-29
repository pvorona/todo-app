const not = predicate => (...args) => !predicate(...args);

export {
  not
};
