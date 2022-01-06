const Joi = require('joi');

const CustomerWalletService = require('../services/customerwalletservice.js');
const custWallet = new CustomerWalletService();

exports.getWalletDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletId: Joi.number().error(new Error('Provide walletId(number)')),
        custId: Joi.number().error(new Error('Provide custId(number)')),
        storeCustId: Joi.number().error(new Error('Provide storeCustId(number)')),
        custEmail: Joi.string().error(new Error('Provide custEmail(string)')),
        custContactNo: Joi.number().error(new Error('Provide custContactNo(number)')),
        clubId: Joi.number().error(new Error('Provide clubId(number)')),
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
        custWallet.getWalletDetails(req, res).then(data => {
            if (data.count > 0) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: 'Customer wallet details',
                    data: data
                })
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: 'Customer wallet details not found',
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

exports.getWalletCustomerDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletId: Joi.number().error(new Error('Provide walletId(number)')),
        custId: Joi.number().error(new Error('Provide custId(number)')),
        storeCustId: Joi.number().error(new Error('Provide storeCustId(number)')),
        custEmail: Joi.string().error(new Error('Provide custEmail(string)')),
        custContactNo: Joi.number().error(new Error('Provide custContactNo(number)')),
        custName: Joi.string().error(new Error('Provide storeCustId(string)')),
        clubId: Joi.number().error(new Error('Provide clubId(number)')),
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
        custWallet.getWalletCustomerDetails(req, res).then(data => {
            if (data.count > 0) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: 'Customer wallet details',
                    data: data
                })
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: 'Customer wallet details not found',
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

exports.addWallet = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        custId: Joi.number().required().error(new Error('Provide custId(number)')),
        storeCustId: Joi.number().required().error(new Error('Provide storeCustId(number)')),
        totalAmount: Joi.number().required().error(new Error('Provide totalAmount(number)')),
        clubId: Joi.number().required().error(new Error('Provide clubId(number)')),
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

        custWallet.addWallet(req, res).then((data) => {
            if (data.dataValues) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: "Wallet record added",
                    data: data,
                });
            } else if (data.statusCode == 101) {
                res.status(200).send(data);
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: "Failed to add wallet record",
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

exports.updateWallet = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletId: Joi.number().required().error(new Error('Provide walletId(number)')),
        totalAmount: Joi.number().error(new Error('Provide totalAmount(number)')),
        clubId: Joi.number().error(new Error('Provide clubId(number)')),
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
        custWallet.updateWalletHistory(req, res)
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

exports.deleteWallet = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        walletId: Joi.number().required().error(new Error("Provide walletId(number)")),
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
        custWallet.deleteWallet(req, res)
            .then((data) => {
                if (data > 0) {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: "Wallet deleted successfully",
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

