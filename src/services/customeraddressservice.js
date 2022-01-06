const CustomerMaster = require("../models").customer_master;
const CustomerAddressMaster = require("../models").customer_address_master;

const Op = require("sequelize").Op;

class customerAddressMasterService {
    getCustomerAddress(req, res) {
        return new Promise((resolve, reject) => {
            let where = {};
            let whereCustMstr = {};

            if (req.body.custId) {
                where.cust_id = req.body.custId;
            }

            if (req.body.custEmail) {
                // where.email = req.body.custEmail;
                whereCustMstr.email = { [Op.like]: `%${req.body.custEmail}%` };
            }

            if (req.body.custName) {
                where.name = { [Op.like]: `%${req.body.custName}%` };
            }

            if (req.body.custMoNo) {
                where.phone = { [Op.like]: `%${req.body.custMoNo}%` };
            }

            CustomerAddressMaster.belongsTo(CustomerMaster, { foreignKey: 'cust_id', targetKey: 'cust_id' })

            return CustomerAddressMaster.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 50,
                order: [["first_name", "ASC"]],
                // attributes: [
                //   "cust_id",
                //   "shopify_customer_id",
                //   "first_name",
                //   "last_name",
                //   "email",
                //   "phone",
                //   "created_at",
                //   "updated_at",
                // ],
                include: [
                    {
                        model: CustomerMaster,
                        where: whereCustMstr,
                        attributes: ['cust_id', 'shopify_customer_id', 'email'],
                    }
                ],
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

    updateCustomerAddressType(req, res) {
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

            if (req.body.shopifyCustomerId) {
                where.store_cust_id = req.body.shopifyCustomerId;
            }

            if (req.body.addressType) {
                data.address_type = req.body.addressType;
            }

            if (dateStr) {
                data.updated_at = dateStr;
            }

            return CustomerAddressMaster.update(data, {
                where: where
            }).then(result => resolve(result))
                .catch((error) => reject(error));
        }).catch((err) => {
            return err;
        });
    }

    addCustAddress(data, res) {
        return new Promise((resolve, reject) => {
            var date = new Date();
            var dateStr =
                ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                ("00" + date.getDate()).slice(-2) + "-" +
                date.getFullYear() + " " +
                ("00" + date.getHours()).slice(-2) + ":" +
                ("00" + date.getMinutes()).slice(-2) + ":" +
                ("00" + date.getSeconds()).slice(-2);
            let cnd = {
                where: {
                    shopify_customer_id: data.customer_id
                }
            }
            return CustomerMaster.findAll(cnd).then((custData) => {
                if (custData.length > 0) {
                    console.log(custData[0].dataValues);
                    return CustomerAddressMaster.create({
                        store_address_id: data.id,
                        cust_id: custData[0].dataValues.cust_id,
                        store_cust_id: data.customer_id,
                        address1: data.address1,
                        address2: data.address2,
                        city: data.city,
                        company: data.company,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        phone: data.phone,
                        province: data.province,
                        country: data.country,
                        zip: data.zip,
                        name: data.name,
                        province_code: data.province_code,
                        country_code: data.country_code,
                        country_name: data.country_name,
                        created_at: dateStr
                    }).then(result => resolve(result))
                        .catch(error => {
                            console.log(error);
                            reject(error)
                        });
                } else {
                    let errResp = {
                        statusCode: 101,
                        status: false,
                        message: 'Failed add address',
                        data: []
                    }
                    reject(errResp);
                }
            }).catch(err => {
                console.log(err);
                return (err.message);
            })

        })
    }


    deleteCustAddress(body, res) {
        return new Promise((resolve, reject) => {
            let where = {};

            if (body.shopifyCustomerId && body.shopifyAddressId) {
                where.store_cust_id = body.shopifyCustomerId;
                where.store_address_id = body.shopifyAddressId;
            }

            return CustomerAddressMaster.destroy({
                where: where
            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return err.message;
            })
    }
}


module.exports = customerAddressMasterService;
