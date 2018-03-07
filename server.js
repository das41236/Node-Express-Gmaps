const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const config = require('./config.js');

const API_KEY = config.gmaps.apiKey;

const STATUS_USER_ERROR = 422;
const STATUS_OKAY = 200;
const PORT = 3000;

const server = express();
server.use(bodyParser.json());

server
  .get('/place', (req, res) => {
    const { term } = req.query;
    const searchTerm = term.split(' ').join('+');
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(places => {
        const place = places.results[0];
        // return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${API_KEY}`).
        // then(res => res.json()).
        // then(json => console.log(json)).
        // then(details => {
        //     console.log('Details',details.result);
        //     res.send(details.result);
        //     return;
        res.json(place);
      })
      .catch(err => console.error(err));
  })

  server.listen(PORT);
