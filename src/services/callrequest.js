const CallRequest = require('../models').call_request;
const Op = require('sequelize').Op

class CallRequestService {

    getCallRequest(req, res) {
        return new Promise((resolve, reject) => {

            let where = {}

            if (req.body.callReqId) {
                where.call_req_id = req.body.callReqId;
            }

            if (req.body.custName) {
                where.cust_name = req.body.custName;
            }

            if (req.body.custEmail) {
                where.cust_email = req.body.custEmail;
            }

            if (req.body.contactNo) {
                where.contact_no = req.body.contactNo;
            }

            return CallRequest.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 10,
                attributes: ['call_req_id', 'cust_name', 'cust_email', 'contact_no', 'status', 'updated_at', 'created_at'],
                order: [
                    ['call_req_id', 'DESC']
                  ]
            }).then(result => resolve(result))
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }

    createCallRequest(req) {

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
                    cust_name: { [Op.like]: `%${req.body.custName}%` },
                    cust_email: { [Op.like]: `%${req.body.custEmail}%` },
                    contact_no: { [Op.like]: `%${req.body.contactNo}%` }
                }
            }

            return CallRequest.create({

                cust_name: req.body.custName,
                cust_email: req.body.custEmail,
                contact_no: req.body.contactNo,
                created_at: dateStr
                
            }).then(result => {
                resolve(result)

            })
                .catch(error => reject(error));
            
        })
            .catch(err => {
                return (err.message)
            })
    }

    updateCallRequest(req, res) {

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

            if (req.body.callReqId) {
                where.call_req_id = req.body.callReqId;
            }

            if (req.body.custName) {
                data.cust_name = req.body.custName;
            }

            if (req.body.custEmail) {
                data.cust_email = req.body.custEmail;
            }

            if (req.body.contactNo) {
                data.contact_no = req.body.contactNo;
            }

            if (req.body.status) {
                data.status = req.body.status;

            }else{
                data.status = 0;
            }
            

            data.updated_at = dateStr;
            
            return CallRequest.update(data, {
                where: where,
                
            }).then(result => resolve(result))
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }

    deleteCallRequest(req, res) {
        return new Promise((resolve, reject) => {

            let where = {};

            if (req.body.callReqId) {
                where.call_req_id = req.body.callReqId;
            }

            return CallRequest.destroy({
                where: where
            }).then(result => resolve(result))
                .catch(error => resolve(error));
        })
            .catch(err => {
                reject(err.message)
            })
    }
}

module.exports = CallRequestService;