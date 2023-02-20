const express=require("express")
const{register,login}=require("../controller/login")
const requireAuth=require("../middlewares/requireauth")
const {getPosts,addPosts,updatePost,deletePost}=require("../controller/posts")

const router=express()

router.post("/register",register)
router.post("/login",login)



router.use(requireAuth)
router.get("/",getPosts)
router.post("/post",addPosts)
router.patch("/update/:_id",updatePost)
router.delete("/delete/:_id",deletePost)

module.exports=router