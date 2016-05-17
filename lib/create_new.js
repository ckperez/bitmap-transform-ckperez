'use strict';

var fs = require('fs');

module.exports = function create_new(destination, buffer) {
  fs.writeFile(destination, buffer, function(err) { //using the new path and transformed buffer to write a new .bmp
    if(err) {
      throw err;
    };
  });
};
