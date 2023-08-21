const express = require("express");
const doctorRouter= express.Router()
const {DoctorModel} = require("../models/onboard.model")



doctorRouter.post("/appointments", async(req,res)=>{
  const { name,image,spcl,experience, date, location,  slots, fee} = req.body;


         try {
            const addDoctor = new DoctorModel({ name:name,
                image:image,
                spcl:spcl,
                experience:experience,
                date:date,
                location:location,
                slots:slots,
                fee:fee})

                await addDoctor.save()
                res.status(201).send({"msg":"Data is added successfully"})
      
            
         } catch (error) {

            res.status(500).send({"msg":error.message})


            
         }
})


doctorRouter.get("/appointments", async(req,res)=>{

 
 
          try {
             const allApoint= await DoctorModel.find()
              res.send(allApoint)
          } catch (error) {
 
             res.status(500).send({"msg":error.message})
 
 
             
          }
 })


 doctorRouter.patch("/appointments/:id", async(req,res)=>{
   const id = req.params.id;
   const payload = req.body;
  console.log(payload)

try {


      const doctorData = await DoctorModel.findByIdAndUpdate({_id:id},payload)
      
      if(!doctorData){
        return res.status(404).send("Error")
      }
      return res.status(204).send(doctorData)
      
 
} catch (error) {

    return res.send({"msg":error.message})
 
}
})





doctorRouter.delete("/appointments/:id", async(req,res)=>{
   const id = req.params.id;
  

try {
   

        await DoctorModel.findByIdAndDelete({_id:id})
      
       return res.status(202).send("Data has been deleted")
      
 
} catch (error) {

    return res.send({"msg":error.message})
 
}
})


doctorRouter.get("/appointments/filter", async (req, res) => { 
   try {
       const { specialization, page } = req.query;

       const pagesize = 5;
  
        const filteredData = await DoctorModel.find({ specialization: specialization }).skip((page - 1) * pagesize).limit(pagesize);
        const total = filteredData.length;

       return res.send(filteredData,total)
   } catch (error) {
     
       res.status(500).send({ "msg":error.message }); 
   }
})


doctorRouter.get("/appointments/sorting", async (req, res) => { 
   try {
       
     const { sortBy, page } = req.query;
        const pagesize = 5;

          const filteredData = await DoctorModel.find().sort({ date :sortBy=="asc"?1:-1}).skip((page - 1) * pagesize).limit(pagesize);
           const total = filteredData.length;
  
            return res.send(filteredData, total)

   } catch (error) {
     
       res.status(500).send({ "msg":error.message }); 
   }
})


doctorRouter.get("/appointments/sorting", async (req, res) => { 
   try {
       
      const { search, page } = req.query;
       const pagesize = 5;

        const squery={name:{$regrex:search,$options:'i'}}
       const filteredData = await DoctorModel.find(squery).skip((page - 1) * pagesize).limit(pagesize);
          const total = filteredData.length;
      return res.send(filteredData, total )
     

   } catch (error) {
     
       res.status(500).send({ "msg":error.message }); 
   }
})
module.exports = {doctorRouter}
