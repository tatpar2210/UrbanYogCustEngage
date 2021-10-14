const {Sequelize, DataTypes} = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
    host: process.env.HOST,
    dialect: "mysql"
})

const queryInterface = sequelize.getQueryInterface();

module.exports = {sequelize, queryInterface}