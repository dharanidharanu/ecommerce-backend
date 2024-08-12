const Product = require("../models/productmodel")
const {v4:uuidv4}=require("uuid")
exports.getProducts= async (req,res)=>{
    try{
        const products =await Product.find();
        res.send(products);
    }
    catch(err){
        console.error(err);
    }
};

exports.createProducts= async (req,res)=>{
    const{title,description,prize,catagory,rating,image}=req.body;
    const product = new Product({
        id:uuidv4(),
        title:title,
        description:description,
        prize:prize,
        catagory:catagory,
        rating:rating,
        image:image
    })
    try{    
    await product.save();    
    res.status(200).json({"message":"Product Created Successfully"})}
    catch(err){
    console.error(err);    
    }
}