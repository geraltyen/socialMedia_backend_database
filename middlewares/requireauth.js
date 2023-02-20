const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")

const requireAuth=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        res.send({"err":"Not Authorized"})

    }else{
        const token=authorization.replace("Bearer","")
        jwt.verify(token,"social_app",(err,data)=>{
            if(err){
                res.send("You must be logged in")
            }else{
                const{_id}=data
               let userdata= userModel.findById(_id)
               req.user=userdata
               next()
            }
        })
    }
}

module.exports=requireAuth