const CustomerMaster = require("../models").customer_master;
const ClubMaster = require("../models").wallet_club_master;
const CustomerWallet = require("../models").customer_wallet;
const CustomerWalletHistory = require("../models").customer_wallet_history;
const CustomerWalletDiscount = require("../models").customer_wallet_discount;
const Productmaster = require("../models").product_master;
const DiscountHelper = require("../helpers/shopifyDiscountHelper");
const discountHelper = new DiscountHelper();
const { QueryTypes } = require("sequelize");
const db = require("../models");
const Op = require("sequelize").Op;

class customerWalletOrderService {
  async addReward(webhookData, res) {
    let errResp = {};
    var finalResp;
    var createWalletData;
    var walletId;
    var pid = 0;
    var productName = "";
    var storeOrderNumber = webhookData.order_number || null;
    var storeOrderId = webhookData.id || 0;
    var storeCustId = webhookData.customer.id;
    var amount = webhookData.total_price || 200;
    // var storeOrderNumber = 110208;
    // var storeOrderId = 28491410310780;
    // var storeCustId = 4069169168550;
    // var amount = 900;
    var custId;
    var orderData = {};
    var rewardAmount = 0;
    var existingClubId = 0;
    var clubData;
    try {
      // return new Promise((resolve, reject) => {

      //find customer details by shopify customer id
      // let custData = await this.findCust(storeCustId);
      // if (custData.statusCode == 101) {
      //     finalResp = custData;
      //     errResp.statusCode = 100;
      //     errResp.message = finalResp.message;
      //     errResp.data = finalResp.data;
      //     errResp.status = true;
      //     return errResp;
      // }
      // custId = custData.data.dataValues.cust_id;
      //find customer wallet data
      let walletData = await this.findWallet(storeCustId);
      //check if customer wallet data is present or not
      if ((walletData.statusCode = 101)) {
        //if not then create an entry in customer_wallet
        createWalletData = await this.createWallet(storeCustId, amount);
        //check before creating wallet entry that does customer wallet record available
        if (createWalletData.statusCode == 101) {
          //if available we will get existing wallet data
          walletId = createWalletData.data[0].dataValues.wallet_id;
          existingClubId = createWalletData.data[0].dataValues.club_id;
          //get discount_percentage of club_id
          let clubCnd = {};
          clubCnd.clubId = existingClubId;
          clubData = await this.getClub(clubCnd);
          let percentage = clubData.data.dataValues.discount_percentage;
          //calculate rewardAmount or order amount
          rewardAmount = this.rewardCal(amount, percentage);
        } else if (createWalletData.statusCode == 100) {
          //else we will get new wallet_id
          walletId = createWalletData.data.wallet_id;
          rewardAmount = createWalletData.rewardAmount;
        }

        // create new reward point entry for new order
        orderData.walletId = walletId;
        orderData.storeOrderNumber = storeOrderNumber;
        orderData.storeOrderId = storeOrderId;
        // orderData.custId = custId;
        orderData.storeCustId = storeCustId;
        orderData.transactionType = "credit";
        orderData.transactionAmount = rewardAmount;
        orderData.discountId = null;
        orderData.pid = null;
        orderData.tpmId = 3;
        orderData.transcationNote =
          "Reward point is credited aginst order number " + storeOrderNumber;
        orderData.transcationStatus = 0;
        orderData.status = 1;
        orderData.createdAt = this.getCurrentDateTime();
        orderData.expiredAt = this.getExpiredDateTime();

        let walletHistory = await this.createWalletHistory(orderData);
        if (walletHistory.statusCode == 100) {
          let findWalletHistory = {};
          walletId = walletHistory.data.dataValues.wallet_id;
          findWalletHistory.walletId = walletHistory.data.dataValues.wallet_id;
          findWalletHistory.storeCustId =
            walletHistory.data.dataValues.store_cust_id;

          //get all credit debit history of customer
          let walletHistoryData = await this.getWalletHistory(
            findWalletHistory
          );
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

          // if (totalRewardRemaining < discountTotal) {
          //     errResp.statusCode = 101;
          //     errResp.message = 'Total disocunt amount should not greater than total active credit amount';
          //     errResp.data = [];
          //     errResp.status = false;
          //     return errResp;
          // }

          let clubCnd2 = {};
          clubCnd2.clubEntryPoint = totalRewardEarned;

          //check if total earned reward points are greater than the next club entry point
          let clubResult = await this.getAllClub();
          let updatedClubId = 0;
          let resultClub = clubResult.data.forEach((obj) => {
            if (totalRewardRemaining >= obj.dataValues.club_entry_point) {
              updatedClubId = obj.dataValues.club_id;
            }
          });
          let walletUpdateData = {};
          walletUpdateData.walletId = walletId;
          walletUpdateData.storeCustId = storeCustId;
          walletUpdateData.clubId = updatedClubId;
          walletUpdateData.totalAmount = totalRewardRemaining;

          let custWalletupdate = await this.updateWallet(walletUpdateData);

          finalResp = walletHistory;
        } else {
          finalResp = walletHistory;
        }
      } else {
        finalResp = walletData;
      }

      if (finalResp.statusCode == 100) {
        errResp.statusCode = 100;
        errResp.message = finalResp.message;
        errResp.data = finalResp.data;
        errResp.status = true;
        return errResp;
      } else {
        errResp.statusCode = 101;
        errResp.message = finalResp.message;
        errResp.data = finalResp.data;
        errResp.status = false;
        return errResp;
      }
      // })
    } catch (error) {
      errResp.statusCode = 101;
      errResp.message = error;
      errResp.data = [];
      errResp.status = false;
      return errResp;
    }
  }

