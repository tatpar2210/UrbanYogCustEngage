const dashboardWalletService = require("../services/dashboardWalletService")

const dashboardservice = new dashboardWalletService()

exports.getWalletCount = (req, res) => {
    dashboardservice.getWalletCount(req, res).then(data => {
        if (data) {
            res.status(200).send({
                statusCode: 100,
                status: true,
                data: data
            })
        } else {
            res.status(200).send({
                statusCode: 101,
                status: false,
                data: data
            })
        }
    })
        .catch(err => {
            console.log(err);
            res.status(200).send({
                statusCode: 101,
                status: false,
                message: err,
                data: []
            })
        })
}