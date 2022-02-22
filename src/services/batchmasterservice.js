const BatchMaster = require("../models").batch_master;
const ProductMaster = require("../models").product_master;
const ProductVariantMaster = require("../models").product_variant_master;
const QRMaster = require("../models").qr_master;
const QRBatchMaster = require("../models").qr_batch_master;

const Op = require("sequelize").Op;

class BatchMasterService {
  async getBatchDetails(req, res) {
    return new Promise((resolve, reject) => {
      let where = {};

      if (req.body.batchId) {
        where.batch_id = req.body.batchId;
      }

      if (req.body.pId) {
        where.pid = req.body.pId;
      }

      if (req.body.batchName) {
        where.batch_name = { [Op.like]: `%${req.body.batchName}%` };
      }

      BatchMaster.belongsTo(ProductMaster, {
        foreignKey: "pid",
      });
      BatchMaster.belongsTo(ProductVariantMaster, {
        foreignKey: "variant_id",
      });

      return BatchMaster.findAndCountAll({
        where: where,
        offset: req.body.offset || 0,
        limit: req.body.limit || 50,
        order: [["created_at", "DESC"]],
        attributes: [
          "batch_id",
          "batch_name",
          "batch_quantity",
          "pid",
          "batch_pdf_url",
          "created_by",
          "created_at",
          "updated_at",
        ],
        include: [
          {
            model: ProductMaster,
            required: true,
            attributes: ["product_name"],
          },
          {
            model: ProductVariantMaster,
            required: true,
            attributes: ["weight", "selling_price", "base_price"],
          },
        ],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    }).catch((err) => {
      return err;
    });
  }

  async DeleteBatch(req, res){
    var msg = ""
    return new Promise((resolve, reject)=>{
        BatchMaster.findAndCountAll({
            where: {batch_id: req.body.batchId}
        }).then((result_batch)=>{
            if(result_batch.count != 0){
                QRBatchMaster.findAll({
                    raw: true,
                    where: {batch_id: req.body.batchId}
                }).then((result)=>{
                    for(let qr of result){
                        QRMaster.destroy({
                            where: {qr_id: qr.qr_id}
                        })                    
                    }
        
                    QRBatchMaster.destroy({
                        where: {batch_id: req.body.batchId}
                    })

                    BatchMaster.destroy({
                        where: {batch_id: req.body.batchId}
                    })
                    msg = "Batch deleted Successfully"
                    resolve(msg)
                })
            }else{
                console.log("No Batch Found")
                msg = "No Batch Found"
                resolve(msg)
            }
        })
    }).catch((err)=>{
        msg = err
    })
  }
}

module.exports = BatchMasterService;
