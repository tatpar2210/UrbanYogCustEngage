const CancelOrder = require('../models').order_cancel;
const CustomerMaster = require('../models').customer_master;

const Op = require('sequelize').Op
const request = require("request");

class OrderCancelService {
    cancelOrderWebsite(req) {
        var date = new Date();
        var dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        return new Promise((resolve, reject) => {

            let cnd = {
                where: {
                    store_order_id: req.body.storeOrderId,
                    store_order_number: req.body.storeOrderNumber,
                    store_id: req.body.storeId
                }
            }

            return CancelOrder.findAll(cnd).then((result) => {
                if (result.length <= 0) {
                    return CancelOrder.create({
                        store_order_id: req.body.storeOrderId,
                        store_order_number: req.body.storeOrderNumber,
                        store_cust_id: req.body.storeCustId,
                        cancel_reason: req.body.cancelReason,
                        store_id: req.body.storeId,
                        created_at: dateStr
                    }).then(createCancelOrder => {
                        this.cancelOrdersToShopify(req.body.storeOrderId, req.body.cancelReason).then(cancelResult => {
                            if (cancelResult == "Not Found") {
                                return CancelOrder.destroy({
                                    where: {
                                        cancel_order_id: createCancelOrder.dataValues.cancel_order_id
                                    }
                                }).then(deleteOrderData => {
                                    if (deleteOrderData == 1) {
                                        resolve(0)
                                    }
                                    resolve(deleteOrderData)
                                })
                                    .catch(error => reject(error));
                            } else {
                                resolve(1);

                            }
                        })
                    })
                        .catch(error => reject(error));
                } else {
                    let errResp = {
                        statusCode: 101,
                        status: false,
                        message: 'Order Already cancelled',
                        data: []
                    }
                    resolve(errResp);
                }
            })
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    cancelOrdersToShopify(shopifyOrderId, cancelReason) {
        return new Promise((resolve, reject) => {

            let shopUrl = process.env.shopifyStoreURL + "orders/" + shopifyOrderId + "/cancel.json";
            const auth = "Basic " + Buffer.from(process.env.shopifyApiKey + ":" + process.env.shopifyApiPassword
            ).toString("base64");

            const cancelOrderOptions = {
                url: shopUrl,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                body: {
                    restock: true,
                    reason: "customer",
                    email: true
                },
                json: true,
            };

            request(cancelOrderOptions, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                if (body) {
                    if (body.errors) {
                        reject(body.errors);
                    } else {
                        resolve({
                            statusCode: 100,
                            message: "Order cancelled successfully",
                        });
                    }
                } else {
                    resolve([]);
                }
            });
        }).catch((err) => {
            if (err) {
                return err;
            }
        });
    }

    getCancelOrderDetails(req, res) {
        return new Promise((resolve, reject) => {
            let where = {};
            let whereCust = {};

            if (req.body.cancelOrderId) {
                where.cancel_order_id = req.body.cancelOrderId;
            }

            if (req.body.cancelReason) {
                // where.email = req.body.custEmail;
                where.cancel_reason = { [Op.like]: `%${req.body.cancelReason}%` };
            }

            if (req.body.custEmail) {
                // where.email = req.body.custEmail;
                whereCust.email = { [Op.like]: `%${req.body.custEmail}%` };
            }

            if (req.body.custMoNo) {
                // where.email = req.body.custEmail;
                whereCust.phone = { [Op.like]: `%${req.body.custMoNo}%` };
            }

            if (req.body.storeOrderNumber) {
                where.store_order_number = req.body.storeOrderNumber;
            }

            if (req.body.storeId) {
                where.store_id = req.body.storeId;
            }

            CancelOrder.belongsTo(CustomerMaster, { foreignKey: 'store_cust_id', targetKey: 'shopify_customer_id' })

            return CancelOrder.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 50,
                order: [["created_at", "DESC"]],
                include: [{
                    where:whereCust,
                    model: CustomerMaster,
                    required: false,
                }]
            })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }
}

module.exports = OrderCancelService;