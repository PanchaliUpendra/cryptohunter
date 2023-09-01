import React, { useContext, useState } from 'react'
import { Mycontext } from '../contextapi/Maincontext'
import './Listdata.css';
const Listdata = () => {
    const{mylist,setMylist}=useContext(Mycontext);
    console.log(mylist);
    const[vals,setVals]=useState([]);
    const deleteitem=async(id)=>{
        const del=await fetch(`/deletelist/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await del.json();
        if(res.status==200){
            alert(res.msg);
            setMylist(res.mylist);
            setVals(res.mylist);
        }
        else{
            alert(res.msg);
        }
    }

  return (
    <>
    <div className='listdata-container'>
    {
        mylist.length==0?
        <div>
            <h1 className='listdata-nothing-header'>Nothing is added to cart</h1>
        </div>
        :
        <table className='listdata-table'>
        
            <tr className='coinstable-table-head'>
            <th>Coin</th>
            <th>Price</th>
            <th>Rank</th>
            <th>Image</th>
            <th>Remove</th>
            </tr>
        
        {mylist.map((data)=>{
            return(
                <tr>
                <td>{data.name}</td>
                
                <td>{data.price}</td>
                <td>{data.rank}</td>
                <td><img src={data.imgurl} alt="" className='listdata-image'/></td>
                <td onClick={()=>deleteitem(data._id)}>delete</td>
                </tr>
            )
        })}
        </table>
    }
    </div>
    </>
  )
}

export default Listdata