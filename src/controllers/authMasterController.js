const authMasterService = require("../services/authMasterService")

module.exports = {
    authorizeCredentials: async function(req, res){
        const req_cred = req.body
        const email = req_cred.email
        const pswd = req_cred.password

        //validation is already done by angular login component

        const auth = await authMasterService.authLogic(email, pswd)
        
        console.log("\nMsg from authController: \n", auth)

        res.status(200).json({auth})

    }
}