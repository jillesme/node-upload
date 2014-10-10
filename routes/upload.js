var fs = require('fs');
var path = require('path');
var easyimage = require('easyimage');
var utils = require('../utils/utils.js');

var paths = {
  upload: path.normalize(__dirname + '../../public/dist/u/'),
  thumbnail: path.normalize(__dirname + '../../public/dist/t/')
};

module.exports = function (req, res) {
  var uploadedFile = req.files.file;

  if (utils.isSafe(uploadedFile)) {
    fs.readFile(uploadedFile.path, function (error, file) {
      if (!error) {
        var newName = utils.generateString(6) + '.' + uploadedFile.extension;
        var newFile = paths.upload + newName;

        fs.writeFile(newFile, file, function (error) {
          if (!error) {
            fs.unlink(uploadedFile.path); // delete old file
            easyimage.thumbnail({
              src: newFile,
              dst: paths.thumbnail + newName,
              width: 200,
              height: 150
            }).then(function () {
              global.io.emit('new-image', { name: newName });
            });
            res.send(200, '/' + newName);
          } else {
            console.log(error);
          }

        });
      } else {
        res.send(500, 'Couldn\'t read ' + uploadedFile.name);
      }

    });
  } else {
    res.send(403, 'File(type) not allowed.');
  }

};
