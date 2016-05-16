'use strict';

var bitMap = function(bufferData) {
  bitMap.size = bufferData.readUInt32LE(2);
  bitMap.pixelStart = bufferData.readUInt32LE(10);
  bitMap.width = bufferData.readUInt32LE(18);
  bitMap.height = bufferData.readUInt32LE(22);
  bitMap.colorPalette = bufferData.readUInt32LE(54);
 };

const read = require('./lib/read');
const create_new = require('./lib/create_new');

read('./img/palette-bitmap.bmp');
