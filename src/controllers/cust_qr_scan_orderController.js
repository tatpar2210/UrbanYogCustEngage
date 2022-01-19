const Joi = require("joi")
const cust_qr_scan_orderService = require("../services/cust_qr_scan_orderService")
const cust_qr_scan_order_service = new(cust_qr_scan_orderService)

module.exports = {
    async getAll_cust_qrscanned_order(req, res){
        const req_data = req.body

        const schema = Joi.object().keys({
            call_req_id: Joi.number().optional().error(new Error("Provide call_req_id(number)")),
            cust_name: Joi.string().optional().allow("").error(new Error("Provide cust_name(string)")),
            cust_email: Joi.string().email().optional().allow("").error(new Error("Provide cust_email(string | email)")),
            cust_number: Joi.number().optional().error(new Error("Provide cust_number(number)")),
            bought_product_pid: Joi.number().optional().allow("").error(new Error("Provide bought_product_pid(number)")),
            bought_product: Joi.string().optional().allow("").error(new Error("Provide bought_product(string)")),
            bought_from: Joi.string().optional().allow("").error(new Error("Provide bought_from(string)")),
            created_at: Joi.string().optional().allow("").error(new Error("Provide created_at(string)")),
            updated_at: Joi.string().optional().allow("").error(new Error("Provide updated_at(string)")),
        })

        const schema_result = schema.validate(req_data)

        if(schema_result.error){
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
            });
        }else{
            await cust_qr_scan_order_service.getAll_cust_qr_scan_order(req_data).then(data => {
                if (data.count > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: 'Call requests',
                        data: data
                    })
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: 'Call Requests not found',
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
    },

    async getCount_cust_qrscanned_order(req, res){
        const req_data = req.body

        const schema = Joi.object().keys({
            call_req_id: Joi.number().optional().error(new Error("Provide call_req_id(number)")),
            cust_name: Joi.string().optional().allow("").error(new Error("Provide cust_name(string)")),
            cust_email: Joi.string().email().optional().allow("").error(new Error("Provide cust_email(string | email)")),
            cust_number: Joi.number().optional().error(new Error("Provide cust_number(number)")),
            bought_product_pid: Joi.number().optional().allow("").error(new Error("Provide bought_product_pid(number)")),
            bought_product: Joi.string().optional().allow("").error(new Error("Provide bought_product(string)")),
            bought_from: Joi.string().optional().allow("").error(new Error("Provide bought_from(string)")),
            created_at: Joi.string().optional().allow("").error(new Error("Provide created_at(string)")),
            updated_at: Joi.string().optional().allow("").error(new Error("Provide updated_at(string)")),
        })

        const schema_result = schema.validate(req_data)

        if(schema_result.error){
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
            });
        }else{
            await cust_qr_scan_order_service.getCount_cust_qr_scan_order(req_data).then(data => {
                if (data > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: 'Qr Scanned data',
                        data: data
                    })
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: 'QR scanned data not found',
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
    },

    async create_cust_qr_scanned_order(req, res){
        const req_data = req.body

        const schema = Joi.object().keys({
            cust_name: Joi.string().required().error(new Error("Provide cust_name(string)")),
            cust_email: Joi.string().email().required().error(new Error("Provide cust_email(string | email)")),
            cust_number: Joi.number().required().error(new Error("Provide cust_number(number)")),
            bought_product_pid: Joi.number().required().error(new Error("Provide bought_product_pid(number)")),
            bought_product: Joi.string().required().error(new Error("Provide bought_product(string)")),
            bought_from: Joi.string().required().error(new Error("Provide bought_from(string)")),
            created_at: Joi.string().optional().allow("").error(new Error("Provide created_at(string)")),
            updated_at: Joi.string().optional().allow("").error(new Error("Provide updated_at(string)")),
        })

        const schema_result = schema.validate(req_data)

        if(schema_result.error){
            res.status(422).json({
                statusCode: 422,
                status: 'error',
                message: 'Invalid request data',
                data: schema_result.error.message
            });
        }else{
            await cust_qr_scan_order_service.store_cust_qr_scan_order(req_data).then((result)=>{
                res.status(200).json({
                    statuscode: 200,
                    message: "stored call-request details",
                    data: result
                })
            }).catch((err)=>{
                res.status(400).json({err})
            })
        }
    }
}