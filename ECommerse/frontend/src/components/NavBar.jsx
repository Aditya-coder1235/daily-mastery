import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {setSearchTerm} from '../features/productSlice'
import { useDispatch } from 'react-redux';

const NavBar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    async function logout(){
        try {
            let res = await axios.post(
                "http://localhost:8080/api/user/logout",{},{withCredentials:true});
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            alert("User Logout Successfully....");
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    let role=localStorage.getItem('role')

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };


  return (
      <nav className="n flex  h-20 items-center w-full fixed top-0 bg-white">
          <div className="ms-15 vt" onClick={() => navigate("/")}>
              <img src="/seller.png" alt="" className="v" />
          </div>
          <div className="flex justify-center items-center w-full px-4">
              <input
                  type="text"
                  className="border  rounded-2xl w-85 h-8 p-2 i"
                  placeholder="Search Products......"
                  onChange={handleSearch}
              />
          </div>
          <div className="flex justify-around items-center w-full px-4">
              <Link to={"/"} className="home">
                  Home
              </Link>
              <Link to={"/sellyourproduct"}>SellProduct</Link>
              <Link to={"/cart"}>Cart</Link>

              {!role && (
                  <>
                      {" "}
                      <Link to={"/signup"}>Signup</Link>
                      <Link to={"/login"}>Login</Link>
                  </>
              )}

              <button onClick={() => logout()}>Logout</button>
          </div>
      </nav>
  );
}

export default NavBar