const express = require('express');
const router = express.Router();

const config = require('../../config.js');
const URL_DISTANCE = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
const API_KEY = config.gmaps.distanceKey;

const STATUS_USER_ERROR = 422;
const STATUS_OKAY = 200;

const { getDistance } = require('../models/distance.js');

router.get('/travel/mode', (req, res) => {
    const { origins, destinations } = req.query;
    console.log('origins: ', origins)
    console.log('destinations: ', destinations)
    const url = 'origins=' + origins + '&destinations=' + destinations;
  getDistance(url)
    .then(distance => {
    //   res.status(STATUS_OKAY);
      res.send(distance);
    })
    .catch(err => {
    //   res.status(STATUS_USER_ERROR);
      res.send({ err });
    });
});

module.export = router;
