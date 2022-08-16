const express = require('express');
const pool = require('../configs/DB.config');



const habitLogRouter = express.Router();

habitLogRouter.get('/', (request, response) => {
    pool.query('SELECT * FROM habit_log;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
  });


module.exports = habitLogRouter;