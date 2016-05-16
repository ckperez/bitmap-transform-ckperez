'use strict';

var fs = require('fs');

module.exports = function create_new(destination, buffer) {
  fs.writeFile(destination, buffer, function(err) {
    if(err) {
      throw err;
    };
  });
};
