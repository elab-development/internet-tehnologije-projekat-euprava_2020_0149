 
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import TabelaAnketa from './komponente/ankete/admin/TabelaAnketa';
import DetaljiAnkete from './komponente/ankete/detalji/DetaljiAnkete';
import OpenFDAComponent from './komponente/fda/OpenFDAComponent';
import TabelaAnketaKorisnik from './komponente/ankete/korisnik/TabelaAnketaKorisnik';
import GlasajAnketa from './komponente/ankete/korisnik/GlasajAnketa';
import { useState } from 'react';
import Navbar from './komponente/reusable/Navbar';

function App() {
  const [token,setToken] = useState();
  return (
   <BrowserRouter>
      <Navbar token={token}  setToken={setToken} ></Navbar>
      <Routes>
        
        <Route path='/ankete/glasaj/:id' element={<GlasajAnketa />}></Route>     {/* ulogovani korisnik */}
        <Route path='/ankete/:id' element={<DetaljiAnkete></DetaljiAnkete>}></Route>{/* ulogovani admin */}
        <Route path='/ankete' element={<TabelaAnketaKorisnik></TabelaAnketaKorisnik>}></Route> {/* ulogovani korisnik */}
        <Route path='/admin' element={<TabelaAnketa></TabelaAnketa>}></Route>{/* ulogovani admin */}
        <Route path='/fda' element={<OpenFDAComponent></OpenFDAComponent>}></Route>   {/*svi */}
        <Route path='/' element={<Login setToken={setToken}></Login>}></Route>{/*svi */}

      </Routes>
     
      </BrowserRouter>
  );
}

export default App;
