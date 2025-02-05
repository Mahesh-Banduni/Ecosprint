import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Menu, X } from "lucide-react";
import { logo } from "../utils/icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(false);

  return (
    <>
    <nav className="w-full bg-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm: gap-2 mb-4">
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div>
          <Link>
           <div className="inline-flex gap-1 items-center">
            <img className="w-20 h-12 max-sm:w-16 pt-2 max-sm:h-10" src={logo} alt="" />
            <h2 className=" sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl text-emerald-950 font-bold uppercase">Ecosprint</h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 border border-black rounded-md w-96 bg-white max-sm:w-72 max-[500px]:w-52">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none border-none font-poppinsLight w-full max-sm:text-sm"
          />
          <IoSearch className="w-6 h-6 text-slate-950 max-sm:w-5 max-sm:h-5" />
        </div>
        <div className="navbar-end w-fit flex items-center justify-end basis-1 shrink max-sm:pr-5">
      
          {/* {!token ? (
           
          ) : (
            <div className="flex gap-5 items-center max-sm:gap-2">
              <Link to="/wishlist" className="flex flex-col items-center">
                <img className="w-5" src={heart} alt="" />
              </Link>
            </div>
          )} */}
        </div>
      </div>
      <hr></hr>
     
      {isOpen && (
        <div className="menu-sm dropdown-content flex flex-col items-start bg-white text-black w-1/2 p-4 ml-4 space-y-4 shadow rounded-box z-[1]">
          <ul>
          <li className="bg-transparent">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? " border-b-2 text-xl border-none text-primary-color "
                      : " text-black text-xl border-none hover:border-b-2 hover:text-primary-color "
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="bg-transparent">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? " border-b-2 text-xl border-none text-primary-color "
                      : " text-black text-xl border-none hover:border-b-2 hover:text-primary-color "
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="bg-transparent">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? " border-b-2 text-xl border-none text-primary-color "
                      : " text-black text-xl border-none hover:border-b-2 hover:text-primary-color "
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="bg-transparent">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? " border-b-2 text-xl border-none text-primary-color "
                      : " text-black text-xl border-none hover:border-b-2 hover:text-primary-color "
                  }
                >
                  Home
                </NavLink>
              </li>
          </ul>
          {/* <h4 className="text-xl">About</h4>
          <h4 className="text-xl">Service</h4>
          <h4 className="text-xl">Collection</h4>
          <h4 className="text-xl">Contact</h4> */}
        </div>
      )}
      
    </nav>
    
    </>
  );
};

export default Header;
