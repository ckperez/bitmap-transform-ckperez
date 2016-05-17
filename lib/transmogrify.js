'use strict';

module.exports = function transmogrify(arr){
  for (var i = 0; i < arr.length; i++){ //looping through the whole palette(not efficient, but I set it up for easy testing)
    var r = arr[i][0], //assigning RGB values to variables
      g = arr[i][1], //assigning RGB values to variables
      b = arr[i][2]; //assigning RGB values to variables
    arr[i][0] = g; //rotating RGB values and reassigning
    arr[i][1] = b; //rotating RGB values and reassigning
    arr[i][2] = r; //rotating RGB values and reassigning
  };
  return arr; //returning the color-swapped palette
};
