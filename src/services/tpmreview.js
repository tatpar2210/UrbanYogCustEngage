const TPMReview = require('../models').third_party_product_review;
const TPM = require("../models").third_party_master
const ProductMaster = require("../models").product_master
const Op = require('sequelize').Op

class TPMReviewService {

    getTPMReview(req, res) {
        return new Promise((resolve, reject) => {

            let where = {}

            if (req.body.tpReviewId) {
                where.tp_review_id = req.body.tpReviewId;
            }

            if (req.body.tpId) {
                where.tp_id = req.body.tpId;
            }

            if (req.body.pId) {
                where.pid = req.body.pId;
            }

            if (req.body.tpmProductUrl) {
                where.tpm_product_url = req.body.tpmProductUrl;
            }


            TPMReview.belongsTo(TPM, {
                foreignKey: "tp_id"
            })

            TPMReview.belongsTo(ProductMaster, {
                foreignKey: "pid"
            })
            

            return TPMReview.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 10,
                attributes: ['tp_review_id', 'tp_id', 'pid', 'tpm_product_url', 'updated_at', 'created_at'],
                include: [{model: TPM}, {model: ProductMaster}]
            }).then(result => resolve(result))
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }

    async createTPMReview(req) {

        var date = new Date();
        var dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

           

        return new Promise((resolve, reject) => {
            let where = [];

            let cnd = {
                where: {
                    tp_id: req.body.tpId,
                    pid: req.body.pId,
                    tpm_product_url: req.body.tpmProductUrl
                }
            }
            
            return TPMReview.findAll(cnd).then((result) => {

                if (result.length <= 0) {
                    return TPMReview.create({
                        tp_id: req.body.tpId,
                        pid: req.body.pId,
                        tpm_product_url: req.body.tpmProductUrl,
                        created_at: dateStr
                    }).then(result => {
                        resolve(result)

                    })
                        .catch(error => reject(error));
                } else {
                    let errResp = {
                        statusCode: 101,
                        status: false,
                        message: 'Third Party Product Review already exists',
                        data: []
                    }
                    resolve(errResp);
                }

            })
                .catch(error => resolve(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    updateTPMReview(req, res) {

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

            if (req.body.tpReviewId) {
                where.tp_review_id = req.body.tpReviewId;
            }

            if (req.body.tpId) {
                data.tp_id = req.body.tpId;
            }

            if (req.body.pId) {
                data.pid = req.body.pId;
            }

            if (req.body.tpmProductUrl) {
                data.tpm_product_url = req.body.tpmProductUrl;
            }

            data.updated_at = dateStr;
            
            return TPMReview.update(data, {
                where: where
            }).then(result => resolve(result))
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }

    deleteTPMReview(req, res) {
        return new Promise((resolve, reject) => {

            let where = {};

            if (req.body.tpReviewId) {
                where.tp_review_id = req.body.tpReviewId;
            }

            return TPMReview.destroy({
                where: where
            }).then(result => resolve(result))
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }
}

module.exports = TPMReviewService;