const productController = require("../controllers/productController")
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
router.get("/getProducts",productController.getProducts)
router.post("/",auth,productController.createProducts)

module.exports=router