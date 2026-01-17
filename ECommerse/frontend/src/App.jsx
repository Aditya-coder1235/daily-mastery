import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Update from "./pages/Update";
import ProductinDetail from "./pages/ProductinDetail";
import SellProduct from "./pages/SellProduct";
import Cart from "./pages/Cart";

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<DashBoard />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="/update/:id" element={<Update />}></Route>
                <Route
                    path="/product/:id"
                    element={<ProductinDetail />}
                ></Route>
                <Route
                    path="/sellyourproduct"
                    element={<SellProduct />}
                ></Route>
                <Route
                    path="/cart"
                    element={<Cart />}
                ></Route>
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
