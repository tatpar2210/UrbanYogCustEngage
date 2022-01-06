const CustomerWalletHistory = require('../models').customer_wallet_history;
const CustomerMaster = require("../models").customer_master;

const Op = require('sequelize').Op

class CustomerWalletHistoryService {

    getWalletHistoryDetails(req, res) {
        return new Promise((resolve, reject) => {

            let where = {}
            let custWhere = {};

            if (req.body.walletHistoryId) {
                where.wallet_history_id = req.body.walletHistoryId;
            }

            if (req.body.walletId) {
                where.wallet_id = req.body.walletId;
            }

            if (req.body.custId) {
                where.cust_id = req.body.custId;
            }

            if (req.body.storeCustId) {
                where.store_cust_id = req.body.storeCustId;
            }

            if (req.body.custEmail) {
                custWhere.email = { [Op.like]: `%${req.body.custEmail}%` };
            }

            if (req.body.custContactNo) {
                custWhere.phone = { [Op.like]: `%${req.body.custContactNo}%` };
            }

            CustomerWalletHistory.belongsTo(CustomerMaster, { foreignKey: 'store_cust_id', targetKey: 'shopify_customer_id' })

            return CustomerWalletHistory.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 50,
                order: [
                    ['created_at', 'DESC']
                ],
                include: [
                    {
                        model: CustomerMaster,
                        where: custWhere,
                        // order: [
                        //     ['first_name', 'ASC']
                        // ],
                    }
                ],
            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    addWalletHistory(req) {
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
                    cust_id: req.body.custId,
                    store_order_number: req.body.storeOrderNumber,
                    transaction_type: req.body.transactionType
                }
            }
            return CustomerWalletHistory.findAll(cnd).then((result) => {
                if (result.length <= 0) {
                    return CustomerWalletHistory.create({
                        wallet_id: req.body.walletId,
                        store_order_number: req.body.storeOrderNumber,
                        store_order_id: req.body.storeOrderId,
                        cust_id: req.body.custId,
                        store_cust_id: req.body.storeCustId,
                        transaction_type: req.body.transactionType,
                        transaction_amount: req.body.transactionAmount,
                        discount_id: req.body.discountId || null,
                        pid: req.body.pid | null,
                        tpm_id: 3,
                        transaction_note: req.body.transcationNote,
                        transaction_status: req.body.transcationStatus,
                        status: 1,
                        created_at: dateStr
                    }).then(result => {
                        resolve(result);
                    })
                        .catch(error => reject(error));
                } else {
                    let errResp = {
                        statusCode: 101,
                        status: false,
                        message: 'Reward point already credited',
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

    updateWalletHistory(req, res) {

        var date = new Date();
        var dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        return new Promise((resolve, reject) => {

            let where = {};
            let data = {};
            if (req.body.walletHistoryId) {
                where.wallet_history_id = req.body.walletHistoryId;
            }

            if (req.body.transactionAmount) {
                data.transaction_amount = req.body.transactionAmount;
            }

            if (req.body.transactionStatus == 0 || req.body.transactionStatus == 1) {
                data.transaction_status = req.body.transactionStatus;
            }

            if (req.body.status == 0 || req.body.status == 1) {
                data.status = req.body.status;
            }

            data.updated_at = dateStr;

            return CustomerWalletHistory.update(data, {
                where: where,

            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    deleteWalletHistory(req, res) {
        return new Promise((resolve, reject) => {

            let where = {};

            if (req.body.walletHistoryId) {
                where.wallet_history_id = req.body.walletHistoryId;
            }

            return CustomerWalletHistory.destroy({
                where: where
            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }
}

module.exports = CustomerWalletHistoryService;