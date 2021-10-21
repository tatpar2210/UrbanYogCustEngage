const userMasterModel = require("../models").user_master
const authTokenMasterModel = require("../models").authToken_master

class authService{
    async authLogic(email, password){
        //const userMaster = userMasterModel
        var msg = {
            statuscode: Number,
            user_confirmation : Boolean,
            message : String,
            err_message: String
        }
        
        const userMasterDatabase = userMasterModel.findOne({
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
            msg.err_message = err
        })
        return msg
    }

    async authToken(){
        //const authToken_master = authTokenMasterModel
        var msg = {
            statuscode: Number,
            token_authorization : Boolean,
            message : String
        }

        await authTokenMasterModel.findOne({where:{
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
            msg.message = err
        })
        return msg
    }

    storeAuth(data){
        return authTokenMasterModel.create(data)
    }
}

module.exports = authService