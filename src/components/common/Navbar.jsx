import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logoPurple from '../../assets/LogoPurple.svg'
import { NavbarLinks, photographerNavLinks } from '../../data/navbar-links'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { setToken } from '../../slices/authSlice'


const Navbar = () => {
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // console.log("Photographer value", photographer)

  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("token")
    dispatch(setToken(null))
    toast.success("Logout Successfully")
    navigate("/")
  }
  
  return (
    <nav className="w-screen bg-[#1C1A26] h-[131px] flex  items-center justify-center">
      <div className="h-[97px] box-border w-[1200px] bg-[linear-gradient(102.85deg,_#EFDAFF_2.13%,_#FFF4DF_104.3%)] rounded-[25px] flex items-center justify-between mx-auto  px-[80px] py-1 ">
        {!token ? (
          <div className="flex flex-col font-sunflower text-[#4A1872] ">
            <div className="flex justify-center items-center gap-2">
              <img src={logoPurple} className="h-[31px] w-[31px]" />
              <p className="text-[33px] font-bold">Pic</p>
            </div>
            <p className="text-[33px] font-bold">Picker</p>
          </div>
        ) : (
          <img src={logoPurple} className="h-[71px] w-[71px]" />
        )}

        <div>
          {!token ? (
            <ul className="flex items-center rounded-[18px] gap-[21px] px-[30px] bg-[#DCC4F1]">
              {NavbarLinks.map((link, index) => (
                <li
                  key={index}
                  className="p-[15px] rounded-[30px] font-tw text-[30px]"
                  onClick = {()=>navigate(link.path)}
                >
                  {link.title}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex items-center rounded-[18px] gap-[21px] px-[30px] bg-[#DCC4F1]">
              {photographerNavLinks.map((link, index) => (
                <li
                  key={index}
                  className="py-[6px] px-[12px] rounded-[30px] font-tw text-[30px] cursor-pointer"
                  onClick = {()=>navigate(link.path)}
                >
                  {link.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Handle Login Logout If Token is available */}
        {!token ? (
          <div className="flex flex-col justify-between font-montserrat text-[18px] text-black font-normal gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f980_0%,_#ed34c880_100%)]"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signUp")}
              className="p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f940_0%,_#ed34c840_100%)]"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-between font-montserrat text-[18px] text-black font-normal gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("/dashboard/my-profile")}
              className="p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f980_0%,_#ed34c880_100%)]"
            >
              Profile
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-[linear-gradient(270deg,_#bd14f940_0%,_#ed34c840_100%)]"
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
