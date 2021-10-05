const express = require("express")
const app = express()

const ProductReview = require("./src/controllers/productReviewController")
app.use(express.json())

app.post('/getProductReview/:id', ProductReview.getAllReviews);
app.post("/postProductReview/:id", ProductReview.postReviews)


app.listen(3000)