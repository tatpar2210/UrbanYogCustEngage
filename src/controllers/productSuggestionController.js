const Joi = require("joi");
const product_suggestionMaster = require("../services/productSuggestionService");
const product_suggestion_master = new product_suggestionMaster();
module.exports = {
  getAllProductSuggestion: async function (req, res) {
    await product_suggestion_master
      .getAll_productSuggestion()
      .then((result) => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: "All product suggestion",
          data: result,
        });
      })
      .catch((err) => {
        console.log("Error is this: ", err);
        res.status(400).json({
          statuscode: 400,
          data_obt: {
            query: req.query,
            body: req.body,
            params: req.params,
          },
          err: err,
        });
      });
  },

  getProductSuggestionByPid: async function (req, res) {
    const Pid = req.params.id;
    const req_data = req.body;

    const schema = Joi.object().keys({
      sugstId: Joi.number().error(new Error("Provide tpmId(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      suggstPid: Joi.number().error(new Error("Provide suggstPid(number)")),
      sugstProductid: Joi.number().error(
        new Error("Provide sugstProductid(number)")
      ),
      limit: Joi.number().error(new Error("Provide limit(number)")),
      offset: Joi.number().error(new Error("Provide offset(number)")),
    });

    const schema_result = schema.validate(req_data);

    if (schema_result.error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_suggestion_master
        .getProductSuggestionByPid(req, res)
        .then((data) => {
          if (data.count > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product Suggestion details",
              data: data,
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Product Suggestion details not found",
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
  },

  getFrequentlyBroughtCounter: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      fbcId: Joi.number().error(new Error("Provide fbcId(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      pageUrl: Joi.string().error(new Error("Provide pageUrl(string)")),
      pageType: Joi.string().error(new Error("Provide pageType(string)")),
      createdAt: Joi.string().error(new Error("Provide createdAt(string)")),
      limit: Joi.number().error(new Error("Provide limit(number)")),
      offset: Joi.number().error(new Error("Provide offset(number)")),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_suggestion_master
        .getFrequentlyBroughtCounter(req, res)
        .then((data) => {
          if (data.count > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Frequently Bought Together Count Data Found",
              data: data,
            });
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Frequently Bought Together Count Not Found",
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
  },

  createProductSuggestionDetails: async function (req, res) {
    const data = req.body;

    const schema = Joi.object().keys({
      pId: Joi.number().error(new Error("Provide pId(number)")),
      suggstPid: Joi.array()
        .items(
          Joi.object({
            suggst_pid: Joi.number()
              .required()
              .error(new Error("Provide suggst_pid(number)")),
          })
        )
        .required(),

      // suggstPid: Joi.number().error(new Error('Provide suggstPid(number)')),
      sugstProductid: Joi.number().error(
        new Error("Provide sugstProductid(number)")
      ),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_suggestion_master
        .createProductSuggestionDetails(req, res)
        .then((data) => {
          if (data.dataValues) {
            console.log(data.dataValues);
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product Suggestion created successfully",
              data: {
                id: data.dataValues.tp_id,
                tpName: data.dataValues.tp_name,
              },
            });
          } else if (data.statusCode == 101) {
            res.status(200).send(data);
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to create Product Suggestion",
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
  },

  createFrequentlyBroughtCounter: async function (req, res) {
    const data = req.body;

    const schema = Joi.object().keys({
      pId: Joi.number().error(new Error("Provide pId(number)")),
      pageUrl: Joi.string().error(new Error("Provide pageUrl(string)")),
      pageType: Joi.string().error(new Error("Provide pId(string)")),
      clickCount: Joi.number().error(new Error("Provide pId(number)")),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_suggestion_master
        .createFrequentlyBroughtCounter(req, res)
        .then((data) => {
          if (data.dataValues) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Frequently Bought Together Count created successfully",
              data: [],
            });
          } else if (data.statusCode == 101) {
            res.status(200).send(data);
          } else {
            res.status(200).send({
              statusCode: 101,
              status: false,
              message: "Failed to create Frequently Bought Together Count",
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
  },

  updateProductSuggestionDetails: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      sugstId: Joi.number().error(new Error("Provide tpmId(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      suggstPid: Joi.number().error(new Error("Provide suggstPid(number)")),
      sugstProductid: Joi.number().error(
        new Error("Provide sugstProductid(number)")
      ),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_suggestion_master
        .updateProductSuggestionDetails(req, res)
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

  deleteProductSuggestionDetails: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      sugstId: Joi.number().error(new Error("Provide tpmId(number)")),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_suggestion_master
        .deleteProductSuggestionDetails(req, res)
        .then((data) => {
          if (data > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product Suggestion deleted successfully",
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
