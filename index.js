const express = require("express");
const {users}=require("./data/users.json")
const app = express();
const PORT =4000;
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"server is running sucessfully"
    });
})
/*
  => route: /users
  => method: GET
  => Description: Get all the users
  => Acsess: Public
  => Parameters:none
*/
app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data: users
    })
})

/*
  => route: /users:id
  => method: GET
  => Description: Get all the users
  => Acsess: Public
  => Parameters:Id
*/
app.get("/users/:id",(req,res)=>{

    const {id}=req.params
    const user = users.find((each)=>each.id ===id);   
    if(!user){
        return res.status(404).json({
          success:false,
          message:"not found user"
        })
    }
    return res.status(200).json({
        success:true,
        data: user
    })
})

/*
  => route: /users
  => method: POST
  => Description: create a new user
  => Acsess: Public
  => Parameters:None
*/
app.post("/users",(req,res)=>{
    const {id,email,name,surname,subscriptionType,subscriptionDate}=req.body;
    const user = users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"user already exist"
        })   
    }
        users.push({
        id,
        name,
        surname,
        email,
        subscriptionDate,
        subscriptionType
    })
    return res.status(201).json({
        success:true,
        data:users
    })
})


app.get("*",(req,res)=>{
    res.status(404).json({
        message:"route not Found"
    })
})



app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`)
})