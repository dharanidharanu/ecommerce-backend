const express =require("express")
const app = express()
app.use(express.json())
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes")
const mongoose = require("mongoose");
const port = 3000;
mongoose.connect("mongodb://localhost:27017/e_commerence"
).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
})

app.use("/products",productRoutes)
app.use("/user",userRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})