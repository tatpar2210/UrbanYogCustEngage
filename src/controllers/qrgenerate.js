const Joi = require("joi");
const qrSerrvice = require("../services/qrservice");
const qrserrvice = new qrSerrvice();
const fs = require("fs");

exports.downloadPDF = (req, res) => {
  var path = require("path");

  const data = req.body;
  const schema = Joi.object().keys({
    batchName: Joi.string().required().error(new Error("Provide batchName(string)")),
    batchId: Joi.number().required().error(new Error("Provide batchId(number)"))
  });

  const schema_result = schema.validate(data)

  if(schema_result.error){
// send a 422 error response if validation fails
    res.status(422).json({
        statusCode: 422,
        status: "error",
        message: "Invalid request data",
        data: schema_result.error.message,
    });
  }else{
    const file = path.join(__dirname, "../../assets/pdf/" + req.body.batchName + "/" + req.body.batchName + ".pdf");
    fs.access(file, fs.F_OK, (err) => {
      if (err) {
        //if file/folder not found error occured
        //create folder if not present on the path
        const pdfPath = path.join(__dirname, "../../assets/pdf/");
        let folderPath = pdfPath + req.body.batchName + "/";
        fs.mkdir(folderPath, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(folderPath + " successfully created.");
          }
        });
        //create pdf if not present on the path
        qrserrvice
          .createQRPDF(req, res)
          .then((data) => {
            // download pdf
            var downloaded_pdf_loc = "http://urbanyogcustoengage.uglifestyle.in/"+ req.body.batchName + "/" + req.body.batchName + ".pdf"
            // var downloaded_pdf_loc = "http://localhost:3000/"+ req.body.batchName + "/" + req.body.batchName + ".pdf"
            res.json({
                statusCode: 100,
                status: true,
                pdf_location: downloaded_pdf_loc,
                message: "Directory created and pdf saved succesfully",
                //data: data
            })
            // res.download(file, function (error) {
            //   console.log(error);
            // });
          })
          .catch((err) => {
            // send error if failed to download pdf
            console.log(err);
            res.status(400).send({
              statusCode: 101,
              status: false,
              message: err,
              data: [],
            });
          });
      } else {
        // download pdf directly if not any error occured
        var downloaded_pdf_loc = "http://urbanyogcustoengage.uglifestyle.in/"+ req.body.batchName + "/" + req.body.batchName + ".pdf"
        // var downloaded_pdf_loc = "http://localhost:3000/"+ req.body.batchName + "/" + req.body.batchName + ".pdf"
        res.json({
            statusCode: 100,
            status: true,
            pdf_location: downloaded_pdf_loc,
            message: "redirecting to file: " + downloaded_pdf_loc,
            //data: data
        })
        // res.download(file, function (error) {
        //   console.log(error);
        // });
      }
      // if (err) {
      //   console.error(err)
      //   res.send({
      //     statusCode: 101,
      //     message: 'File not found',
      //     status: false,
      //     data: []
      //   })
      // } else {
      //   res.download(file, function (error) {
      //     console.log(error);
      //   });
      // }
    })
  }
};


exports.getQrBatchDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
      qrBatchId: Joi.number().error(new Error("Provide qrBatchId(number)")),
      batchId: Joi.number().error(new Error("Provide batchId(number)")),
      qrId: Joi.string().error(new Error("Provide qrId(number)"))
    });
  
    const schema_result = schema.validate(data)
  
    if (schema_result.error){
      res.status(422).json({
          statusCode: 422,
          status: "error",
          message: "Invalid request data",
          data: schema_result.error.message,
        });
    }else{
      qrserrvice
      .getQrBatchDetails(req, res)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: 'Batch data',
            data: data
          })
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: 'Batch data not found',
            data: data
          })
        }
      })
      .catch((err) => {
        res.status(400).send({
          statusCode: 101,
          status: false,
          message: err,
          data: [],
        });
      });
    }
  };
  
  exports.getQrDetails = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
      qrBatchId: Joi.number().error(new Error("Provide qrBatchId(number)")),
      batchId: Joi.number().error(new Error("Provide batchId(number)")),
      qrId: Joi.string().error(new Error("Provide qrId(number)")),
      qrCode: Joi.string().error(new Error("Provide qrCode(number)")),
      pId: Joi.number().error(new Error("Provide pId(number)")),
      offset: Joi.number().error(new Error("Provide offset(number)")),
      limit: Joi.number().error(new Error("Provide limit(number)")),
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
      qrserrvice
      .getQrDetails(data)
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            statusCode: 100,
            status: true,
            message: 'QR data',
            data: data
          })
        } else {
          res.status(200).send({
            statusCode: 101,
            status: false,
            message: 'QR data not found',
            data: data
          })
        }
      })
      .catch((err) => {
        res.status(400).send({
          statusCode: 101,
          status: false,
          message: err,
          data: [],
        });
      });
    }
  };

  exports.updateQRDetails = (req, res) =>{
      const update_data = req.body
      console.log("hit hua updateQRDetails")
      const schema = Joi.object().keys({
        qrBatchId: Joi.number().error(new Error("Provide qrBatchId(number)")),
        batchId: Joi.number().error(new Error("Provide batchId(number)")),
        qrId: Joi.string().error(new Error("Provide qrId(number)")),
        qrCode: Joi.string().required().error(new Error("qrCode(number) is required for updating data in DB.")),
        pId: Joi.number().error(new Error("Provide pId(number)")),
        offset: Joi.number().error(new Error("Provide offset(number)")),
        limit: Joi.number().error(new Error("Provide limit(number)")),
      });
    
      const schema_result = schema.validate(update_data)

    if(schema_result.error){
        res.status(422).json({
            statusCode: 422,
            status: "error",
            message: "Invalid request data",
            data: schema_result.error.message,
          });
      }else{
            qrserrvice.updateQRDetails(update_data).then((result)=>{
                if (!result.data) {
                    res.status(200).send({
                        statusCode: 101,
                        status: false,
                        message: 'Failed to update',
                        msg: result.msg,
                        data: result.data
                      })
                  } else {
                    res.status(200).send({
                        statusCode: 100,
                        status: true,
                        message: 'Qr Updated Successfully',
                        msg: result.msg,
                        data: result.data
                      })
                  }
          }).catch((err)=>{
            console.log(err)
            res.status(400).send({
                statusCode: 101,
                status: false,
                message: err,
                data: [],
              });
          })
      }
  }