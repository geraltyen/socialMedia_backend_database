const express=require("express")
const DBConnection=require("./config/database")
require("dotenv").config();
const router=require("./routes/routes")
const app=express()
const port=process.env.port
const cors=require("cors")



app.use(cors())
app.use(express.json())

app.use("/",router)



app.listen(port,async()=>{
    try{
        await DBConnection
        console.log("Database is connected Succesfully")
        console.log(`Port is running at ${port}`)
    }catch(err){
        console.log(`error occured while Connection`)
    }
})
