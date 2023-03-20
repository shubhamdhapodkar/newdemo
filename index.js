const express=require("express");
require("dotenv").config();

const app=express();
app.use(express.json());

const connection =require("./config")
const UserRoute =require("./routes/userRoute")

// app.get("/",async(req,res)=>{
//     return res.send("home page gaurav")
// })

app.use("/",UserRoute)


app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log(err)
    }
    console.log(`db connected at port ${process.env.PORT}`)
})