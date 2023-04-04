const express=require("express")

const cors=require("cors")
const ds =require('./service/dataService')

const jwt=require("jsonwebtoken")

const app=express()

//integrate app with frontend
app.use(cors({origin:'http://localhost:4200'}))

app.use(express.json())


//middleware creation

const jwtMiddleware=(req,res,next)=>
{
// access data from reqquest body
try{
const token=req.headers['access_token']

//verify the token with secret key

const data=jwt.verify(token,"superkey1")
console.log(data);
next()
}
catch{
res.status(422).json({
  status:false,
  message:"please login",
  statusCode:404
})
}
}

app.post("/register",(req,res)=>{

 ds.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
  res.status(result.statusCode).json(result)})})
//login

  app.post("/login",(req,res)=>{

     ds.login(req.body.acno,req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)})})

  app.post("/deposit",jwtMiddleware,(req,res)=>{

     ds.deposit(req.body.acno,req.body.psw,req.body.amnt).then(result=>{
    res.status(result.statusCode).json(result)})})



  app.post("/withdrow",jwtMiddleware,(req,res)=>{

     ds.withdrow(req.body.acno,req.body.psw,req.body.amnt).then(result=>{
    res.status(result.statusCode).json(result)
  })})

  app.post("/transaction",jwtMiddleware,(req,res)=>{

     ds.getTransaction(req.body.acno).then(result=>{
    res.status(result.statusCode).json(result)
  })})

  app.delete("/delete/:acno",jwtMiddleware,(req,res)=>{

ds.deleteAcc(req.params.acno).then(result=>{
  res.status(res.statusCode).json(result)
})


  })


// if (result) {
//     res.send("registered")
// }
// else{
//     res.send("user already present")
// }
// app.post("/register",(req,res)=>{

// console.log(req.body);
// res.send("work")




// app.get("/",(req,res)=>{
//     res.send('get method working......')
// })









app.listen(3000,()=>{
console.log("server started at port 3000");


})