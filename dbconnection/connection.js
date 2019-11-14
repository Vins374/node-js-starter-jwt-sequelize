// var mysql = require('mysql');

// //local mysql db connection
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'mysql-app'
// });

// connection.connect(function(err) {
//     if (err) throw err;
// });

var Sequelize = require('sequelize');

var sequelize = new Sequelize('mysql-app', 'root', '', 
	{ host: 'localhost', dialect: 'mysql', 
	pool: {
    max: 5,
    min: 0,
    omitNull: true,
    idle: 10000
  }
});


module.exports = sequelize;
global.sequelize = sequelize;