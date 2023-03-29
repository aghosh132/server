const mongoose=require("mongoose")
 // connection string

 mongoose.connect("mongodb://localhost:27017/bankserver",{useNewUrlParser:true})


 //model

 const User = mongoose.model("User",
 {
username:String,
acno:Number,
password:String,
balance:Number,
transactions:[]

 }
 )

 module.exports={
    User
 }
 