import React,{createContext, useEffect, useState} from 'react'

const Mycontext=createContext();
const Maincontext = ({children}) => {
    const[list,setList]=useState();
    const[verify,setVerify]=useState(false);
    const[userdata,setUserdata]=useState();
    const[mylist,setMylist]=useState([]);
    const check=async()=>{
        const val=await fetch('/verifyuser',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await val.json();
        if(res.status==200){
            setVerify(true);
            setMylist(res.mylist);
            setUserdata(res.data);
            // console.log(res.data);
        }
    }
    useEffect(()=>{
        check();
    },[]);
  return (
   <>
   <Mycontext.Provider value={{verify,setVerify,setMylist,mylist,userdata,setUserdata}}>{children}</Mycontext.Provider>
   </>
  )
}

export  {Maincontext,Mycontext};