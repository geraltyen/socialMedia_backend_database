const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const register=(req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    bcrypt.hash(password,5,(err,authenticated)=>{
        if(err){
            console.log(err)
        }else{
            try{
                const userData=userModel({name,email,gender,password:authenticated,age,city})
                userData.save()
                console.log("Succesfully Registered")
                res.send({"msg":"Succesfully registered"})
            }catch(err){
                console.log("Error occured",err)
                res.send("Could not register")
            }
        }
    })
}

const login=(req,res)=>{
    const {email,password}=req.body
   userModel.find({email}).then(userdata=>{
    if(!userdata){
        res.send("You are not Registered Please register")
    }else{
        bcrypt.compare(password,userdata[0].password,(err,correct)=>{
            if(!correct){
                console.log("Password is wrong")
                res.send("Password is wrong")
            }else{
                const token=jwt.sign(password,"social_app")
                
                console.log("Succesfully logged in \n || Token:",token)
                res.send({"msg":"Succesfully logged in","token":token})
            }
        })
    }
   })
   
}

module.exports={register,login}