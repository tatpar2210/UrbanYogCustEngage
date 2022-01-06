const Joi = require('joi');
const customerWalletOrderService = require('../services/customerWalletOrderService.js');
const custWalletOrder = new customerWalletOrderService();

exports.orderWebhook = (req, res) => {
    // console.log(req.body);
    let data = req.body;
    if (req.body) {
        // let  data = JSON.stringify(req.body);
        custWalletOrder.addReward(data, res).then(result => {
            res.send(result);
        })
    } else {
        res.send("failed");
    }

};

exports.orderCancelWebhook = (req, res) => {
    console.log(req.body);
    let data = req.body;
    if (req.body) {
        // let  data = JSON.stringify(req.body);
        custWalletOrder.updateReward(data, res).then(result => {
            res.send(result);
        })
    } else {
        res.send("failed");
    }

};

exports.orderFulfillmentEventWebhook = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        order_id: Joi.number().required(),
        shipment_status: Joi.string()
    });

    const schema_result = schema.validate(data)


    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: "error",
            message: "Invalid request data",
            data: error.message,
        });
    }else {
        console.log(data);
        custWalletOrder.activateReward(data, res).then(result => {
            res.send(result);
        })
    }
};

exports.convertRewardToDiscount = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        custStoreId: Joi.number().required().error(new Error("Provide custStoreId(number)")),
        rewardPoint: Joi.number().min(1).max(100).required().error(new Error("Provide rewardPoint(number) and should be greater then 1 and less than 100"))
    });

    const schema_result = schema.validate(data)

    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: "error",
            message: "Invalid request data",
            data: error.message,
        });
    }else {
        custWalletOrder.convertRewardToDiscount(req, res)
            .then((data) => {
                if (data.statusCode == 100) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: "Reward points converted to discount code successfully",
                        data: [],
                    });
                } else {
                    res.status(200).send(data);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: err,
                    data: [],
                });
            });
    }
};