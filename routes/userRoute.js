const express=require("express")
const UserRoute=express.Router()
const UserModel=require("../models/userModel")
const jwt= require("jsonwebtoken")
const verifyUser =require("../middleware/verifyUser")

 const dummyData=[
    {
        productName:"laptop",
        date:'1998-04-04'
    },
     {
        productName:"mobile",
        date:'1999-04-04'
    },
     {
        productName:"printer",
        date:'2000-04-04'
    },
     {
        productName:"mouse",
        date:'2001-04-04'
    },
     {
        productName:"keyboard",
        date:'2001-04-04'
    },
     {
        productName:"pendrive",
        date:'1998-04-04'
    },
     {
        productName:"dvd",
        date:'1999-04-04'
    }
]


UserRoute.get("/",verifyUser,async(req,res)=>{
    const data=await UserModel.find()
    return res.send({data})
})
 
UserRoute.get("/salesReport",verifyUser,async(req,res)=>{
    const {periodFrom,periodTo}=req.body
    const f=periodFrom.split("-")
    const t=periodTo.split("-")
    let newReport=dummyData.filter((e)=>{
        const from = new Date(`${f[2]}-${f[1]}-${f[0]}`);
        const to = new Date(`${t[2]}-${t[1]}-${t[0]}`);
        if(from.getTime() < (new Date(e.date)).getTime() && to.getTime() > (new Date(e.date).getTime())){
           return e
        }     
    })
    return res.send({message:"success",total:newReport.length, data:newReport})
})

UserRoute.post("/signup",async(req,res)=>{
    const {username,password}=req.body;
    const olduser= await UserModel.findOne({username})
    if(olduser){
        return res.send({message:"signup failed", description:"user already exists"})
    }
    const user=new UserModel({username,password})
    await user.save();
    return res.send({message:"signup succesfully", data:user})
})

UserRoute.post("/token",async(req,res)=>{
    const {username,password}=req.body;
    const user=await UserModel.findOne({username})

    if(!user){
        return res.send({message:"login failed", description:"user not found"})
    }
    else if(user.password === password){
        const token=jwt.sign({username}, "shhhhhh",{expiresIn:"5m"})
        return res.send({message:"login success",token})
    }
    else{
        return res.send({message:"login failed", description:"invalid password"})
    }
})


UserRoute.post("/account/add",verifyUser,async(req,res)=>{
    const {firstName,lastName,middleName,dob}=req.body;
    const fullname=`${firstName} ${middleName} ${lastName}`

    const d=dob.split("/")

    const diff_ms = Date.now() - new Date(d[2],d[1],d[0]).getTime();
    const age_dt = new Date(diff_ms); 
    const age=Math.abs(age_dt.getUTCFullYear() - 1970);
    return res.send({message:"success", fullname, age})

})

UserRoute.post("/calculateage",verifyUser,async(req,res)=>{
    const {dob, asonDate}=req.body;

    const b=dob.split("/")
    const d= asonDate && asonDate.split("/")

    const date= d && new Date(d[2],d[1],d[0]) || Date.now()

    const diff_ms = date - new Date(b[2],b[1],b[0]).getTime();
    const age_dt = new Date(diff_ms); 
    const age=Math.abs(age_dt.getUTCFullYear() - 1970);

    const newData=new UserModel({dob,asonDate,age})
    await newData.save()
    return res.send({message:"success", data:newData})

})

module.exports=UserRoute