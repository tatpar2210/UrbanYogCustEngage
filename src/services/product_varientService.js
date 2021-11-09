const product_variant_master = require("../models").product_variant_master

class product_variantService{
    getAll_ProductVarients(){
        return product_variant_master.findAndCountAll()
    }

    getProductVarientByPid(pid){
        return product_variant_master.findAndCountAll({
            where:{
                pid: pid
            }
        })
    }
}

module.exports = product_variantService