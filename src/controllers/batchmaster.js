const Joi = require("joi");
const BatchMasterService = require("../services/batchmasterservice");
const batchService = new BatchMasterService();

exports.getBatchDetails = (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    batchId: Joi.number().error(new Error("Provide batchId(number)")),
    pId: Joi.string().error(new Error("Provide pId(number)")),
    batchName: Joi.string().error(new Error("Provide batchName(string)")),
    limit: Joi.number().error(new Error("Provide limit(number)")),
    offset: Joi.number().error(new Error("Provide offset(number)")),
  });

  const schema_result = schema.validate(data)

  if(schema_result.error){
    res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
      }); 
  }else{
    batchService
    .getBatchDetails(req, res)
    .then((data) => {
      if (data.count > 0) {
        res.status(200).send({
          statusCode: 100,
          status: true,
          message: "Batch details",
          data: data,
        });
      } else {
        res.status(200).send({
          statusCode: 101,
          status: false,
          message: "Batch details not found",
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
