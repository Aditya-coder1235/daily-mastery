import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Message from "./pages/Message";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/message/:id" element={<Message/>}></Route>
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
