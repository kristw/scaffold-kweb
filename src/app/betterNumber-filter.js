'use strict';

module.exports = function(input, decimalPoints) {
  if(input===null || input===undefined) return input;

  // integer
  var intValueString = Math.round(input) + '';
  if(Math.round(input) == input){
    return intValueString;
  }

  var rawValueString = input + '';
  var rawDecimalPointsCount = rawValueString.length - intValueString.length - 1;

  // target decimal points
  decimalPoints = arguments.length===2 ? decimalPoints : 2;

  return (rawDecimalPointsCount <= decimalPoints) ? rawValueString : input.toFixed(decimalPoints);
};