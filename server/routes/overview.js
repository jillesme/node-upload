var fs = require('fs');
var path = require('path');

var paths = {
  upload: path.normalize(__dirname + '../../public/dist/u/'),
  thumbnail: path.normalize(__dirname + '../../public/dist/t/')
};

module.exports = function (req, res) {
    var files = fs.readdirSync(paths.upload);
    var img = [];

    files.sort(function (x, y) {
      return fs.statSync(paths.upload + x).ctime.getTime() -
             fs.statSync(paths.upload + y).ctime.getTime();
    });

    files = files.reverse();

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // Don't add hidden files like .DS_STORE files to the array
      if (file.charAt(0) !== '.') {
        img.push({
          name: file
        });
      }
    }

    res.render('overview', {
      title: 'Overview',
      images: img
    });
};
