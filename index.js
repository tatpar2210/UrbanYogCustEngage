const express = require("express")
const app = express()

const ProductReview = require("./src/controllers/productReviewController")

app.post('/getProductReview/:id', ProductReview.getAllReviews);
app.post("/postReviews/:id", ProductReview.postReviews)


app.listen(3000)