  async updateReward(webhookOrderCancel, res) {
    let errResp = {};
    let findWalletHistory = {};
    var orderData = {};
    var finalResp;
    var walletId;
    let storeOrderId = webhookOrderCancel.id || 0;
    let storeOrderNumber = webhookOrderCancel.order_number || 0;
    let storeCustId = webhookOrderCancel.customer.id;
    findWalletHistory.storeOrderId = storeOrderId;
    findWalletHistory.storeCustId = storeCustId;

    try {
      let walletHistoryData = await this.getWalletHistory(findWalletHistory);
      if (walletHistoryData.statusCode == 100) {
        if (walletHistoryData.data.count == 1) {
          const { data: { rows } = [] } = walletHistoryData;
          // create debit recored for order cancellation
          orderData.walletHistoryId = rows[0].dataValues.wallet_history_id;
          orderData.walletId = rows[0].dataValues.wallet_id;
          orderData.storeOrderNumber = storeOrderNumber;
          orderData.storeOrderId = storeOrderId;
          // orderData.custId = custId;
          orderData.storeCustId = storeCustId;
          orderData.transactionType = "debit";
          orderData.transactionAmount = rows[0].dataValues.transaction_amount;
          orderData.discountId = null;
          orderData.pid = null;
          orderData.tpmId = rows[0].dataValues.tpm_id;
          orderData.transcationNote =
            "Reward point is debited aginst cancellation of order number " +
            storeOrderNumber;
          orderData.transcationStatus = 2;
          orderData.status = 0;
          orderData.createdAt = this.getCurrentDateTime();
          orderData.expiredAt = this.getCurrentDateTime();

          let walletHistory = await this.createWalletHistory(orderData);
          let updateWalletHistoryData = await this.updateWalletHistoryStatus(
            orderData
          );
          if (walletHistory.statusCode == 100) {
            let findWalletHistory = {};
            walletId = walletHistory.data.dataValues.wallet_id;
            findWalletHistory.walletId =
              walletHistory.data.dataValues.wallet_id;
            findWalletHistory.storeCustId =
              walletHistory.data.dataValues.store_cust_id;

            //get all credit debit history of customer
            let walletHistoryData = await this.getWalletHistory(
              findWalletHistory
            );
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
            let activeCreditArr = walletHistoryData.data.rows.filter(
              (value) => {
                var count = 0;
                for (var i = 0; i < len; i++) {
                  if (
                    walletHistoryData.data.rows[i].store_order_id ===
                    value.store_order_id
                  )
                    count++;
                }
                return count === 1;
              }
            );

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

            // if (totalRewardRemaining < discountTotal) {
            //     errResp.statusCode = 101;
            //     errResp.message = 'Total disocunt amount should not greater than total active credit amount';
            //     errResp.data = [];
            //     errResp.status = false;
            //     return errResp;
            // }

            let clubCnd2 = {};
            clubCnd2.clubEntryPoint = totalRewardEarned;

            //check if total earned reward points are greater than the next club entry point
            let clubResult = await this.getAllClub();
            let updatedClubId = 0;
            let resultClub = clubResult.data.forEach((obj) => {
              if (totalRewardRemaining >= obj.dataValues.club_entry_point) {
                updatedClubId = obj.dataValues.club_id;
              }
            });
            let walletUpdateData = {};
            walletUpdateData.walletId = walletId;
            walletUpdateData.storeCustId = storeCustId;
            walletUpdateData.clubId = updatedClubId;
            walletUpdateData.totalAmount = totalRewardRemaining;
            let custWalletupdate = await this.updateWallet(walletUpdateData);

            let debitRes = {};
            debitRes.statusCode = 101;
            debitRes.message = "Wallet amount debited";
            debitRes.data = [];
            debitRes.status = false;
            finalResp = debitRes;
          } else {
            let debitRes = {};
            debitRes.statusCode = 101;
            debitRes.message = "Failed to debit reward from wallet";
            debitRes.data = [];
            debitRes.status = false;
            finalResp = debitRes;
          }
        } else {
          errResp.statusCode = 101;
          errResp.message = "Wallet amount alrady debited";
          errResp.data = [];
          errResp.status = false;
          return errResp;
        }
      } else {
        errResp.statusCode = 101;
        errResp.message = "Wallet history not found";
        errResp.data = [];
        errResp.status = false;
        return errResp;
      }
      return finalResp;
    } catch (error) {
      errResp.statusCode = 101;
      errResp.message = error;
      errResp.data = [];
      errResp.status = false;
      return errResp;
    }
  }

