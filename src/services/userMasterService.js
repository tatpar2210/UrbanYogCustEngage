const userMasterModel = require("../models").user_master

class userService{
    findAll(){

        return userMasterModel.findAll()
    }

    findOneById(user_id){

        return userMasterModel.findOne({
            where: {
                user_id: user_id
            }
        })
    }

    findOneByEmail(email){

        return userMasterModel.findOne({
            where: {
                email: email
            }
        })
    }

    addUser(data){
        return userMasterModel.create(data)       
    }
}

module.exports = userService