const Joi = require("joi")
const product_suggestionMaster = require("../services/productSuggestionService")
const product_suggestion_master = new product_suggestionMaster()
module.exports = {
    getAllProductSuggestion: async function(req, res){
        await product_suggestion_master.getAll_productSuggestion().then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "All product suggestion",
                data: result
            })
        }).catch((err)=>{
            console.log("Error is this: ",err)
            res.status(400).json({
                statuscode: 400,
                data_obt: {
                    query: req.query,
                    body: req.body,
                    params: req.params
                },
                err: err
            })
        })
    },

    getProductSuggestionByPid: async function(req, res){
        const Pid = req.params.id
        const req_data = req.body

        const schema = Joi.object().keys({
            sugstId: Joi.number().error(new Error('Provide tpmId(number)')),
            pId: Joi.number().error(new Error('Provide pId(number)')),
            suggstPid: Joi.number().error(new Error('Provide suggstPid(number)')),
            sugstProductid: Joi.number().error(new Error('Provide sugstProductid(number)')),
            limit: Joi.number().error(new Error('Provide limit(number)')),
            offset: Joi.number().error(new Error('Provide offset(number)'))
        })

        const schema_result = schema.validate(req_data)

        if(schema_result.error){
            // send a 422 error response if validation fails
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: error.message
            });
        }else{
            product_suggestion_master.getProductSuggestionByPid(req, res).then(data => {
                if (data.count > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: 'Product Suggestion details',
                        data: data
                    })
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: 'Product Suggestion details not found',
                        data: data
                    })
                }
            })
                .catch(err => {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: err,
                        data: []
                    })
                })
        }
    }
}