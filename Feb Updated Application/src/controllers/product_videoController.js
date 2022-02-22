const Joi = require("joi");
const product_videoService = require("../services/product_videoService");
const product_video_service = new product_videoService();

module.exports = {
  getAll_ProductVids: async function (req, res) {
    const req_data = req.body;
    const schema = Joi.object().keys({
      p_id: Joi.number()
        .optional()
        .allow("")
        .error(new Error("p_id must be a number")),
      video_id: Joi.number()
        .optional()
        .allow("")
        .error(new Error("video_id must be a number")),
      video_type: Joi.string()
        .optional()
        .allow("")
        .error(new Error("video_type must be a string")),
      limit: Joi.number()
        .optional()
        .allow("")
        .error(new Error("Provide limit(number)")),
      offset: Joi.number()
        .optional()
        .allow("")
        .error(new Error("Provide offset(number)")),
    });

    const schema_result = schema.validate(req_data);

    if (schema_result.error) {
      console.log(schema_result.error.message);
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      await product_video_service
        .getAll_ProductVideos(req_data)
        .then((result) => {
          res.status(200).json({
            statusCode: 200,
            status: true,
            message: "All product videos",
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
    }
  },

  getProductVideoByPid: async function (req, res) {
    const Pid = req.params.id;
    const video_type = req.query.video_type;
    await product_video_service
      .getProductVideoByPid(Pid, video_type)
      .then((result) => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: "Product videos by pid",
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

  createProductVideo: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      pId: Joi.number().required().error(new Error("Provide pId(number)")),
      videoUrl: Joi.string()
        .required()
        .error(new Error("Provide videoUrl(number)")),
      videoType: Joi.string()
        .required()
        .error(new Error("Provide videoType(number)")),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      console.log(schema_result.error.message);
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_video_service
        .createProductVideo(req, res)
        .then((data) => {
          if (data.dataValues) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product Video created successfully",
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
              message: "Failed to create Product Video",
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

  updateProductVideo: async function (req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
      videoId: Joi.number()
        .required()
        .error(new Error("Provide videoId(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      videoUrl: Joi.string().error(new Error("Provide videoUrl(number)")),
      videoType: Joi.string().error(new Error("Provide videoType(number)")),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      console.log(schema_result.error.message);
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_video_service
        .updateProductVideo(req, res)
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

  deleteProductVideo: async function (req, res) {
    const data = req.body;

    const schema = Joi.object().keys({
      videoId: Joi.number()
        .required()
        .error(new Error("Provide videoId(number)")),
    });

    const schema_result = schema.validate(data);

    if (schema_result.error) {
      console.log(schema_result.error.message);
      res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      });
    } else {
      product_video_service
        .deleteProductVideo(req, res)
        .then((data) => {
          if (data > 0) {
            res.status(200).send({
              statusCode: 100,
              status: true,
              message: "Product Video deleted successfully",
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
