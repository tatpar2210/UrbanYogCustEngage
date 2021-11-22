const product_faqService = require("../services/product_faqService")
const product_faq_service = new product_faqService()
const Joi = require('joi');

module.exports = {
    getAll_Product_Faq: async function(req, res){
        const data = req.body;
        const schema = Joi.object().keys({      
            faqId: Joi.number().error(new Error('Provide faqId(number)')),
            pId: Joi.number().error(new Error('Provide pId(number)')),
            question: Joi.string().error(new Error('Provide question(string)')),
            limit: Joi.number().error(new Error('Provide limit(number)')),
            offset: Joi.number().error(new Error('Provide offset(number)'))
        });

        const schema_result = schema.validate(data)

        if(schema_result.error){
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
            });
        }else{
            product_faq_service.getAll_productFaq(req, res).then(data => {
                if (data.count > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: 'Product FAQs',
                        data: data
                    })
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: 'Product FAQs not found',
                        data: data
                    })
                }
            }).catch(err => {
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