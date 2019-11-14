'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("users",{
     id: {
       type: Sequelize.INTEGER(11),
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
     },
     name: Sequelize.STRING(300),
     email: Sequelize.STRING(50),
     password: Sequelize.STRING(100),
     created_at: Sequelize.DATE,
     updated_at: Sequelize.DATE
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
