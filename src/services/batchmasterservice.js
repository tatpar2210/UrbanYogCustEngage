const BatchMaster = require("../models").batch_master;
const ProductMaster = require("../models").product_master;
const ProductVariantMaster = require("../models").product_variant_master;

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
}

module.exports = BatchMasterService;
