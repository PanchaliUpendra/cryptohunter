import React, { useEffect, useState } from 'react';
import './CoinsTable.css';
import { CryptoState } from '../CryptoContext';
/*import Autocomplete from '@mui/material/Autocomplete';*/
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

/*import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";*/
import { CoinList } from "../Config/Api";
import { useNavigate } from 'react-router-dom';
import { data } from './Banner/data';
const CoinsTable = () =>{
    const [coins,setCoins] =useState(data);
    const [loading ,setLoading] =useState(false);
    const [search , setSearch] = useState();
    const [page, setPage] = useState(1);
    const { currency ,symbol } = CryptoState();

    const handleSearch = (e) => {
      const mydata=()=>{
        return coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(e.target.value) ||
              coin.symbol.toLowerCase().includes(e.target.value)
          );
      }
      setCoins(mydata);
    };
    


    useEffect(()=>{
        setLoading(true);
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(response => response.json())
        .then(date => setCoins(date))
        .catch(error => console.error(error));
        setLoading(false);
    },[currency])
    console.log(coins);
    console.log(search);
  
{/*
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      console.log(data);
  
      setCoins(data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);
    */}
    
     function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      const navigate = useNavigate();

      
    
    return(
        <>
        <div>
            <div className='coinstable-header'><h1>Cryptocurrency Prices by Market Cap</h1></div>
            <div className='coinstable-inner-table'>
                <Container>
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ marginBottom: 10, width: "100%" ,marginTop:10 }}
                    onChange={(e)=>handleSearch(e)}
                    />
                </Container>
            </div>
            <div className='coinstable-div-contiainer'>
            {loading? <LinearProgress/>:<table>
                    <tr className='coinstable-table-head'>
                        <th>Coins</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Cap</th>
                    </tr>
                    {coins.map((coin)=>{
                        const profit = coin.price_change_percentage_24h > 0;
                        return(
                          <tr onClick={()=>navigate(`/coins/${coin.id}`)}>
                                <td className='conis-table-first-column'>
                                <img src={coin.image} alt="coin-image" className='tablerow-coin-image'/>
                                <div
                                style={{ display: "flex", flexDirection: "column" }}
                                >
                                <span
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                }}
                                >
                                {coin.symbol}
                                </span>
                                <span style={{ color: "darkgrey"  }}>
                                {coin.name}
                                </span>
                                </div>
                                </td>
                                <td style={{textAlign:"center"}}>{symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}</td>
                               
                                <td style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                             textAlign:"center"
                          }}>
                            {profit && "+"}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                          </td>
                          <td style={{textAlign:"center"}}>{symbol}{" "}
                          {numberWithCommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}
                          M</td>
                            </tr>
                        
                        )
                    })}
            </table>
            }
            </div>
        </div>
        </>
    );
}

export default CoinsTable;