'use strict'

const fs = require('fs');
const transmogrify = require(__dirname + '/transmogrify');
const create_new = require(__dirname + '/create_new');
const flatten = require(__dirname + '/arrayDotFlatten');

module.exports = function transform(file) {
  fs.readFile(file, (err, data) => {
    if (err) throw new Error('READING FAIL');
    let buf = data; //renaming data buffer to buf
    let palette = []; //setting up array to hold pixel arrays that can be worked with later
    let bitMap =  {}; //setting up object to hold bitmap data
    bitMap.size = buf.readUInt32LE(2); //grabbing image data based on bmp specs
    bitMap.startPoint = buf.readUInt32LE(10); //grabbing image data based on bmp specs
    bitMap.width = buf.readUInt32LE(18); //grabbing image data based on bmp specs
    bitMap.height = buf.readUInt32LE(22); //grabbing image data based on bmp specs
    bitMap.colorPalette = buf.readUInt32LE(54); //grabbing image data based on bmp specs
    bitMap.makePixelChunks = (function(){
      let pixel = 0; //initiating a counter for the loop
      for (var i = 54; i < bitMap.startPoint; i += 4){ //looping through the part of the header that holds the palette
        palette[pixel] = [buf.readUInt8(i), buf.readUInt8(i + 1), buf.readUInt8(i + 2), 0]; //grabbing sets of 4 bytes so I can work with sets of RGBA values, adding sets to palette array
        pixel++; //incrementing counter
      }
    })();

    transmogrify(palette); //sending array of RGBA arrays to transmogrify.js

    let finalPaletteArray = flatten(palette); //assigning a variable to the returned value of arrayDotFlatten.js
    //flatten converts 2D array to 1D, which can be passed to the Buffer constructor
    let finalPalettePartialBuffer = new Buffer(finalPaletteArray); //instantiating a buffer made from the 1D array

    let metaHeaderPartialBuffer = buf.slice(0,54); //setting a variable to the chunk of header data that comes before the palette
    let imgPartialBuffer = buf.slice(1078); //setting a variable to the chunk of data after the palette (the image itself)
    let finalCompleteBuffer = new Buffer.concat([metaHeaderPartialBuffer, finalPalettePartialBuffer, imgPartialBuffer]) //concatenating the header data, palette, and image arrays into one new Buffer

    create_new(__dirname + '/../img/myNewBMP.bmp', finalCompleteBuffer); //passing a new file path and the new buffer with the transformed palette to create_new.js
  });
};
