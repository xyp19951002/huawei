const express = require('express');
const conn = require('../dao/conn');

const router = express.Router();

router.route('/getProduct')
  .get((req, res, next) => {
    let sql = 'select * from products';

    conn.query(sql, (err, result) => {
      if (err) console.log(err);

      res.json(result);
    });
  });

  router.route('/getItems')
  .get((req, res, next) => {
      let sql = `select * from products where id=(${req.query.id})`;

      conn.query(sql, (err, result) => {
          if (err) console.log(err);
          res.json(result);
      });
  });

module.exports = router;