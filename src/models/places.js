const fetch = require('node-fetch');
const config = require('../../config.js');

const API_KEY = config.gmaps.apiKey;
const URI_TEXT_SEARCH = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URI_PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
// const URL = 'https://maps.googleapis.com/maps/api/place';

function getIds(term) {
    return new Promise((resolve, reject) => {
      const searchUrl = URI_TEXT_SEARCH + term + '&key=' + API_KEY;
      // fetch(`${URL}/textsearch/json?query=${term}&key=${API_KEY}`)
      fetch(searchUrl)
        .then(res => res.json())
        .then(details => details.results.map(detail => detail.place_id))
        .then(ids => {
          resolve(ids);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  
  function getDetails(ids) {
    return new Promise((resolve, reject) => {
      const promises = ids.map(id => {
        // return fetch(`${URL}/details/json?placeid=${id}&key=${API_KEY}`)
        const detailsUrl = URI_PLACE_DETAILS + id + '&key=' + API_KEY;
        return fetch(detailsUrl)
          .then(res => res.json())
          .then(detailed => detailed.result);
      });
      Promise.all(promises)
        .then(promises => {
          resolve(promises);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  module.exports = { getIds, getDetails };