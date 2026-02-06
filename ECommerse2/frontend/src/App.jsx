import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateProuduct from './pages/CreateProuduct';
import ProductInDetail from './pages/ProductInDetail';
import SellerProducts from './pages/SellerProducts'
import UpdateProduct from './pages/UpdateProduct'
import Cart from './pages/Cart';

const App = () => {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/create" element={<CreateProuduct />}></Route>
              <Route path="/product/:id" element={<ProductInDetail />}></Route>
              <Route path="/sellerProduct" element={<SellerProducts />}></Route>
              <Route path="/update/:id" element={<UpdateProduct />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
          </Routes>
          <Footer />
      </div>
  );
}

export default App