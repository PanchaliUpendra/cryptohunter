import React ,{useEffect,useState} from 'react';
import axios from "axios";
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from "../Config/Api";
import LineChart from "./LineChart";
import { chartDays } from "../Config/data";
import SelectButton from "./SelectButton";
import CircularProgress from '@mui/material/CircularProgress';
import { sdata } from './StaticData';
import { UserData } from "./Data";
import "./CoinInfo.css";

const CoinInfo = ({coin}) => {
    const [historicData,setHistoricData] = useState(sdata.prices);
    const [days , setDays] = useState(1);

    const  { currency } = CryptoState();
    const [flag,setflag] = useState(false);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setflag(true);
        setHistoricData(data.prices);
      };
    
      console.log("data" ,historicData);

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency,days]);

      console.log("data:",historicData);
      
      const [userData, setUserData] = useState({
        labels:historicData ?historicData.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }) :[],
        /*labels: UserData.map((data) => data.year),*/
        datasets: [
          {
            label: `Price ( Past ${days} Days ) in ${currency}`,
            data: UserData.map((data) => data.userGain),
            data: historicData ?.map((coin) => coin[1]),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "blue",
            borderWidth: 2,
          },
        ],

      });

    return(
        <>
        <div>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "blue" }}
            size={250}
            thickness={1}
          />
        ) :(
          <>
            <div className="coin-info-grapg-size" >
              <LineChart chartData={userData}/>
            </div>
                
            </>
        )}

        </div>
        </>
        
    )
};

export default CoinInfo;