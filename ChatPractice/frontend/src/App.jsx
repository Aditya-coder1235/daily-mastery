import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Message from "./pages/Message";

function App() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            <Navbar />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/msg/:conversationId" element={<Message />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
