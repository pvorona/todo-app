import stringUtils from './string-utils';

describe('string utils', () => {
  describe('collapseWhitespaces', () => {
    const collapseWhitespaces = stringUtils.collapseWhitespaces;

    it('replaces multiple whitespaces with one', () => {
      expect(collapseWhitespaces('Some   test   text  ')).toEqual('Some test text ');
    });

    it('doesnt modify string with only single whitespaces', () => {
      expect(collapseWhitespaces('Some test text')).toEqual('Some test text');
    });
  });

  describe('capitalizeFirstLetter', () => {
    const capitalizeFirstLetter = stringUtils.capitalizeFirstLetter;

    it('capitalizes first alphabetical letter', () => {
      expect(capitalizeFirstLetter('some text.')).toEqual('Some text.');
    });
  });

  describe('isEmpty', () => {
    const isEmpty = stringUtils.isEmpty;

    it('true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('false for non-empty strings', () => {
      expect(isEmpty('abc')).toBe(false);
    });
  });

  describe('trim', () => {
    const trim = stringUtils.trim;

    it('removes whitespaces from sides', () => {
      expect(trim(' a ')).toEqual('a');
    });

    it('doesnt modify string without side whitespaces', () => {
      expect(trim('Some random text')).toBe('Some random text');
    });
  });
});
