import React from 'react'
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const ClientLogin = () => {
  const navigate = useNavigate()
  return (
    <section
      className="relative bg-[linear-gradient(120deg,_#c8a0ffb3_10%,_#6496ff80_100%)]
    w-screen h-screen"
    >
      {/* Client Logo */}
      <div className="flex w-full justify-center items-center absolute top-[159px]">
        <div className="flex items-center justify-center bg-[#D9D9D9] w-[86px] h-[86px] top-[159px] mx-auto font-syne text-black rounded-full  text-[75px]">
          <p className="text-center relative top-[-10px]">c</p>
        </div>
      </div>

      {/* Client Login Form */}
      <div className="w-full relative top-[300px]">
        <form className="flex flex-col items-center justify-center gap-5 mx-auto">
          <div
            className="w-[412px] p-3 flex items-center justify-between gap-[14px] bg-white rounded-[30px] text-[25px] font-medium font-syne drop-shadow-[0px_4px_4px_rgba(0,0,0,0.6)]
"
          >
            <input
              type="text"
              id="username"
              placeholder="username"
              className="w-[120px] ml-5"
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="bg-[#FE0468] text-white w-[115px] rounded-[20px]"
            />
          </div>
          {/* Next Button Arrow */}
          <button className="moveButton ">
            <FaArrowRight className="text-2xl" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default ClientLogin
