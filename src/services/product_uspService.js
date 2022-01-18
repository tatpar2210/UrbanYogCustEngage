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

    updateUsp(req, res) {

        var date = new Date();
        var dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        return new Promise((resolve, reject) => {

            let where = {};
            let data = {};

            if (req.body.uspId) {
                where.prod_usp_id = req.body.uspId;
            }

            if (req.body.uspTitle) {
                data.usp_title = req.body.uspTitle;
            }

            if (req.body.pid) {
                data.pid = req.body.pid;
            }


            data.updated_at = dateStr;

            return product_usp.update(data, {
                where: where,

            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    deleteUsp(req, res) {
        return new Promise((resolve, reject) => {

            let where = {};

            if (req.body.uspId) {
                where.prod_usp_id = req.body.uspId;
            }

            return product_usp.destroy({
                where: where
            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }
}

module.exports = product_uspService