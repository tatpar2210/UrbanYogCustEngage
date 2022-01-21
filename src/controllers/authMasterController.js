const jwt = require("jsonwebtoken");
const UserMaster = require("../models").user_master;
const Joi = require("joi");
const config = require("../config/config.json");

module.exports = {
  async genrateAuthToken(req, res) {
    const body_data = req.body;

    const schema = Joi.object().keys({
      email: Joi.string().required().error(new Error("Provide email(string)")),
      password: Joi.string()
        .required()
        .error(new Error("Provide password(string)")),
    });

    await UserMaster.findAndCountAll({
      where: {
        email: body_data.email,
        password: body_data.password,
      },
      attributes: ["first_name", "last_name", "contact_no", "email"],
    }).then((result) => {
      if (result.count === 0) {
        res.status(200).send({
          statusCode: 101,
          status: "false",
          message: "Invalid credentials",
          data: result,
        });
      } else {
        console.log(result.rows[0].dataValues);
        var token = jwt.sign(
          {
            user_id: result.rows[0].dataValues.user_id,
            email: result.rows[0].dataValues.email,
            first_name: result.rows[0].dataValues.first_name,
            last_name: result.rows[0].dataValues.last_name,
            contact_no: result.rows[0].dataValues.contact_no,
            status: result.rows[0].dataValues.status,
          },
          config.secret,
          {
            expiresIn: 864000, // expires in 240 hours(value is total seconds)
          }
        );

        res.status(200).send({
          statusCode: 100,
          status: "true",
          message: "Logged in successfully",
          data: result,
          token: token,
        });
      }
    });
  },
};
