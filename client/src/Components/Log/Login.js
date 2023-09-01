import React,{useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { Mycontext } from '../contextapi/Maincontext';
import './Login.css'
const Login = () => {
    const {setVerify,setUserdata}=useContext(Mycontext);
    const navigate=useNavigate();
    const[reg,setReg]=useState("login");
    const[gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    const[regdata,setRegdata]=useState({
        name:"",
        gmail:"",
        contact:"",
        password:"",
        cnfrmpass:""
    })
    const registeruser=async()=>{
       if(!regdata.name || !regdata.gmail || !regdata.contact || !regdata.password || !regdata.cnfrmpass){
        alert("All fields are required");
       }
       else{
        if(regdata.password!=regdata.cnfrmpass){
            alert("password and cnfrm not matching");
        }
        else{
            const senddata=await fetch("/register",{
                method:"POST",
                headers:{
                "Content-Type":"Application/json"
                 },
                 body:JSON.stringify({
                     mydata:regdata
                 })
             });
             const res=await senddata.json();
             console.log(res);
             if(res.status==200){
                alert(res.msg);
                setReg("login");
                

             }
             else{
                alert(res.msg);
             }
             
           }
        }
    }
    let namer,valuer;
    const handledata=(e)=>{
        namer=e.target.name;
        valuer=e.target.value;
        setRegdata({...regdata,[namer]:valuer});
    }

    // login fetching
    const loginuser=async()=>{
        if(gmail&&password){
            const login=await fetch('/login',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    gmail:gmail,password:password
                })
            })
            const res=await login.json();
            console.log(res);
            if(res.status==200){
                alert(res.msg);
                setVerify(true);
                setUserdata(res.userdata);
                navigate("/");
            }
            else{
                alert(res.msg);
            }
        }
        else{
            alert("all fields are required");
        }
    }
  return (
    <>
    <div className='login-container'>
    <div className="login-register-choose-btns">
        <button onClick={()=>setReg("login")} className={reg === "login" || reg === false ? "active-login-btn":"non-active-login-btn"}>Login</button>
        <button onClick={()=>setReg("register")} className={reg === "login" || reg === false ? "non-active-login-btn":"active-login-btn"}>Register</button>
    </div>
    {
        reg=="login"?
        <div className="login-signin-container">
            <h1>SignIn</h1>
            <div className="login-inner-signin-container">
                <div>
                <label htmlFor="">Gmail:</label>
                </div>
                <div>
                <input type="text" placeholder='enter gmail' onChange={e=>setGmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="">password</label>
                </div>
                <div>
                <input type="password" placeholder='enter password' onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button onClick={()=>loginuser()} className='signin-btn-submit' >Login</button>
            </div>
        </div>
        :
        <div className='register-signup-container'>
            <h1>Signup</h1>
            <div className="register-inner-container">

                <label htmlFor="">Name:</label>
                <input type="text" placeholder='enter name' name="name" value={regdata.name} onChange={(e)=>handledata(e)}/>
                <label htmlFor="">Gmail:</label>
                <input type="text" placeholder='enter gmail' name="gmail" value={regdata.gmail} onChange={(e)=>handledata(e)}/>
                <label htmlFor="">Contact</label>
                <input type="text" placeholder='enter contact num' name="contact" value={regdata.contact} onChange={(e)=>handledata(e)}/>
                <label htmlFor="">Password</label>
                <input type="password"placeholder='enter password' name="password" value={regdata.password} onChange={(e)=>handledata(e)}/>
                <label htmlFor="">conform Password</label>
                <input type="password"placeholder='enter confrom password' name="cnfrmpass" value={regdata.cnfrmpass} onChange={(e)=>handledata(e)} />
                <button onClick={registeruser}  className='signin-btn-submit'>Submit</button>
            </div>
        </div>
    }
    </div>
    </>
  )
}

export default Login