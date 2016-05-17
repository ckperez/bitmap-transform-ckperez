'use strict'

const fs = require('fs');
const transmogrify = require(__dirname + '/transmogrify');
const create_new = require(__dirname + '/create_new');

module.exports = function transform(file) {
  fs.readFile(file, (err, data) => {
    if (err) throw new Error('READING FAIL');
    let buf = data;
    let palette = [];
    let bitMap =  {};
    bitMap.size = buf.readUInt32LE(2);
    bitMap.startPoint = buf.readUInt32LE(10);
    bitMap.width = buf.readUInt32LE(18);
    bitMap.height = buf.readUInt32LE(22);
    bitMap.colorPalette = buf.readUInt32LE(54);

    bitMap.readPalette = (function(){
      let pixel = 0;
      for (var i = 54; i < bitMap.startPoint; i += 4){
        palette[pixel] = [buf.readUInt8(i), buf.readUInt8(i + 1), buf.readUInt8(i + 2), 0];
        pixel++;
      }
    })();
    transmogrify(palette);

    var newPalArr = [];
    palette.forEach(function(pA){
      newPalArr.push(pA[0], pA[1], pA[2], pA[3]);
    });

    var almostDone = new Buffer(newPalArr);

    var header = buf.slice(0,54);
    var tail = buf.slice(1078);
    var finalStage = new Buffer.concat([header, almostDone, tail])
    buf.writeUInt8(almostDone, 54, 1024);

    create_new(__dirname + '/../img/myNewBMP.bmp', finalStage);
  });
};
