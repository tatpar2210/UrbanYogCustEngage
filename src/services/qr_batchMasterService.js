const Sequelize = require("sequelize")
const {sequelize, queryInterface} = require("../database/connection")
const qr_batchMasterModel = require("../models/qr_batchMasterModel").qr_batchMasterModel()
const productMasterModel = require("../models/productMasterModle").productMaster()
const productVarientMaster = require("../models/product-varientMasterModel").productVarientMaster()


module.exports = {
    getbatchMasterDetails: function(data){
        return new Promise(function(){
            const where = {}

            if (data.batchId){
                where.batch_id = data.batchId
            }

            if (data.pId){
                where.pid = data.pId
            }

            if (data.batchName){
                where.batch_name = data.batchName
            }


            qr_batchMasterModel.belongsTo(productMasterModel, {
                foreignKey: "pid"
            })

            qr_batchMasterModel.belongsTo(productVarientMaster, {
                foreignKey: "variant_id"
            })

            return qr_batchMasterModel.findAndCountAll({
                where: where,
                offset: data.offset || 0,
                limit: data.limit || 30,
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
                        model: productMasterModel
                    }
                ]

            })

        })
    }
}