var Sequelize = require("sequelize");

const CustomerWalletHistory = require('../models').customer_wallet_history;
class dashboardWalletService {

    async getWalletCount(req, res) {
        let allCreditSum = 0;
        let activeCreditSum = 0;
        let debitSum = 0;
        let walletObj = {};
    
        allCreditSum = await this.getAllCreditSum();
        activeCreditSum = await this.getActiveCreditSum();
        debitSum = await this.getDebitSum();
    
        if (allCreditSum && allCreditSum.length > 0) {
          walletObj.allCreditSum = allCreditSum[0].dataValues.allCreditSum || 0;
        }
    
        if (activeCreditSum && activeCreditSum.length > 0) {
          walletObj.activeCreditSum = activeCreditSum[0].dataValues.activeCreditSum || 0;
        }
    
        if (debitSum && debitSum.length > 0) {
          walletObj.debitSum = debitSum[0].dataValues.debitSum || 0;
        }
    
        return walletObj;
      }
    
      getAllCreditSum() {
        return new Promise((resolve, reject) => {
          return CustomerWalletHistory.findAll({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('customer_wallet_history.transaction_amount')), 'allCreditSum']],
            // group: ['customer_wallet_history.transaction_amount'],
            where: { 'transaction_type': 'credit' }
          })
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        }).catch((err) => {
          console.error(err);
          return (err);
        });
      }
    
      getActiveCreditSum() {
        return new Promise((resolve, reject) => {
          return CustomerWalletHistory.findAll({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('customer_wallet_history.transaction_amount')), 'activeCreditSum']],
            // group: ['customer_wallet_history.transaction_amount'],
            where: { 'transaction_type': 'credit', 'transaction_status': 1, 'status': 1 }
          })
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        }).catch((err) => {
          console.error(err);
          return (err);
        });
      }
    
      getDebitSum() {
        return new Promise((resolve, reject) => {
    
          return CustomerWalletHistory.findAll({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('customer_wallet_history.transaction_amount')), 'debitSum']],
            // group: ['customer_wallet_history.transaction_amount'],
            where: { 'transaction_type': 'debit' }
          })
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        }).catch((err) => {
          console.error(err);
          return (err);
        });
      }
}


module.exports = dashboardWalletService;