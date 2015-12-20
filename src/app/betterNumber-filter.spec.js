var filter = require('./betterNumber-filter.js');

describe('showDecimalPointsIfNotIntegerFilter(input, decimalPoints)', function(){

  it('should exist', function() {
    expect(filter).not.toEqual(null);
  });

  it('should return null for null', function() {
    expect(filter(null)).toEqual(null);
    expect(filter(undefined)).toEqual(undefined);
  });

  it('should return zero for zero', function() {
    expect(filter(0)).toEqual('0');
  });

  it('should return integer if input is integer', function() {
    expect(filter(1)).toEqual('1');
    expect(filter(1.0)).toEqual('1');
    expect(filter(10)).toEqual('10');
    expect(filter(99)).toEqual('99');
  });

  it('should return one decimal point if input has only one', function() {
    expect(filter(1.1)).toEqual('1.1');
    expect(filter(0.6)).toEqual('0.6');
    expect(filter(22.90)).toEqual('22.9');
  });

  it('should return 2 decimal point if input has two', function() {
    expect(filter(1.11)).toEqual('1.11');
    expect(filter(22.97)).toEqual('22.97');
  });

  it('should return 2 decimal point if input has more than two', function() {
    expect(filter(1.111)).toEqual('1.11');
    expect(filter(22.977)).toEqual('22.98');
  });

  it('should return <=n decimal point if preferred maximum decimal points (n) specified ', function() {
    expect(filter(1, 3)).toEqual('1');
    expect(filter(1.11, 3)).toEqual('1.11');
    expect(filter(1.1111, 3)).toEqual('1.111');
    expect(filter(1.1111911, 3)).toEqual('1.111');
    expect(filter(22.977, 3)).toEqual('22.977');
  });

});