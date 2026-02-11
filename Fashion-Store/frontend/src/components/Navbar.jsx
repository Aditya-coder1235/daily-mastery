import React from 'react'
import { Link } from 'react-router';
import { ShoppingCart } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
      <nav className="flex h-19  w-full items-center gap-16 ">
          <div className="ms-28">
              <Link to={"/"}>
                  <h2 className="text-2xl font-bold">FashionStore</h2>
              </Link>
          </div>
          <div className="flex items-center gap-7 font-semibold">
              <Link className="flex items-center">
                  Shop
                  <ChevronDown />
              </Link>
              <Link>Brands</Link>

              <Link to={"/signup"}>Signup</Link>
              <Link to={"/login"}>Login</Link>
          </div>
          <div>
              <input
                  type="text"
                  placeholder="Search for Products....."
                  className="bg-gray-200 outline-none border-none w-100 h-10 ps-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
          </div>
          <div className="flex items-center gap-8">
              <span className='cursor-pointer'>
                  <ShoppingCart />
              </span>
              <Link to={'/create'} className="flex items-center gap-2 cursor-pointer bg-gray-200 px-3 py-1.5 rounded-2xl">
                  <CirclePlus /> <p className="text-xs">Add Product</p>
              </Link>
          </div>
      </nav>
  );
}

export default Navbar