'use strict'

const fs = require('fs');
const transmogrify = require(__dirname + '/transmogrify');
const create_new = require(__dirname + '/create_new');

module.exports = function transform(file) {
  fs.readFile(file, (err, data) => {
    if (err) throw new Error('READING FAIL');
    let buf;
    let palette = [];
    buf = data;
    let bitMap = {};
    bitMap.startPoint = buf.readUInt32LE(10);
    bitMap.readPalette = (function(){
      let pixel = 0;
      for (var i = 54; i < bitMap.startPoint; i += 4){
        palette[pixel] = [buf.readUInt8(i), buf.readUInt8(i + 1), buf.readUInt8(i + 2), 0];
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
    buf.write(paletteString, 54, 254);
    console.log(buf);
    create_new(__dirname + '/../img/myNewBMP.bmp', buf);
  });
};
