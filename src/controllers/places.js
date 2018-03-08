const express = require('express');
const router = express.Router();

const STATUS_USER_ERROR = 422;
const STATUS_OKAY = 200;

const { getIds, getDetails } = require('../models/places.js')

router.get('/place', (req, res) => {
    // const { term } = req.query;
    // fetch(`${URI_TEXT_SEARCH}${term}&key=${API_KEY}`)
    //   .then(res => res.json())
    getIds(req.query.term)
      .then(ids => [ids[0]])
      .then(getDetails)
      .then(detail => {
        res.status(STATUS_OKAY);
        res.send( {places: detail} );
      })
      .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send({ err: err });
      });
    // .then(place => {
    //   fetch(`${URL}/details/json?placeid=${place}&key=${API_KEY}`)
    //     .then(res => res.json())
    //     .then(details => {
    //       res.status(STATUS_OKAY);
    //       res.send(details.result);
    //     })
    //     .catch(err => console.error(err));
    // })
    // .catch(err => console.log(err));
  });
  
  router.get('/places', (req, res) => {
    // const { term } = req.query;
    getIds(req.query.term)
      .then(getDetails)
      .then(details => {
        res.status(STATUS_OKAY);
        res.send({details});
      })
      .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send({err})
      })
      // .then(res => res.json())
      // .then(detail => detail.results)
      // .then(places => {
      //   const promises = [];
  
      //   places.forEach(place => {
      //     promises.push(
      //       new Promise(resolve => {
      //         fetch(`${URL}/details/json?placeid=${place.place_id}&key=${API_KEY}`)
      //           .then(res => res.json())
      //           .then(json => {
      //             resolve(json.result);
      //           })
      //           .catch(err => console.error(err));
      //       })
      //     );
      //   });
  
      //   Promise.all(promises).then(data => {
      //     res.status(STATUS_OKAY);
      //     res.send(data);
      //   });
      // })
      // .catch(err => {
      //   res.status(STATUS_USER_ERROR);
      //   res.send({ error: 'Error fetching nearby places' });
      // });
  });

  module.exports = router;