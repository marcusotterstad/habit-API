const express = require('express');
const pool = require('../configs/DB.config');



const habitLogRouter = express.Router();

habitLogRouter.get('/', (request, response) => {
    const {userId} = request.params;
    pool.query('SELECT * FROM habit_log WHERE user_id = $1;', [userId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  });

habitLogRouter.post('/', (request, response) => {
    const {date, habit_id, user_id, duration, notes} = request.body;

    pool.query('INSERT INTO habit_log (date, habit_id, user_id, duration, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *', [date, habit_id, user_id, duration, notes], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send(`Habit number ${results.rows[0].id} added.`)
  })
});

module.exports = habitLogRouter;