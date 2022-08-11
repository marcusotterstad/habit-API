const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const {simpleGetRequest} = require('./src/utils/dbHelpers.utils');


// Routers
const habitLogRouter = require('./src/routes/habitLogRouter');
app.use('/habits', habitLogRouter);



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/habitlog', simpleGetRequest('SELECT * FROM habit_log;'));

  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
