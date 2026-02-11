import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateProduct from './pages/product/CreateProduct';
import ProductInDetail from './pages/product/ProductInDetail';
import ProductAfterFil from './pages/product/ProductAfterFil';

const App = () => {
  return (
      <div>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Dashboard/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='login' element={<Login/>}></Route>
              <Route path='/create' element={<CreateProduct/>}></Route>
              <Route path='/product/:id' element={<ProductInDetail/>}></Route>
              <Route path='/filter' element={<ProductAfterFil/>}></Route>
          </Routes>
          <Footer/>
      </div>
  );
}

export default App