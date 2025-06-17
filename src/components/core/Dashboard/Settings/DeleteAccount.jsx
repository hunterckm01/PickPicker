import React from 'react'
import IconButton from '../../../common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteAccount } from '../../../../services/operations/profileAPI.js';

const DeleteAccount = () => {
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deleteAccountHandler = async() => {
        console.log("Delete Handler Called")
        dispatch(deleteAccount(token, navigate))
        console.log("Account Deleted Successfully")
    }
  return (
    <div className="pt-[50px] w-[900px] mx-auto flex flex-col gap-8">
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl">Delete Account</h2>

        <div className="mt-10 border flex flex-col items-start">
          <p className="">Would you really want to delete this account ?</p>
          <p>
            This account may contain your client and the uploaded data of you
            and your clients
          </p>
          <IconButton
            text={"delete"}
            customCss={""}
            onclick={deleteAccountHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount
