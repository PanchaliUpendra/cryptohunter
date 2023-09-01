const express=require("express");
const bcrypt=require("bcrypt");
const app=express();
app.use(express.json());
const cookieparser=require('cookie-parser');
app.use(cookieparser());

const jwt=require("jsonwebtoken");

const Register=require("../models/Registeruser");
const Addlist=require('../models/Addlist');

//registeruser
const Register_user=async(req,res)=>{
    const getdata=await req.body.mydata;
    const{name,gmail,contact,password}=getdata;
    if(name&&gmail&&contact&&password){
        const check_gmail=await Register.findOne({Gmail:gmail});
        if(check_gmail){
            res.send({msg:"Gmail already exists"});
        }
        else{
            const hashpass=await bcrypt.hash(password,10);
            const user_data=new Register({Name:name,Gmail:gmail,Contact:contact,Password:hashpass});
                user_data.save()
                .then((result)=>{
                    if(result){
                        res.send({status:200,msg:"Registered successfully"});
                    }
                    else{
                        res.send({msg:"Failed to register"});
                    }
                })
                .catch(err=>{
                    res.send({msg:err.message});
                })   
        }
    }
    else{
        res.send({msg:"enter all fields"});
    }
}

//loginuser
const Login_user=async(req,res)=>{
    const logdata=await req.body;
    const {gmail,password}=logdata;
    const checklog=await Register.findOne({Gmail:gmail});
    if(checklog){
        const passcheck=await bcrypt.compare(password,checklog.Password);
        if(passcheck){
            const token=await checklog.generatelogtoken();
            if(token){
                res.cookie('checktok',token,{httpOnly:true,expire:360000+Date.now()});
                const clientdata=await Register.findOne({Gmail:gmail}).select('Name Gmail Contact');
                res.send({msg:"Logged in",status:200,user:true,userdata:clientdata});
            }
            else{
                res.send({msg:"unable to login"});
            }
        }
        else{
            res.send({msg:"Invalid credentials"});
        }
    }
    else{
        res.send({msg:"User doesnt exists"});
    }

}


const Logout=async(req,res)=>{
    const x=res.clearCookie("checktok");
    if(x){
        console.log("Logged out");
        res.send({status:200,msg:"Logged out"});
    }
    else{
        console.log("unable to logout");
        res.send({msg:"Unable to logout"});
    }
}

const verifyuser=async(req,res)=>{
    const data=req.clientdata;
    if(data){
        res.send({data:data,msg:"valid user",status:200,mylist:req.mylist});
    }
    else{
        res.send({status:400});
    }

}
const addlist=async(req,res)=>{
    const list=await req.body;
    console.log(list);
    const {name,price,imgurl,rank,userid}=list;
    const check=await Addlist.findOne({name:name.toLowerCase()});
    if(check){
        res.send({msg:"already added to cart"});
    }
    else{
        if(name&&price&&imgurl&&rank&&userid){
            const newval=await new Addlist({name:name.toLowerCase(),price:price,imgurl:imgurl,rank:rank,authid:userid});
            newval.save().then(async(result)=>{
                const newlist=await Addlist.find({authid:req.clientdata._id});
                res.send({msg:"added to cart",status:200,mylist:newlist});
            })
            .catch((err)=>{
                console.log(err);
                res.send({msg:"unable to save"});
            })
        }
        else{
            res.send({msg:"unable to add try again"});
        }
    }
}

const deletelist=async(req,res,id)=>{
    const getid=await req.params.id;
        const dele=await Addlist.findByIdAndDelete({_id:getid}).then(async(result)=>{
            if(result){
                console.log(result);
                const newlist=await Addlist.find({authid:req.clientdata._id});
                res.send({msg:"deleted succesfully",mylist:newlist,status:200});
            }
            else{
                res.send({msg:"unable to delete"});
            }
        })
        .catch((err)=>{
            res.send({msg:"Failed to delete"});
        })
}

module.exports={Register_user,Login_user,addlist,verifyuser,Logout,deletelist};