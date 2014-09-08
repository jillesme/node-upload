#node-upload

###Upload files to your server with Node and Express.

<p style="text-align: center">
<img src="screenshot.png">
</p>

With **node-upload** you can upload images, PDFs and text files to your server by dragging and dropping. 

You can now also upload by selecting a file from your
iPad or iPhone.

# How to install (for newbies)

After you've forked and cloned this repo you should cd into it and run the following commands:

```
npm install 
node app.js
```

You'll see 'Listening on 3030' which means you can now acces the app by going to **127.0.0.1:3030**

I highly recommend using [nodemon](https://github.com/remy/nodemon). Which is a tool that monitors your JavaScript files for changes and restarts the project when a file is changed.

You can install nodemon like this

```
npm install -g nodemon
```

# TODO

* Multi image drag & drop

* Realtime overview page with socket.io

* Move CSS to SCSS
