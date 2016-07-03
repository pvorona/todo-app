import decorators from './decorators';

describe('decorators', () => {
  describe('not', () => {
    const not = decorators.not;

    it('inverts predicate', () => {
      const truthyPredicate = () => true;
      const falsyPredicate = () => false;

      expect(not(truthyPredicate)()).toBe(false);
      expect(not(falsyPredicate)()).toBe(true);
    });
  });

  describe('picking', () => {
    const picking = decorators.picking;

    it('passes picked property to decorated function', () => {
      expect(picking('a', e => e)({a: 1})).toEqual(1);
    });
  });
});
