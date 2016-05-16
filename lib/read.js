'use strict'

const fs = require('fs');
const transmogrify = require(__dirname + '/transmogrify');
const create_new = require(__dirname + '/create_new');
//const image = fs.readFile(__dirname + '/img/palette-bitmap.bmp');

module.exports = function transform(file) {
  fs.readFile(file, (err, data) => {
    if (err) throw new Error('READING FAIL');
    let buff;
    let palette = [];
    buff = data;
    let bitMap = {};
    bitMap.startPoint = buff.readUInt32LE(10);
    bitMap.readPalette = (function (){
      let pixel = 0;
      for (var i = 54; i < bitMap.startPoint; i += 4){
        palette[pixel] = [buff.readUInt8(i), buff.readUInt8(i + 1), buff.readUInt8(i + 2), 0];
        pixel++;
      }
    })();
    console.log('palette before transmogrify', palette);
    transmogrify(palette);
    console.log('palette in read line 25', palette);
    let paletteString = (function(){
      palette.forEach(function(palVal){
      palVal = palVal.toString();
      })
      return palette.toString();
    })()
    console.log('paletteString in read line 32', paletteString);
    buff.write(paletteString, 54, 254);
    create_new(__dirname + '/../img/myNewBMP.bmp', buff);
  });
};
