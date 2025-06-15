import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClient } from '../../../services/operations/photographerAPI'

const MyProfile = () => {
  const {token} = useSelector((state=>state.auth))
  const {clients} = useSelector((state)=>state.clients)
  const dispatch = useDispatch()

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
    <div className="w-screen min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)] flex flex-col ">

      <div className='pt-[100px] mx-auto text-3xl font-bold'>Photographer Details</div>

      <form className="mt-[50px] flex flex-col gap-5 mx-auto w-[682px] ">
        <div className="w-full inputBox">
          <label
            htmlFor="email"
            className="font-syne text-[16px] font-medium p-3"
          >
            Email
          </label>
          <div className="inputAnsBox">
            <input
              name="email"
              value={photographerDetails.email}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="w-full inputBox">
          <label
            htmlFor="firstName"
            className="font-syne text-[16px] font-medium p-3"
          >
            First Name
          </label>
          <div className="inputAnsBox">
            <input
              name="firstName"
              value={photographerDetails.firstName}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="w-full inputBox">
          <label
            htmlFor="lastName"
            className="font-syne text-[16px] font-medium p-3"
          >
            Last Name
          </label>
          <div className="inputAnsBox">
            <input
              name="lastName"
              value={photographerDetails.lastName}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="w-full inputBox">
          <label
            htmlFor="studioName"
            className="font-syne text-[16px] font-medium p-3"
          >
            Studio Name
          </label>
          <div className="inputAnsBox">
            <input
              name="studioName"
              value={photographerDetails.studioName}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MyProfile
