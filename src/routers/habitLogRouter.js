const express = require('express');
const pool = require('../configs/DB.config');

const habitLogRouter = express.Router();

habitLogRouter.get('/', (request, response) => {
  const {getBy, condition, input} = request.query;

  let formattedCondition;
  switch (condition.toLowerCase()) {
    case "more-than":
      formattedCondition = ">";
      break;
    case "less-than":
      formattedCondition = "<";
  
    default:
      formattedCondition = "=";
      break;
  }
  console.log(getBy, condition, input)
    pool.query('SELECT habit_log.date AS date, habit_info.name AS name, habit_log.duration AS duration, habit_log.notes AS notes FROM habit_log LEFT JOIN habit_info ON habit_log.habit_id = habit_info.id WHERE $1 $2 $3;', [getBy, formattedCondition, input],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
  });

habitLogRouter.post('/', (request, response) => {
    const {date, habit_id, user_id, duration, notes} = request.body;
    pool.query('INSERT INTO habit_log (date, habit_id, user_id, duration, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *', [date, habit_id, user_id, duration, notes], (error, results) => {
      if (error) {
          throw error
      }
      response.status(201).send(`Habit number ${results.rows[0].id} added. Well done!`)
    })
});
  

module.exports = habitLogRouter;
