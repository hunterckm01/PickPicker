import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClient } from '../../../../services/operations/photographerAPI'
import IconButton from '../../../common/IconButton'
import { useNavigate } from 'react-router'

const MyProfile = () => {
  const {token} = useSelector((state=>state.auth))
  const {clients} = useSelector((state)=>state.clients)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const {dispatch} = useSelector((state)=>sta)
  const [photographerDetails, setPhotographerDetails] = useState("") 
  const photographerAllDetails = () => {
    dispatch(getAllClient(token))
  }
  useEffect(()=>{
    photographerAllDetails()  
    const details = JSON.parse(localStorage.getItem("photographer"))
    console.log("Photographer details is", details)
    setPhotographerDetails(details)
  },[])
  
  useEffect(()=>{
    console.log("Clients are", clients)
  },[clients])

  return (
    <div className="w-screen min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)] flex flex-col ">
      <div className="pt-[50px] sm:pt-[100px] mx-auto text-xl sm:text-3xl font-bold flex w-[330px] sm:w-[682px] justify-between">
        <h2>Photographer Details</h2>
        <IconButton
          text="More"
          onclick={() => navigate("/dashboard/settings")}
        />
      </div>

      <form className="my-[50px] flex flex-col gap-5 mx-auto w-[330px] sm:w-[682px] ">
        <div className="w-full flex items-center justify-center">
          <img
            src={photographerDetails.image}
            className="h-30 w-30 rounded-full"
            alt="Profile-Picture"
          />
        </div>
        <div className="w-full inputBox">
          <label
            htmlFor="email"
            className="w-full font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            Email
          </label>
          <div className="inputAnsBox">
            <input
              name="email"
              value={photographerDetails.email}
              type="text"
              className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="w-full inputBox">
          <label
            htmlFor="firstName"
            className="w-full font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            First Name
          </label>
          <div className="w-full inputAnsBox">
            <input
              name="firstName"
              value={photographerDetails.firstName}
              type="text"
              className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="w-full inputBox">
          <label
            htmlFor="lastName"
            className="w-full font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            Last Name
          </label>
          <div className="w-full inputAnsBox">
            <input
              name="lastName"
              value={photographerDetails.lastName}
              type="text"
              className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="w-full inputBox">
          <label
            htmlFor="studioName"
            className="w-full font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            Studio Name
          </label>
          <div className="w-full inputAnsBox">
            <input
              name="studioName"
              value={photographerDetails.studioName}
              type="text"
              className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MyProfile
