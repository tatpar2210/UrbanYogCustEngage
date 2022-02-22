const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

const ClubMasterService = require("../services/clubmasterservice");
const clubmaster = new ClubMasterService();

exports.getClubDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    clubId: Joi.number().error(new Error("Provide clubId(number)")),
    clubName: Joi.string().error(new Error("Provide clubName(string)")),
    limit: Joi.number().error(new Error("Provide limit(number)")),
    offset: Joi.number().error(new Error("Provide offset(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    clubmaster
      .getClubDetails(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Urbgangabru Club Details",
            data: data,
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Urbangabru Club Details Not Found",
            data: data,
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
};

exports.createClub = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    clubName: Joi.string()
      .required()
      .error(new Error("Provide clubName(string)")),
    clubEntryPoint: Joi.number()
      .required()
      .error(new Error("Provide clubEntryPoint(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    clubmaster
      .createClub(req, res)
      .then((data) => {
        if (data.dataValues) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Club created successfully",
            data: {
              clubId: data.dataValues.club_id,
              clubName: data.dataValues.club_name,
              status: data.dataValues.status,
              createdAt: data.dataValues.created_at,
            },
          });
        } else if (data.statusCode == 101) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to create club",
            data: data,
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
};

exports.updateClub = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    clubId: Joi.number().required().error(new Error("Provide clubId(number)")),
    clubName: Joi.string().error(new Error("Provide clubName(string)")),
    clubEntryPoint: Joi.number().error(
      new Error("Provide clubEntryPoint(number)")
    ),
    status: Joi.number().error(new Error("Provide status(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    clubmaster
      .updateClub(req, res)
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
};

exports.deletClub = (req, res) => {
  const data = req.body;

  const schema = Joi.object().keys({
    clubId: Joi.number().required().error(new Error("Provide clubId(number)")),
  });

  const schema_result = schema.validate(data);

  if (schema_result.error) {
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: "Invalid request data",
      data: error.message,
    });
  } else {
    clubmaster
      .deleteClub(req, res)
      .then((data) => {
        if (data > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: "Club deleted successfully",
            data: [],
          });
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: "Failed to delete club",
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
};
