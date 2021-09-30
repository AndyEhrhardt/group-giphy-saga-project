const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();




//the router is a post, so that the string data of the search can be received
//that data is then incorperated into the axios get
router.post('/', (req, res) => {
    const searchCriteria = req.body.search;
    console.log(searchCriteria)
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=25&rating=pg&q=${searchCriteria}`)
    .then(response => {
    res.send(response.data.data);
    })
    .catch(error => {
    console.log(error);
    });
});

module.exports = router;
