(function (document, window, undefined) {
  'use strict';

  var available = window.File && window.FileReader && window.FileList && window.Blob;
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  var message = dq('.message');
  var dropField = dq('.drop-me');
  var uploadList = dq('.upload-list');
  var uploadCustom = dq('.upload-custom');
  var uploadField = dq('.custom-upload');
  var uploadButton = dq('.upload-button');
  var uploadTempName = dq('.custom-upload-name');
  var fileHistory = [];

  var data;

  uploadField.addEventListener('change', function () {
    var file = uploadField.files[0];
    uploadTempName.innerHTML = parseImageName(file.name);
  });

  uploadCustom.addEventListener('click', function () {
    var file = uploadField.files[0];
    uploadFile(file);
    uploadTempName.innerHTML = 'No file selected';
  }, false);

  if (available) {
    var uploadReady = false;

    if (!mobile) {
      message.innerHTML = 'Drop Here';

      dropField.addEventListener('dragover', function (ev) {
        ev.preventDefault();

        this.style.background = '#48d278';
        message.innerHTML = 'Upload!';
      }, false);

      dropField.addEventListener('dragleave', function () {
        this.style.background = '';
        message.innerHTML = 'Drop Here';
      }, false);

      dropField.addEventListener('drop', function (ev) {
        ev.preventDefault();

        this.style.background = '';
        message.innerHTML = 'Drop Here';

        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          uploadFile(ev.dataTransfer.files[i]);
        }

      }, false);
    }

  } else {
    document.getElementById('message').innerHTML = 'Your browser is not supported';
  }

  function dq (elem) {
    return document.querySelector(elem);
  }

  function bounceButton () {
    uploadButton.classList.add('animate');
    uploadButton.classList.add('bounce');

    window.setTimeout(function () {
      uploadButton.classList.remove('animate');
      uploadButton.classList.remove('bounce');
    }, 1000);
  }

  function parseBytes (input) {
    var result = 0,
        kbytes = input / 1024;
    if (kbytes >= 0 && kbytes < 1024) {
      result = Math.round(kbytes) + 'kb';
    } else if ( kbytes >= 1024 ) {
      var mbytes = kbytes / 1024;
      result = Math.round(mbytes * 100) / 100 + 'mb';
    }
    return result;
  }

  function parseImageName (name) {
    return name.replace(/([a-zA-Z0-9-\.\s]{9}).+([a-zA-Z0-9-\.\s]{5})\.([a-zA-Z]+)/g, '$1..$2.$3');
  }

  function checkFile (file) {
    if (!file) return false;

    var fileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    var maxSize = 5000000;
    var isValid;

    if (fileTypes.indexOf(file.type) === -1){
      isValid = false;
    } else if ( file.size > maxSize ) {
      isValid = false;
    } else {
      isValid = true;
    }

    return isValid;
  }

  function uploadFile (file) {

    uploadList.style.display = 'block';

    var droppedFile = file;

    if (droppedFile === undefined || fileHistory.indexOf(droppedFile.name + ':' + droppedFile.size) !== -1){
      bounceButton();
      return;
    }

    fileHistory.push(droppedFile.name + ':' + droppedFile.size);

    uploadReady = checkFile(droppedFile);

    var uploadLink = document.createElement('a');
    uploadLink.setAttribute('href', '#');
    uploadLink.setAttribute('target', '_blank');

    var uploadItem = document.createElement('li');
    uploadLink.innerHTML = parseImageName(droppedFile.name) + ' <span>[' + parseBytes(droppedFile.size) + ']</span>';

    if (!uploadReady) {
      uploadItem.className = 'invalid';
    }

    uploadItem.appendChild(uploadLink);
    uploadList.appendChild(uploadItem);

    if (uploadReady) {
      var xhrRequest = new XMLHttpRequest(),
        data = new FormData();

      xhrRequest.onload = function () {
        if (this.status === 200) {
          uploadLink.className = 'valid';
          uploadLink.setAttribute('href', this.response);
        }
      };

      data.append('file', droppedFile);


      xhrRequest.open('POST', '/upload', true);
      xhrRequest.send(data);
    }
  }

}(document, window));
