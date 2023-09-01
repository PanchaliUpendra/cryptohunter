const express=require("express");
const app=express();
app.use(express.json());
const cookieparser=require('cookie-parser');
app.use(cookieparser());

const cors=require("cors");
app.use(cors());

const mongoose=require("mongoose");
const {Register_user,Login_user,addlist, verifyuser, Logout,deletelist}=require("./controllers/Maincontroller");
const Maincheck = require("./middleware/Maincheck");
mongoose.connect("mongodb+srv://rupendra206:rupendra206@cluster0.gqvvtpi.mongodb.net/",({ useNewUrlParser: true, useUnifiedTopology: true })).then(()=>{
    console.log("connected to the database");
})
app.get('/',(req,res)=>{
    res.send("Working");
})

app.post('/register',Register_user);
app.post('/login',Login_user);
app.post('/addlist',Maincheck,addlist);
app.get('/verifyuser',Maincheck,verifyuser);
app.get('/logoutuser',Logout);
app.get('/deletelist/:id',Maincheck,deletelist);
app.listen(5000,()=>{
    console.log("Server started");
})