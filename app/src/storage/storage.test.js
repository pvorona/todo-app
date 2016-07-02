import Storage from './storage';

describe('storage', () => {
  const storage = new Storage();

  beforeEach(() => {
    localStorage.clear();
  });

  it('saves items to local storage', () => {
    storage.setItem('key', {a: 1, b: 2});
    expect(storage.getItem('key')).toEqual({a: 1, b: 2});
  });
});
