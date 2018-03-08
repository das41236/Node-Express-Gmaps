const fetch = require('node-fetch');
const config = require('../../config.js');

const API_KEY = config.gmaps.distanceKey;
const URL_DISTANCE = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
// https://maps.googleapis.com/maps/api/distancematrix/outputFormat?parameters

// required paramaters
// origins=... example: origins=Bobcaygeon+ON
//          or if we want to grab a place id from our other stuff
//          origins=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE
//destinations=... example: destinations=24+Sussex+Drive+Ottawa+ON
//key=...
//mode=... mode=driving
//driving, walking, bicycling, and transit

//full example I think
//https://maps.googleapis.com/maps/api/distancematrix/json?origins=Bobcaygeon+ON&mode=bicycling&destinations=24+Sussex+Drive+Ottawa+ON&key=YOUR_API_KEY

const getDistance = (url) => {
  const driving = new Promise((resolve,reject) => {
    fetch(url)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
  return driving;
  // return new Promise((resolve, reject) => {
  //   // const distanceUrl = URL_DISTANCE + 'origins=' + origin + '&destinations=' + destination + '&mode=' + mode + '&key=' + API_KEY;
  //   fetch(url)
  //       .then(res => res.json())
  //       .then(distance => {
  //         resolve(distance);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  // });
}

module.exports = getDistance;