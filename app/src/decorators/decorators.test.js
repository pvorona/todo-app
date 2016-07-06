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

  describe('setting', () => {
    const setting = decorators.setting;

    it('sets property with passed function', () => {
      const obj = {};
      setting('a', () => 2)(obj);
      expect(obj.a).toBe(2);
    });
  });

  describe('compose', () => {
    const compose = decorators.compose;

    it('combines functions', () => {
      const addOne = x => x + 1;
      const multiplyByTwo = x => x * 2;

      expect(compose(multiplyByTwo, addOne)(0)).toBe(2);
    });
  });
});
