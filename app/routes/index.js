var express = require('express')
var Router = express.Router();
Router.use('/api', require('./api'));
module.exports = Router;