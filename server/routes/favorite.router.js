const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "favorite" ORDER BY "id";';
  pool.query(queryText)
    .then((result) => {
      //console.log('Got this back from the database', result);
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post('/', (req, res) => {
  let url = req.body
  console.log(url)
  console.log(req.body)
  let queryText = `INSERT INTO "favorite" ("url")
        VALUES ($1);`
  pool.query(queryText, [url.url])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new feedback`, error);
      res.sendStatus(500);
    });
});

router.post('/sortby', (req, res) => {
  let categoryId = req.body
  let queryText = `
  SELECT "name", "url", "category_id"
  FROM "category"
  JOIN "favorite" ON "favorite".category_id = ("$1");`
  pool.query(queryText, [categoryId.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new feedback`, error);
      res.sendStatus(500);
    });
});




// update given favorite with a category id
router.put('/:id', (req, res) => {
  console.log(req.body.params)
  let categoryId = req.body
  let queryText = `UPDATE "favorite" 
  SET     "category_id" = $1
  WHERE   "id" = $2 `
  pool.query(queryText, [categoryId.catId, req.params.id])
    .then(result => {
      console.log(result)
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new feedback`, error);
      res.sendStatus(500);
    });
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
