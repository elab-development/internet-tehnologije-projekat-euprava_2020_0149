 
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import TabelaAnketa from './komponente/ankete/admin/TabelaAnketa';
import DetaljiAnkete from './komponente/ankete/detalji/DetaljiAnkete';
import OpenFDAComponent from './komponente/fda/OpenFDAComponent';
import TabelaAnketaKorisnik from './komponente/ankete/korisnik/TabelaAnketaKorisnik';

function App() {
  return (
   <BrowserRouter>
     
      <Routes>
        <Route path='/ankete/:id' element={<DetaljiAnkete></DetaljiAnkete>}></Route>
        <Route path='/ankete' element={<TabelaAnketaKorisnik></TabelaAnketaKorisnik>}></Route>
        <Route path='/admin' element={<TabelaAnketa></TabelaAnketa>}></Route>
        <Route path='/fda' element={<OpenFDAComponent></OpenFDAComponent>}></Route>
        <Route path='/' element={<Login></Login>}></Route>

      </Routes>
     
      </BrowserRouter>
  );
}

export default App;
