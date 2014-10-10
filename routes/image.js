var fs = require('fs');
var path = require('path');

var paths = {
  upload: path.normalize(__dirname + '../../public/dist/u/'),
  thumbnail: path.normalize(__dirname + '../../public/dist/t/')
};

module.exports = function (req, res) {
  // Get the file name from the URL
  var fileName = req.params[0];

  // Check if it exists synchronously
  if (fs.existsSync(paths.upload + fileName)) {
    res.render('image', {
      title: fileName,
      image: '/u/' + fileName
    });
  } else {
    res.render('no-image', {
      imageName: fileName
    });
  }
};
