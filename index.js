const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator')
var cors = require('cors')

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(validator());
app.use(cors());

// define a simple route
app.get('/', (req, res) => {
    res.json({message: "iExpense App Api", version:"1.0"});
});

// Require Notes routes

// const apiRouter = require('./routes/api');
// app.use('/v1', apiRouter);

require('./app/routes/api/user.routes.js')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
