var socket = io();
var main = document.querySelector('main');
socket.on('new-image', function (image) {
  var newImage = document.createElement('img');
  newImage.src = '/t/' + image.name;
  var newLink = document.createElement('a');
  newLink.setAttribute('href', '/' + image.name);
  newLink.appendChild(newImage);
  var imageContainer = document.createElement('div');
  imageContainer.className = 'image';
  imageContainer.appendChild(newLink);

  main.appendChild(imageContainer);
  main.insertBefore(imageContainer, main.firstChild);
});
