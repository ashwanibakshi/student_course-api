const express   = require("express");
const  mongoose = require("mongoose");
const con       = require("./config/db").conn;

const app = express();

mongoose.connect(con)
.then(()=>console.log("connected to db"))
.catch((err)=>console.log("connection error",err))

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use("/api",require("./routes/apiRoutes"));

app.use((err,req,res,next)=>{
     res.json({msg:err.message});
     next();
});

app.listen(3000,()=>{`server run at port ${30000}`});