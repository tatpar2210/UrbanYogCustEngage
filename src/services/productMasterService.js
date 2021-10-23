const productMasterModel = require("../models").product_master
const productVarientModel = require("../models").product_variant_master

class productMasterModelService{
    getPidFromDatabae(shopify_pr_id){

        productMasterModel.hasMany(productVarientModel, {
            foreignKey: "pid"
        })

        return productMasterModel.findAndCountAll({where: {
            product_id: shopify_pr_id
        },
        include: {model: productVarientModel}
    })
    }

    findAll(){
        return productMasterModel.findAndCountAll()
    }

    findOneByPID(p_id){

        return productMasterModel.findOne({
            where: {
                pid: p_id
            }
        })
    }

    findOneByShopifyID(prod_id){
        return productMasterModel.findOne({
            where: {
                product_id: prod_id
            }
        })
    }

    addProduct(data){
        return productMasterModel.create(data)
    }

    addMissingProduct(data){
        return productMasterModel.create(data)
    }

    async checkForMissingData(array){
        const shopify_prod_arr = array
        var msg = ""
        var missing_data = []

            for (var i = 0; i < shopify_prod_arr.length; i++){
                await this.findOneByShopifyID(shopify_prod_arr[i].product_id).then((result)=>{
                    if (!result){
                        missing_data.push(shopify_prod_arr[i])
                        //insert in database
                        this.addMissingProduct(shopify_prod_arr[i])
                    }else{
                        msg = "No missing data found"
                    }
                })
            }
            console.log(missing_data)
            return missing_data
    }
}

module.exports = productMasterModelService