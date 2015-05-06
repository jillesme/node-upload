var router = require('express').Router();

var index = require('./index.js');
var overview = require('./overview.js');
var image = require('./image.js');
var upload = require('./upload.js');

/* GET home page. (upload page) */
router.get('/', index);

/* GET overview */
router.get('/overview', overview);

/* GET /[imagename] */
router.get('/*', image);

/* POST upload page. */
router.post('/upload', upload);

module.exports = router;
