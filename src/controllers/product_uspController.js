const Joi = require("joi")
const product_uspService = require("../services/product_uspService")
const product_usp_service = new product_uspService()

module.exports = {
    getAllProductUsp: async function(req, res){
        const data = req.body;
        const schema = Joi.object().keys({
            product_id: Joi.number().error(new Error('Provide product_id(number)')),
            uspId: Joi.number().error(new Error('Provide uspId(number)')),
            uspTitle: Joi.string().error(new Error('Provide uspTitle(string)')),
            pid: Joi.number().error(new Error('Provide pid(number)')),
            limit: Joi.number().error(new Error('Provide limit(number)')),
            offset: Joi.number().error(new Error('Provide offset(number)'))
        });

        const schema_result = schema.validate(data)

        if(schema_result.error){
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: error.message
            });
        }else{
            product_usp_service.getAll_usp(req, res).then(data => {
                if (data.count > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: 'Product USP Details',
                        data: data
                    })
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: 'Product USP Details Not Found',
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
    },

    getProductUspByPid: async function(req, res){
        const Pid = req.params.id
        
        await product_usp_service.get_uspByPId(Pid).then((result)=>{
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Product USPs by Pid",
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

    createUsp: async function(req, res){
        const data = req.body

        const schema = Joi.object().keys({
            usp_title: Joi.string().required().error(new Error("Provide usp_title(string)")),
            pid: Joi.number().required().error(new Error("Provide pid(number)")),
            product_id: Joi.number().required().error(new Error("Provide product_id(number)")),
            created_at: Joi.string().error(new Error("Provide created_at(date | string)")),
            updated_at: Joi.string().error(new Error("Provide created_at(date | string)"))
        })

        const schema_result = schema.validate(data)
        if (schema_result.error){
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
              });
        }else{
            await product_usp_service.storeUSP(data).then((result)=>{
                res.status(200).json({
                    statuscode: 200,
                    message: "stored usp details",
                    data: result
                })
            }).catch((err)=>{
                res.status(400).json({err})
            })
        }
    }

}