  async activateReward(webhookFulfillmentEvent, res) {
    if (webhookFulfillmentEvent.shipment_status == "delivered") {
      let errResp = {};
      let findWalletHistory = {};
      var orderData = {};
      var finalResp;
      var walletId;
      let storeOrderId = webhookFulfillmentEvent.order_id || 0;
      let shipmentStatus = webhookFulfillmentEvent.shipment_status;
      let storeCustId = 0;

      try {
        findWalletHistory.storeOrderId = storeOrderId;
        let walletHistory = await this.getWalletHistory(findWalletHistory);

        if (walletHistory.statusCode == 100) {
          walletId = walletHistory.data.rows[0].dataValues.wallet_id;
          findWalletHistory.walletId =
            walletHistory.data.rows[0].dataValues.wallet_id;
          findWalletHistory.storeCustId =
            walletHistory.data.rows[0].dataValues.store_cust_id;
          storeCustId = walletHistory.data.rows[0].dataValues.store_cust_id;

          orderData.store_order_id = storeOrderId;
          orderData.transaction_status = 1;
          orderData.status = 1;
          let updateWalletHistoryData =
            await this.updateWalletHistoryTransactionStatus(orderData);

          //get all credit debit history of customer
          let walletHistoryData = await this.getWalletHistory(
            findWalletHistory
          );
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
          // if (totalRewardRemaining < discountTotal) {
          //     errResp.statusCode = 101;
          //     errResp.message = 'Total disocunt amount should not greater than total active credit amount';
          //     errResp.data = [];
          //     errResp.status = false;
          //     return errResp;
          // }

          let clubCnd2 = {};
          clubCnd2.clubEntryPoint = totalRewardEarned;

          //check if total earned reward points are greater than the next club entry point
          let clubResult = await this.getAllClub();
          let updatedClubId = 0;
          let resultClub = clubResult.data.forEach((obj) => {
            if (totalRewardRemaining >= obj.dataValues.club_entry_point) {
              updatedClubId = obj.dataValues.club_id;
            }
          });
          let walletUpdateData = {};
          walletUpdateData.walletId = walletId;
          walletUpdateData.storeCustId = storeCustId;
          walletUpdateData.clubId = updatedClubId;
          walletUpdateData.totalAmount = totalRewardRemaining;
          let custWalletupdate = await this.updateWallet(walletUpdateData);

          let debitRes = {};
          debitRes.statusCode = 100;
          debitRes.message = "Reward point credited";
          debitRes.data = [];
          debitRes.status = true;
          finalResp = debitRes;
        } else {
          let debitRes = {};
          debitRes.statusCode = 101;
          debitRes.message = "Order not found";
          debitRes.data = [];
          debitRes.status = false;
          finalResp = debitRes;
        }
        return finalResp;
      } catch (error) {
        errResp.statusCode = 101;
        errResp.message = error;
        errResp.data = [];
        errResp.status = false;
        return errResp;
      }
    } else {
      let errResp = {};
      errResp.statusCode = 101;
      errResp.message = "Order is not delivered yet";
      errResp.data = [];
      errResp.status = false;
      return errResp;
    }
  }

