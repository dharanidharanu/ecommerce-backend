const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
 const auth =(req,res,next)=>{
    // console.log(req.protocol)     // "https"  
    // console.log(req.hostname)     // "example.com"  
    // console.log(req.path)         // "/creatures"  
    // console.log(req.originalUrl)  // "/creatures?filter=sharks"  
    // console.log(req.subdomains)
    // console.log(req.subdomains)
    // console.log("Autho value" +req.header("Authorization"));
    if(!req.header("Authorization")){
        return res.status(401).json({error:"No Token,authorization denied"});
    }
    const token=req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(401).json({error:"No Token,authorization denied"});
    }
    try{
        const decoded=jwt.verify(token,"secret_token");
        req.user =decoded;
        next();
    }catch(err){
        res.status(401).json({error: "Token is not valid"});
    }
 };
 module.exports = auth;