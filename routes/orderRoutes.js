const orderController=require("../controllers/orderController");
const express=require("express")
const router = express.Router()
const auth=require("../middleware/auth")
router.post("/createOrder",auth,orderController.createOrder);
router.get("/getOrder",auth,orderController.getOrder);

module.exports=router