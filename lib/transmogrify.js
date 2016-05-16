'use strict';

module.exports = function transmogrify(arr){
  for (var i = 0; i < arr.length; i++){
    var r = arr[i][0];
    var g = arr[i][1];
    var b = arr[i][2];
    arr[i][0] = g;
    arr[i][1] = b;
    arr[i][2] = r;
  };
  return arr;
};
