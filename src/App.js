import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import CreateDiscount from './components/CreateDiscount/CreateDiscount';
import Scan from './components/Scan/Scan';
import BarcodeDetail from './components/BarcodeDetail/barcodeDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/createDiscount' element={<CreateDiscount/>}/>
        <Route path='/scan' element={<Scan/>}/>
        <Route path='/barcodeDetail' element={<BarcodeDetail/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
