import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logoPurple from '../../assets/LogoPurple.svg'
import { NavbarLinks, photographerNavLinks } from '../../data/navbar-links'
import { matchPath, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { setToken } from '../../slices/authSlice'
import {Link as ScrollLink} from 'react-scroll'
import { logout } from '../../services/operations/authAPI'


const Navbar = () => {
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  // const navigate = useNavigate()
  // console.log("Photographer value", photographer)

  useEffect(()=>{
    console.log("Pathname is", location.pathname)
  },[location.pathname])

  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname)
  }

  const navigate = useNavigate();

  function logoutHandler(){
    console.log("Handler function is called")
    dispatch(logout(navigate))
  }
  
  return (
    <nav className="w-screen sm:bg-[#1C1A26] h-[50px] sm:h-[110px] lg:h-[131px] sm:flex sm:items-center sm:justify-center">
      <div
        className="h-full sm:[90px] lg:h-[97px] box-border 
       w-full lg:w-[1200px] bg-[linear-gradient(102.85deg,_#EFDAFF_2.13%,_#FFF4DF_104.3%)] sm:rounded-[25px] flex items-center justify-between mx-auto pl-[16px] pr-[10px] sm:px-[80px] py-1 "
      >
        {!token ? (
          <div
            className="flex flex-col font-sunflower text-[#4A1872] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex justify-center items-center gap-1 sm:gap-2">
              <img
                src={logoPurple}
                className="h-[11px] sm:h-[25px] lg:h-[33px]"
              />
              <p className="text-[11px] sm:text-[25px] lg:text-[33px] font-bold">
                Pic
              </p>
            </div>
            <p className="text-[11px] sm:text-[25px] lg:text-[33px] font-bold">
              Picker
            </p>
          </div>
        ) : (
          <img src={logoPurple} className="h-[25px] sm:h-[35px] lg:h-[50px]" />
        )}

        <div>
          {!token ? (
            <ul className="flex items-center rounded-[18px] gap-[4px] sm:gap-[14px] lg:gap-[21px] px-[10px] sm:px-[20px] lg:px-[30px] py-1 sm:py-2 bg-[#DCC4F1]">
              {NavbarLinks.map((link, index) => (
                <li
                  key={index}
                  className="py-[2px] px-[8px] sm:px-[10px] lg:px-[12px] rounded-[30px] font-tw text-[12px] sm:text-[26px] lg:text-[30px] cursor-pointer hover:bg-[linear-gradient(270deg,_#bd14f980_0%,_#ed34c880_100%)] hover:transition-all hover:duration-300"
                >
                  <ScrollLink
                    to={link.id}
                    spy={true}
                    smooth={true}
                    offset={-120}
                    duration={500}
                  >
                    {link.title}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex items-center rounded-[18px] gap-[4px] sm:gap-[14px] lg:gap-[21px] px-[10px] sm:px-[20px] lg:px-[30px] py-1 sm:py-2 bg-[#DCC4F1]">
              {photographerNavLinks.map((link, index) => (
                <li
                  key={index}
                  className={`py-[2px] px-[8px] sm:px-[10px] lg:px-[12px] rounded-[30px] font-tw text-[12px] sm:text-[26px] lg:text-[30px] cursor-pointer hover:bg-[linear-gradient(270deg,_#bd14f980_0%,_#ed34c880_100%)] hover:transition-all hover:duration-300 ${
                    matchRoute(link.path)
                      ? "bg-[linear-gradient(270deg,_#bd14f980_0%,_#ed34c880_100%)] transition-all duration-300"
                      : ""
                  }`}
                  onClick={() => navigate(link.path)}
                >
                  {link.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Handle Login Logout If Token is available */}
        {!token ? (
          <div className="flex flex-col justify-between font-montserrat text-[8px] sm:text-[16px] lg:text-[18px] text-black font-normal gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("/login")}
              className="p-1 sm:p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f980_0%,_#ed34c880_100%)]"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signUp")}
              className="p-1  sm:p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f940_0%,_#ed34c840_100%)]"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-between font-montserrat text-[8px] sm:text-[16px] lg:text-[18px] text-black font-normal gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("/dashboard/my-profile")}
              className="p-1 sm:p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f940_0%,_#ed34c840_100%)]"
            >
              Profile
            </button>
            <button
              onClick={logoutHandler}
              className="p-1  sm:p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f940_0%,_#ed34c840_100%)]"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar
