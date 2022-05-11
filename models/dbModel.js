const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phno:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true,
        ref:"roles"
    }
});

const roleSchema = new mongoose.Schema({
      role:{
          type:String,
          unique:true,
          required:true
      }
});

const courseSchema = new mongoose.Schema({
    // name, noOfSeatsAvailable 
    name:{
        type:String,
        required:true,
        unique:true
    },
    seatavailable:{
        type:Number,
        required:true
    }
});

const studentCourse = new mongoose.Schema({
    // studentId, courceId, enrolledOn, status
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses",
        required:true
    },
    enrolledOn:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
    }
});

const user   = mongoose.model("users",userSchema)
const course = mongoose.model("courses",courseSchema)
const role   = mongoose.model("roles",roleSchema)
const studCourse = mongoose.model("studcourses",studentCourse)

module.exports ={
   user,
   course,
   role,
   studCourse
}