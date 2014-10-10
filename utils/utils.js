var utils = {};

utils.isSafe = function (file) {
  var MAXFILESIZE = 5000000;
  var allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
  var safe = true;

  if (allowedTypes.indexOf(file.mimetype) === -1 || file.size > MAXFILESIZE) {
    safe = false;
  }

  return safe;
};

utils.generateString = function (length) {
  var chars = [
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        ].join('').split('');

  var len = (length ? length : 6);
  var randomString = '';

  for (var i = 0; i < len; i++) {
    var r = Math.floor(Math.random() * chars.length);
    randomString += chars[r];
  }

  return randomString;
};

module.exports = utils;
