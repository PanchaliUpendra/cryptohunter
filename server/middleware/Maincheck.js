const express=require("express");
const app=express();
app.use(express.json());
const cookieparser=require('cookie-parser');
app.use(cookieparser());
const jwt=require("jsonwebtoken"); 
//model

const Register=require("../models/Registeruser");
const Addlist=require('../models/Addlist');

const Maincheck=async(req,res,next)=>{
    try{
     const token=await req.cookies.checktok;
    if(token){
        const verify=await jwt.verify(token,"thisisaprivatekeytohashthetoken");
        const clientdata=await Register.findOne({_id:verify._id}).select('_id Name Gmail Contact');
        const mylist=await Addlist.find({authid:verify._id});
        console.log(verify._id);
        console.log(mylist);
        req.mylist=mylist;
        req.clientdata=clientdata;
    next();
    }
    else{
        res.send({msg:"unauthorised access",status:400});
        console.log("not authorized");
    }
    }
    catch(err){
        console.log(err);
    }
}

module.exports=Maincheck;