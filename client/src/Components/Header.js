import React, { useContext, useEffect,useState } from 'react';
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom';
import {CryptoState} from '../CryptoContext';
import { Mycontext } from './contextapi/Maincontext';
const Header = () =>{
    const navigate=useNavigate();
    const{verify,setVerify,setUserdata}=useContext(Mycontext);
    const {currency , setcurrency} = CryptoState();
    const[log,setLog]=useState(false);
    const verifying=async()=>{
        const val=await fetch('/verifyuser',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await val.json();
        if(res.status==200){
            setLog(true);
            setVerify(true);
        }
    }
    useEffect(()=>{
        verifying();
    },[]);


    const logoutuser=async()=>{
        const loguser=await fetch('/logoutuser',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await loguser.json();
        if(res.status==200){
            alert(res.msg);
            setLog(false);
            setVerify(false);
            setUserdata("");
            navigate('/');
        }
    }
    return(
        <>
       
            <div className='app-container'>
                <section className='header-navbar'>
                    <NavLink to ='/'><h1 className='header-logo-head'>Crypto Hunter</h1></NavLink>
                    <div className='header-login-plus-value'>
                    <select className='header-nabar-select'
                    value={currency}
                    onChange={(e) => setcurrency(e.target.value)}
                    >
                        <option value='USD'>USD</option>
                        <option value='INR'>INR</option>
                    </select>
                    <div >
                        {
                            verify?
                            <div className='header-logout-cart'>
                                <p><NavLink to={'/listdata'} className="header-first-para-link">MyCart</NavLink></p>
                                {/* add css here */}
                                 <p><NavLink onClick={logoutuser}>Logout</NavLink></p>
                            </div>
                            :
                            <div className='header-login-btn'>
                                <p><NavLink to={'/signup'}>Login</NavLink></p>
                            </div>
                            
                        }
                    </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Header;