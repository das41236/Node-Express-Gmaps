const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const config = require('./config.js');

const API_KEY = config.gmaps.apiKey;

const STATUS_USER_ERROR = 422;
const STATUS_OKAY = 200;
const PORT = 3000;
const URL = 'https://maps.googleapis.com/maps/api/place';

const server = express();
server.use(bodyParser.json());

server.
    get('/place', (req, res) => {
    const { term } = req.query;
    const searchTerm = term.split(' ').join('+');
    fetch(
      `${URL}/textsearch/json?query=${searchTerm}&key=${API_KEY}`).
      then(res => res.json()).
      then(detail => detail.results[0].place_id).
      then(place => {
        fetch(`${URL}/details/json?placeid=${place}&key=${API_KEY}`).
            then(res => res.json()).
            then(details => {
                res.status(STATUS_OKAY)
                console.log('Details', details.result);
                res.send(details.result);
      })
      .catch(err => console.error(err));
  });
});


// server.get('/places', (req,res) => {
//     fetch(`${URL}/textsearch/json?query=${req.query.term}&key=${API_KEY}`).
//     then(res => res.json()).
//     then(json => {
//         return res.send(json.results);
//     })
//     .catch(err => console.error(err));
// })

  server.listen(PORT);
