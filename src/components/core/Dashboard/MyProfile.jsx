import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClient } from '../../../services/operations/photographerAPI'

const MyProfile = () => {
  const {token} = useSelector((state=>state.auth))
  const {clients} = useSelector((state)=>state.clients)
  const dispatch = useDispatch()
  // const {dispatch} = useSelector((state)=>sta)

  const photographerAllDetails = () => {
    dispatch(getAllClient(token))
  }
  useEffect(()=>{
    photographerAllDetails()  
  },[])
  
  useEffect(()=>{
    console.log("Clients are", clients)
  },[clients])

  return (
    <div className="w-screen min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]"></div>
  );
}

export default MyProfile
