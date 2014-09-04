(function () {
    "use strict";

    var available = window.File && window.FileReader && window.FileList && window.Blob,
    message = document.querySelector('#message'),
    dropField = document.querySelector('#dropMe'),
    uploadList = document.querySelector('#uploadList'),
    uploadButton = document.querySelector('#uploadCustom'),
    uploadField = document.querySelector('#custom-upload'),
    uploadTempName = document.querySelector('#custom-upload-name'),
    fileHistory = [];

    var data;

    // --- EDIT DEBUG ----
    uploadField.addEventListener('change', function () {
      var file = uploadField.files[0];
      uploadTempName.innerHTML = file.name;
    });

    uploadButton.addEventListener('click', function () {
      var file = uploadField.files[0];
      uploadFile(file);
    }, false);
    // --- END DEBUG ----

    if (available) {
        var uploadReady = false;

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

            uploadFile(ev.dataTransfer.files[0]);
        }, false);

    } else {
        document.getElementById('message').innerHTML = 'Your browser is not supported';
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

            if ( fileHistory.indexOf(droppedFile.name) !== -1 ){
                return;
            }

            fileHistory.push(droppedFile.name);

            uploadReady = checkFile(droppedFile);

            var uploadLink = document.createElement('a');
            uploadLink.setAttribute('href', '#');
            uploadLink.setAttribute('target', '_blank');

            var uploadItem = document.createElement('li');
            uploadLink.innerHTML = droppedFile.name + ' <span>[' + parseBytes(droppedFile.size) + ']</span>';

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

            data.append("file", droppedFile);


            xhrRequest.open("POST", "/upload", true);
            xhrRequest.send(data);
            }
    }

}(document, window));
