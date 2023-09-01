import React ,{useState,useEffect, useContext} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import './Coinpage.css';
import axios from "axios";
import { SingleCoin } from "../Config/Api";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import CoinInfo from '../Components/CoinInfo';
import { Mycontext } from '../Components/contextapi/Maincontext';
const Coinpage = () =>{
  const {userdata,setMylist}=useContext(Mycontext);
  const navigate=useNavigate();
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
    
        setCoin(data);
      };
      useEffect(() => {
        fetchCoin();
      }, []);

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      if (!coin) return <LinearProgress/>

      const addcoin=async()=>{
          const coinsend=await fetch("/addlist",{
            method:"POST",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              name:coin.name,imgurl:coin.image.large,price:numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]),rank:coin?.coingecko_rank,
                userid:userdata._id
            })
          });
          const res=await coinsend.json();
          if(res.status==400){
            alert(res.msg);
            navigate('/signup');
          }
          else if(res.status==200){
            alert(res.msg);
            setMylist(res.mylist);
          }
          else{
            alert(res.msg);
          }


      }
    return(
        <>
        <div className='coinpage-whole-container'>
        <div className='coinpage-first-container'>
            <div className='coinpage-sidebar-container'>
            <img
              src={coin?.image.large}
              alt={coin?.name}
               className='coinpage-sidebar-container-img'
              />
              <h3 className="particular-coin-name">{coin?.name}</h3>
              <p>{coin?.description.en.split(". ")[0]}</p>
              <div className='coin-detils-inner'>
                <h3>Rank:<span className='coin-details-main'>{coin?.market_cap_rank}</span></h3>
                <h3>Current Price:<span className='coin-details-main'>{symbol}{" "}{numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()])}</span></h3>
                <h3>Rank:<span className='coin-details-main'>{symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M</span></h3>
              <h3>Coingecko Rank:<span className='coin-details-main'>{coin?.coingecko_rank}</span></h3>
              <h3>Coingecko Score:<span className='coin-details-main'>{coin?.coingecko_score}</span> </h3>
              <h3>community Score:<span className='coin-details-main'>{coin?.community_score}</span></h3>
              <h3>Twitter followers:<span className='coin-details-main'>{coin?.community_data.twitter_followers}</span></h3>
              <h3>Developer Score:<span className='coin-details-main'>{coin?.developer_score}</span></h3>
              <h3>Liquidity Score:<span className='coin-details-main'>{coin?.liquidity_score}</span></h3>
              </div>
            </div>
            <div>
            <CoinInfo coin={coin}/>
            </div>
        </div>
        <div className='coinpage-add-to-list'>
          <button onClick={()=>addcoin()}>Add to cart</button>
        </div>
        </div>
        </>
    );
}
export default Coinpage;