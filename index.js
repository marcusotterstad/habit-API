const express = require('express')
const app = express()
const port = 4000
const {simpleGetRequest} = require('./src/utils/dbHelpers.utils');


//middleware
var cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routers
const habitLogRouter = require('./src/routers/habitLogRouter');
app.use('/habit-log', habitLogRouter);

const habitRouter = require('./src/routers/habitRouter');
app.use('/habits', habitRouter);



app.get('/', (request, response) => {
    response.status(200).send("App up and running");
})
  
app.listen(port, "127.0.0.1", () => {
    console.log(`App running on port ${port}.`)
})
