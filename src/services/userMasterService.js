const userMasterModel = require("../models/userMasterModel")
const Sequelize = require("sequelize")
const {sequelize, queryInterface} = require("../database/connection")
const jwt = require("jsonwebtoken")

module.exports = {
    findAll: function(){
        const userMaster = userMasterModel.userMaster()

        return userMaster.findAll()
    },
    
    findOneById: function(user_id){
        const userMaster = userMasterModel.userMaster()

        return userMaster.findOne({
            where: {
                user_id: user_id
            }
        })
    },

    findOneByEmail: function(email){
        const userMaster = userMasterModel.userMaster()

        return userMaster.findOne({
            where: {
                email: email
            }
        })
    },

    addUser: async function(data){
        return queryInterface.bulkInsert("user_master", [data])
    }
}