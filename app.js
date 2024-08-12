const express =require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes")
const mongoose = require("mongoose");
const port = 3000;
mongoose.connect("mongodb+srv://dharanidharan2442:dharani@cluster0.hpmoibl.mongodb.net/e_commerence"
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