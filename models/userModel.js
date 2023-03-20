const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    middleName:String,
    dob:String,
    asonDate:String,
    age:String
})

const UserModel=mongoose.model("gaurav", UserSchema)

module.exports=UserModel