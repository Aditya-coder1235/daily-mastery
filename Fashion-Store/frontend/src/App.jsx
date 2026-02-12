import {useRef} from 'react'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateProduct from './pages/product/CreateProduct';
import ProductInDetail from './pages/product/ProductInDetail';
import ProductAfterFil from './pages/product/ProductAfterFil';
import Cart from './pages/cart/Cart';
import { ShopContext } from './context/shopContext';
import ManageProducts from './pages/product/ManageProducts';
import UpdateProduct from './pages/product/UpdateProduct';
import ProtectedRoute from './ProtectedRoute.jsx/ProtectedRoute';
import SellerRoute from './ProtectedRoute.jsx/SellerRoute';

const App = () => {
    const shopRef = useRef(null);
  return (
      <ShopContext.Provider value={shopRef}>
          <Navbar />
          <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>

              <Route path="/product/:id" element={<ProductInDetail />}></Route>
              <Route path="/filter" element={<ProductAfterFil />}></Route>
              <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />}></Route>
                  <Route path="/manage" element={<ManageProducts />}></Route>
              </Route>

              <Route element={<SellerRoute />}>
                  <Route path="/create" element={<CreateProduct />}></Route>
                  <Route path="/update/:id" element={<UpdateProduct />}></Route>
              </Route>
          </Routes>
          <Footer />
      </ShopContext.Provider>
  );
}

export default App