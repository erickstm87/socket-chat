const expect = require('expect');

const {isRealString} = require('./validation');

describe('should check to see if values are strings or not', () => {

  it('should reject non string values', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var spaces = isRealString('     ');
    expect(spaces).toBe(false);
  });

  it('should allow strings with non space characters', () => {
    var validString = isRealString('     aValidString ');
    expect(validString).toBe(true);
  });
});
