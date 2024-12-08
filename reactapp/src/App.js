 
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import TabelaAnketa from './komponente/ankete/admin/TabelaAnketa';
import DetaljiAnkete from './komponente/ankete/detalji/DetaljiAnkete';
import OpenFDAComponent from './komponente/fda/OpenFDAComponent';
import TabelaAnketaKorisnik from './komponente/ankete/korisnik/TabelaAnketaKorisnik';
import GlasajAnketa from './komponente/ankete/korisnik/GlasajAnketa';
import { useEffect, useState } from 'react';
import Navbar from './komponente/reusable/Navbar';
import Register from './komponente/login/Register';
import CreateZahtev from './komponente/zahtevi/CreateZahtev';
import AdminZahtevi from './komponente/zahtevi/AdminZahtevi';
import Zakazivanja from './komponente/zakazivanja/Zakazivanja';

function App() {
  const [token,setToken] = useState(null); 
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
   <BrowserRouter>
      <Navbar token={token}  setToken={setToken} ></Navbar>
      <Routes> 
        
        <Route path='/ankete/glasaj/:id' element={<GlasajAnketa />}></Route>     {/* ulogovani korisnik */}
        <Route path='/ankete/:id' element={<DetaljiAnkete></DetaljiAnkete>}></Route>{/* ulogovani admin */}  {/* dodati grafikoni */}
        <Route path='/ankete' element={<TabelaAnketaKorisnik></TabelaAnketaKorisnik>}></Route> {/* ulogovani korisnik */}
        <Route path='/admin' element={<TabelaAnketa></TabelaAnketa>}></Route>{/* ulogovani admin */}
        <Route path='/fda' element={<OpenFDAComponent></OpenFDAComponent>}></Route>   {/*svi */}
        <Route path='/' element={<Login setToken={setToken}></Login>}></Route>{/*svi */}


        <Route path="/admin/zahtevi" element={<AdminZahtevi />} />
        <Route path="/zakazivanja" element={<Zakazivanja />} />

        <Route path="/kreirajZahtev" element={<CreateZahtev />} />
        <Route path='/register' element={<Register  ></Register>}></Route> {/* dodato za seminarski */}
      </Routes>
     
      </BrowserRouter>
  );
}

export default App;
