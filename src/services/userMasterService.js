const userMasterModel = require("../models/userMasterModel")


module.exports = {
    findAll: function(){
        const userMaster = userMasterModel.userMaster()

        return userMaster.findAll()
    },

    findOne: function(user_id){
        const userMaster = userMasterModel.userMaster()

        return userMaster.findOne({
            where: {
                user_id: user_id
            }
        })
    }
}