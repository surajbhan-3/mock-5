
const mongoose= require("mongoose");


const doctorSchema = mongoose.Schema({

      name :{type:String, required:true},
       image :{type:String, required:true},
       spcl:{type:String, required:true},
       experience:{type:Number, required:true},
         date:{type:Date, required:true},
        location:{type:String, required:true},
        slots:{type:Number, required:true},
        fee:{type:Number, required:true}

})


const DoctorModel= mongoose.model("doctor",doctorSchema)


module.exports = {DoctorModel}


