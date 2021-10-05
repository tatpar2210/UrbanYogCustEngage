const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize("Urban Gabru", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

const queryInterface = sequelize.getQueryInterface();

module.exports = {sequelize, queryInterface}