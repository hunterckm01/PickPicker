import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState("photographer");

  return (
    <div
      className={`min-h-[calc(100vh-131px)] w-screen ${
        loginState === "photographer"
          ? "bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]"
          : "bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]"
      } flex items-center justify-center`}
    >
      <div className="w-full max-w-[412px] flex items-center justify-center gap-[14px]">
        <button className="moveButton" onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-3xl" />
        </button>
        <div className="bg-white h-[56px] px-5 py-[10px]  flex items-center justify-between rounded-[30px] text-2xl font-syne gap-[10px]">
          <div
            onClick={() => setLoginState("photographer")}
            className={`transition-all duration-200 font-medium py-[2px] px-[18px] rounded-[20px] cursor-pointer ${
              loginState === "photographer"
                ? "bg-[#FF3636] text-white"
                : "text-[#A19999] bg-white"
            }`}
          >
            Photographer
          </div>
          {/* <div
              onClick={() => setLoginState("client")}
              className={`transition-all duration-200 font-medium py-[2px] px-[18px] rounded-[20px] cursor-pointer ${
                loginState === "client"
                  ? "bg-[#FE0468] text-white"
                  : "text-[#A19999] bg-white"
              }  `}
            >
              Client
            </div> */}
        </div>

        <button
          onClick={() => navigate(loginState)}
          className="w-[60px] h-[48px] bg-white rounded-full flex items-center justify-center moveButton"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Login;
