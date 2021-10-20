const qr_batchMasterService = require("../services/qr_batchMasterService")
const Joi = require("joi")

module.exports  = {
    getBatchMaster: async function(req, res){
        const body_data = req.body

        const schema = Joi.object().keys({
            batchId: Joi.number().error(new Error("Provide batchId(number)")),
            pId: Joi.string().error(new Error("Provide pId(number)")),
            batchName: Joi.string().error(new Error("Provide batchName(string)")),
            limit: Joi.number().error(new Error("Provide limit(number)")),
            offset: Joi.number().error(new Error("Provide offset(number)")),
        })

        const schemaResult = schema.validate(body_data)
        if (schemaResult.error){
            //if validations fails
            console.log(schemaResult.error.message)
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schemaResult.error.message
                });           
        }else{
            //if validation passes
            const fromTable = await qr_batchMasterService.getbatchMasterDetails(body_data)
        }
        
    }
}
