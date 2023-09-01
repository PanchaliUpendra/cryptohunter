import React, { createContext, useEffect, useState ,useContext } from 'react';
const Crypto = createContext()
const CryptoContext =({children})=>{
    const [currency , setcurrency] = useState('INR');
    const [symbol ,setSymbol] = useState("₹")

    useEffect(()=>{
        if(currency === 'INR') setSymbol("₹");
        else if(currency === 'USD') setSymbol("$");
    },[currency])
    return <Crypto.Provider value={{currency ,symbol,setcurrency}}>{children}</Crypto.Provider>
}
export default CryptoContext;

export const CryptoState =() =>{
    return useContext(Crypto);
}