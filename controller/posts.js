const { all } = require("axios")
const postModel=require("../models/posts.model")

const getPosts=async(req,res)=>{
    try{
        const allPosts=await postModel.find()
        console.log("All posts")
        res.send(allPosts)

    }catch(err){
        console.log(err)
        res.send("Error occured while getting posts")

    }
}


const addPosts=async(req,res)=>{
    const payload=req.body
    try{
        const data=postModel(payload)
        await data.save()
        console.log("Posted succesfully")
        res.send("Succesfully Posted")
        
    }catch(err){
        res.send("Error occured while posting")
    }
}

const updatePost=async(req,res)=>{
    const payload=req.body
    const {_id}=req.params
    try{
        await postModel.findByIdAndUpdate({_id},payload)
        console.log("Post updated succesfully")
        res.send("Post updated succesfully")

    }catch(err){
        res.send("Error occured while updating")
    }
}

const deletePost=async(req,res)=>{
   
    const {_id}=req.params
    try{
        await postModel.findByIdAndDelete({_id})
        console.log("Post deleted succesfully")
        res.send("Post deleted succesfully")

    }catch(err){
        res.send("Error occured while deleting")
    }
}

module.exports={getPosts,addPosts,updatePost,deletePost}