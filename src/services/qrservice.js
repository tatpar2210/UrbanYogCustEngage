const BatchMaster = require("../models").batch_master;
const QRMaster = require("../models").qr_master;
const QRBatchMaster = require("../models").qr_batch_master;
const Productmaster = require("../models").product_master;
const { QueryTypes, where } = require("sequelize");
// const db = require('../models');

const Op = require("sequelize").Op;
const fs = require("fs");
var path = require("path");
const QRCode = require("qrcode");
const PdfPrinter = require("pdfmake");
const pdfPath = path.join(__dirname, "../../assets/pdf/");
// console.log("path = ", pdfPath)

class qrSerrvice {
  async getQrBatchDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.batchId) {
        where.batch_id = {[Op.like] : `%${req.body.batchId}%`};
      }

      if (req.body.qrId) {
        where.qr_id = {[Op.like] : `%${req.body.qrId}%`};
      }

      if (req.body.qrBatchId) {
        where.qr_batch_id = {[Op.like] : `%${req.body.qrBatchId}%`};
      }

      return QRBatchMaster.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 12,
        order: [["qr_id", "ASC"]],
        include: { model: BatchMaster },
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err;
    });
  }

  getQrCount(data) {
    var where = {};

    if (data.batchId) {
      where.batch_id = {[Op.like]: `%${data.batchId}%`};
    }

    if (data.qrId) {
      where.qr_id = {[Op.like]: `%${data.qrId}%`};
    }

    if (data.qrCode) {
      where.qr_code = {[Op.like]: `%${data.qrCode}%`};
    }

    if (data.qrBatchId) {
      where.qr_batch_id = {[Op.like]: `%${data.qrBatchId}%`};
    }

    if (data.pId) {
      where.pid = {[Op.like]: `%${data.pId}%`};
    }

    if (data.status) {
      where.status = {[Op.like]: `%${data.status}%`};
    }

    if (data.created_at) {
      where.created_at = { [Op.like]: `%${data.created_at}%` };
    }

    if (data.updated_at) {
      where.updated_at = { [Op.like]: `%${data.updated_at}%` };
    }

    if (data.qrCode) {
      where.qr_code = { [Op.like]: `%${data.qrCode}%` };
    }

    return QRMaster.count({
      where: where,
    });
  }

  getQrDetails(data) {
    var where = {};

    if (data.batchId) {
      where.batch_id = {[Op.like]: `%${data.batchId}%`};
    }

    if (data.qrId) {
      where.qr_id = {[Op.like]: `%${data.qrId}%`};
    }

    if (data.qrCode) {
      where.qr_code = {[Op.like]: `%${data.qrCode}%`};
    }

    if (data.qrBatchId) {
      where.qr_batch_id = {[Op.like]: `%${data.qrBatchId}%`};
    }

    if (data.pId) {
      where.pid = {[Op.like]: `%${data.pId}%`};
    }

    if (data.status) {
      where.status = {[Op.like]: `%${data.status}%`};
    }

    if (data.qrCode) {
      where.qr_code = { [Op.like]: `%${data.qrCode}%` };
    }

    QRMaster.belongsTo(Productmaster, {
      foreignKey: "pid",
    });

    QRMaster.belongsTo(QRBatchMaster, {
      foreignKey: "qr_id",
    });

    QRBatchMaster.belongsTo(BatchMaster, {
      foreignKey: "batch_id",
    });

    return QRMaster.findAndCountAll({
      where: where,
      order: [["qr_id", "DESC"]],
      offset: data.limit || 0,
      limit: data.offset || 12,
      attributes: [
        "qr_id",
        "qr_code",
        "pid",
        "variant_id",
        "status",
        "created_at",
        "updated_at",
      ],

      include: [
        {
          model: QRBatchMaster,
          attributes: ["qr_id", "batch_id", "qr_img_uri"],
          include: [
            {
              model: BatchMaster,
              attributes: ["batch_id", "batch_name"],
            },
          ],
        },
        {
          model: Productmaster,
          attributes: ["pid", "product_name"],
        },
      ],
    });
  }

  async createQRPDF(req, res) {
    let batchResult = {};
    batchResult.dataValues = {};
    batchResult.dataValues.batch_id = req.body.batchId;
    batchResult.dataValues.batch_name = req.body.batchName;

    let folderPath = pdfPath + req.body.batchName + "/";
    return new Promise((resolve, reject) => {
      generateQrPDF(batchResult, folderPath, "right")
        .then((result) => {
          console.log("from createPDF result: ", result);
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

  async updateQRDetails(update_data) {
    var resp_data = {
      msg: "",
      data: {},
    };

    await QRMaster.findOne({
      where: where,
    })
      .then(async (result) => {
        if (!result) {
          resp_data.msg = "Provided QR Code not found.";
        } else {
          await QRMaster.update(
            { status: 1, updated_at: update_data.updated_at },
            { where: { qr_code: update_data.qrCode } }
          )
            .then((result) => {
              resp_data.msg = "QR Status Changed to 1 successfully";
              resp_data.data = result;
              console.log(result);
            })
            .catch((err) => {
              resp_data.msg = err;
            });
        }
      })
      .catch((err) => {
        resp_data.msg = err;
      });

    return resp_data;
  }
}

//function to generate pdf of qr batch
function generateQrPDF(result, folderPath, qrPosition) {
  return new Promise((resolve, reject) => {
    var fonts = {
      Roboto: {
        normal: path.resolve("./assets/fonts/Roboto-Regular.ttf"),
        bold: path.resolve("./assets/fonts/Roboto-Medium.ttf"),
        italics: path.resolve("./assets/fonts/Roboto-Italic.ttf"),
        bolditalics: path.resolve("./assets/fonts/Roboto-MediumItalic.ttf"),
      },
    };
    var printer = new PdfPrinter(fonts);
    let where = {};
    where.batch_id = result.dataValues.batch_id;

    QRBatchMaster.belongsTo(QRMaster, {
      foreignKey: "qr_id",
      targetKey: "qr_id",
    });

    QRMaster.belongsTo(Productmaster, {
      foreignKey: "pid",
      targetKey: "pid",
    });

    return QRBatchMaster.findAll({
      where: where,
      order: [["qr_id", "ASC"]],
      attributes: [
        "qr_batch_id",
        "batch_id",
        "qr_img_uri",
        "product_qr_img_uri",
      ],
      include: [
        {
          model: QRMaster,

          attributes: ["qr_id", "qr_code"],
          include: [
            {
              model: Productmaster,

              attributes: ["pid", "product_name"],
            },
          ],
        },
      ],
    }).then((batchQrData) => {
      console.log(batchQrData);
      console.log("batchQrData length: ", batchQrData.length);
      if (batchQrData.length === 0) {
        var msg = "from generatePDF: batchQrData is empty";
        console.log(msg);
        reject(msg);
        return msg;
      } else {
        let documentDefinition = {
          pageSize: "B3",
          pageMargins: [65, 50, 60, 0],
        };

        documentDefinition.content = [
          // uncomment bellow code if want to add page header
          //   {
          //   text: result.dataValues.batch_name, //pdf name
          //   bold: true,
          //   fontSize: 20,
          //   alignment: 'center',
          //   pageSize: 'A4',
          //   // superMargin: {
          //   //   margin: [0, 0, 0, 0]
          //   // },
          //   margin: [0, 0, 0, 20],
          //   styles: {
          //     boldText: {
          //       bold: true,
          //       fontSize: 5,
          //       alignment: 'center'
          //     }
          //   }
          // }
        ];

        //create array of object of qr image data uri
        let pdfArr = [];

        if (qrPosition == "right") {
          for (let i = 0; i < batchQrData.length; i++) {
            pdfArr.push({
              unbreakable: true,
              stack: [
                {
                  text: [
                    {
                      text:
                        batchQrData[0].qr_master.dataValues.product_master
                          .dataValues.product_name + "\n",
                      fontSize: 8,
                      bold: true,
                      color: "#ba0000",
                    },
                    {
                      text: "For Product Authentication: " + "\n",
                      fontSize: 8,
                      bold: true,
                      color: "#096620",
                    },
                    `1. Scan the QR for `,
                    {
                      text: "Reward",
                      fontSize: 9,
                      bold: true,
                      color: "#ba0000",
                    },
                    `
                          2. Or give us a missed 
                             call on 02071531413,
                          #QR Code: `,
                    {
                      text:
                        `${batchQrData[i].qr_master.dataValues.qr_code}` + "\n",
                      fontSize: 10,
                      bold: true,
                      color: "#096620",
                    },
                  ],
                  alignment: "left",
                  fontSize: 8,
                },
                // {
                //   image: batchQrData[i].dataValues.qr_img_uri,
                //   alignment: 'left',
                // },
                {
                  qr:
                    "https://www.urbanyog.com/pages/verify?qrid=" +
                    batchQrData[i].qr_master.dataValues.qr_code,
                  fit: "80",
                  eccLevel: "H",
                  margin: [118, -52, 5, 20],
                },
              ],
            });
          }
        } else {
          for (let i = 0; i < batchQrData.length; i++) {
            pdfArr.push({
              unbreakable: true,
              stack: [
                {
                  text: [
                    {
                      text:
                        batchQrData[0].qr_master.dataValues.product_master
                          .dataValues.product_name + "\n",
                      fontSize: 9,
                      bold: true,
                      color: "#ba0000",
                    },
                    {
                      text: "For Product Authentication -" + "\n",
                      fontSize: 9,
                      bold: true,
                      color: "#021ad1",
                    },
                    `1. Scan the QR for Reward.
                          2. Or visit https://urbanyog.com/pages/verify 
                          and enter QR Code: `,
                    {
                      text:
                        `${batchQrData[i].qr_master.dataValues.qr_code}` + "\n",
                      fontSize: 10,
                      bold: true,
                      color: "#021ad1",
                    },
                    "3. Or give us a missed call on 02071531413",
                  ],
                  alignment: "left",
                  fontSize: 8,
                },
                // {
                //   image: batchQrData[i].dataValues.qr_img_uri,
                //   alignment: 'left',
                // },
                {
                  qr:
                    "https://www.urbanyog.com/pages/verify?qrid=" +
                    batchQrData[i].qr_master.dataValues.qr_code,
                  fit: "80",
                  eccLevel: "H",
                  margin: [5, 5, 5, 15],
                },
              ],
            });
          }
        }

        //push empty table column
        if (batchQrData.length > 5) {
          if (divideByFive(pdfArr.length) == 4) {
            pdfArr.push({
              stack: [
                {
                  text: " ",
                  alignment: "left",
                  fontSize: 8,
                },
              ],
            });
          } else if (divideByFive(pdfArr.length) == 3) {
            pdfArr.push(
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              }
            );
          } else if (divideByFive(pdfArr.length) == 2) {
            pdfArr.push(
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              }
            );
          } else if (divideByFive(pdfArr.length) == 1) {
            pdfArr.push(
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    text: " ",
                    alignment: "left",
                    fontSize: 8,
                  },
                ],
              }
            );
          }
        }

        console.log("pdfArr: ", pdfArr);

        //generate a array obj for display qr in 3 coloumn
        let qrTableArr = [];
        for (var i = 0; i < pdfArr.length; i += 5) {
          var sliced = pdfArr.slice(i, i + 5);
          qrTableArr.push(sliced);
        }

        console.log("qrTableArr: ", qrTableArr);

        documentDefinition.content.push({
          table: {
            headerRows: 0,
            widths: ["*", "*", "*", "*", "*"],
            body: qrTableArr,
          },
          layout: "noBorders",
        });
        var options = {
          // ...
        };

        let documentName = folderPath + result.dataValues.batch_name + ".pdf";
        var pdfDoc = printer.createPdfKitDocument(documentDefinition, options);
        pdfDoc.pipe(fs.createWriteStream(documentName));
        pdfDoc.end();

        let where = {};
        let data = {};

        where.batch_id = result.dataValues.batch_id;
        data.batch_pdf_url = documentName;
        return BatchMaster.update(data, {
          where: where,
        })
          .then((result) => resolve(result))
          .catch((error) => resolve(error));
      }
    });
  });
}

function isOdd(num) {
  return num % 2;
}
function divideByThree(num) {
  return num % 3;
}
function divideByFive(num) {
  return num % 5;
}

module.exports = qrSerrvice;
