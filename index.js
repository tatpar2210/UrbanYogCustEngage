const express = require("express")
const app = express()

const ProductReview = require("./src/controllers/productReviewController")
app.use(express.json())

app.use(function(req, res, next){
    res.type('json')
    res.header("Access-Control-Allow-Origin", ["*"]); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Content-Type', 'application/json');
    next()
})

app.get('/getProductReview/:id', ProductReview.getAllReviews);
app.post("/postProductReview/:id", ProductReview.postReviews)


app.listen(3000)