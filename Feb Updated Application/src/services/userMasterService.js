const userMasterModel = require("../models").user_master;

class userService {
  findAll() {
    return userMasterModel.findAndCountAll();
  }

  findOneById(user_id) {
    return userMasterModel.findOne({
      where: {
        user_id: user_id,
      },
    });
  }

  findOneByEmail(email) {
    return userMasterModel.findOne({
      where: {
        email: email,
      },
    });
  }

  addUser(data) {
    return userMasterModel.create(data);
  }

  updateUser(req, res) {
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

      if (req.body.userId) {
        where.user_id = req.body.userId;
      }

      if (req.body.firstName) {
        data.first_name = req.body.firstName;
      }

      if (req.body.lastName) {
        data.last_name = req.body.lastName;
      }

      if (req.body.email) {
        data.email = req.body.email;
      }

      if (req.body.contactNo) {
        data.contact_no = req.body.contactNo;
      }

      if (req.body.status) {
        data.status = req.body.status;
      }

      if (req.body.password) {
        data.password = req.body.password;
      }

      if (dateStr) {
        data.updated_at = dateStr;
      }

      if (req.body.status == 0 || req.body.status == 1) {
        data.status = req.body.status;
      }

      return userMasterModel
        .update(data, {
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => resolve(error));
    }).catch((err) => {
      reject(err.message);
    });
  }

  deleteUser(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.userId) {
        where.user_id = req.body.userId;
      }

      return userMasterModel
        .destroy({
          where: where,
        })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }).catch((err) => {
      reject(err.message);
    });
  }
}

module.exports = userService;
