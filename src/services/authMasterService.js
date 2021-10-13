const userMasterModel = require("../models/userMasterModel")
const tokenMasterModel = require("../models/tokenMasterModel")
const Sequelize = require("sequelize")
const {sequelize, queryInterface} = require("../database/connection")

module.exports = {
    authLogic: async function(email, password){
        const userMaster = userMasterModel.userMaster()
        var msg = {
            statuscode: Number,
            user_confirmation : Boolean,
            message : String
        }
        
        const userMasterDatabase = userMaster.findOne({
            where: {
                email: email
            }
        })
        
        //validations
        await userMasterDatabase.then((responseData)=>{
            if (!responseData){
                msg.statuscode = 400
                msg.user_confirmation = false
                msg.message = "No user found"
            }else{
                
                if (responseData.password != password){
                    msg.statuscode = 400
                    msg.user_confirmation = false
                    msg.message = "Wrong Password"
                }else{
                    msg.statuscode = 200
                    msg.user_confirmation = true
                    msg.message = "User found and confirmed"
                }
            }
        }).catch((err)=>{
            console.log("Error: \n", err)
        })
        return msg
    },

    authToken: async function(auth_token){
        const tokenMaster = tokenMasterModel.tokenMaster()
        var msg = {
            statuscode: Number,
            token_authorization : Boolean,
            message : String
        }

        tokenMaster.findOne({where:{
            auth_token: auth_token
        }}).then((result)=>{
            if (!result){
                msg.statuscode = 400
                msg.token_authorization = false
                msg.message = "No token found"
            }else{
                msg.statuscode = 200
                msg.token_authorization = true
                msg.message = "token found"
            }
        }).catch((err)=>{
            console.log("Error: \n", err)
        })
        return msg
    },

    storeAuth: async function(storeData){
        const tokenMaster = tokenMasterModel.tokenMaster()


        return queryInterface.bulkInsert("token_master", [storeData])
    }
}