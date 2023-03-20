const jwt=require("jsonwebtoken")
require("dotenv").config();

const verifyUser=(req,res,next)=>{
    const authHeader=req.headers.Authorization || req.headers.authorization

    if(authHeader){
        const token=authHeader.split(" ")[1]
        jwt.verify(token, "shhhhhh",(err,user)=>{
            if(err){
                return res.send({message:"invalid token"})
            }
            next()
        })
    }
    else{
        return res.send({message:"you are not authenticated"})
    }
}

module.exports=verifyUser;