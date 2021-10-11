const userMasterService = require("../services/userMasterService")

module.exports = {
    findAllUserMaster: async function(req, res){
       await userMasterService.findAll().then((result) => {
            if (!result){
                res.status(200).json({
                    codestatus: 200,
                    success: true,
                    message: "No data found"
                })
            }else{
                res.status(200).json({result})
            }
        }).catch((err) => {
            res.status(400).json({err})
        })
    },

    findById: async function(req, res){
        const user_id = req.params.id

        if (user_id.length ===0){
            res.status(400).json({
                statuscode: 400,
                success: false,
                message: "Provide a valid user_id( number )"
            })
        }else{
           await userMasterService.findOneById(user_id).then((result) => {
                if (!result){
                    res.status(200).json({
                        statuscode: 200,
                        success: true,
                        message: "No data found"
                    })      
                }else{
                    res.status(200).json({result})
                }
            }).catch((err) => {
                res.status(400).json({err})
            })
        }

    },

    findByEmail: async function(req, res){
        const req_email = req.params.email
        console.log(req_email)

        if (req_email.length ===0){
            res.status(400).json({
                statuscode: 400,
                success: false,
                message: "Provide a valid user_id( number )"
            })
        }else{
           await userMasterService.findOneByEmail(req_email).then((result) => {
                if (!result){
                    res.status(200).json({
                        statuscode: 200,
                        success: true,
                        message: "No data found"
                    })      
                }else{
                    res.status(200).json({result})
                }
            }).catch((err) => {
                res.status(400).json({err})
            })
        }
    },

    addUser: async function(req, res){
        const bodyData = req.body

        

    }
}