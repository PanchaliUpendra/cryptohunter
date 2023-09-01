const mongoose=require("mongoose");


const listschema=new mongoose.Schema({
    name:{
        type:"string"
    },
    imgurl:{
        type:"String"
    },
    price:{
        type:"string"
    },
    rank:{
        type:"String"
    },
    authid:{
        type:"String"
    }
});

const addlist=mongoose.model("addlist",listschema);
module.exports=addlist;