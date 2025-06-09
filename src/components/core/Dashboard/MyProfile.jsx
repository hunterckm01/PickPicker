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
    <div>
      
    </div>
  )
}

export default MyProfile