  async convertRewardToDiscount(req, res) {
    try {
      let findWalletHistory = {};
      var orderData = {};
      var finalResp;
      var walletId;
      let discountData = {};
      let storeCustId = req.body.custStoreId;
      let errResp = {};
      let discountPoint = req.body.rewardPoint;
      let discountTitle = "";
      let custWallet = await this.findWallet(storeCustId);
      if (custWallet.statusCode == 100) {
        if (discountPoint <= custWallet.data.dataValues.total_amount) {
          let code = await this.getCode();
          let priceruleData = {};
          priceruleData.title = code[0].code;
          priceruleData.value = discountPoint;
          priceruleData.prerequisite_customer_ids = storeCustId;

          let priceruleObj = await discountHelper.createPriceRule(
            priceruleData
          );
          if (priceruleObj && priceruleObj.price_rule) {
            let { price_rule } = priceruleObj;
            discountTitle = price_rule.title;
            let discountObj = await discountHelper.createDiscount(
              price_rule.title,
              price_rule.id
            );
            walletId = custWallet.data.dataValues.wallet_id;
            discountData.walletId = walletId;
            discountData.storeCustId = storeCustId;
            discountData.transactionType = "debit";
            discountData.transactionAmount = discountPoint;
            discountData.tpmId = 3;
            discountData.transcationNote =
              "Reward point converted to discount code " +
              discountTitle +
              " worth Rs. " +
              discountPoint;
            discountData.transcationStatus = 3;
            discountData.status = 0;
            discountData.createdAt = this.getCurrentDateTime();
            discountData.expiredAt = this.getExpiredDateTime();

            let updateWalletHistoryData =
              await this.createWalletDiscountHistory(discountData);

            //get all credit debit history of customer
            findWalletHistory.storeCustId = storeCustId;

            let walletHistoryData = await this.getWalletHistory(
              findWalletHistory
            );
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
            let activeCreditArr = walletHistoryData.data.rows.filter(
              (value) => {
                var count = 0;
                for (var i = 0; i < len; i++) {
                  if (
                    walletHistoryData.data.rows[i].store_order_id ===
                    value.store_order_id
                  )
                    count++;
                }
                return count === 1;
              }
            );

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

            // if (totalRewardRemaining < discountTotal) {
            //     errResp.statusCode = 101;
            //     errResp.message = 'Total disocunt amount should not greater than total active credit amount';
            //     errResp.data = [];
            //     errResp.status = false;
            //     return errResp;
            // }

            let clubCnd2 = {};
            clubCnd2.clubEntryPoint = totalRewardEarned;

            //check if total earned reward points are greater than the next club entry point
            let clubResult = await this.getAllClub();
            let updatedClubId = 0;
            let resultClub = clubResult.data.forEach((obj) => {
              if (totalRewardRemaining >= obj.dataValues.club_entry_point) {
                updatedClubId = obj.dataValues.club_id;
              }
            });
            let walletUpdateData = {};
            walletUpdateData.walletId = walletId;
            walletUpdateData.storeCustId = storeCustId;
            walletUpdateData.clubId = updatedClubId;
            walletUpdateData.totalAmount = totalRewardRemaining;
            let custWalletupdate = await this.updateWallet(walletUpdateData);
            let walObj = {};
            walObj.walletId = walletId;
            walObj.storeCustId = storeCustId;
            walObj.discountCode = discountTitle;
            walObj.discountValue = discountPoint;
            walObj.status = 1;
            walObj.createdAt = this.getCurrentDateTime();

            let custDiscount = await this.createCustomerWalletDiscount(walObj);

            let debitRes = {};
            debitRes.statusCode = 100;
            debitRes.message = "Reward points are converted to discount code";
            debitRes.data = [];
            debitRes.status = true;
            finalResp = debitRes;
            return finalResp;
          } else {
            errResp = {
              statusCode: 101,
              status: false,
              message: "Failed to create price rule",
              data: [],
            };
            return errResp;
          }
        } else {
          errResp = {
            statusCode: 101,
            status: false,
            message:
              "Reward point should be less than active reward point in wallet",
            data: [],
          };
          return errResp;
        }
      } else {
      }
    } catch (error) {
      return error;
    }
  }

