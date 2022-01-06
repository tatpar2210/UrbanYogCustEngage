const Joi = require('joi');

const CustomerWalletHistoryService = require('../services/customerwallethistoryservice.js');
const custWalletHistory = new CustomerWalletHistoryService();

exports.getWalletHistoryDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletHistoryId: Joi.number().error(new Error('Provide walletHistoryId(number)')),
        walletId: Joi.number().error(new Error('Provide walletId(number)')),
        custId: Joi.number().error(new Error('Provide custId(number)')),
        storeCustId: Joi.number().error(new Error('Provide storeCustId(number)')),
        custEmail: Joi.string().error(new Error('Provide custEmail(string)')),
        custContactNo: Joi.number().error(new Error('Provide custContactNo(number)')),
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
    }else {
        custWalletHistory.getWalletHistoryDetails(req, res).then(data => {
            if (data.count > 0) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: 'Customer wallet history details',
                    data: data
                })
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: 'Customer wallet history details not found',
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

exports.addWalletHistory = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletId: Joi.number().required().error(new Error('Provide walletId(number)')),
        storeOrderNumber: Joi.number().required().error(new Error('Provide storeOrderNumber(number)')),
        storeOrderId: Joi.number().required().error(new Error('Provide store_order_id(number)')),
        custId: Joi.number().required().error(new Error('Provide custId(number)')),
        storeCustId: Joi.number().required().error(new Error('Provide storeCustId(number)')),
        transactionType: Joi.string().required().error(new Error('Provide transactionType(string)')),
        transactionAmount: Joi.number().required().error(new Error('Provide transactionAmount(number)')),
        discountId: Joi.number().required().error(new Error('Provide discountId(number)')),
        pid: Joi.number().error(new Error('Provide pid(number)')),
        transcationNote: Joi.string().required().error(new Error('Provide transcationNote(string)')),
        transcationStatus: Joi.number().required().error(new Error('Provide transcationStatus(number)')),
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

        custWalletHistory.addWalletHistory(req, res).then((data) => {
            if (data.dataValues) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: "Wallet history record added",
                    data: data,
                });
            } else if (data.statusCode == 101) {
                res.status(200).send(data);
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: "Failed to add wallet history",
                    data: data,
                });
            }
        })
            .catch((err) => {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: err,
                    data: [],
                });
            });
    }
};

exports.updateWalletHistory = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletHistoryId: Joi.number().required().error(new Error('walletHistoryId clubId(number)')),
        transactionAmount: Joi.number().error(new Error('Provide transactionAmount(number)')),
        transactionStatus: Joi.number().error(new Error('Provide transactionStatus(number)')),
        status: Joi.number().error(new Error('Provide status(number)'))
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
        custWalletHistory.updateWalletHistory(req, res)
            .then((data) => {
                if (data[0] > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: "Record updated successfully",
                        data: [],
                    });
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: "Record not updated",
                        data: [],
                    });
                }
            })
            .catch((err) => {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: err,
                    data: [],
                });
            });
    }
};

exports.deleteWalletHistory = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletHistoryId: Joi.number().required().error(new Error("Provide walletHistoryId(number)")),
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
        custWalletHistory.deleteWalletHistory(req, res)
            .then((data) => {
                if (data > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: "Wallet history deleted successfully",
                        data: [],
                    });
                } else {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: "Failed to delete record",
                        data: [],
                    });
                }
            })
            .catch((err) => {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: err,
                    data: [],
                });
            });
    }
};

