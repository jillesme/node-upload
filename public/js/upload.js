(function () {
    "use strict";

    var available = window.FileReader !== undefined,
    message = document.querySelector('#message'),
    dropField = document.querySelector('#dropMe'),
    uploadList = document.querySelector('#uploadList'),
    fileHistory = [];

    var data;

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

            uploadList.style.display = 'block';

            var droppedFile = ev.dataTransfer.files[0];

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
}(document, window));
