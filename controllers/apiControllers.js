const {user,course,studCourse,role}   = require("../models/dbModel");


module.exports.role = (req,res,next)=>{
     try {
         let roles = new role({
              role:req.body.role
         });
         roles.save((err,data)=>{
              if(err){
                   next(err)
              }
              else{
                   res.json({data:data});
              }
         }); 
     } catch (error) {
          next(error);
     }
}

module.exports.showroles = (req,res,next)=>{
     try {
          role.find((err,data)=>{
              if(err){
                   next(err)
              }
              else{
                   res.json({data:data});
              }
          });
     } catch (error) {
          next(error);
     }
}

module.exports.adduser = (req,res,next)=>{
     try {
          let users = new user({
               name : req.body.name,
               email: req.body.email,
               phno : req.body.phno,
               role : req.body.role
          });
          users.save((err,data)=>{
               if(err){
                    next(err);
               }
               else{
                    res.json({data:data});
               }
          });
     } catch (error) {
          next(error);
     }
}

module.exports.showausers = (req,res,next)=>{
     try {
          user.find((err,data)=>{
               if(err){
                    next(err);
               }
               else{
                    res.json({data:data});
               }
          });
     } catch (error) {
          next(error);
     }
}

module.exports.addcourse = (req,res,next)=>{
     try {
         let courses = new course({
              name : req.body.name,
              seatavailable:req.body.seatavailable
         }); 
         courses.save((err,data)=>{
               if(err) {
                    next(err);
               }
               else{
                   res.json({data:data}); 
               }
         });
     } catch (error) {
          next(error);
     }
}

module.exports.showcourses=(req,res,next)=>{
     try {
          course.find((err,data)=>{
             if(err){
                  next(err);
             }
             else{
                  res.json({data:data});
             }
          });
     } catch (error) {
          next(error);
     }
}

module.exports.coursestaken = (req,res,next)=>{
     try {
         let coursetaken = new  studCourse({
              studentId: req.body.studid,
              courseId:  req.body.courseid,
              enrolledOn: req.body.date,
              status : req.body.status
         });
         course.findOne({"_id":req.body.courseid},{},(err,data)=>{
            if(data.seatavailable>0){
               
               studCourse.findOne(
                    {"studentId":req.body.studid,"courseId":req.body.courseid},
                    (err,sdata)=>{
                         if(err){
                              next(err)
                         }
                         else if(sdata){
                              res.json({msg:"student already taken the course"})
                         }
                         else{
                              course.updateOne({"_id":req.body.courseid},
               {$inc : {"seatavailable":-1}},(err,updata)=>{
                     if(err){
                          next(err)
                     }
                     else{
                       coursetaken.save((err,cdata)=>{
                            if(err){
                                 next(err);
                            }
                            else{
                                 res.json({data:cdata});
                            }
                       });     
                     }
               });
                         }
                    });
            }
            else{
                 res.json({msg:"no seats available"});
            }
         });
     } catch (error) {
          next(error);
     }
}

module.exports.showenroleduser=(req,res,next)=>{
     try {
           studCourse.find((err,data)=>{
                 if(err){
                      next(err);
                 } 
                 else{
                      res.json({data:data})
                 }
           });
     } catch (error) {
          next(error);
     }
}

module.exports.enroleduser = (req,res,next)=>{
     try {
          studCourse.findOne({"_id":req.params.id},(err,data)=>{
               if(err){
                  next(err);
               }
               else{
                    res.json({data:data})
               }
         });
     } catch (error) {
          next(error)
     }
}

module.exports.updatestatus = (req,res,next)=>{
     try {
       let status = {
            status : req.body.status
       }
       studCourse.updateOne(
            {"_id":req.body.id},{$set:status},(err,udata)=>{
                 if(err){
                      next(err);
                 }
                 else{
                      res.json({data:udata});
                 }
            });
     } catch (error) {
          next(error);
     }
}