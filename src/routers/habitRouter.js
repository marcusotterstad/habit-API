const express = require('express');
const pool = require('../configs/DB.config');

const habitRouter = express.Router();

habitRouter.get('/', (request, response) => {
    pool.query('SELECT * FROM habit_info WHERE active=true;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
  });
module.exports = habitRouter;