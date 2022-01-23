const BatchMaster = require("../models").batch_master;
const QRMaster = require("../models").qr_master;
const QRBatchMaster = require("../models").qr_batch_master;
const Productmaster = require("../models").product_master;
const { QueryTypes } = require('sequelize');
const db = require('../models');

const Op = require("sequelize").Op;
const awaitEach = require("await-each");
const fs = require("fs");
var path = require("path");
const QRCode = require("qrcode");
const ImageDataURI = require("image-data-uri");
const { createCanvas, Image } = require("canvas");
const PdfPrinter = require('pdfmake');
const imgPath = path.join(__dirname, "../../assets/img/");
const pdfPath = path.join(__dirname, "../../assets/pdf/");
// console.log("path = ", pdfPath)


// fs.mkdir(imgPath, { recursive: true }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(imgPath + " directory successfully created.");
//   }
// });

// fs.mkdir(pdfPath, { recursive: true }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(pdfPath + " directory successfully created.");
//   }
// });

class qrSerrvice {
  async generateQRWithText(req, res) {

    // const WIDTH = 180;
    // const HEIGHT = 140;
    const WIDTH = 90;
    const HEIGHT = 95;
    const canvas = createCanvas(WIDTH, HEIGHT);
    var context = canvas.getContext('2d');

    return new Promise((resolve, reject) => {
      var date = new Date();
      var dateStr =
        date.getFullYear() +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2) +
        " " +
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2);

      let cnd = {
        where: {
          batch_name: req.body.batchName,
        },
      };
      return BatchMaster.findAll(cnd)
        .then((result) => {
          if (result.length <= 0) {
            
            let folderPath = pdfPath + req.body.batchName + "/";
            fs.mkdir(folderPath, { recursive: true }, function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log(folderPath + " successfully created.");
              }
            });

            return BatchMaster.create({
              batch_name: req.body.batchName,
              batch_quantity: req.body.quantity,
              pid: req.body.pId,
              variant_id: req.body.variantId,
              created_by: req.body.createdBy,
              created_at: dateStr,
            })
              .then((batchResult) => {
                let obj = {};
                let QRarr = [];
                console.log(batchResult)
                for (let i = 0; i < req.body.quantity; i++) {
                  obj.batchName = batchResult.dataValues.batch_name;
                  obj.batchId = batchResult.dataValues.batch_id;
                  obj.pId = req.body.pId;
                  obj.variantId = req.body.variantId;
                  QRarr.push(obj);
                }
                awaitEach(QRarr, async function (item) {
                  await qrMake(item, context, canvas, WIDTH, HEIGHT);
                }).then((responses) => {
                  setTimeout(() => {
                    generateQrPDF(batchResult, folderPath, req.body.qrPosition)
                  }, 100);
                  resolve({
                    statusCode: 100,
                    status: true,
                    message: "Batch is ready",
                    data: responses,
                  });
                });
              })
              .catch((error) => reject(error));
          } else {
            let errResp = {
              statusCode: 101,
              status: false,
              message: "Batch name already present",
              data: result,
            };
            reject(errResp);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }).catch((err) => {
      return err;
    });
  }

  generateQRWithProductImg(req, res) {
    return new Promise((resolve, reject) => {
      const WIDTH = 400;
      const HEIGHT = 400;

      const canvas = createCanvas(WIDTH, HEIGHT);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#fff";
      ctx.font = "10px Georgia Bold";
      ctx.textAlign = "left";

      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#000";
      ctx.fillText(
        `   1. Scan bellow QR for product authentication.
        2. Or Visit https://urbanyog.com/pages/verify 
        and enter id 223322
        3. Or Give us missed call on 02071531413`,
        5,
        25,
        400
      );

      // console.log(canvas.toDataURL());

      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(imgPath + "test.png", buffer);


      QRCode.toDataURL(
        "https://www.urbanyog.com/pages/verify?qrid=",
        {
          errorCorrectionLevel: "H",
          scale: 4.3,
          margin: 2,
        },
        function (err, url) {
          if (err) {
            console.error(err);
          }
          let dataURI = url;
          let fileName = imgPath + "qr.png";
          ImageDataURI.outputFile(dataURI, fileName).then((res) =>
            console.log(res)
          );
        }
      );

      sharp(imgPath + "qr.png").resize(150);

      setTimeout(() => {
        generateImg();
      }, 100);

      function generateImg() {
        sharp(imgPath + "QR product.png")
          .resize(500, 500)
          .composite([
            {
              input: imgPath + "qr.png",
              gravity: "center",
              left: 180,
              top: 215,
            },
          ])
          .sharpen()
          .withMetadata()
          .toFile(imgPath + "productQr.png");
      }
    }).catch((err) => {
      return err;
    });
  }

  async getQrBatchDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.batchId) {
        where.batch_id = req.body.batchId;
      }

      if (req.body.qrId) {
        where.qr_id = req.body.qrId;
      }

      if (req.body.qrBatchId) {
        where.qr_batch_id = req.body.qrBatchId;
      }


      return QRBatchMaster.findAndCountAll({
        where: where,
        order: [["qr_id", "ASC"]],
        include: {model: BatchMaster}
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((err) => {
      return err;
    });
  }


  getQrDetails(data) {
    var where = {};

    if (data.batchId) {
      where.batch_id = data.batchId;
    }

    if (data.qrId) {
      where.qr_id = data.qrId;
    }

    if (data.qrCode) {
      where.qr_code = data.qrCode;
    }

    if (data.qrBatchId) {
      where.qr_batch_id = data.qrBatchId;
    }

    if (data.pId) {
      where.pid = data.pId;
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
      offset: data.offset || 0,
      limit: data.limit || 50,
      attributes: [
        "qr_id",
        "qr_code",
        "pid",
        "variant_id",
        "status",
        "created_at",
        "updated_at",
      ],
    //   include: [
    //     {
    //       model: Productmaster,
    //       required: true,
    //       attributes: [
    //         "pid",
    //         "product_name",
    //         "product_category",
    //         "product_img_url"
    //       ],
    //     },
    //   ],
    //   include: [
    //     {
    //       model: QRBatchMaster,
    //       required: true,
    //       attributes: [
    //         "qr_id",
    //         "batch_id",
    //         "qr_img_uri"
    //       ],
    //       include: [
    //         {
    //           model: BatchMaster,
    //           required: true,
    //           attributes: [
    //             "batch_id",
    //             "batch_name"
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       model: Productmaster,
    //       required: true,
    //       attributes: [
    //         "pid",
    //         "product_name"
    //       ],
    //     },
    //   ]
    })
  }

  async createQRPDF(req, res) {
    let batchResult = {};
    batchResult.dataValues = {};
    batchResult.dataValues.batch_id = req.body.batchId;
    batchResult.dataValues.batch_name = req.body.batchName;

    let folderPath = pdfPath + req.body.batchName + "/";
    return new Promise((resolve, reject) => {
      generateQrPDF(batchResult, folderPath, 'right').then(result => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      return err;
    });
  }
}

