const productMasterModle = require("../models/productMasterModle")


module.exports = {
    getPidFromDatabae: function(shopify_pr_id){
        const ProductMaster = productMasterModle.productMaster()

        return ProductMaster.findOne({where: {
            product_id: shopify_pr_id
        }})
    },
    
    findAll: function(){
        const ProductMaster = productMasterModle.productMaster()
        
        return ProductMaster.findAll()
    },

    findOne: function(p_id){
        const ProductMaster = productMasterModle.productMaster()

        return ProductMaster.findOne({
            where: {
                pid: p_id
            }
        })
    }
}