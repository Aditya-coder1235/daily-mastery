import { Navigate, Outlet } from "react-router-dom";

const SellerRoute = () => {
    const role = localStorage.getItem("role");

    return role === "seller" ? <Outlet /> : <Navigate to="/" replace />;
};

export default SellerRoute;
