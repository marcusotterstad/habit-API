const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
const pool = require('./src/configs/DB.config');
const {simpleGetRequest} = require('./src/utils/dbHelpers.utils');
var cors = require('cors')


//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routers
const habitLogRouter = require('./src/routes/habitLogRouter');
app.use('/habitlog', habitLogRouter);


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/habits/post', (request, response) => {
    console.log(request);
    const {date, habit_id, user_id, duration, notes} = request.body;
    console.log(date, habit_id, user_id, duration, notes);
  pool.query('INSERT INTO habit_log (date, habit_id, user_id, duration, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *', [date, habit_id, user_id, duration, notes], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send(`Habit number ${results.rows[0].id} added. Well done!`)
  })
});
app.get('/habits', simpleGetRequest('SELECT * FROM habit_info;'));

  
app.listen(port, "127.0.0.1", () => {
    console.log(`App running on port ${port}.`)
})
