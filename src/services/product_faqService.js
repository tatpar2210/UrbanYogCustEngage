const product_faq = require("../models").product_faq
const ProductMaster = require('../models').product_master;

class product_faqService{
    getAll_productFaq(req, res){
        let where = {}

            if (req.body.faqId) {
                where.faq_id = req.body.faqId;
            }

            if (req.body.pId) {
                where.pid = req.body.pId;
            }

            if (req.body.question) {
                where.question = { [Op.like]: `%${req.body.question}%` };
            }

            if (req.body.pId == 0) {
                where.pid = 0;
            }

            product_faq.belongsTo(ProductMaster, { foreignKey: 'pid', targetKey: 'pid' })

            return product_faq.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 10,
                attributes: ['faq_id', 'pid', 'question', 'answer', 'updated_at', 'created_at'],
                include: [{
                    model: ProductMaster,
                    required: true,
                    attributes: ['pid', 'product_name'],
                }],
                order: [
                    [ProductMaster, 'product_name', 'ASC']
                ]
            }).then(result => {
                return result
            }).catch(error => {
                return error
            });
    }
}

module.exports = product_faqService