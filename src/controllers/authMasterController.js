const authMasterService = require("../services/authMasterService")

module.exports = {
    authorizeCredentials: async function(req, res){
        const req_cred = req.body
        const email = req_cred.email
        const pswd = req_cred.password
        console.log(pswd)

        //validation is already done by angular login component

        const auth = await authMasterService.authLogic(email, pswd)
        
        console.log("\nMsg from authController: \n", auth)

        res.status(200).json({auth})

    },

    authorizeToken: async function(req, res){
        const auth_token = req.body.cookie
        const auth_token_func = await authMasterService.authToken()
        console.log(auth_token)

        res.status(200).json({auth_token_result})
    }
}