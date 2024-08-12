const userController = require ("../controllers/userController")
const express = require("express")
const router = express.Router()
router.post("/login",userController.login)
router.post("/createUser",userController.createUser)

module.exports=router