//generate a data uri of final img to store int db
function getDataUrl(imgPath) {
  var fs = require('fs');
  var imageAsBase64 = fs.readFileSync(imgPath, 'base64');
  return 'data:image/png;base64,' + imageAsBase64;
}

//function to generate pdf of qr batch
function generateQrPDF(result, folderPath, qrPosition) {
  return new Promise((resolve, reject) => {
    var fonts = {
      Roboto: {
        normal: path.resolve('./assets/fonts/Roboto-Regular.ttf'),
        bold: path.resolve('./assets/fonts/Roboto-Medium.ttf'),
        italics: path.resolve('./assets/fonts/Roboto-Italic.ttf'),
        bolditalics: path.resolve('./assets/fonts/Roboto-MediumItalic.ttf')
      }
    };
    var printer = new PdfPrinter(fonts);
    let where = {};
    where.batch_id = result.dataValues.batch_id;

    QRBatchMaster.belongsTo(QRMaster, {
      foreignKey: "qr_id", targetKey: "qr_id"
    });

    QRMaster.belongsTo(Productmaster, {
      foreignKey: "pid", targetKey: "pid"
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
          required: true,
          attributes: [
            "qr_id",
            "qr_code"
          ],
          include: [
            {
              model: Productmaster,
              required: true,
              attributes: [
                "pid",
                "product_name"
              ],
            },
          ],
        },
      ],
    }).then((batchQrData) => {
      console.log(batchQrData)
      console.log(batchQrData.qr_master)
      console.log("batchQrData length: ", batchQrData.length)  
      let documentDefinition = {
        pageSize: 'B3',
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

      if (qrPosition == 'right') {
        for (let i = 0; i < batchQrData.length; i++) {
          pdfArr.push({
            unbreakable: true,
            stack: [
              {
                text: [
                  {
                    text: batchQrData[0].qr_master.dataValues.product_master.dataValues.product_name + '\n',
                    fontSize: 8,
                    bold: true,
                    color: '#ba0000'
                  },
                  {
                    text: 'For Product Authentication: ' + '\n',
                    fontSize: 8,
                    bold: true,
                    color: '#096620'
                  }, `1. Scan the QR for `, {
                    text: 'Reward',
                    fontSize: 9,
                    bold: true,
                    color: '#ba0000'
                  }, `
                  2. Or give us a missed 
                     call on 02071531413,
                  #QR Code: `,
                  {
                    text: `${batchQrData[i].qr_master.dataValues.qr_code}` + '\n',
                    fontSize: 10,
                    bold: true,
                    color: '#096620'
                  },
                ],
                alignment: 'left',
                fontSize: 8,
              },
              // {
              //   image: batchQrData[i].dataValues.qr_img_uri,
              //   alignment: 'left',
              // },
              {
                qr: "https://www.urbanyog.com/pages/verify?qrid=" + batchQrData[i].qr_master.dataValues.qr_code,
                fit: '80',
                eccLevel: 'H',
                margin: [118, -52, 5, 20]
              }
            ]
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
                    text: batchQrData[0].qr_master.dataValues.product_master.dataValues.product_name + '\n',
                    fontSize: 9,
                    bold: true,
                    color: '#ba0000'
                  },
                  {
                    text: 'For Product Authentication -' + '\n',
                    fontSize: 9,
                    bold: true,
                    color: '#021ad1'
                  }, `1. Scan the QR for Reward.
                  2. Or visit https://urbanyog.com/pages/verify 
                  and enter QR Code: `,
                  {
                    text: `${batchQrData[i].qr_master.dataValues.qr_code}` + '\n',
                    fontSize: 10,
                    bold: true,
                    color: '#021ad1'
                  },
                  '3. Or give us a missed call on 02071531413',
                ],
                alignment: 'left',
                fontSize: 8,
              },
              // {
              //   image: batchQrData[i].dataValues.qr_img_uri,
              //   alignment: 'left',
              // },
              {
                qr: "https://www.urbanyog.com/pages/verify?qrid=" + batchQrData[i].qr_master.dataValues.qr_code,
                fit: '80',
                eccLevel: 'H',
                margin: [5, 5, 5, 15]
              }
            ]
          });
        }
      }

      //push empty table column
      if (batchQrData.length > 5) {
        if (divideByFive(pdfArr.length) == 4) {
          pdfArr.push({
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          });
        } else if (divideByFive(pdfArr.length) == 3) {
          pdfArr.push({
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          }, {
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          });
        } else if (divideByFive(pdfArr.length) == 2) {
          pdfArr.push({
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          }, {
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          }, {
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          });
        } else if (divideByFive(pdfArr.length) == 1) {
          pdfArr.push({
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          }, {
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          }, {
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          }, {
            stack: [
              {
                text: ' ',
                alignment: 'left',
                fontSize: 8
              }
            ]
          });
        }
      }

      //generate a array obj for display qr in 3 coloumn
      let qrTableArr = [];
      for (var i = 0; i < pdfArr.length; i += 5) {
        var sliced = pdfArr.slice(i, i + 5);
        qrTableArr.push(sliced);
      }

      documentDefinition.content.push(
        {
          table: {
            headerRows: 0,
            widths: ['*', '*', '*', '*', '*'],
            body: qrTableArr
          },
          layout: 'noBorders'
        })

      var options = {
        // ...
      }

      let documentName = folderPath + result.dataValues.batch_name + ".pdf";
      var pdfDoc = printer.createPdfKitDocument(documentDefinition, options);
      pdfDoc.pipe(fs.createWriteStream(documentName));
      pdfDoc.end();

      let where = {};
      let data = {};

      where.batch_id = result.dataValues.batch_id;
      data.batch_pdf_url = documentName;
      return BatchMaster.update(data, {
        where: where
      }).then(result => resolve(result))
        .catch(error => resolve(error));
    })
  })
}

