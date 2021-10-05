const express = require("express")
const app = express()

const ProductReview = require("./src/controllers/productReviewController")

app.post('/getProductReview/:id', ProductReview.getAllReviews);


app.listen(3000)