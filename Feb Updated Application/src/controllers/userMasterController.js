const Joi = require("joi");
const userMasterService = require("../services/userMasterService");
const user_masterService = new userMasterService();

module.exports = {
  findAllUserMaster: async function (req, res) {
    await user_masterService
      .findAll()
      .then((result) => {
        if (!result) {
          res.status(200).json({
            codestatus: 200,
            success: true,
            message: "No data found",
          });
        } else {
          res.status(200).json({
            statusCode: 100,
            status: true,
            message: "User Details",
            data: result,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  },

  findById: async function (req, res) {
    const user_id = req.params.id;

    if (user_id.length === 0) {
      res.status(400).json({
        statuscode: 400,
        success: false,
        message: "Provide a valid user_id( number )",
      });
    } else {
      await user_masterService
        .findOneById(user_id)
        .then((result) => {
          if (!result) {
            res.status(200).json({
              statuscode: 200,
              success: true,
              message: "No data found",
            });
          } else {
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "User Details by pid",
              data: result,
            });
          }
        })
        .catch((err) => {
          res.status(400).json({ err });
        });
    }
  },

  findByEmail: async function (req, res) {
    const req_email = req.params.email;
    console.log(req_email);

    if (req_email.length === 0) {
      res.status(400).json({
        statuscode: 400,
        success: false,
        message: "Provide a valid user_id( number )",
      });
    } else {
      await user_masterService
        .findOneByEmail(req_email)
        .then((result) => {
          if (!result) {
            res.status(200).json({
              statuscode: 200,
              success: true,
              message: "No data found",
            });
          } else {
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "User Details by email",
              data: result,
            });
          }
        })
        .catch((err) => {
          res.status(400).json({ err });
        });
    }
  },

  addUser: async function (req, res) {
    const userData = req.body;
    // const date = new Date()
    // const create_date = {
    //     year: date.getFullYear(),
    //     month: date.getMonth(),
    //     date: date.getDate(),

    //     hours: date.getHours(),
    //     min: date.getMinutes(),
    //     sec: date.getSeconds(),
    // }

    if (Object.keys(userData).length === 0) {
      res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "No data provided",
      });
    } else {
      const userMasterSchema = Joi.object().keys({
        first_name: Joi.string()
          .required()
          .error(new Error("Provide First_name(string)")),
        last_name: Joi.string()
          .required()
          .error(new Error("Provide Last_name(string)")),
        email: Joi.string()
          .email()
          .required()
          .error(new Error("Provide Email address")),
        password: Joi.string()
          .lowercase()
          .required()
          .error(new Error("Provide password")),
        contact_no: Joi.number()
          .required()
          .error(new Error("Provide Contact no.")),
        status: Joi.number()
            .optional()
            .allow("")
            .error(new Error("Provide status(number)")),
        created_at: Joi.string()
          .optional()
          .allow("")
          .error(new Error("Provide created_at")),
        updated_at: Joi.string()
          .optional()
          .allow("")
          .error(new Error("Provide updated_at")),
      });

      const userMasterSchemaResult = userMasterSchema.validate(userData);
      if (userMasterSchemaResult.error) {
        console.log(userMasterSchemaResult.error.message);
        res.status(422).json({
          statusCode: 422,
          status: "error",
          message: "Invalid request data",
          data: userMasterSchemaResult.error.message,
        });
      } else {
        await user_masterService
          .addUser(userData)
          .then(async (result) => {
            console.log(result);
            res.status(200).json({
              statusCode: 100,
              status: true,
              message: "Added user Details",
              data: result,
            });
          })
          .catch((err) => {
            res.status(400).json(err);
            console.log(err);
          });
      }
    }
  },

  updateUser: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      firstName: Joi.string().error(new Error("Provide firstName(string)")),
      lastName: Joi.string().error(new Error("Provide lastName(string)")),
      email: Joi.string().error(new Error("Provide email(string)")),
      password: Joi.string().error(new Error("Provide password(string)")),
      contactNo: Joi.number().error(new Error("Provide contactNo(string)")),
      userId: Joi.number()
        .required()
        .error(new Error("Provide userId(number)")),
      status: Joi.number().error(new Error("Provide status (number)")),
    });

    const userMasterSchemaResult = schema.validate(data);
    if (userMasterSchemaResult.error) {
      console.log(userMasterSchemaResult.error.message);
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: userMasterSchemaResult.error.message,
      });
    } else {
      user_masterService
        .updateUser(req, res)
        .then((data) => {
          if (data[0] > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Record updated successfully",
              data: [],
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Record not updated",
              data: [],
            });
          }
        })
        .catch((err) => {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: err,
            data: [],
          });
        });
    }
  },

  deleteUser: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      userId: Joi.number()
        .required()
        .error(new Error("Provide userId(number)")),
    });

    const userMasterSchemaResult = schema.validate(data);
    if (userMasterSchemaResult.error) {
      console.log(userMasterSchemaResult.error.message);
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: userMasterSchemaResult.error.message,
      });
    } else {
      user_masterService
        .deleteUser(req, res)
        .then((data) => {
          if (data > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "User deleted successfully",
              data: [],
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to delete record",
              data: [],
            });
          }
        })
        .catch((err) => {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: err,
            data: [],
          });
        });
    }
  },
};
