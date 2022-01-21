const CustomerMaster = require("../models").customer_master;
const CustomerAddressMaster = require("../models").customer_address_master;
const CustomerProfileImg = require("../models").customer_profile_img;

const Op = require("sequelize").Op;

class customerMasterService {
  getCustomerCount(data) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (data.custId) {
        where.cust_id = data.custId;
      }

      if (data.custEmail) {
        // where.email = req.body.custEmail;
        where.email = data.custEmail;
      }

      if (data.custName) {
        where.first_name = data.custName;
      }

      if (data.custMoNo) {
        where.phone = data.custMoNo;
      }
      return CustomerMaster.count({
        where: where,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

  getCustomerDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.custId) {
        where.cust_id = req.body.custId;
      }

      if (req.body.custEmail) {
        // where.email = req.body.custEmail;
        where.email = { [Op.like]: `%${req.body.custEmail}%` };
      }

      if (req.body.custName) {
        where.first_name = { [Op.like]: `%${req.body.custName}%` };
      }

      if (req.body.custMoNo) {
        where.phone = { [Op.like]: `%${req.body.custMoNo}%` };
      }

      CustomerMaster.hasMany(CustomerAddressMaster, {
        foreignKey: "cust_id",
        targetKey: "cust_id",
      });
      CustomerMaster.belongsTo(CustomerProfileImg, {
        foreignKey: "shopify_customer_id",
        targetKey: "store_cust_id",
      });

      return CustomerMaster.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        order: [["first_name", "ASC"]],
        attributes: [
          "cust_id",
          "shopify_customer_id",
          "first_name",
          "last_name",
          "email",
          "phone",
          "created_at",
          "updated_at",
        ],
        include: [
          {
            model: CustomerAddressMaster,
            required: false,
            // attributes: ['product_name']
          },
          {
            model: CustomerProfileImg,
            required: false,
            // attributes: ['weight', 'selling_price', 'base_price']
          },
        ],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

  getCustomerDetailsForWebsite(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.shopifyCustomerId) {
        where.shopify_customer_id = req.body.shopifyCustomerId;
      }

      if (req.body.custEmail) {
        // where.email = req.body.custEmail;
        where.email = { [Op.like]: `%${req.body.custEmail}%` };
      }
      return CustomerMaster.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        order: [["first_name", "ASC"]],
        attributes: ["email", "phone", "gender", "dob"],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err;
    });
  }

  updateCustomerWebsite(req, res) {
    return new Promise((resolve, reject) => {
      var date = new Date();
      var dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2) +
        "-" +
        date.getFullYear() +
        " " +
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2);

      let where = {};
      let data = {};

      if (req.body.shopifyCustomerId) {
        where.shopify_customer_id = req.body.shopifyCustomerId;
      }

      if (req.body.gender) {
        data.gender = req.body.gender;
      }

      if (req.body.dob) {
        data.dob = req.body.dob;
      }

      data.updated_at = dateStr;

      return CustomerMaster.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  uploadCustProfileImg(store_cust_id, imgFolderPath, res) {
    return new Promise((resolve, reject) => {
      var date = new Date();
      var dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2) +
        "-" +
        date.getFullYear() +
        " " +
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2);
      let custAddressCnd = {
        where: {
          store_cust_id: Number(store_cust_id),
        },
      };

      return CustomerProfileImg.findAll(custAddressCnd)
        .then((customerData) => {
          if (customerData.length <= 0) {
            return CustomerProfileImg.create({
              store_cust_id: Number(store_cust_id),
              img_path: imgFolderPath,
              created_at: dateStr,
            })
              .then((uploadData) => {
                resolve(uploadData);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          } else {
            return CustomerProfileImg.update(
              {
                img_path: imgFolderPath,
                updated_at: dateStr,
              },
              {
                where: {
                  store_cust_id: Number(store_cust_id),
                },
              }
            )
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }).catch((err) => {
      if (err) {
        return err;
      }
    });
  }

  getProfilePhoto(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.shopifyCustomerId) {
        where.store_cust_id = req.body.shopifyCustomerId;
      }

      return CustomerProfileImg.findAndCountAll({ where: where })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }
}

module.exports = customerMasterService;
