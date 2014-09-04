var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var uploadPath = path.normalize(__dirname + '../../public/u/');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Upload' });
});

/* GET /[imagename] */
router.get('/*', function (req, res) {
	// Get the file name from the URL
	var fileName = req.params[0];

	// Check if it exists synchronously
	if (fs.existsSync(uploadPath + fileName)) {
		res.render('image', {
			title: fileName,
			image: '/u/' + fileName
		});
	} else {
		res.render('no-image', {
			imageName: fileName
		});
	}


});


/* POST upload page. */
router.post('/upload', function (req, res) {
	var uploadedFile = req.files.file;

	if (isSafe(uploadedFile)) {
		fs.readFile(uploadedFile.path, function (error, file) {
			if (!error) {
				var newName = generateString(6) + '.' + uploadedFile.extension;
				var newFile = uploadPath + newName;

				fs.writeFile(newFile, file, function (error) {
					if (!error) {
						fs.unlink(uploadedFile.path); // delete old file
						res.send(200, '/' + newName);
					}

				});
			} else {
				res.send(500, 'Couldn\'t read ' + uploadedFile.name);
			}

		});
	} else {
		res.send(403, 'File(type) not allowed.');
	}

});

function isSafe (file) {
	var MAXFILESIZE = 5000000;
	var allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
	var safe = true;

	if (allowedTypes.indexOf(file.mimetype) === -1 || file.size > MAXFILESIZE) {
		safe = false;
	}

	return safe;
}

function generateString (length) {
  var chars = "abcdefghijklmnopqrstuvwxyz".split('');
	var len = (length ? length : 6);
	var randomString = '';

	for (var i = 0; i < len; i++) {
		var r = Math.floor(Math.random() * chars.length);
		// TODO: uppercase or not by math.random();
		var e = (i % 2 === 0);
		randomString += e ? chars[r] : chars[r].toUpperCase();
	}

	return randomString;
}

module.exports = router;