  getCode() {
    return new Promise((resolve, reject) => {
      db.sequelize
        .query(`SELECT LEFT(REPLACE(UUID(), '-', ''), 5) as code`, {
          type: QueryTypes.SELECT,
        })
        .then((code) => {
          resolve(code);
        })
        .catch((err) => reject(err));
    });
  }

  findCust(storeCustId) {
    return new Promise((resolve, reject) => {
      let where = {};
      let errResp = {};
      if (storeCustId) {
        where.shopify_customer_id = storeCustId;
      } else {
        errResp.statusCode = 101;
        errResp.message = "Shopfiy customer id is required";
        errResp.data = {};
        errResp.status = false;

        resolve(errResp);
      }

      return CustomerMaster.findOne({
        where: where,
        attributes: ["cust_id", "shopify_customer_id"],
      })
        .then((custWalletData) => {
          if (custWalletData) {
            errResp.statusCode = 100;
            errResp.message = "Customer details found";
            errResp.data = custWalletData;
            errResp.status = true;
            resolve(errResp);
          } else {
            errResp.statusCode = 101;
            errResp.message = "Customer details not found";
            errResp.data = null;
            errResp.status = false;

            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  findWallet(storeCustId) {
    return new Promise((resolve, reject) => {
      let where = {};
      let errResp = {};
      if (storeCustId) {
        where.store_cust_id = storeCustId;
      } else {
        errResp.statusCode = 101;
        errResp.message = "Shopfiy customer id is required";
        errResp.data = {};
        errResp.status = false;

        resolve(errResp);
      }

      return CustomerWallet.findOne({
        where: where,
      })
        .then((custData) => {
          if (custData) {
            errResp.statusCode = 100;
            errResp.message = "Customer wallet details found";
            errResp.data = custData;
            errResp.status = true;
            resolve(errResp);
          } else {
            errResp.statusCode = 101;
            errResp.message = "Customer wallet details not found";
            errResp.data = null;
            errResp.status = false;
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  createWallet(storeCustId, amount) {
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
          store_cust_id: storeCustId,
        },
      };
      return CustomerWallet.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            let clubData = {};
            let clubId = 1;
            clubData.clubId = clubId;
            return this.getClub(clubData)
              .then((clubData) => {
                let percentage = clubData.data.dataValues.discount_percentage;
                clubId = clubData.data.dataValues.club_id;
                let rewardAmount = this.rewardCal(amount, percentage);
                return CustomerWallet.create({
                  // cust_id: custId,
                  store_cust_id: storeCustId,
                  total_amount: 0,
                  club_id: clubId || 1,
                  status: 1,
                  created_at: dateStr,
                })
                  .then((walletData) => {
                    let errResp = {
                      statusCode: 100,
                      status: true,
                      message: "Wallet created",
                      data: walletData,
                      rewardAmount: rewardAmount,
                    };
                    resolve(errResp);
                  })
                  .catch((error) => reject(error));
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Wallet already present",
              data: result,
            };
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  createWalletDiscountHistory(discountData) {
    return new Promise((resolve, reject) => {
      return CustomerWalletHistory.create({
        wallet_id: discountData.walletId,
        store_cust_id: discountData.storeCustId,
        transaction_type: discountData.transactionType,
        transaction_amount: discountData.transactionAmount,
        tpm_id: discountData.tpmId,
        transaction_note: discountData.transcationNote,
        transaction_status: discountData.transcationStatus,
        status: discountData.status,
        created_at: discountData.createdAt,
        expired_at: discountData.expiredAt,
      })
        .then((rewardCreditdata) => {
          let rewardResp = {
            statusCode: 100,
            status: true,
            message: "Reward points converted to discount code successfully",
            data: rewardCreditdata,
          };
          resolve(rewardResp);
        })
        .catch((error) => reject(error));
    }).catch((error) => {
      reject(error);
    });
  }

  createCustomerWalletDiscount(discountData) {
    return new Promise((resolve, reject) => {
      return CustomerWalletDiscount.create({
        wallet_id: discountData.walletId,
        store_cust_id: discountData.storeCustId,
        discount_code: discountData.discountCode,
        discount_value: discountData.discountValue,
        status: discountData.status,
        created_at: discountData.createdAt,
      })
        .then((rewardCreditdata) => {
          let rewardResp = {
            statusCode: 100,
            status: true,
            message: "Discount added successfully",
            data: rewardCreditdata,
          };
          resolve(rewardResp);
        })
        .catch((error) => reject(error));
    }).catch((error) => {
      reject(error);
    });
  }

  createWalletHistory(orderData) {
    return new Promise((resolve, reject) => {
      let cnd = {
        where: {
          store_cust_id: orderData.storeCustId,
          store_order_number: orderData.storeOrderNumber,
          transaction_type: orderData.transactionType,
        },
      };
      return CustomerWalletHistory.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            return CustomerWalletHistory.create({
              wallet_id: orderData.walletId,
              store_order_number: orderData.storeOrderNumber,
              store_order_id: orderData.storeOrderId,
              // cust_id: orderData.custId,
              store_cust_id: orderData.storeCustId,
              transaction_type: orderData.transactionType,
              transaction_amount: orderData.transactionAmount,
              discount_id: orderData.discountId || null,
              pid: orderData.pid,
              tpm_id: orderData.tpmId,
              transaction_note: orderData.transcationNote,
              transaction_status: orderData.transcationStatus,
              status: orderData.status,
              created_at: orderData.createdAt,
              expired_at: orderData.expiredAt,
            })
              .then((rewardCreditdata) => {
                let errResp = {
                  statusCode: 100,
                  status: true,
                  message:
                    "Reward points added against order number " +
                    orderData.storeOrderNumber,
                  data: rewardCreditdata,
                };
                resolve(errResp);
              })
              .catch((error) => reject(error));
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Reward point already credited",
              data: [],
            };
            resolve(errResp);
          }
        })
        .catch((error) => {
          reject(error);
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

  updateWallet(walletData) {
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
      if (walletData.walletId) {
        where.wallet_id = walletData.walletId;
        where.store_cust_id = walletData.storeCustId;
      }

      data.total_amount = walletData.totalAmount || 0;

      if (walletData.clubId) {
        data.club_id = walletData.clubId;
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

  getClub(clubData) {
    return new Promise((resolve, reject) => {
      let where = {};
      let errResp = {};
      if (clubData && clubData.clubId) {
        where.club_id = clubData.clubId;
      }

      if (clubData && clubData.clubEntryPoint) {
        where.club_entry_point = { [Op.lte]: clubData.clubEntryPoint };
      }

      return ClubMaster.findOne({
        where: where,
      })
        .then((custData) => {
          if (custData) {
            errResp.statusCode = 100;
            errResp.message = "Club details found";
            errResp.data = custData;
            errResp.status = true;
            resolve(errResp);
          } else {
            errResp.statusCode = 101;
            errResp.message = "Club details not found";
            errResp.data = null;
            errResp.status = false;
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  getAllClub() {
    let errResp = {};
    return new Promise((resolve, reject) => {
      return ClubMaster.findAll({})
        .then((custData) => {
          if (custData) {
            errResp.statusCode = 100;
            errResp.message = "Club details found";
            errResp.data = custData;
            errResp.status = true;
            resolve(errResp);
          } else {
            errResp.statusCode = 101;
            errResp.message = "Club details not found";
            errResp.data = null;
            errResp.status = false;
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  getProduct(storeProductId) {
    return new Promise((resolve, reject) => {
      let where = {};
      let errResp = {};
      if (storeProductId) {
        where.product_id = storeProductId;
      } else {
        errResp.statusCode = 101;
        errResp.message = "Store product id is required";
        errResp.data = {};
        errResp.status = false;

        resolve(errResp);
      }

      return Productmaster.findOne({
        where: where,
        attributes: ["pid", "product_id", "product_name"],
      })
        .then((productData) => {
          if (productData) {
            errResp.statusCode = 100;
            errResp.message = "Product details found";
            errResp.data = productData;
            errResp.status = true;
            resolve(errResp);
          } else {
            errResp.statusCode = 101;
            errResp.message = "Product details not found";
            errResp.data = null;
            errResp.status = false;
            resolve(errResp);
          }
        })
        .catch((error) => reject(error));
    });
  }

  updateWalletHistoryTransactionStatus(updateData) {
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

      where.store_order_id = updateData.store_order_id;
      data.transaction_status = updateData.transaction_status;
      data.status = updateData.status;
      data.updated_at = this.getCurrentDateTime();

      return CustomerWalletHistory.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  updateWalletHistoryStatus(updateData) {
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

      if (updateData.walletHistoryId) {
        where.wallet_history_id = updateData.walletHistoryId;
      }

      data.status = updateData.status;
      data.updated_at = this.getCurrentDateTime();

      return CustomerWalletHistory.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      return err.message;
    });
  }

  rewardCal(amount, percentage) {
    let rewardAmount = (amount * percentage) / 100;
    return (rewardAmount = Math.ceil(rewardAmount));
  }

  addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  getCurrentDateTime() {
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
    return dateStr;
  }
  getExpiredDateTime() {
    var date = new Date();
    let expiredAt = this.addMonths(new Date(), 6);
    expiredAt =
      ("00" + (expiredAt.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + expiredAt.getDate()).slice(-2) +
      "-" +
      expiredAt.getFullYear() +
      " " +
      ("00" + expiredAt.getHours()).slice(-2) +
      ":" +
      ("00" + expiredAt.getMinutes()).slice(-2) +
      ":" +
      ("00" + expiredAt.getSeconds()).slice(-2);
    return expiredAt;
  }
}

module.exports = customerWalletOrderService;
