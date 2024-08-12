const User=require("../models/usermodel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.createUser=async(req,res)=>{
    const {username,email,password} = req.body;
    
    const user1 = new User({
        username,
        email,
        password
    })
    try{
    await user1.save();    

    res.status(200).json({"message":"User Created Successfully"})
    }catch(err){
        console.log(err);
    }
}

exports.login= async(req,res)=>{
    const {email,password}=req.body;
    console.log(email);
    try{
        const user =await User.findOne({email})
        if(!user){
            res.status(400).json("invalid username or password");
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json("invalid username or password");
        }
        const token = jwt.sign({user_id:user._id, email:email},"secret_token",{
            expiresIn:"1h",
        });
        res.status(200).json(token);
    }catch(err){
        console.log(err);
    }
}