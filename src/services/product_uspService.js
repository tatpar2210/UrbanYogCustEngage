const product_usp = require("../models").product_usp
const Productmaster = require("../models").product_master;

class product_uspService{
    getAll_usp(req, res){
        let where = {}

        if (req.body.uspId) {
            where.prod_usp_id = req.body.uspId;
        }

        if (req.body.pid) {
            where.pid = req.body.pid;
        }

        if (req.body.product_id) {
            where.product_id = req.body.product_id;
        }

        if (req.body.uspTitle) {
            where.usp_title = req.body.uspTitle;
        }

        product_usp.belongsTo(Productmaster, {
            foreignKey: "pid",
        });

        return product_usp.findAndCountAll({
            where: where,
            offset: req.body.offset || 0,
            limit: req.body.limit || 50,
            attributes: ['prod_usp_id', 'usp_title', 'pid', 'updated_at', 'created_at'],
            include: [
                {
                    model: Productmaster,
                    required: true,
                    attributes: [
                        "pid",
                        "product_name",
                        "product_category",
                        "product_img_url"
                    ],
                },
            ],
            order: [
                [Productmaster, 'product_name', 'ASC']
            ]
        }).then(result => {
            return result
        })
            .catch(error => {
                console.log(error)
            });
    }

    storeUSP(data){
        return product_usp.create(data)
    }
}

module.exports = product_uspService