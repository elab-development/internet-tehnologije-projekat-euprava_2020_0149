 
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import TabelaAnketa from './komponente/ankete/TabelaAnketa';

function App() {
  return (
   <BrowserRouter>
     
      <Routes>
      <Route path='/admin' element={<TabelaAnketa></TabelaAnketa>}></Route>
        <Route path='/' element={<Login></Login>}></Route>

      </Routes>
     
      </BrowserRouter>
  );
}

export default App;
