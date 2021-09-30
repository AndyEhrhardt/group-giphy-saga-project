const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();



const config = {
  method: 'get',
  url: `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`,
  headers: { }
};

router.get('/', (req, res) => {
    axios(config)
    .then(response => {
    console.log(response.data);
    })
    .catch(error => {
    console.log(error);
    });
});


