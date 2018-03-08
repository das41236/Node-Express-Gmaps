const express = require('express');

const config = require('./config.js');
const placesController = require('./src/controllers/places.js');

const server = express();
const PORT = config.port;

server.use(placesController);

server.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
