const authMasterService = require("../services/authMasterService")
const jwt = require("jsonwebtoken")
const userMasterService = require("../services/userMasterService")


module.exports = {
    authorizeCredentials: async function(req, res){
        const req_cred = req.body
        const email = req_cred.email
        const pswd = req_cred.password
        console.log(pswd)

        //validation is already done by angular login component

        await authMasterService.authLogic(email, pswd).then( async (result)=>{
            if (result.user_confirmation === true){
                //generating token on adding user suucefully
                const token_expire = "240 days"
                const token = jwt.sign({email: req_cred.email}, "thisistatparwhomadethisbackend", {expiresIn: token_expire})
                console.log(token, "\n", token_expire)
                
                var storeData = {
                    user_id: null,
                    auth_token: "",
                    expires_in: "" 
                }
                //find by email to store token 
                console.log(token)
                await userMasterService.findOneByEmail(req_cred.email).then((success)=>{
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
            }else{
                //pass
            }
            
            console.log("\nMsg from authController: \n", result)
            res.status(200).json({
                statusCode: 200,
                success: true,
                result: [result, storeData]
            })
        })
        


    },

    authorizeToken: async function(req, res){
        const auth_token = req.body.cookie
        const auth_token_func = await authMasterService.authToken(auth_token).then((result)=>{
            console.log(result)
    
            res.status(200).json({result})
        }).catch((err)=>{
            console.log(err)
        })
    }
}