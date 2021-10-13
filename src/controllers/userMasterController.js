const Joi = require("joi")
const userMasterService = require("../services/userMasterService")
const authMasterService = require("../services/authMasterService")
const jwt = require("jsonwebtoken")


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
        const userData = req.body


        if (Object.keys(userData).length === 0){
            res.status(404).json({
                statusCode: 404,
                status: 'error',
                message: "No data provided"
            })
        }else{
            const userMasterSchema = Joi.object().keys({
                first_name: Joi.string().required().error(new Error("Provide First_name(string)")),
                last_name: Joi.string().required().error(new Error("Provide Last_name(string)")),
                email: Joi.string().email().required().error(new Error("Provide Email address")),
                password: Joi.string().lowercase().required().error(new Error("Provide password")),
                contact_no: Joi.number().required().error(new Error("Provide Contact no.")),
                created_at: Joi.string().error(new Error("Provide provide date in created_at(string)")),
            })


            const userMasterSchemaResult = userMasterSchema.validate(userData)
            if (userMasterSchemaResult.error){
                console.log(userMasterSchemaResult.error.message)
                res.status(422).json({
                    statusCode: 422,
                    status: 'error',
                    message: 'Invalid request data',
                    data: userMasterSchemaResult.error.message
                  });
            }else{
                await userMasterService.addUser(userData).then( async (result)=>{
                    console.log(result)
                    
                    //generating token on adding user suucefully
                    const token_expire = "240 days"
                    const token = jwt.sign({first_name: userData.first_name, last_name: userData.last_name, email: userData.email}, "thisistatparwhomadethisbackend", {expiresIn: token_expire})
                    console.log(token, "\n", token_expire)
                    
                    var storeData = {
                        user_id: null,
                        auth_token: "",
                        expires_in: "" 
                    }
                    //find by email to store token 
                    console.log(token)
                    await userMasterService.findOneByEmail(userData.email).then((success)=>{
                            storeData.user_id = success.user_id,
                            storeData.auth_token = token,
                            storeData.expires_in = token_expire
                        }).catch((faliure)=>{
                                console.log(faliure)
                            })
                            
                    //sending token to database
                    await authMasterService.storeAuth(storeData).then((result)=>{
                        console.log(result)
                    }).catch((err)=>{
                        console.log(err)
                    })
                    res.cookie("authenticationTokenCookie", JSON.stringify(token), {
                        //secure: true,
                        httpOnly: true,
                    })
                    res.status(200).json({
                        statusCode: 200,
                        success: true,
                        result: [result, storeData]
                    })
                    
                }).catch((err)=>{
                    res.status(400).json({err})
                    console.log(err)
                })
            }
        }
    }
}