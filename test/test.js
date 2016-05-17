'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const read = require(__dirname + '/../lib/read.js');
const transmogrify = require(__dirname + '/../lib/transmogrify.js');
const flatten = require(__dirname + '/../lib/arrayDotFlatten.js');

describe('bitmap transform tests', ()=>{
  it('should reorder values within 2d array', ()=>{
    let testArr = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];
    expect(transmogrify(testArr)).to.eql([[2,3,1],[5,6,4],[8,9,7]]);
  });
  it('should create a different file from the input', ()=>{
    let firstImg = fs.readFileSync(__dirname + '/../img/palette-bitmap.bmp')
    let newImg = fs.readFileSync(__dirname + '/../img/myNewBMP.bmp')
    expect(firstImg).to.not.eql(newImg);
  });
  it('should turn a 2D array into a 1D array', ()=>{
    let testArr = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];
    expect(Array.isArray(flatten(testArr)[0])).to.be.false;
  })
});
