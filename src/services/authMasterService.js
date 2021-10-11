const userMasterModel = require("../models/userMasterModel")


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
    }
}