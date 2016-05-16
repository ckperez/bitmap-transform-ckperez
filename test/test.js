'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const read = require(__dirname + '/../lib/read.js');
const transmogrify = require(__dirname + '/../lib/transmogrify.js');

describe('bitmap transform tests', () => {
  it('should reorder values within 2d array', () => {
    var testArr = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];
    expect(transmogrify(testArr)).to.eql([[2,3,1],[5,6,4],[8,9,7]]);
  });
  it('should create a different file from the input', () => {
    var firstImg = fs.readFileSync(__dirname + '/../img/palette-bitmap.bmp')
    var newImg = fs.readFileSync(__dirname + '/../img/myNewBMP.bmp')
    expect(firstImg).to.not.eql(newImg);
  });
});
