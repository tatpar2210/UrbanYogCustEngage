const CustomerMaster = require("../models").customer_master;
const ClubMaster = require("../models").wallet_club_master;
const CustomerWallet = require("../models").customer_wallet;
const CustomerWalletHistory = require("../models").customer_wallet_history;
const CustomerWalletDiscount = require("../models").customer_wallet_discount;
const Productmaster = require("../models").product_master;

const Op = require("sequelize").Op;

class WebsiteWalletService {
  async getWalletCountForWebsite(req, res) {
    try {
      let findWalletHistory = {};
      findWalletHistory.storeCustId = req.body.storeCustId;
      let walletHistoryData = await this.getWalletHistory(findWalletHistory);
      let creditArr = walletHistoryData.data.rows.filter((item) => {
        if (
          item.dataValues.transaction_type == "credit" &&
          item.dataValues.status == 1
        ) {
          return item;
        }
      });

      let debitArr = walletHistoryData.data.rows.filter((item) => {
        if (
          item.dataValues.transaction_type == "debit" &&
          item.dataValues.transaction_status == 2 &&
          item.dataValues.status == 0
        ) {
          return item;
        }
      });

      let discountArr = walletHistoryData.data.rows.filter((item) => {
        if (
          item.dataValues.transaction_type == "debit" &&
          item.dataValues.transaction_status == 3 &&
          item.dataValues.status == 0
        ) {
          return item;
        }
      });
      //get only unused reward point
      let len = walletHistoryData.data.rows.length;
      let activeCreditArr = walletHistoryData.data.rows.filter((value) => {
        var count = 0;
        for (var i = 0; i < len; i++) {
          if (
            walletHistoryData.data.rows[i].store_order_id ===
            value.store_order_id
          )
            count++;
        }
        return count === 1;
      });

      let unusedActiveCreditArr = activeCreditArr.filter((item) => {
        if (
          item.dataValues.transaction_type == "credit" &&
          item.dataValues.transaction_status == 1
        ) {
          return item;
        }
      });
      //calculate sum of credit
      let creditTotal = creditArr.reduce((a, b) => {
        return a + b.dataValues.transaction_amount;
      }, 0);

      //calculate sum of debit
      let debitTotal = debitArr.reduce((a, b) => {
        return a + b.dataValues.transaction_amount;
      }, 0);

      //calculate sum of discount rewar points
      let discountTotal = discountArr.reduce((a, b) => {
        return a + b.dataValues.transaction_amount;
      }, 0);

      //calculate sum of active credit
      let activeCreditTotal = unusedActiveCreditArr.reduce((a, b) => {
        return a + b.dataValues.transaction_amount;
      }, 0);

      //calculate actual reward amount
      let totalRewardEarned = creditTotal;
      let totalRewardRemaining = activeCreditTotal - discountTotal;

      let currentClub = await this.getCurrentClub(findWalletHistory);
      let currentClubName = "";
      if (currentClub.statusCode == 100) {
        currentClubName =
          currentClub.data.rows[0].dataValues.wallet_club_master.club_name;
      }
      let finalResp = {};
      finalResp.statusCode = 100;
      finalResp.message = "Rward point counts";
      finalResp.data = {
        remainingRewardPoint: totalRewardRemaining,
        earnedRewardPoint: activeCreditTotal,
        usedRewardPoint: discountTotal,
        currentClub: currentClubName,
      };
      finalResp.status = true;
      return finalResp;
    } catch (error) {
      let errResp = {};
      errResp.statusCode = 101;
      errResp.message = "Error in wallet count";
      errResp.data = error;
      errResp.status = true;
      return errResp;
    }
  }

  getCurrentClub(findWalletHistory) {
    return new Promise((resolve, reject) => {
      let where = {};
      if (findWalletHistory.storeCustId) {
        where.store_cust_id = findWalletHistory.storeCustId;
      }

      CustomerWallet.belongsTo(ClubMaster, {
        foreignKey: "club_id",
        targetKey: "club_id",
      });
      return CustomerWallet.findAndCountAll({
        where: where,
        attributes: ["wallet_id", "store_cust_id"],

        include: [
          {
            model: ClubMaster,
            required: true,
            attributes: ["club_id", "club_name"],
          },
        ],
      })
        .then((clubData) => {
          if (clubData.count > 0) {
            let historyResp = {
              statusCode: 100,
              status: true,
              message: "Customer Current Club",
              data: clubData,
            };
            resolve(historyResp);
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Customers current club not found",
              data: [],
            };
            resolve(errResp);
          }
        })
        .catch((error) => {
          let errResp = {
            statusCode: 101,
            status: false,
            message: "Customers current club not found",
            data: {},
          };
          resolve(errResp);
        });
    }).catch((err) => {
      return err.message;
    });
  }

  getWalletHistory(findWalletHistory) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (findWalletHistory.walletId) {
        where.wallet_id = findWalletHistory.walletId;
      }

      if (findWalletHistory.storeCustId) {
        where.store_cust_id = findWalletHistory.storeCustId;
      }

      if (findWalletHistory.storeOrderId) {
        where.store_order_id = findWalletHistory.storeOrderId;
      }

      return CustomerWalletHistory.findAndCountAll({
        where: where,
      })
        .then((walletHistoryData) => {
          if (walletHistoryData.count > 0) {
            let historyResp = {
              statusCode: 100,
              status: true,
              message: "Wallet history data",
              data: walletHistoryData,
            };
            resolve(historyResp);
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Wallet history data not found",
              data: walletHistoryData,
            };
            resolve(errResp);
          }
        })
        .catch((error) => {
          let errResp = {
            statusCode: 101,
            status: false,
            message: "Wallet history data not found",
            data: {},
          };
          resolve(errResp);
        });
    }).catch((err) => {
      return err.message;
    });
  }

  getDiscountList(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.storeCustId) {
        where.store_cust_id = req.body.storeCustId;
      }

      return CustomerWalletDiscount.findAndCountAll({
        where: where,
      })
        .then((discountList) => {
          if (discountList.count > 0) {
            let historyResp = {
              statusCode: 100,
              status: true,
              message: "Discount code list",
              data: discountList,
            };
            resolve(historyResp);
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Discount code list not found",
              data: discountList,
            };
            resolve(errResp);
          }
        })
        .catch((error) => {
          let errResp = {
            statusCode: 101,
            status: false,
            message: "Wallet history data not found",
            data: {},
          };
          resolve(errResp);
        });
    }).catch((err) => {
      return err.message;
    });
  }
}
module.exports = WebsiteWalletService;
