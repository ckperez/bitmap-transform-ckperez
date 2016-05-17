'use strict';

module.exports = function flatten(arr) {
  let flattenedArray = []; //setting up helper array to hold all of the individual values from the 2D RGBA array as a 1D array
  arr.forEach(function(pxArr){ //forEach-ing through the 2D Array
    flattenedArray.push(pxArr[0], pxArr[1], pxArr[2], pxArr[3]); //pushing each set of 4 values from the inner arrays into one long array
  });

  return flattenedArray; //returning the 1D array of RGBA values
};
