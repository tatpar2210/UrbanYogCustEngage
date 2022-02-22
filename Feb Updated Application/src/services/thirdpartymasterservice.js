const TPmaster = require("../models").third_party_master;
const Op = require("sequelize").Op;

class TPMService {
  async gettpmDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.tpmId) {
        where.tp_id = req.body.tpmId;
      }

      if (req.body.tpmName) {
        where.tp_name = { [Op.like]: `%${req.body.tpmName}%` };
      }

      return TPmaster.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 10,
        attributes: ["tp_id", "tp_name", "created_at"],
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  createTPM(req) {
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
      let where = [];

      let cnd = {
        where: {
          tp_name: req.body.tpmName,
        },
      };

      return TPmaster.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            return TPmaster.create({
              tp_name: req.body.tpmName,
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
              message: "TPM already exists",
              data: [],
            };
            resolve(errResp);
          }
        })
        .catch((error) => resolve(error));
    }).catch((err) => {
      return err.message;
    });
  }

  async updateTPM(req, res) {
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

      if (req.body.tpmId) {
        where.tp_id = req.body.tpmId;
      }

      if (req.body.tpmName) {
        data.tp_name = req.body.tpmName;
      }

      return TPmaster.update(data, {
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  async deleteTPM(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.tpmId) {
        where.tp_id = req.body.tpmId;
      }

      return TPmaster.destroy({
        where: where,
      })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = TPMService;
