const CustomerWallet = require("../models").customer_wallet;
const CustomerMaster = require("../models").customer_master;
const ClubMaster = require("../models").wallet_club_master;
const Sequelize = require("sequelize");

const Op = require("sequelize").Op;

class CustomerWalletService {
  getWalletDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};
      let custWhere = {};

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

      if (req.body.clubId) {
        where.club_id = req.body.clubId;
      }

      CustomerWallet.belongsTo(CustomerMaster, {
        foreignKey: "store_cust_id",
        targetKey: "shopify_customer_id",
      });
      CustomerWallet.belongsTo(ClubMaster, {
        foreignKey: "club_id",
        targetKey: "club_id",
      });

      return CustomerWallet.findAndCountAll({
        where: where,
        attributes: [
          "wallet_id",
          "total_amount",
          "status",
          "created_at",
          "updated_at",
        ],
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        include: [
          {
            model: CustomerMaster,
            where: custWhere,
            attributes: [
              "cust_id",
              "shopify_customer_id",
              "first_name",
              "last_name",
              "email",
              "phone",
            ],
          },
          {
            model: ClubMaster,
            attributes: ["club_id", "club_name"],
          },
        ],
        order: [[CustomerMaster, "first_name", "ASC"]],
        raw: true,
        nest: true,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  addWallet(req) {
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

    return new Promise((resolve, reject) => {
      let cnd = {
        where: {
          cust_id: req.body.custId,
        },
      };
      return CustomerWallet.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            return CustomerWallet.create({
              cust_id: req.body.custId,
              store_cust_id: req.body.storeCustId,
              total_amount: req.body.totalAmount,
              club_id: req.body.clubId || 1,
              status: 1,
              created_at: dateStr,
            })
              .then((result) => {
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Wallet already present",
              data: [],
            };
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  updateWalletHistory(req, res) {
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

    return new Promise((resolve, reject) => {
      let where = {};
      let data = {};
      if (req.body.walletId) {
        where.wallet_id = req.body.walletId;
      }

      if (req.body.totalAmount) {
        data.total_amount = req.body.totalAmount;
      }

      if (req.body.clubId) {
        data.club_id = req.body.clubId;
      }

      if (req.body.status == 0 || req.body.status == 1) {
        data.status = req.body.status;
      }

      data.updated_at = dateStr;

      return CustomerWallet.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  deleteWallet(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.walletId) {
        where.wallet_id = req.body.walletId;
      }

      return CustomerWallet.destroy({
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  getWalletCustomerDetails(req, res) {
    return new Promise((resolve, reject) => {
      let whereWallet = {};
      let whereCustomer = {};

      if (req.body.walletId) {
        whereWallet.wallet_id = req.body.walletId;
      }

      if (req.body.custId) {
        whereCustomer.cust_id = req.body.custId;
      }

      if (req.body.storeCustId) {
        whereCustomer.store_cust_id = req.body.storeCustId;
      }

      if (req.body.clubId) {
        whereWallet.club_id = req.body.clubId;
      }

      if (req.body.custName) {
        whereCustomer.first_name = { [Op.like]: `%${req.body.custName}%` };
      }

      CustomerMaster.belongsTo(CustomerWallet, {
        foreignKey: "shopify_customer_id",
        targetKey: "store_cust_id",
      });

      return CustomerMaster.findAndCountAll({
        where: whereCustomer,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        attributes: [
          [
            Sequelize.literal("CONCAT(first_name, ' ', last_name)"),
            "full_name",
          ],
          "shopify_customer_id",
          "first_name",
          "last_name",
          "email",
          "phone",
        ],
        order: [["first_name", "ASC"]],
        include: [
          {
            model: CustomerWallet,
            where: whereWallet,
            order: [["first_name", "ASC"]],
          },
        ],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }
}

module.exports = CustomerWalletService;
