const productMasterModle = require("../models").product_master

class productMasterModleService{
    getPidFromDatabae(shopify_pr_id){

        return productMasterModle.findOne({where: {
            product_id: shopify_pr_id
        }})
    }

    findAll(){
        return productMasterModle.findAll()
    }

    findOneByPID(p_id){
        return productMasterModle.findOne({
            where: {
                pid: p_id
            }
        })
    }

    findOneByShopifyID(prod_id){
        return productMasterModle.findOne({
            where: {
                product_id: prod_id
            }
        })
    }

    addProduct(data){
        return productMasterModle.create(data)
    }

    addMissingProduct(data){
        return productMasterModle.create(data)
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

module.exports = productMasterModleService