function isOdd(num) { return num % 2; }
function divideByThree(num) { return num % 3; }
function divideByFive(num) { return num % 5; }

//function to generate final image data uri by merging text and qr img using canvas on the fly
function qrMake(batchObj, context, canvas, WIDTH, HEIGHT) {

  context.fillStyle = "#fff";
  context.font = "11px Arial";;
  context.textAlign = "left";

  //draw text on image with border on canvas width, height
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#000";

  var date = new Date();
  var dateStr =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return new Promise((resolve, reject) => {
    db.sequelize.query(`SELECT LEFT(REPLACE(UUID(), '-', ''), 9) as qrCode`, { type: QueryTypes.SELECT }).then((qrNumber) => {
      let qrCode = '';
      if (qrNumber) {
        qrCode = qrNumber[0].qrCode;
      }
      return QRMaster.create({
        qr_code: qrCode,
        pid: batchObj.pId,
        variant_id: batchObj.variantId,
        status: 0,
        created_at: dateStr,
      }).then((qrResult) => {

        context.fillText(`${qrCode}`, 10, 15);

        QRCode.toDataURL(
          "https://www.urbanyog.com/pages/verify?qrid=" + qrCode,
          {
            errorCorrectionLevel: "H",
            scale: 1.4,
            margin: 1,
          },
          
          function (err, url) {
            if (err) {
              reject(err)
            } else {
              //generate a qr code data uri
              var image2 = new Image;
              image2.src = url;

              //generate a text image data uri
              var image1 = new Image;
              image1.src = canvas.toDataURL();

              context.drawImage(image1, 0, 0);
              context.drawImage(image2, 11, 20);

              //get combined image uri
              let combinedUri = canvas.toDataURL();

              return QRBatchMaster.create({
                batch_id: batchObj.batchId,
                qr_id: qrResult.dataValues.qr_id,
                qr_img: '',
                qr_img_uri: combinedUri,
                created_at: dateStr,
              }).then((qrBatchResult) => {
                resolve(qrBatchResult);
              }).catch((err) => {
                reject(err);
              });
            }
          }
        );
      }).catch((err) => {
        return err;
      });
    }).catch((err) => {
      return err;
    });
  })
}


module.exports = qrSerrvice;
