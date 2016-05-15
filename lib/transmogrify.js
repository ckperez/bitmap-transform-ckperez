'use strict';

module.exports = function transmogrify(arr){
  let i = arr.length - (arr.length / 3);
  while (i > 0){
    var x = arr.shift();
    arr.push(x);
    i--;
  }
  return arr;
}
