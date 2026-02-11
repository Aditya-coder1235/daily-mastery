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

const App = () => {
    const shopRef = useRef(null);
  return (
      <ShopContext.Provider value={shopRef}>
          <Navbar />
          <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="/create" element={<CreateProduct />}></Route>
              <Route path="/product/:id" element={<ProductInDetail />}></Route>
              <Route path="/filter" element={<ProductAfterFil />}></Route>
              <Route path="/cart" element={<Cart/>}></Route>
          </Routes>
          <Footer />
      </ShopContext.Provider>
  );
}

export default App