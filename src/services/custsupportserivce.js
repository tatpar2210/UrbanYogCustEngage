const CustSupportMaster = require("../models").cust_support_master;
const Op = require("sequelize").Op;

class custSupportService {
    getSupportDetails(req, res) {
        return new Promise((resolve, reject) => {
            let where = {};

            if (req.body.supportId) {
                where.support_id = req.body.supportId;
            }

            if (req.body.custEmail) {
                // where.email = req.body.custEmail;
                where.cust_email = { [Op.like]: `%${req.body.custEmail}%` };
            }

            if (req.body.storeOrderId) {
                where.store_order_id = req.body.storeOrderId;
            }

            if (req.body.storeOrderNumber) {
                where.store_order_number = req.body.storeOrderNumber;
            }


            return CustSupportMaster.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 50,
                order: [["created_at", "DESC"]],
                attributes: [
                    "support_id",
                    "store_order_id",
                    "store_order_number",
                    "cust_email",
                    "issue",
                    "status",
                    "created_at",
                    "updated_at",
                ],
            })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => reject(error));
        }).catch((err) => {
            return err;
        });
    }

    saveSupportRequest(req) {
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
                    issue: { [Op.like]: `%${req.body.issue}%` },
                    store_order_id: req.body.storeOrderId,
                    cust_email: req.body.custEmail
                }
            }
            return CustSupportMaster.findAll(cnd).then((result) => {
                if (result.length <= 0) {
                    return CustSupportMaster.create({
                        store_order_id: req.body.storeOrderId,
                        store_order_number: req.body.storeOrderNumber,
                        cust_email: req.body.custEmail,
                        issue: req.body.issue,
                        status: 0,
                        created_at: dateStr
                    }).then(result => {
                        resolve(result);
                    })
                        .catch(error => reject(error));
                } else {
                    let errResp = {
                        statusCode: 101,
                        status: false,
                        message: 'Support request already raised',
                        data: []
                    }
                    resolve(errResp);
                }

            })
                .catch(error => reject(error));
        })
            .catch(err => {
                return err;
            })
    }


    updateSupportDetails(req, res) {
        return new Promise((resolve, reject) => {
            var date = new Date();
            var dateStr =
                ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                ("00" + date.getDate()).slice(-2) + "-" +
                date.getFullYear() + " " +
                ("00" + date.getHours()).slice(-2) + ":" +
                ("00" + date.getMinutes()).slice(-2) + ":" +
                ("00" + date.getSeconds()).slice(-2);

            let where = {};
            let data = {};

            if (req.body.supportId) {
                where.support_id = req.body.supportId;
            }

            if (req.body.status == 0 || req.body.status == 1) {
                data.status = req.body.status;
            }

            data.updated_at = dateStr;

            return CustSupportMaster.update(data, {
                where: where,

            }).then(result => resolve(result))
                .catch(error => reject(error));
        }).catch(err => {
            return (err.message);
        })
    }
}

module.exports = custSupportService;
