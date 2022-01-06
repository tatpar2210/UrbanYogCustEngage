const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const ProductSurveyService = require('../services/productsurveyservice');
const productSurveyService = new ProductSurveyService();

exports.getSurveyDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        surveyId: Joi.number().error(new Error('Provide surveyId(number)')),
        surveyName: Joi.string().error(new Error('Provide surveyName(string)')),      
    });

    const schema_result = schema.validate(data)

    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: 'error',
            message: 'Invalid request data',
            data: error.message
        });
    }else {
        productSurveyService.getSurveyDetails(req, res).then(data => {
            console.log(data);
            if (data.length > 0) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: 'Survey data',
                    counter: data[0].id
                })
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: 'Survey data not found',
                    data: []
                })
            }
        })
            .catch(err => {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: err,
                    data: []
                })
            })
    }
}

exports.createSurvey = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        surveyName: Joi.string().required().error(new Error('Provide surveyName(string)'))       
    });    

    const schema_result = schema.validate(data)
    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: "error",
            message: "Invalid request data",
            data: error.message,
          });
    }else {

        productSurveyService.createSurvey(req, res).then((data) => {
            if (data.dataValues) {
              res.status(200).send({
                statusCode: 100,
                status: true,
                message: "Survey data created successfully",
                data : data           
              });
            } else if (data.statusCode == 101) {
              res.status(200).send(data);
            } else {
              res.status(200).send({
                statusCode: 101,
                status: false,
                message: "Failed to create survey data",
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

  exports.getCustSurveyRequest = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        surveyRequestId: Joi.number().error(new Error('Provide surveyRequestId(number)')),
        surveyName: Joi.string().error(new Error('Provide surveyName(string)')),      
    });

    const schema_result = schema.validate(data)

    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: 'error',
            message: 'Invalid request data',
            data: error.message
        });
    }else {
        productSurveyService.getCustSurveyRequest(req, res).then(data => {
            console.log(data);
            if (data.length > 0) {
                res.status(200).send({
                    statusCode: 100,
                    status: true,
                    message: 'Survey email request data',
                    counter: data
                })
            } else {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: 'Survey email request data not found',
                    data: []
                })
            }
        })
            .catch(err => {
                res.status(200).send({
                    statusCode: 101,
                    status: false,
                    message: err,
                    data: []
                })
            })
    }
}

exports.createSurveyEmailRequest = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        surveyName: Joi.string().required().error(new Error('Provide surveyName(string)'))  ,
        email: Joi.string().required().error(new Error('Provide email(string)'))       
    });    

    const schema_result = schema.validate(data)

    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: "error",
            message: "Invalid request data",
            data: error.message,
          });
    }else {

        productSurveyService.createCustSurveyReq(req, res).then((data) => {
            if (data.dataValues) {
              res.status(200).send({
                statusCode: 100,
                status: true,
                message: "Our expert will contact you soon",
                data : data           
              });
            } else if (data.statusCode == 101) {
              res.status(200).send(data);
            } else {
              res.status(200).send({
                statusCode: 101,
                status: false,
                message: "Failed to create survey email request data",
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