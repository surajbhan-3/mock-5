const express = require("express");
const userRouter= express.Router()
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
require("dotenv").config();
let skey = process.env.SECRET


userRouter.post("/signup", async(req,res)=>{
 const {name, email , password} = req.body

         try {
            const isUserPresent = await UserModel.findOne({email})
               if(isUserPresent){
                return res.status(200).send({"msg":"You are not Registered User"})
               }
               const hashPassword = bcrypt.hashSync(password,8);
               const userRegister =  new UserModel({"name":name, "email":email, "password":hashPassword})
                await userRegister.save();
                return res.status(201).send({"msg":"User Registerd Successfully"})

            
         } catch (error) {

            res.status(500).send({"msg":error.message})
         }
})



userRouter.post("/login", async(req,res)=>{

     const {email, password} = req.body;

    try {
        const userLogin = await UserModel.findOne({email:email});
         if(!userLogin){
             res.status(401).send({"msg":"You are not a Register User Please register"});

         }
         const isUserPassword = bcrypt.compare(password,userLogin.password);
         if(!isUserPassword){
            return res.status(401).send({"msg":"Wrong Credential"})
         }

         const token = jwt.sign({userId:userLogin._id,email:userLogin.email},skey)
         return res.status(201).send({"msg":"Login successfully", token:token})

    } catch (error) {

       res.send({"msg":error.message})
    }
})


module.exports = {userRouter}