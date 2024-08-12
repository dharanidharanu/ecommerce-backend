const cartController = require("../controllers/cartController")
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
router.get("/getCart",auth,cartController.getCart)
router.post("/createCart",auth,cartController.createCart)
router.post("/deleteCart",auth,cartController.deleteCart)

module.exports=router