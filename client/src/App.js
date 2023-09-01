import React from 'react';
import './App.css';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import Login from './Components/Log/Login';
import Listdata from './Components/Mylist/Listdata';
function App() {
  return (
    <div className='app-container'>
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/coins/:id' element={<Coinpage/>}/>
          <Route path='/signup' element={<Login/>}/>
          <Route path='/listdata' element={<Listdata/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
