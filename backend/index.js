const express = require("express");
const {connection} = require("./config/db");
const {userRouter}= require("./routes/user.routes")
const {doctorRouter} = require("./routes/onboard.route")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())




app.get("/",async(req,res)=>{

      try {
         res.send("Welcome to the homepage of Doctors")
      } catch (error) {
        res.send({"msg":error.message})
      }
})



app.use("/api", userRouter)
app.use ("/api", doctorRouter)


app.listen(process.env.PORT, async(req,res)=>{
      
     try {
         await connection 
         console.log("Connected to database")
     } catch (error) {
        console.log(error)
     }

     console.log("Server is running at port 4500")
})
