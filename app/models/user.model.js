var Sequelize = require('sequelize');
var sequelize = require('../../dbconnection/connection.js');

module.exports = sequelize.define("User", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey:true,
	},
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
    },
    updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
    },
},{tableName: 'users'});

exports.createUser = () => {
	return { status: true, message: "user created successfully" };
}