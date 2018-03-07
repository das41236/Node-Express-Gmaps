const express = require('express');
const fetch = require('node-fetch');

const config = require('./config.js');

const API_KEY = config.gmaps.apiKey;

const server = express();

fetch(`https://maps.googleapis.com/maps/api/place/textsearch/xml?query=coffee+shops+in+Austin=${API_KEY}`).
    then(res => res.json()).
    then(json => console.log(json));

fetch('https://maps.googleapis.com/maps/api/place/textsearch/xml?query=coffee+shops+in+Austin=${API_KEY}').
    catch(err => console.error(err));